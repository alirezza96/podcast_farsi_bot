import artistsModel from "../models/artists.js"
import artistSchema from "../validators/artist.js"
export const find = async (req, res) => {
    const artists = await artistsModel.find({}).lean()
    if (!artists.length) return res.status(404).json({ message: "artists not found" })
    res.json({ data: artists })
}

export const create = async (req, res) => {
    const { title } = req.body
    // is valid?
    const validationResult = artistSchema.safeParse({ title })
    if (!validationResult.success) return res.status(422).json({
        message: validationResult.error.errors[0].message,
        errors: validationResult.error.flatten().fieldErrors
    })
    // if not exists create
    const artist = await artistsModel.findOne({ title })
    if (artist) return res.status(402).json({
        message: "artist already exists"
    })
    const newArtist = await artistsModel.create({ title })
    res.status(302).json({
        message: "artist created",
        data: newArtist
    })
}