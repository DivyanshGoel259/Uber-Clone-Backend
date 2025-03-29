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
