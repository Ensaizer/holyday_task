import express from 'express';
import { User, UserFriend } from '../../db/models';
import { verifyAccessToken, verifyRefreshToken } from '../middlewares/verifyTokens';

const router = express.Router();

router.get('/', async (req, res) => {
  const users = await User.findAll();
  res.render('MainPage', { users });
});
router.get('/my_page', verifyAccessToken, verifyRefreshToken, async (req, res) => {
  res.render('MyPage');
});

router.get('/friends', verifyAccessToken, verifyRefreshToken, async (req, res) => {
  const friends = await UserFriend.findAll({
    where: {
      userId: res.locals.user.id,
    },
  });
  let userFriends;
  await Promise.all(
    (userFriends = friends.map((friend) => User.findOne({ where: { id: friend.friendId } }))),
  ).then((data) => (userFriends = data));
  res.render('FriendsPage', { userFriends });
});
router.get('/chats', verifyAccessToken, verifyRefreshToken, (req, res) => {
  res.render('ChatsPage');
});
router.get('/photos', verifyAccessToken, verifyRefreshToken, (req, res) => {
  res.render('PhotosPage');
});

export default router;
