import express from "express"
import { getAllUsers, getMessagesById, getMyChatFriends, sendMessage} from "../controllers/message.controller.js";
import { protectRoute } from "../middlewares/auth.middleware.js";

const router = express.Router();


router.get("/", protectRoute, getAllUsers)
router.get("/myChats", protectRoute, getMyChatFriends);
router.post("/:id", protectRoute, sendMessage);
router.get("/:id", protectRoute, getMessagesById);



export default router;