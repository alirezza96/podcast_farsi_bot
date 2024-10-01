import { model } from "mongoose";
const schema = {
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    }
}

const podcastsModel = model("podcast", schema)
export default podcastsModel