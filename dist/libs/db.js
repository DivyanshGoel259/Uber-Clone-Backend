"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_promise_1 = __importDefault(require("pg-promise"));
const env_1 = require("./env");
// const DATABASE_URL = process.env.DATABASE_URL
// const NODE_ENV = process.env.NODE_ENV
const pgp = (0, pg_promise_1.default)();
const dbconfig = {
    connectionString: env_1.DATABASE_URL,
    ssl: env_1.NODE_ENV === "production" ? { rejectUnauthorized: false } : false
};
const db = pgp(dbconfig);
exports.default = db;
