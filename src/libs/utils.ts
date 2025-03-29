import { sign } from "jsonwebtoken";
import bcrypt from "bcrypt";

const JWT_SECRET = process.env.JWT_SECRET || "divyanshgoel";

export const genAuthToken = async (id: string) => {
  const token = sign({ _id: id }, JWT_SECRET);
  return token;
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
