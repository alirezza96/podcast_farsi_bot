import z from "zod"
import { objectIdSchema } from "../utils/helper.js"
const schema = {
    body: z
        .string()
        .trim(),
    podcastId: objectIdSchema
}

const commentValidator = z.object(schema).strict()
export default commentValidator