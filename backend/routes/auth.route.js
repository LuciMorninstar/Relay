import express from "express"

import { logout, refreshToken, signIn, signUp } from "../controllers/auth.controller.js";
import upload from "../middlewares/multer.middleware.js";

const router = express.Router();

router.post("/signUp", upload.single("profilePic"), signUp);
router.post("/signIn", signIn);
router.post("/logout", logout);
router.post("/refresh_refresh_token", refreshToken);




export default router;