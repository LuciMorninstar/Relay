import express from "express";
import { protectRoute } from "../middlewares/auth.middleware.js";
import { getCurrentUser } from "../controllers/user.controller.js";

export const router = express.Router();

router.get("/getCurrentUser", protectRoute, getCurrentUser );


export default router;