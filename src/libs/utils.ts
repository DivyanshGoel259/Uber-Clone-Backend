import { sign } from "jsonwebtoken";
import bcrypt from "bcrypt";
import { redisClient } from "./redis";

const JWT_SECRET = process.env.JWT_SECRET || "divyanshgoel";

export const genAuthToken = async (id: string) => {
  try {
    let client = await redisClient();
    if (!client) {
      throw new Error("Internal server error");
    }
    const token = sign({ _id: id }, JWT_SECRET, { expiresIn: "24hr" });
    client.set(`jwt-${token}`, JSON.stringify({ createdAt: Date.now() }), {
      EX: 86400,
    });
    return token;
  } catch (err) {
    throw err;
  }
};

export const bcryptCompare = async (
  password: string,
  encryptedPassword: string
) => {
  return await bcrypt.compare(password, encryptedPassword);
};

export const hashPassword = async (password: string) => {
  return await bcrypt.hash(password, 10);
};
