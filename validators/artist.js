import z from "zod"

const schema = {
    title: z
        .string()
        .trim()
        .min(5)
        .max(15)
}

const artistSchema = z.object(schema).strict()
export default artistSchema