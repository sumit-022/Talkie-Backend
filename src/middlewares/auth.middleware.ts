//jsonwebtoken
import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"
import env from "../config/env"
import User from "../model/user.model"

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header("Authorization")!.replace("Bearer ", "")
    const decoded: any = jwt.verify(token, env.jwtSecret)

    const user = await User.findById(decoded.id)
    if (!user) {
      throw new Error()
    }
    req.body.user = user
    req.body.token = token
    next()
  } catch (error) {
    res.status(401).send({ error: "Please authenticate." })
  }
}
