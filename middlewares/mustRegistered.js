import userModel from "../models/user.js"
export default async function mustRegistered(req, res, next) {
    const username = "admin"
    const user = await userModel.findOne({ username })
    // is user exists
    if (!user) return res.status(404).json({ message: "user not found" })
    next()
}