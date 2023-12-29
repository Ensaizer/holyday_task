import { WebSocketServer } from 'ws';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';
import jwtConfig from '../config/jwtConfig';

require('dotenv').config();

export const wsServer = new WebSocketServer({
  clientTracking: false,
  noServer: true,
});

export const upgradeCb = (request, socket, head) => {
  cookieParser()(request, {}, () => {
    const access = request.cookies.refreshToken;
    // console.log({ access: access });

    socket.on('error', (err) => {
      console.log('Socket error:', err);
    });

    // console.log('Parsing session from request...');
    try {
      // console.log('JWT toket is parsed!',process.env.ACCESS_TOKEN_SECRET);
      jwt.verify(access, process.env.REFRESH_TOKEN_SECRET);

      socket.removeListener('error', (err) => {
        console.log('Socket error:', err);
      });

      wsServer.handleUpgrade(request, socket, head, (ws) => {
        wsServer.emit('connection', ws, request);
      });
    } catch (e) {
      console.log(e);
    }
  });
};
