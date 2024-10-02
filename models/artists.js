import { model } from "mongoose"
const schema = {
    title: {
        type: String,
        required: true
    }
}

const artistsModel = model("artist", schema)
export default artistsModel