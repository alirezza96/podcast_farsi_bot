import express from "express"
import "dotenv/config"
import db from "./config/db.js"
import userModel from "./models/user.js"
import { userSchema } from "./validators/register.js"
import { isValidObjectId } from "mongoose"
const app = express()
app.use(express.json())
const port = process.env.SERVER_PORT
app.listen(port, () => console.log("app listen on port:", port))
const courses = [
    {
        id: 1,
        title: "react"
    },
    {
        id: 2,
        title: "next"
    },
    {
        id: 3,
        title: "node"
    },
    {
        id: 4,
        title: "js"
    },
]

app.get("/courses", (req, res) => {
    res.send(courses)
})
app.get("/courses/:title", (req, res) => {
    const { title } = req.params
    const course = courses.find(course => course.title == title)
    if (!course) res.send("course not found")
    res.send(course)
})
app.post("/course", (req, res) => {

    console.log("course created successfully =>", req.body)
    res.json(req.body)
})





app.post("/user", async (req, res) => {
    const {
        name,
        username,
        email,
        age,
        password
    } = req.body
    const validationResult = userSchema.safeParse(req.body)
    if (!validationResult.success) {
        return res.status(422).json({
            message: validationResult.error.errors[0].message,
            errors: validationResult.error.flatten().fieldErrors
        })
    }
    console.log(email)
    const user = await userModel.findOne({
        $or: [
            { username }, { email }
        ]
    })
    if (user) return res.status(400).json({
        message: `"${username}" already registered`
    })
    const newUser = await userModel.create({ name, username, email, age, password })
    res.status(301).json({
        message: "user registered"
    })
})

// delete user
app.delete("/user/:id", async (req, res) => {
    const { id } = req.params
    // is object id valid
    if (!isValidObjectId(id)) return res.status(400).json({ message: "object id not valid!" })
    // is user exists
    const user = await userModel.findByIdAndDelete(id)
    if (!user) return res.status(404).json({ message: "user not found" })
    // delete user
    res.status(200).json({ message: "user deleted" })
})