import { body, param, query } from "express-validator";

export const usernameParam = [param("username").trim().notEmpty()];

export const postIdParam = [param("postId").trim().notEmpty()];

export const newPostBody = [
    body("text").trim().notEmpty({ ignore_whitespace: true }),
];

export const likePostQuery = [query("postId").trim().notEmpty()];
