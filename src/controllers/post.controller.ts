import { Request, Response } from "express";
import { postService } from "../services/post.service";

export const postController = {
    newPost: async (req: Request, res: Response) => {
        try {
            const { text } = req.body;
            //@ts-ignore
            const userId = req.user._id;
            const post = await postService.newPost(text, userId);
            res.status(200).json({
                data: post,
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                data: "Internal error.",
            });
        }
    },
    getPosts: async (req: Request, res: Response) => {
        try {
            //@ts-ignore
            const posts = await postService.getPosts(req.user._id);
            res.status(200).json({
                data: posts,
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                data: "Internal error.",
            });
        }
    },
    likePost: async (req: Request, res: Response) => {
        try {
            const { postId } = req.query;
            //@ts-ignore
            const userId = req.user._id;
            const likedPost = await postService.likePost(
                String(postId),
                String(userId)
            );
            res.status(200).json({
                data: likedPost,
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                data: "Internal error.",
            });
        }
    },
    getPostsByUsername: async (req: Request, res: Response) => {
        try {
            const { username } = req.params;
            console.log(username);
            const posts = await postService.getPostsByUsername(username);
            res.status(200).json({
                data: posts,
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                data: "Internal error.",
            });
        }
    },
    updatePostById: async (req: Request, res: Response) => {
        try {
            //@ts-ignore
            const userId = req.user._id;
            const { postId } = req.params;
            const { text, visible } = req.body;
            console.log(userId);
            const post = await postService.updatePostById(
                postId,
                text,
                visible,
                userId
            );
            res.status(200).json({
                data: post,
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                data: "Internal error.",
            });
        }
    },
    deletePostById: async (req: Request, res: Response) => {
        try {
            const { postId } = req.params;
            //@ts-ignore
            const userId = req.user._id;
            const deletedPost = await postService.deletePostById(
                postId,
                userId
            );
            res.status(200).json({
                data: deletedPost,
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                data: "Internal error.",
            });
        }
    },
};
