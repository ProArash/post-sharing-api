import jwt from "jsonwebtoken";
import { UserPayload } from "./types";

export const tokenGenerator = async (payload: UserPayload) => {
    try {
        return await jwt.sign(payload, process.env.SECRET!, {
            expiresIn: "1d",
        });
    } catch (error) {
        console.log(error);
    }
};
