import { Router } from "express"
import {find,create} from "../controllers/artists.js"
const artistsRouter = Router()

artistsRouter.route("/")
    .get(find)
    .post(create)

export default artistsRouter

