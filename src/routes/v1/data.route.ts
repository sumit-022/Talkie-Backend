import { Router } from "express"

import { getAllData } from "../../controllers/data.controller"

const router = Router()

/* Read */
router.route("/").get(getAllData)

export default router
