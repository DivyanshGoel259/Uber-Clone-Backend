import { Router } from "express";
import * as controller from "./controller";
import { registerBodyValidator } from "../libs/constants";
const authRouter = Router();

authRouter.post("/register", registerBodyValidator, controller.registerUser);

export default authRouter;
