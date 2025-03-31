import db from "../../libs/db";
import { redisClient } from "../../libs/redis";
import { bcryptCompare, genAuthToken, hashPassword } from "../../libs/utils";
import { UserType } from "../../types";

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


    if(!user?.id){
      throw new Error("Internal Server Error")
    }

    const token = await genAuthToken(user.id);

    return { token, user };
  } catch (err) {
    throw err;
  }
};

export const loginUser = async (
  payload: Pick<UserType, "email" | "password">
) => {
  try {
    if (!payload.email || !payload.password) {
      throw new Error("All feilds are required");
    }

    const user = await db.oneOrNone(
      `SELECT * FROM users WHERE email=$(email)`,
      { email: payload.email }
    );
    if (!user) {
      throw new Error("Invalid email or password");
    }

    const isPasswordMatched = await bcryptCompare(
      payload.password,
      user?.password
    );

    if (!isPasswordMatched) {
      throw new Error("Invalid email or password");
    }

    const token = await genAuthToken(user?.id);
    return { token, user };
  } catch (err) {
    throw err;
  }
};

export const getUserProfile = async (userId: string) => {
  try {
    const user = await db.oneOrNone(
      `SELECT email,firstName,lastName,id,createdAt,updatedAt FROM users where id=$(userId)`,
      { userId }
    );
    if (!user) {
      throw new Error("Something went wrong");
    }

    return user;
  } catch (err) {
    throw err;
  }
};

export const logoutUser = async (token: string) => {
  try {
    const client = await redisClient();
    if (!client) {
      throw new Error("Internal server error");
    }
    const expiredToken = await client.del(`jwt-${token}`);

    if (!expiredToken) {
      throw new Error(`You are not unauthorized`);
    }

    return "Logged out successfully";
  } catch (err) {
    throw err;
  }
};
