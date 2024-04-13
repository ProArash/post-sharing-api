import mongoose, { Schema } from "mongoose";

interface IRecovery {
    verifyCode: number;
    createdAt: Date;
    email: string;
}

const RecoverySchema = new Schema<IRecovery>({
    email: {
        type: String,
    },
    verifyCode: {
        type: Number,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: "10m",
    },
});

export const Recovery = mongoose.model<IRecovery>("Recovery", RecoverySchema);
