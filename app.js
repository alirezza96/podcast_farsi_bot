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
// global middlewares
app.use("/api/users", usersRouter)
// secure route  1- authenticated
app.use(mustRegistered)
app.use("/api/comments", commentsRouter)
// secure route  2- only admins
app.use(mustAdmin)
app.use("/api/podcasts", podcastsRouter)
app.use("/api/artists", artistsRouter)









app.use((req, res) => {
    res.status(404).json({ message: "page not found" })
})

app.listen(port, () => console.log("app listen on port:", port))
