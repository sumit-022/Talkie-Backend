import { Request, Response } from "express"
import validator from "validator"
import env from "../config/env"
import jwt from "jsonwebtoken"

import { fetchUser, postUser } from "../services/user.services"

export const getUser = async (req: Request, res: Response) => {
  try {
    const user = await fetchUser(req.body.email)
    if (!user) {
      return res
        .status(400)
        .json({ message: "An error occurred", data: null, error: "User does not exist" })
    }
    if (user.password !== req.body.password) {
      return res
        .status(400)
        .json({ message: "An error occurred", data: null, error: "Password is incorrect" })
    }
    const now = Date.now()
    const expiresAt = new Date(now + 7 * 24 * 60 * 60 * 1000).getTime()
    const token = jwt.sign({ id: user._id, expiresAt }, env.jwtSecret)
    // console.log(token);
    res.status(200).json({ message: "User found", data: { user, token }, error: null })
  } catch (error) {
    res.status(400).json({ message: "An error occurred", data: null, error: error.message })
  }
}

export const createUser = async (req: Request, res: Response) => {
  if (!validator.isEmail(req.body.email)) {
    return res
      .status(400)
      .json({ message: "An error occurred", data: null, error: "Email is not valid" })
  }

  if (!validator.isLength(req.body.password, { min: 6 })) {
    return res.status(400).json({
      message: "An error occurred",
      data: null,
      error: "Password should be more than 6 characters",
    })
  }

  if (req.body.confirmPassword !== req.body.password) {
    return res.status(400).json({
      message: "An error occurred",
      data: null,
      error: "Password and Confirm Password should be the same",
    })
  }

  try {
    const userExists = await fetchUser(req.body.email)
    if (userExists) {
      return res
        .status(400)
        .json({ message: "An error occurred", data: null, error: "User already exists" })
    }
    const user = postUser({
      email: req.body.email,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      password: req.body.password,
    })
    res.status(201).json({ message: "Registered successfully", data: user, error: null })
  } catch (error) {
    res.json({ message: "Invalid Email", data: null, error: null })
  }
}
