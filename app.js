import express from "express"
import "dotenv/config"
import morgan from "morgan"
import helmet from "helmet"
import path from "path"
import { fileURLToPath } from "url"
import db from "./config/db.js"
import usersRouter from "./routes/users.js"
import artistsRouter from "./routes/artists.js"
import podcastsRouter from "./routes/podcasts.js"
import commentsRouter from "./routes/comments.js"
import mustAdmin from "./middlewares/mustAdmin.js"
import mustRegistered from "./middlewares/mustRegistered.js"
import uploader from "./middlewares/multer.js"
//import cors
const port = process.env.SERVER_PORT

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
// builtin middlewares
app.use(express.json())
app.use(express.static(path.join(__dirname, "public")))
//3rdParty middlewares
app.use(helmet())
app.use(morgan("dev"))
app.use
// global middlewares
app.use("/api/users", usersRouter)
// secure route  1- authenticated
app.use((req, res, next) => {
    console.log("mustRegistered middleware Run!")
    next()
}, mustRegistered)
app.use("/api/comments", commentsRouter)
// secure route  2- only admins
app.use((req, res, next) => {
    console.log("mustAdmin middleware Run!")
    next()
}, mustAdmin)
app.use("/api/podcasts", podcastsRouter)
app.use("/api/artists", artistsRouter)

app.get("/", (req, res) => {
    const username = "alireza"
    res.json({username})
})






// page not found
app.use((req, res) => {
    res.status(404).json({ message: "page not found" })
})
// error handling
app.use((err, req, res, next) => {
    res
        .status(err.status || 500)
        .json({ message: err.message || "Internal Server Error" })
})

app.listen(port, () => console.log("app listen on port:", port))
