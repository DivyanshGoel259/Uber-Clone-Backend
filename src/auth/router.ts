import { Router } from "express";
import * as controller from "./controller";
import { loginBodyValidator, registerBodyValidator } from "../libs/constants";
import { authMiddleware } from "../middlewares/authMiddleware";
const authRouter = Router();

authRouter.post("/register", registerBodyValidator, controller.registerUser);
authRouter.post('/login',loginBodyValidator,controller.loginUser)
authRouter.get('/user/profile',authMiddleware,controller.getUserProfile)

export default authRouter;
