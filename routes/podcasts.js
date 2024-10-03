import express from "express"
import { create, find, findByTitle, remove, update } from "../controllers/podcasts.js"
const podcastsRouter = express.Router()

podcastsRouter.route("/")
    .get(find)
    .post(create)
podcastsRouter.route("/:id")
    .get(findByTitle)
    .put(update)
    .delete(remove)

export default podcastsRouter