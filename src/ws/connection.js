import jwt from 'jsonwebtoken';
import { Post, User } from '../../db/models';
import {
  SET_USERS_FROM_SERVER,
  ADD_MESSAGE_FROM_SERVER,
  ADD_MESSAGE_FROM_CLIENT,
  TYPING_MESSAGE_FROM_CLIENT,
  TYPING_MESSAGE_FROM_SERVER,
  STOP_TYPING_MESSAGE_FROM_CLIENT,
  STOP_TYPING_MESSAGE_FROM_SERVER,
  DELETE_MESSAGE_FROM_CLIENT,
  DELETE_MESSAGE_FROM_SERVER,
} from './actions';
import jwtConfig from '../config/jwtConfig';

import 'dotenv/config';

const map = new Map(); // хранит все текущие соединения по WS

const connectionCb = (socket, request) => {
  const access = request.cookies.refreshToken;
  const { user: userFromJWT } = jwt.verify(access, process.env.REFRESH_TOKEN_SECRET);
  const userId = userFromJWT.id; // hardcode

  map.set(userId, { ws: socket, user: userFromJWT });

  socket.on('error', console.error);
  // console.log(map);
  map.forEach(({ ws }) => {
    // console.log('11111111111111111111111111111111111111-----------------------------------');
    ws.send(
      JSON.stringify({
        type: SET_USERS_FROM_SERVER,
        payload: [...map.values()].map(({ user }) => user),
      }),
    );
  });
  console.log(map);
  
  socket.on('message', async (message) => {
    const { type, payload } = JSON.parse(message); // получили сообщение с клиента
    switch (type) {
      case ADD_MESSAGE_FROM_CLIENT: {
        console.log(payload, userId);
        Post.create({ text: payload.text, userId }).then(async (newMessage) => {
          const includedMessage = await Post.findOne({
            where: { id: newMessage.id },
            include: User,
          });
          map.forEach(({ ws }) => {
            ws.send(
              JSON.stringify({
                type: ADD_MESSAGE_FROM_SERVER,
                payload: includedMessage,
              }),
            );
          });
        });
        break;
      }

      case DELETE_MESSAGE_FROM_CLIENT: {
        Post.destroy({ where: { id: payload } }).then(async () => {
          map.forEach(({ ws }) => {
            ws.send(
              JSON.stringify({
                type: DELETE_MESSAGE_FROM_SERVER,
                payload,
              }),
            );
          });
        });
        break;
      }

      case TYPING_MESSAGE_FROM_CLIENT: {
        map.forEach(({ ws }) => {
          ws.send(
            JSON.stringify({
              type: TYPING_MESSAGE_FROM_SERVER,
              payload: userFromJWT,
            }),
          );
        });
        break;
      }

      case STOP_TYPING_MESSAGE_FROM_CLIENT: {
        map.forEach(({ ws }) => {
          ws.send(
            JSON.stringify({
              type: STOP_TYPING_MESSAGE_FROM_SERVER,
            }),
          );
        });
        break;
      }

      default:
        break;
    }
    console.log(`Received message ${message} from user ${userId}`);
  });

  socket.on('close', () => {
    map.delete(userId);
    map.forEach(({ ws }) => {
      ws.send(
        JSON.stringify({
          type: SET_USERS_FROM_SERVER,
          payload: [...map.values()].map(({ user }) => user),
        }),
      );
    });
  });
};

export default connectionCb;
