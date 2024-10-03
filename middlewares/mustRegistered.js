import userModel from "../models/user.js"
export default async function mustRegistered(req, res, next) {
    const username = "admin"
    if (!username) return res.status(400).json({ message: "you must login" })
    const user = await userModel.findOne({ username })
    // is user exists
    if (!user) return res.status(404).json({ message: "access denied! please login again" })
    if (user.is_ban) return res.status(400).json({ message: "access denied! call System Admin" })
    next()
}