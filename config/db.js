import mongoose from "mongoose";
import "dotenv/config"

const url = process.env.DB_URL
const db = mongoose.connect(url)
    .then(() => console.log("db connected"))
    .catch((error) => console.error("db error =>", error.message))

export default db