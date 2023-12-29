import { Router } from 'express';
import { verifyRefreshToken } from '../middlewares/verifyTokens';
import { UserFriend } from '../../db/models';

const apiRoutersRouter = Router();

apiRoutersRouter.route('/:id').delete(verifyRefreshToken, async (req, res) => {
  try {
    const { id } = req.params;
    if (
      !(await UserFriend.findOne({
        where: {
          friendId: id,
          userId: res.locals.user.id,
        },
      }))
    ) {
      return res.json({
        message: 'Не является другом',
      });
    }
    const user = await UserFriend.destroy({
      where: {
        friendId: id,
      },
    });
    return res.sendStatus(200);
  } catch (error) {
    res.status(500).json({
      message: 'Server error',
    });
  }
}).post(verifyRefreshToken, async (req, res) => {
  try {
    const { id } = req.params;
    const user = await UserFriend.create({
      userId: res.locals.user.id,
      friendId: id,
    });
    return res.sendStatus(200);
  } catch (error) {
    res.status(500).json({
      message: 'Server error',
    });
  }

})

export default apiRoutersRouter;
