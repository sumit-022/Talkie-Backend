import { Router } from "express"

import dataRouter from "./v1/data.route"
import userRouter from "./v1/user.route"
import { auth } from "../middlewares/auth.middleware"

const router = Router()

router.use("/test", (req, res) => {
  res.status(200).json({ message: "Test route", data: null, error: null })
})

router.use("/data", dataRouter)
router.use("/user", userRouter)
router.use("/auth", auth, (req, res) => {
  res.status(200).json({ message: "Authenticated", data: req.body.user, error: null })
})

export default router
