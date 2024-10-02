import { model } from "mongoose"

const schema = {
    body: {
        type: String,
        required: true
    }
}

const commentsModel = model("comment", schema)
export default commentsModel