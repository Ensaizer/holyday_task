import express from 'express';
import morgan from 'morgan';
import path from 'path';
import cookieParser from 'cookie-parser';
import 'dotenv/config';
import jsxRender from './utils/jsxRender';
import indexRouter from './routes/indexRouter';
import resLocals from './middlewares/resLocals';
import apiAuthRouter from './routes/apiAuthRouter';
import authRouter from './routes/authRouter';
import apiFriendsRouter from './routes/apiFriendsRouter';
import { upgradeCb, wsServer } from './ws/wsServer';
import connectionCb from './ws/connection';
import { verifyRefreshToken, verifyAccessToken } from './middlewares/verifyTokens';
import { createServer } from 'http';
import messageRouter from './routes/messageRouter';

const PORT = process.env.PORT || 3000;
const app = express();

app.engine('jsx', jsxRender);
app.set('view engine', 'jsx');
app.set('views', path.join(__dirname, 'components', 'pages'));

app.use(express.static('public'));
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(resLocals);

app.use('/', indexRouter);
app.use('/account', authRouter);
app.use('/api/account', apiAuthRouter);
app.use('/api/friends', verifyRefreshToken, verifyAccessToken, apiFriendsRouter);
app.use('/message', messageRouter);

const server = createServer(app);

server.on('upgrade', upgradeCb);
wsServer.on('connection', connectionCb);

server.listen(PORT, () => console.log(`Server started on port ${PORT}`));
