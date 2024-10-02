import { Router } from "express";
import { create, find } from "../controllers/comments.js"
const commentsRouter = Router()

commentsRouter.route("/")
    .post(create)
    .get(find)



export default commentsRouter