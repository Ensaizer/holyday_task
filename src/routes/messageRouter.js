import { Router } from 'express';
import { verifyRefreshToken } from '../middlewares/verifyTokens';
import { Message, User, UserFriend } from '../../db/models';
import { Op } from 'sequelize';

const messageRouter = Router();

messageRouter.route('/:id').get(verifyRefreshToken, async (req, res) => {
  try {
    const { id } = req.params;
    if (
      id == res.locals.user.id
      // !(await UserFriend.findOne({
      //   where: {
      //     friendId: id,
      //     userId: res.locals.user.id,
      //   },
      // }))
    ) {
      return res.redirect('/');
    }

    const messages = await Message.findAll({
      where: { [Op.or]: [{ userId: id }, { userId: res.locals.user.id }] },
      include: {
        model: User,
        attributes: ['id', 'name', 'avatar'],
      },
      order: [['createdAt', 'ASC']],
    });
    return res.render('OneChatPage', { messages });
  } catch (error) {
    res.status(500).json({
      message: 'Server error' + error,
    });
  }
});

export default messageRouter;
