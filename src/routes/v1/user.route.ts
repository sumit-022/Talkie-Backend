import { Router } from "express"

import { createUser, getUser } from "../../controllers/user.controller"

const router = Router()

router.post("/register", createUser)
router.post("/login", getUser)
export default router
