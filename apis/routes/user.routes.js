import express from "express"
import protectRoute from "../middleware/authUser.middleware.js"
import { getUserForSideBar } from "../controllers/user.controller.js"
const router=express.Router()
router.get("/",protectRoute,getUserForSideBar)
export default router