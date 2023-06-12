import User from "../model/user.model"

export const fetchUser = async (email: string) => {
  const users = await User.findOne({ email })
  return users
}

export const postUser = async ({
  email,
  firstName,
  lastName,
  password,
}: {
  email: string
  firstName: string
  lastName: string
  password: string
}) => {
  try {
    const user = new User({
      email,
      firstName,
      lastName,
      password,
    })

    const response = await user.save()

    return response
  } catch (error) {
    throw new Error(error)
  }
}
