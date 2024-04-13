import { User } from "../models/User";
import bcrypt from "bcrypt";
import { tokenGenerator } from "../utils/token-generator";
import nodemailer from "nodemailer";
import { Recovery } from "../models/Recovery";

export const userService = {
    register: async (
        name: string,
        username: string,
        password: string,
        email?: string
    ) => {
        const user = await User.findOne({
            username,
        });
        if (user) {
            return `user ${username} exist.`;
        }

        const hashedPwd = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            email,
            name,
            password: hashedPwd,
            username,
        });

        const token = await tokenGenerator({
            _id: newUser._id,
            username: newUser.username,
            name: newUser.name,
        });
        //@ts-ignore
        newUser.token = token;
        await newUser.save();

        return token;
    },
    login: async (username: string, password: string) => {
        const user = await User.findOne({
            username,
        });
        if (!user) {
            return `user not found.`;
        }
        const result = await bcrypt.compare(password, user.password);
        if (!result) {
            return false;
        }
        const token = await tokenGenerator({
            _id: user._id,
            username: user.username,
            name: user.name,
        });
        //@ts-ignore
        user.token = token;
        await user.save();

        return token;
    },
    // logout: async (userId: string) => {
    //     return await Auth.findByIdAndUpdate(userId, {
    //         status: false,
    //     });
    // },
    getUserPosts: async (userId: string) => {
        return await User.findById(userId).populate("posts").select("posts");
    },
    updateUserInfo: async (userId: string, name: string, email?: string) => {
        return await User.findByIdAndUpdate(userId, {
            name,
            email,
        });
    },
    changePassword: async (email: string, password: string, code?: number) => {
        const account = await Recovery.findOne({
            email,
        });
        if (!account) {
            return "account not found.";
        }
        if (account.verifyCode != code) {
            return "invalid verification code";
        }
        const hashedPwd = await bcrypt.hash(password, 10);
        await User.findOne(
            {
                email,
            },
            {
                password: hashedPwd,
            }
        );
        return "password changed.";
    },
    sendSmsToEmail: async (email: string, code: string) => {
        const user = await User.findOne({
            email,
        });
        if (!user) {
            return "email not found";
        }
        let transporter = await nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            secure: true,
            port: 465,
            auth: {
                user: process.env.EMAIL_SENDER,
                pass: process.env.EMAIL_PASSWORD,
            },
        });
        await transporter.sendMail({
            from: `Account recovery ${process.env.EMAIL_SENDER}`,
            to: email,
            subject: "Your verification code",
            text: `verify code is: ${code}`,
        });

        await Recovery.create({
            email,
            verifyCode: code,
        });
        return email;
    },
    uploadProfile: async (userId: string, file: string) => {
        return await User.findByIdAndUpdate(
            userId,
            {
                profileUrl: file,
            },
            { new: true }
        );
    },
};
