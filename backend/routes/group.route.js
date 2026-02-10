import express from  "express"
import { adminRoute, protectRoute } from "../middlewares/auth.middleware.js";
import { addMembersToGroup, createGroup, getAllGroups } from "../controllers/groupMessage.controller.js";

const router = express.Router();

router.get("/", protectRoute, adminRoute, getAllGroups);
router.post("/", protectRoute, createGroup);
router.post("/:groupId/addMembers", protectRoute, addMembersToGroup);




export default router;
