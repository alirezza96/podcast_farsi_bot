import multer from "multer";
import path from "path"
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/")
    },
    filename: (req, file, cb) => {
        const filename = Date.now() + Math.round(Math.random() * 100)
        const ext = path.extname(file.originalname)
        const validFormats = [".jpg", ".png", "jpeg"]
        if (!validFormats.includes(ext)) return cb(new Error("only .jpg | .png | .jpg is valid"))
        cb(null, `${filename}${ext}`)
    }
})
const maxSize = 500 * 1024 //500kb

const uploader = multer({
    storage, limits: {
        fileSize: maxSize,

    }
})
export default uploader