import mongoose, { Schema } from "mongoose";
import { User } from "./User";

export interface IPost {
    _id: Schema.Types.ObjectId;
    text: string;
    visible: boolean;
    userId: Schema.Types.ObjectId;
    likedBy?: [Schema.Types.ObjectId];
}

export const PostSchema = new Schema<IPost>(
    {
        text: {
            type: Schema.Types.String,
            required: true,
            unique: true,
        },
        visible: {
            type: Schema.Types.Boolean,
            default: true,
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        likedBy: [
            {
                type: Schema.Types.ObjectId,
                ref: "User",
            },
        ],
    },
    {
        timestamps: true,
    }
);

// mongoose middlware to add post record to  posts field in User model
PostSchema.post("save", async function (doc) {
    await User.findOneAndUpdate(
        { _id: doc.userId },
        { $push: { posts: doc._id } },
        { new: true }
    );
});

export const Post = mongoose.model<IPost>("Post", PostSchema);
