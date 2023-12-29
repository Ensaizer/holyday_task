import { Router } from 'express';
import { verifyRefreshToken } from '../middlewares/verifyTokens';
import { Message } from '../../db/models';

const messageRouter = Router();

messageRouter.route('/:id').get(verifyRefreshToken, async (req, res) => {
  try {
    const { id } = req.params;
    const friendMessages = await Message.findAll({ where: { userId: id } });
    const userMessages = await Message.findAll({ where: { userId: res.locals.user.id } });
    res.render('OneChatPage',{ friendMessages, userMessages });
  } catch (error) {
    res.status(500).json({
      message: 'Server error' + error,
    });
  }
});

export default messageRouter;