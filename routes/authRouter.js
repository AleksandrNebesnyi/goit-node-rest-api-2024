import express from "express";
import validateBody from '../middlewares/validateBody.js';
import { registerSchema,loginSchema,subscriptionShema } from "../schemas/usersSchemas.js";
import ctrlWrapper from "../helpers/ctrlWrapper.js";
import { registerUser,loginUser,currentUser,logoutUser,changeSubscription  } from "../controllers/authControllers.js";
import authenticate from "../middlewares/authenticate.js";

const authRouter = express.Router();

authRouter.post("/register",validateBody(registerSchema), ctrlWrapper( registerUser));
authRouter.post('/login', validateBody(loginSchema), ctrlWrapper( loginUser));
authRouter.post('/current', authenticate, ctrlWrapper(currentUser));
authRouter.post('/logout', authenticate, ctrlWrapper(logoutUser));
authRouter.patch('/subscription',authenticate,validateBody(subscriptionShema),ctrlWrapper(changeSubscription));


export default authRouter;