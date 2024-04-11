import { Schema } from "mongoose";

export interface UserPayload {
    _id: Schema.Types.ObjectId;
    username: string;
    name: string;
}
export enum UserRole {
    USER,
    GUEST,
}
