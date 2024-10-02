import bcrypt from "bcrypt"
import z from "zod"
import { Types } from "mongoose"
export const objectIdSchema = z.string().refine(value => Types.ObjectId.isValid(value), {
    message: "invalid objectId"
})
export const encrypt = (data) => {
    bcrypt.hash(data, 10, (err, encrypted) => {
        if (err) return console.log("err =>", err)
        console.log(encrypted)
        return encrypted
    })
}