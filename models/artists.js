import { model } from "mongoose"
const schema = {
    title: {
        type: String,
        required: true
    }
}

const artistsModel = model("Artist", schema)
export default artistsModel