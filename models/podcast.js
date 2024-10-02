import { Types, model } from "mongoose";
const schema = {
    title: {
        type: String,
        required: true
    },
    artist: {
        type: Types.ObjectId,
        ref: "artist"
    },
    comments: [
        {
            type: Types.ObjectId,
            ref: "comment"
        }
    ]
}

const podcastsModel = model("podcast", schema)
export default podcastsModel