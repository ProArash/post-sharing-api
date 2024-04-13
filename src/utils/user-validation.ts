import { body } from "express-validator";

export const registerValidator = [
    body("name").trim().notEmpty({ ignore_whitespace: true }),
    body("username").trim().notEmpty({ ignore_whitespace: true }),
    body("password").trim().notEmpty({ ignore_whitespace: true }),
];

export const loginValidator = [
    body("username").trim().notEmpty({ ignore_whitespace: true }),
    body("password").notEmpty({ ignore_whitespace: true }),
];

export const recoveryValidator = [
    body("email").notEmpty({ ignore_whitespace: true }),
];

export const resetPwdValidator = [
    body("code").notEmpty({ ignore_whitespace: true }),
    body("email").notEmpty({ ignore_whitespace: true }),
    body("password").notEmpty({ ignore_whitespace: true }),
];
