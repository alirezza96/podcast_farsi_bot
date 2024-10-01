import express from "express"

import { find, findById, create, remove } from "../controllers/users.js"
const usersRouter = express.Router()

usersRouter.route("/")
    .get(find)
    .post(create)

usersRouter.route("/:id")
    .get(findById)
    .delete(remove)

export default usersRouter