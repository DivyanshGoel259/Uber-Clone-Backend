import db from "../libs/db";
import { genAuthToken, hashPassword } from "../libs/utils";
import { UserType } from "../types";

export const createUser = async (
  payload: Pick<UserType, "firstName" | "email" | "lastName" | "password">
) => {
  try {
    if (!payload.email || !payload.firstName || !payload.password) {
      throw new Error("All feilds are required");
    }
    const checkUser = await db.oneOrNone(
      `SELECT id FROM users WHERE email=$(email)`,
      { email: payload.email }
    );
    if (checkUser?.id) {
      throw new Error("Email Already Exists");
    }

    const hashedPassword = await hashPassword(payload.password);
    const user = await db.oneOrNone(
      `INSERT INTO users(email,password,firstName,lastName) VALUES($(email),$(hashedPassword),$(firstName),$(lastName)) RETURNING *`,
      { ...payload, hashedPassword }
    );

    const token = await genAuthToken(user.id);

    return { token, user };
  } catch (err) {
    throw err;
  }
};
