"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginBodyValidator = exports.registerBodyValidator = void 0;
const express_validator_1 = require("express-validator");
exports.registerBodyValidator = [
    (0, express_validator_1.body)("email").isEmail().withMessage("Invalid Email"),
    (0, express_validator_1.body)("firstName")
        .isLength({ min: 3 })
        .withMessage("first name must be atleast 3 characters long"),
    (0, express_validator_1.body)("password")
        .isLength({ min: 6 })
        .withMessage("password must be atleast 6 character long"),
];
exports.loginBodyValidator = [
    (0, express_validator_1.body)("email").isEmail().withMessage("Invalid Email"),
    (0, express_validator_1.body)("password")
        .isLength({ min: 6 })
        .withMessage("password must be atleast 6 character long"),
];
