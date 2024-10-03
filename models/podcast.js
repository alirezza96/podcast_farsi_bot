import { Types, model, Schema } from "mongoose";
const podcastSchema = Schema(
    {
        title: {
            type: String,
            required: true
        },
        artist: {
            type: Types.ObjectId,
            ref: "Artist"
        }
    }
)
podcastSchema.virtual("comments", {
    rel: "Comment",
    localField: "_id",
    foreignField: "podcast_id"
})

const podcastsModel = model("Podcast", podcastSchema)
export default podcastsModel