import { Request, Response } from "express";
import { userService } from "../services/user.service";

export const userController = {
    register: async (req: Request, res: Response) => {
        try {
            const { username, name, password, email } = req.body;
            const user = await userService.register(
                name,
                username,
                password,
                email
            );
            res.cookie(process.env.COOKIE_NAME!, `Bearer ${user}`);
            res.status(200).json({
                data: { token: user },
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                data: "Internal error.",
            });
        }
    },
    login: async (req: Request, res: Response) => {
        try {
            const { username, password } = req.body;
            const result = await userService.login(username, password);
            if (!result)
                return res.status(403).json({
                    data: "wrong password.",
                });
            res.cookie(process.env.COOKIE_NAME!, `Bearer ${result}`);
            res.status(200).json({
                data: { token: result },
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                data: "Internal error.",
            });
        }
    },
    logout: async (req: Request, res: Response) => {
        try {
            res.clearCookie(process.env.COOKIE_NAME!);
            res.status(200).json({
                data: "logged out.",
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                data: "Internal error.",
            });
        }
    },
    getUserPosts: async (req: Request, res: Response) => {
        try {
            //@ts-ignore
            const userId = req.user._id;
            const posts = await userService.getUserPosts(userId);
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
    sendVerifyCodeToEmail: async (req: Request, res: Response) => {
        try {
            const { email } = req.body;
            let min = 1000;
            let max = 9999;
            const code = Math.floor(Math.random() * (max - min + 1) + min);
            console.log(code);
            const mail = await userService.sendSmsToEmail(email, String(code));
            res.status(200).json({
                data: mail,
                message: "email sent",
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                data: "Internal error.",
            });
        }
    },
    changePassword: async (req: Request, res: Response) => {
        try {
            const { code, email, password } = req.body;
            const user = await userService.changePassword(
                email,
                password,
                code
            );
            res.status(200).json({
                data: user,
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                data: "Internal error.",
            });
        }
    },
    uploadProfile: async (req: Request, res: Response) => {
        try {
            //@ts-ignore
            const fileName = req.user.profile;
            //@ts-ignore
            const userId = req.user._id;
            const upload = await userService.uploadProfile(userId, fileName);
            res.status(200).json({
                data: upload,
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                data: "Internal error.",
            });
        }
    },
};
