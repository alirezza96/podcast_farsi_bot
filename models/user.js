import { model } from "mongoose";
const schema = {
    name: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 15
    },
    username: {
        type: String,
        required: true,
        minLength: 5,
        maxLength: 15
    },
    email: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        min: 18
    },
    password: {
        type: String,
        minLength: 5,
        maxLength: 15
    },
    is_admin: {
        type: Boolean,
        default: false
    },
    is_ban: {
        type: Boolean,
        default: false
    }
}
const userModel = model("user", schema)

export default userModel