import { Schema } from "mongoose";
import { Post } from "../models/Post";
import { User } from "../models/User";

export const postService = {
    newPost: async (text: string, userId: string) => {
        // first check list of posts text to avoid duplicate text insertion by current user.
        const post = await Post.find({ userId });
        for (let i = 0; i < post.length; i++) {
            console.log(post[i].text);
            if (post[i].text == text) return "Duplicate text.";
        }
        return await Post.create({
            userId: userId,
            text,
        });
    },
    getPosts: async () => {
        return await Post.find();
    },
    getPostsByUsername: async (username: string) => {
        return await User.findOne({ username })
            .populate("posts")
            .select("posts");
    },
    likePost: async (postId: string, userId: string) => {
        const post = await Post.findById(postId);
        let likesList: string[] | any = post?.likedBy?.toString().split(",");
        if (likesList.includes(userId)) {
            if (likesList.includes(userId)) {
                return await Post.findOneAndUpdate(
                    {
                        _id: postId,
                    },
                    {
                        $pop: { likedBy: userId },
                    },
                    { new: true }
                ).populate("likedBy", "username");
            }
        }
        return await Post.findOneAndUpdate(
            {
                _id: postId,
            },
            {
                $push: { likedBy: userId },
            },
            { new: true }
        ).populate("likedBy", "username");
    },
    updatePostById: async (
        postId: string,
        text: string,
        visible: boolean,
        userId: string
    ) => {
        return await Post.findOneAndUpdate(
            {
                _id: postId,
                userId,
            },
            {
                text,
                visible: visible ? true : false,
            },
            {
                new: true,
            }
        );
    },
    deletePostById: async (postId: string, userId: string) => {
        return await Post.findOneAndDelete(
            {
                _id: postId,
                userId,
            },
            {
                new: true,
            }
        );
    },
};
