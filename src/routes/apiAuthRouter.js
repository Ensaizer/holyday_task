import express from 'express';
import bcrypt from 'bcrypt';
import fs from 'fs/promises';
import upload from '../middlewares/multerMid';
import sharp from 'sharp';
import { User } from '../../db/models';
import generateTokens from '../utils/generateTokens';
import cookiesConfig from '../config/cookiesConfig';

const apiAuthRouter = express.Router();

apiAuthRouter.post('/signup', upload.single('filename'), async (req, res) => {
  const { name, email, password, age, city } = req.body;

  if (!name || !email || !password) {
    res.status(400).json({ message: 'all fields is required' });
    return;
  }
  const searchEmail = await User.findOne({
    where: { email },
  });
  if (searchEmail) {
    res.status(400).json({ message: 'email exists' });
    return;
  }
  const filename = `${Date.now()}.webp`;
  const outputBuffer = await sharp(req.file.buffer).webp().toBuffer();
  await fs.writeFile(`./public/avatars/${filename}`, outputBuffer);
  const newUser = await User.create({
    name,
    email,
    password: await bcrypt.hash(password, 10),
    avatar: filename,
    age,
    city,
  });

  const plainUser = newUser.get();
  delete plainUser.password;
  const { accessToken, refreshToken } = generateTokens({ user: plainUser });
  res
    .cookie('accessToken', accessToken, cookiesConfig.access)
    .cookie('refreshToken', refreshToken, cookiesConfig.refresh)
    .sendStatus(200);
});

apiAuthRouter.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({ message: 'missing user data' });
    return;
  }
  const currentUser = await User.findOne({
    where: { email },
  });
  if (!currentUser || !(await bcrypt.compare(password, currentUser.password))) {
    res.status(401).json({ message: "email doesn't exist" });
    return;
  }

  const plainUser = currentUser.get();
  delete plainUser.password;
  const { accessToken, refreshToken } = generateTokens({ user: plainUser });
  res
    .cookie('accessToken', accessToken, cookiesConfig.access)
    .cookie('refreshToken', refreshToken, cookiesConfig.refresh)
    .sendStatus(200);
});

apiAuthRouter.get('/logout', (req, res) => {
  try {
    res.locals.user = undefined;
    res.clearCookie('accessToken').clearCookie('refreshToken').sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

export default apiAuthRouter;
