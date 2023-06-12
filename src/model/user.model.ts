import { Document } from "mongoose";
import { Schema, model } from "mongoose"
import validator from "validator"

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Invalid email")
      }
    },
  },
  firstName: String,
  lastName: String,
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  auth: {
    type: String,
  },
})

const User = model("User", userSchema)

export default User
