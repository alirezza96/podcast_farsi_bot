import userModel from "../models/user.js"

export default async function podcasts(req, res, next) {
    const username = "locaxion"
    if (req.url.startsWith("/api/podcasts")) {
        const user = await userModel.findOne({ username })
        // is user exists
        if (!user) return res.status(404).json({ message: "user not found" })
        // if is not admin return
        if (!user.is_admin) return res.status(403).json({ message: "access denied" })
        next()
    }
}

