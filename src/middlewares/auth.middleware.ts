import { NextFunction, Request, Response } from "express";
import { UserPayload, UserRole } from "../utils/types";
import jwt from "jsonwebtoken";

export const requireRole = (role: UserRole) => {
    let roles: UserRole[] = [];
    switch (role) {
        case UserRole.USER:
            roles.push(UserRole.USER);
        case UserRole.GUEST:
            roles.push(UserRole.GUEST);
    }

    return async (req: Request, res: Response, next: NextFunction) => {
        const authHeader = req.headers["authorization"];
        if (!authHeader || !authHeader.includes("Bearer "))
            return res.status(401).json({
                data: "auth header is missing.",
            });
        const token = authHeader.split(" ")[1];
        try {
            const result = (await jwt.verify(
                token,
                process.env.SECRET!
            )) as UserPayload;
            //@ts-ignore
            req.user = result;
            next();
        } catch (error) {
            return res.status(403).json({
                data: "invalid token.",
            });
        }
    };
};
