import { Router } from 'express';

const authRouter = Router();

authRouter.get('/login', (req, res) => {
  if (res.locals.user) {
    return res.redirect('/');
  }
  return res.render('LoginPage', {});
});

authRouter.get('/signup', (req, res) => {
  if (res.locals.user) {
    return res.redirect('/');
  }
  return res.render('SignUpPage', {});
});

export default authRouter;
