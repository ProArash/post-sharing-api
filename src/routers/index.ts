import express from "express";
import { userRouter } from "./user.router";
import { postRouter } from "./post.router";
import { statusRouter } from "./status.router";
const router = express.Router();

export const routes = router;

router.use("/api/user", userRouter);
router.use("/api/post", postRouter);
router.use("/api/status", statusRouter);
