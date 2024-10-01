import { isValidObjectId } from "mongoose"
import userModel from "../models/user.js"
import { userSchema } from "../validators/register.js"

export const find = async (req, res) => {
    const users = await userModel.find().lean()
    if (!users.length) return res.status(404).json({ message: "users not found" })
    res.json({ data: users })
}

export const findById = async (req, res) => {
    const { id } = req.params
    if (!isValidObjectId(id)) return res.status(400).json({ message: "object id not valid!" })
    const user = await userModel.findById(id)
    if (!user) return res.status(404).json({ message: "user not found" })
    res.json({ data: user })
}


export const create = async (req, res) => {
    const {
        name,
        username,
        email,
        age,
        password
    } = req.body
    const validationResult = userSchema.safeParse(req.body)
    if (!validationResult.success) {
        return res.status(422).json({
            message: validationResult.error.errors[0].message,
            errors: validationResult.error.flatten().fieldErrors
        })
    }
    const user = await userModel.findOne({
        $or: [
            { username }, { email }
        ]
    })
    if (user) return res.status(400).json({
        message: `"${username}" already registered`
    })
    const users = await userModel.find({}).limit(1)
    const newUser = await userModel.create({ name, username, email, age, password, is_admin: !users.length })

    res.cookie("username", username)
    res
        .status(301)
        .json({
            message: "user registered",
            data: newUser
        })

}

export const remove = async (req, res) => {
    const { id } = req.params
    // is object id valid
    if (!isValidObjectId(id)) return res.status(400).json({ message: "object id not valid!" })
    // is user exists
    const user = await userModel.findByIdAndDelete(id)
    if (!user) return res.status(404).json({ message: "user not found" })
    // delete user
    res.status(200).json({ message: "user deleted" })
}