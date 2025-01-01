import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middlewares.js";
import {
    loginUser,
    logoutUser,
    registerUser,
} from "../controller/auth.controller.js";

const userRouter = Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/logout", verifyJWT, logoutUser);

export { userRouter };
