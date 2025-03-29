"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.createUser = void 0;
const db_1 = __importDefault(require("../libs/db"));
const utils_1 = require("../libs/utils");
const createUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!payload.email || !payload.firstName || !payload.password) {
            throw new Error("All feilds are required");
        }
        const checkUser = yield db_1.default.oneOrNone(`SELECT id FROM users WHERE email=$(email)`, { email: payload.email });
        if (checkUser === null || checkUser === void 0 ? void 0 : checkUser.id) {
            throw new Error("Email Already Exists");
        }
        const hashedPassword = yield (0, utils_1.hashPassword)(payload.password);
        const user = yield db_1.default.oneOrNone(`INSERT INTO users(email,password,firstName,lastName) VALUES($(email),$(hashedPassword),$(firstName),$(lastName)) RETURNING *`, Object.assign(Object.assign({}, payload), { hashedPassword }));
        const token = yield (0, utils_1.genAuthToken)(user.id);
        return { token, user };
    }
    catch (err) {
        throw err;
    }
});
exports.createUser = createUser;
const loginUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!payload.email || !payload.password) {
            throw new Error("All feilds are required");
        }
        const user = yield db_1.default.oneOrNone(`SELECT * FROM users WHERE email=$(email)`, { email: payload.email });
        if (!user) {
            throw new Error("Invalid email or password");
        }
        const isPasswordMatched = yield (0, utils_1.bcryptCompare)(payload.password, user === null || user === void 0 ? void 0 : user.password);
        if (!isPasswordMatched) {
            throw new Error('Invalid email or password');
        }
        const token = yield (0, utils_1.genAuthToken)(user === null || user === void 0 ? void 0 : user.id);
        return { token, user };
    }
    catch (err) {
        throw err;
    }
});
exports.loginUser = loginUser;
