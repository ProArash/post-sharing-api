import express from "express";
import { postController } from "../controllers/post.controller";
import { requireRole } from "../middlewares/auth.middleware";
import { UserRole } from "../utils/types";
import {
    likePostQuery,
    newPostBody,
    postIdParam,
    usernameParam,
} from "../utils/post-validation";
import { handleValidation } from "../utils/handle-validation";
const router = express.Router();

export const postRouter = router;

router.get("/", requireRole(UserRole.GUEST), postController.getPosts);
router.get(
    "/:username",
    usernameParam,
    handleValidation,
    requireRole(UserRole.GUEST),
    postController.getPostsByUsername
);
router.post(
    "/",
    newPostBody,
    handleValidation,
    requireRole(UserRole.USER),
    postController.newPost
);
router.post(
    "/like",
    likePostQuery,
    handleValidation,
    requireRole(UserRole.USER),
    postController.likePost
);
router.put(
    "/:postId",
    postIdParam,
    handleValidation,
    requireRole(UserRole.USER),
    postController.updatePostById
);
router.delete(
    "/:postId",
    postIdParam,
    handleValidation,
    requireRole(UserRole.USER),
    postController.deletePostById
);
