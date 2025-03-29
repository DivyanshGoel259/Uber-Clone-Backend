import pgPromise from "pg-promise";
import { DATABASE_URL, NODE_ENV } from "./env";
// const DATABASE_URL = process.env.DATABASE_URL
// const NODE_ENV = process.env.NODE_ENV

const pgp = pgPromise();

const dbconfig = {
  connectionString: DATABASE_URL,
  ssl: NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
};

const db = pgp(dbconfig);

export default db;
