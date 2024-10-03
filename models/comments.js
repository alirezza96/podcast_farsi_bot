import { model, Types } from "mongoose"

const schema = {
    body: {
        type: String,
        required: true
    },
    podcast_id: {
        type: Types.ObjectId,
        ref: "Podcast"
    }
}

const commentsModel = model("Comment", schema)
export default commentsModel