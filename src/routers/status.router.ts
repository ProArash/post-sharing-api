import express from "express";
import { statusController } from "../controllers/status.controller";
const router = express.Router();

export const statusRouter = router;

router.get("/", statusController.checkStatus);
