import {Router} from 'express';
import { verifyJWT } from '../middlewares/auth.middlewares.js';
import { loginUser, logoutUser, registerUser } from '../controller/auth.controller.js';


const userRouter = Router();

userRouter.route("/register").post(registerUser)
userRouter.route("/login").post(loginUser)
userRouter.route('/logout').get(verifyJWT, logoutUser)


export {userRouter}