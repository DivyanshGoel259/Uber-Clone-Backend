import { Router } from "express";
import * as controller from './controller'
import { authMiddleware } from "../../middlewares/authMiddleware";
import { captainRegisterBodyValidator } from "../../libs/constants";


const captainRouter = Router()

captainRouter.post('/register',captainRegisterBodyValidator,controller.registerCaptain)

export default captainRouter