import express from "express"
import { create, find, findById, remove } from "../controllers/podcasts.js"
const podcastsRouter = express.Router()

podcastsRouter.route("/")
    .get(find)
    .post(create)
podcastsRouter.route("/:id")
    .get(findById)
    .delete(remove)
export default podcastsRouter