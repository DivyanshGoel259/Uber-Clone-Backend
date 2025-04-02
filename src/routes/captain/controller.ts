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
    res.cookie("token", data.token);
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
    res.cookie("token", data.token);
    res.json({ data });
  } catch (err) {
    next(err);
  }
};

export const getCaptainProfile = async (
  req: Request,
  res: Response<AuthResponse>,
  next: NextFunction
): Promise<void> => {
  try {
    const captainId = (req as any).userId;
    const data = await service.getCaptainProfile(captainId);
    res.json({ data });
  } catch (err) {
    next(err);
  }
};

export const logoutCaptain = async (
  req: Request,
  res: Response<AuthResponse>,
  next: NextFunction
): Promise<void> => {
  try {
    res.clearCookie("token");
    const token =
      req.cookies?.token || req.headers.authorization?.split(" ")[1];
    const data = await service.logoutCaptain(token);
    res.json({ data });
  } catch (err) {
    next(err);
  }
};
