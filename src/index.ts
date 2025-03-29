import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRouter from "./auth/router";

dotenv.config();
const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());

app.use(express.json());

app.use("/api/v1/auth", authRouter);

app.use((err: Error, req: Request, res: Response) => {
  res.status(400).json({
    error: {
      message: err.message || "something went wrong",
    },
  });
});

app.get("/", (req: Request, res: Response) => {
  res.json("Hello world");
});

app.listen(PORT, () => {
  console.log("Server running on port" + PORT);
});
