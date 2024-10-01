import express from "express"
import "dotenv/config"
import db from "./config/db.js"
import usersRouter from "./routes/users.js"
import podcastsRouter from "./routes/podcasts.js"
import podcasts from "./middlewares/podcasts.js"
const port = process.env.SERVER_PORT

const app = express()
app.use(express.json())
app.use(podcasts)
app.use("/api/users", usersRouter)
app.use("/api/podcasts", podcastsRouter)
app.listen(port, () => console.log("app listen on port:", port))


