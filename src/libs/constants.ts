import { body } from "express-validator";

export const registerBodyValidator = [
  body("email").isEmail().withMessage("Invalid Email"),
  body("firstName")
    .isLength({ min: 3 })
    .withMessage("first name must be atleast 3 characters long"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("password must be atleast 6 character long"),
];

export const loginBodyValidator = [
  body("email").isEmail().withMessage("Invalid Email"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("password must be atleast 6 character long"),
];

export const captainRegisterBodyValidator = [
  body("email").isEmail().withMessage("Invalid Email"),
  body("firstName")
    .isLength({ min: 3 })
    .withMessage("first name must be atleast 3 characters long"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("password must be atleast 6 character long"),
  body("color")
    .isLength({ min: 3 })
    .withMessage("Color must be atleast 3 characters long"),
  body("plate")
    .isLength({ min: 3 })
    .withMessage("Plate must be atleast 3 characters long"),
  body("capacity")
    .isLength({ min: 1 })
    .withMessage("Capacity must be atleast 1"),
  body("type")
    .isIn(["motorcycle", "auto", "car"])
    .withMessage("Invalid vehicle type"),
];
