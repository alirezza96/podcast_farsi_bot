export default async function mustAdmin(req, res, next) {
    const is_admin = true
    // if (req.url.startsWith("/api/podcasts")) {
    if (!is_admin) return res.status(403).json({ message: "access denied! call System Admin" })
    // }
    next()
}

