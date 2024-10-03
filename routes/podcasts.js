import express from "express"
import { create, find, findById, remove, update } from "../controllers/podcasts.js"
const podcastsRouter = express.Router()

podcastsRouter.route("/")
    .get(find)
    .post(create)
podcastsRouter.route("/:id")
    .get(findById)
    .put(update)
    .delete(remove)

export default podcastsRouter