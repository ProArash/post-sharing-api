import express from "express";
import { postController } from "../controllers/post.controller";
import { requireRole } from "../middlewares/auth.middleware";
import { UserRole } from "../utils/types";
const router = express.Router();

export const postRouter = router;

router.get("/", requireRole(UserRole.GUEST), postController.getPosts);
router.get(
    "/:username",
    requireRole(UserRole.GUEST),
    postController.getPostsByUsername
);
router.post("/", requireRole(UserRole.USER), postController.newPost);
router.post("/like", requireRole(UserRole.USER), postController.likePost);
router.put(
    "/:postId",
    requireRole(UserRole.USER),
    postController.updatePostById
);
router.delete(
    "/:postId",
    requireRole(UserRole.USER),
    postController.deletePostById
);
