import express from "express"

import { signUp } from "../controllers/auth.controller.js";
import upload from "../middlewares/multer.middleware.js";

const router = express.Router();

router.post("/signUp", upload.single("profilePic"), signUp);




export default router;