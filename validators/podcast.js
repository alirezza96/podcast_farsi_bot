import z from "zod"
import { objectIdSchema } from "../utils/helper.js"

const schema = {
    title: z
        .string()
        .trim()
        .min(3)
        .max(40)
    , artistId: objectIdSchema
}

const podcastSchema = z.object(schema).strict()
export default podcastSchema