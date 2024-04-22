import express from "express"
import { sendMessage } from "../controllers/messages.controller.js"
import protectRoute from "../middleware/authUser.middleware.js"
const router=express.Router()
router.post("/:id",protectRoute,sendMessage)
export default router
