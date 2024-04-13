import express from "express";
import { userController } from "../controllers/user.controller";
import { requireRole } from "../middlewares/auth.middleware";
import { UserRole } from "../utils/types";
import multer from "multer";
import {
    loginValidator,
    recoveryValidator,
    registerValidator,
    resetPwdValidator,
} from "../utils/user-validation";
import { handleValidation } from "../utils/handle-validation";
const storage = multer.diskStorage({
    destination: async (req, file, cb) => {
        await cb(null, "public/profiles/");
    },
    filename: async (req, file, cb) => {
        let fileExt = file.originalname.split(".")[1];
        //@ts-ignore
        const fileName = `${req.user._id}.${fileExt}`;
        //@ts-ignore
        req.user.profile = fileName;
        //@ts-ignore
        console.log(req.user.profile);

        await cb(null, fileName);
    },
});
const upload = multer({ storage });
const router = express.Router();

export const userRouter = router;

router.post(
    "/register",
    registerValidator,
    handleValidation,
    userController.register
);
router.post("/login", loginValidator, handleValidation, userController.login);
router.post("/logout", userController.logout);
router.post(
    "/recovery",
    recoveryValidator,
    handleValidation,
    userController.sendVerifyCodeToEmail
);
router.post(
    "/reset_password",
    resetPwdValidator,
    handleValidation,
    userController.changePassword
);
router.post(
    "/upload_profile",
    requireRole(UserRole.USER),
    upload.single("profile"),
    userController.uploadProfile
);
router.get("/posts", requireRole(UserRole.USER), userController.getUserPosts);
