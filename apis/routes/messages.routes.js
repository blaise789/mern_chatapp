import express from "express"
import { getMessages, sendMessage } from "../controllers/messages.controller.js"
import protectRoute from "../middleware/authUser.middleware.js"
const router=express.Router()
router.post("/:id",protectRoute,sendMessage)
router.get("/:id",protectRoute,getMessages)
export default router
