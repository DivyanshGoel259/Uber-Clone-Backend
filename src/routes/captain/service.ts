import db from "../../libs/db";
import { bcryptCompare, genAuthToken, hashPassword } from "../../libs/utils";
import { CaptainType, LocationType, TypeVehicle } from "../../types";

type RegisterCaptainArgs = Pick<
  CaptainType,
  "email" | "firstName" | "lastName" | "password"
> &
  Pick<TypeVehicle, "capacity" | "color" | "plate" | "type">;

export const registerCaptain = async (payload: RegisterCaptainArgs) => {
  try {
    if (
      !payload.firstName ||
      !payload.capacity ||
      !payload.color ||
      !payload.plate ||
      !payload.password ||
      !payload.type ||
      !payload.email
    ) {
      throw new Error("All feilds are required");
    }
    const checkUser = await db.oneOrNone(
      `SELECT id FROM captain WHERE email=$(email)`,
      { email: payload.email }
    );
    if (checkUser?.id) {
      throw new Error("Email Already Exists");
    }
    const hashedPassword = await hashPassword(payload.password);
    const vehicle = await db.oneOrNone(
      `INSERT INTO vehicle(color,plate,capacity,type) VALUES($(color),$(plate),$(capacity),$(type)) RETURNING *`,
      payload
    );

    if (!vehicle?.id) {
      throw new Error("Internal Server Error");
    }

    let captain = await db.oneOrNone(
      `INSERT INTO captain(firstName,lastName,email,password,vehicleId) VALUES($(firstName),$(lastName),$(email),$(hashedPassword),$(vehicleId)) RETURNING *`,
      { ...payload, vehicleId: vehicle.id, hashedPassword }
    );
    if (!captain?.id) {
      throw new Error("Internal Server Error");
    }
    captain = { ...captain, vehicle };
    const token = await genAuthToken(captain.id);

    return { token, captain };
  } catch (err) {
    throw err;
  }
};

export const loginCaptain = async (
  payload: Pick<CaptainType, "email" | "password">
) => {
  try {
    if (!payload.email || !payload.password) {
      throw new Error("All feilds are required");
    }

    let captain = await db.oneOrNone(
      `SELECT captain.*,vehicle.* FROM captain INNER JOIN vehicle ON captain.vehicleId=vehicle.id WHERE captain.email=$(email)`,
      { email: payload.email }
    );
    if (!captain) {
      throw new Error("Invalid email or password");
    }

    const isPasswordMatched = await bcryptCompare(
      payload.password,
      captain?.password
    );

    if (!isPasswordMatched) {
      throw new Error("Invalid email or password");
    }

    captain = {
      id: captain.id,
      firstName: captain.firstname,
      lastName: captain.lastname,
      email: captain.email,
      password: captain.password,
      socketId: captain.socketid,
      vehicleId: captain.vehicleid,
      locationId: captain.locationid,
      status: captain.status,
      createdAt: captain.createdat,
      updatedAt: captain.updatedat,
      vehicle: {
        id: captain.vehicleid,
        type: captain.type,
        plate: captain.plate,
        color: captain.color,
        capacity: captain.capacity,
      },
    };

    const token = await genAuthToken(captain?.id);
    return { token, captain };
  } catch (err) {
    throw err;
  }
};
