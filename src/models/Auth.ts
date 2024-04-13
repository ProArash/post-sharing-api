import mongoose, { Schema, SchemaTypes } from "mongoose";
import { User } from "./User";

export interface IAuth {
    userId: Schema.Types.ObjectId;
    status: Boolean;
    token: string;
}

const AuthSchema = new Schema<IAuth>({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    token: {
        type: String,
        required: true,
    },
    status: {
        type: Boolean,
        default: true,
    },
});

AuthSchema.post("save", async function (doc) {
    await User.findOneAndUpdate(
        { _id: doc.userId },
        { $set: { authId: doc._id } },
        { new: true }
    );
});

export const Auth = mongoose.model<IAuth>("Auth", AuthSchema);
