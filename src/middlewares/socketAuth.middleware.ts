import jwt from "jsonwebtoken"
import env from "../config/env"
import User, {} from "../model/user.model"
import { Socket } from "socket.io"
import IUser from "../model/iuser.model"

interface CustomSocket extends Socket {
    user?: IUser
}

export const socketAuth = async (socket: CustomSocket, next) => {
    try {
        const token = socket.handshake.auth.token
        const decoded: any = jwt.verify(token, env.jwtSecret)
    
        const user = await User.findById(decoded.id)
        if (!user) {
        throw new Error()
        }
        socket.user = user;
        next()
    } catch (error) {
        next(new Error("Please authenticate."))
    }
    }