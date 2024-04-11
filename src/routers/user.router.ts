import express from "express";
import { userController } from "../controllers/user.controller";
import { requireRole } from "../middlewares/auth.middleware";
import { UserRole } from "../utils/types";
import multer from "multer";
const storage = multer.diskStorage({
    destination:async (req, file, cb) => {
        await cb(null, "public/profiles/");
    },
    filename:async (req, file, cb) => {
        let fileExt = file.originalname.split(".")[1];
        //@ts-ignore
        const fileName = `${req.user._id}.${fileExt}`;
        //@ts-ignore
        req.user.profile = fileName
        //@ts-ignore
        console.log(req.user.profile);
        
        await cb(null, fileName);
    },
});
const upload = multer({ storage });
const router = express.Router();

export const userRouter = router;

router.post("/register", userController.register);
router.post("/login", userController.login);
router.post("/logout", userController.logout);
router.post("/recovery", userController.sendVerifyCodeToEmail);
router.post("/reset_password", userController.changePassword);
router.post(
    "/upload_profile",
    requireRole(UserRole.USER),
    upload.single("profile"),
    userController.uploadProfile
);
router.get("/posts", requireRole(UserRole.USER), userController.getUserPosts);
