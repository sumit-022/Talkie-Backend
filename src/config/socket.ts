// import { auth } from "@/middlewares/auth.middleware";
import IUser from "../model/iuser.model"
import { socketAuth } from "../middlewares/socketAuth.middleware"
import { Server } from "socket.io"
// import User  from "../model/user.model";
import { Socket } from "socket.io"

interface CustomSocket extends Socket {
  user?: IUser
}

const createIOinstance = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
      credentials: true,
    },
  })

  io.use(socketAuth)

  io.on("connection", (socket: CustomSocket) => {
    // console.log("a user connected")
    socket.on("message", (message: any) => {
      const sender = socket.user?.firstName
      socket.broadcast.emit("message", { message, sender })
    })
  })

  io.on("disconnect", () => {
    console.log("user disconnected")
  })

  return io
}

export default createIOinstance
