import mongoose, { Schema, SchemaTypes } from "mongoose";

export interface IUser {
    _id: Schema.Types.ObjectId;
    name: string;
    username: string;
    password: string;
    token: string;
    email?: string;
    posts: [Schema.Types.ObjectId];
    verifyCode: string;
    profileUrl: string;
    recovery: boolean;
}

const UserSchema = new Schema<IUser>(
    {
        name: {
            type: Schema.Types.String,
        },
        username: {
            type: Schema.Types.String,
            unique: true,
        },
        password: {
            type: Schema.Types.String,
        },
        profileUrl: {
            type: String,
        },
        email: {
            type: Schema.Types.String,
        },
        posts: [
            {
                type: Schema.Types.ObjectId,
                ref: "Post",
                required: true,
            },
        ],
        token: {
            type: String,
            require: true,
        },
    },
    {
        toJSON: {
            transform: function (doc, ret) {
                delete ret.password;
            },
        },
        timestamps: true,
    }
);

export const User = mongoose.model<IUser>("User", UserSchema);
