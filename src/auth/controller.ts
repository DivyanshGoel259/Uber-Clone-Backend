import { NextFunction, Request, Response } from "express";
import { AuthResponse } from "../types";
import { validationResult } from "express-validator";
import * as service from "./service";

export const registerUser = async (
  req: Request,
  res: Response<AuthResponse>,
  next: NextFunction
): Promise<void> => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new Error(JSON.stringify(errors.array()));
    }

    const data = await service.createUser(req.body);

    res.json({ data });
  } catch (err) {
    next(err);
  }
};


export const loginUser = async (req:Request,res:Response<AuthResponse>,next:NextFunction)=>{
    try {

        const errors = validationResult(req)
        if(!errors.isEmpty()){
            throw new Error(JSON.stringify(errors.array()))
        }

        const data = await service.loginUser(req.body)

        res.json({data})

    } catch (err){
        next(err)
    }
}