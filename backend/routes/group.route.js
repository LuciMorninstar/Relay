import express from  "express"
import { adminRoute, protectRoute } from "../middlewares/auth.middleware.js";
import { addMembersToGroup, createGroup, getAllGroups } from "../controllers/group.controller.js";

import { updateGroupInfo } from "../controllers/group.controller.js";
import { addAsAdmin } from "../controllers/group.controller.js";
import { sendMessageToGroup } from "../controllers/group.controller.js";
import { getGroupMessages } from "../controllers/group.controller.js";

const router = express.Router();

router.get("/", protectRoute, adminRoute, getAllGroups);
router.post("/", protectRoute, createGroup);
router.post("sendMessage/:groupId", protectRoute, sendMessageToGroup);
router.post("/:groupId/addMembers", protectRoute, addMembersToGroup);
router.patch("/:groupId", protectRoute, updateGroupInfo);
router.patch("/:groupId/addAsAdmin", protectRoute, addAsAdmin);
router.get("/:groupId/messages", protectRoute, getGroupMessages);




export default router;
