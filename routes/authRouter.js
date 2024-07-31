import express from 'express';
import validateBody from '../middlewares/validateBody.js';
import {
  registerSchema,
  emailSchema,
  loginSchema,
  subscriptionShema,
} from '../schemas/usersSchemas.js';
import ctrlWrapper from '../helpers/ctrlWrapper.js';
import authControllers from '../controllers/authControllers.js';
import authenticate from '../middlewares/authenticate.js';
import upload from '../middlewares/upload.js';

const authRouter = express.Router();

authRouter.post(
  '/register',
  validateBody(registerSchema),
  ctrlWrapper(authControllers.registerUser)
);

authRouter.get(
  '/verify/:verificationToken',
  authControllers.verifyUser
);

authRouter.post(
  '/verify',
  validateBody(emailSchema),
  authControllers.resendVerifyEmail
);

authRouter.post(
  '/login',
  validateBody(loginSchema),
  ctrlWrapper(authControllers.loginUser)
);

authRouter.post(
  '/current',
  authenticate,
  ctrlWrapper(authControllers.currentUser)
);
authRouter.post(
  '/logout',
  authenticate,
  ctrlWrapper(authControllers.logoutUser)
);
authRouter.patch(
  '/subscription',
  authenticate,
  validateBody(subscriptionShema),
  ctrlWrapper(authControllers.changeSubscription)
);

authRouter.patch(
  '/avatars',
  authenticate,
  upload.single('avatar'),
  ctrlWrapper(authControllers.changeAvatar)
);

export default authRouter;
