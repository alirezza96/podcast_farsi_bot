import z from "zod"

const schema = {
    title: z
        .string()
        .trim()
        .min(3)
        .max(40)
    , author: z
        .string()
        .trim()
        .min(3)
        .max(20)
}

const podcastSchema = z.object(schema).strict()
export default podcastSchema