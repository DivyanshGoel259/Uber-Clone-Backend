import { Router } from "express";
import * as controller from "./controller";
import { loginBodyValidator, registerBodyValidator } from "../libs/constants";
const authRouter = Router();

authRouter.post("/register", registerBodyValidator, controller.registerUser);
authRouter.post('/login',loginBodyValidator,controller.loginUser)

export default authRouter;
