import { NextFunction } from "express";
import { AuthResponse } from "../../types";
import { Request, Response } from "express";
import { validationResult } from "express-validator";
import * as service from "./service";

export const registerCaptain = async (
  req: Request,
  res: Response<AuthResponse>,
  next: NextFunction
): Promise<void> => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new Error(JSON.stringify(errors.array()));
    }
    const data = await service.registerCaptain(req.body);
    res.json({ data });
  } catch (err) {
    next(err);
  }
};

export const loginCaptain = async (
  req: Request,
  res: Response<AuthResponse>,
  next: NextFunction
): Promise<void> => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new Error(JSON.stringify(errors.array()));
    }
    const data = await service.loginCaptain(req.body);
    res.json({ data });
  } catch (err) {
    next(err);
  }
};
