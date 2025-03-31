import { Router } from "express";
import * as controller from "./controller";
import { authMiddleware } from "../../middlewares/authMiddleware";
import {
  captainRegisterBodyValidator,
  loginBodyValidator,
} from "../../libs/constants";

const captainRouter = Router();

captainRouter.post(
  "/register",
  captainRegisterBodyValidator,
  controller.registerCaptain
);
captainRouter.post("/login", loginBodyValidator, controller.loginCaptain);

export default captainRouter;
