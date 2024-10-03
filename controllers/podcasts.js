import { isValidObjectId } from "mongoose"
import podcastsModel from "../models/podcast.js"
import commentsModel from "../models/comments.js"
import podcastSchema from "../validators/podcast.js"

export const find = async (req, res) => {
    const podcasts = await podcastsModel
        .find({})
        .populate("artist", "title -_id")
        .select("title")
    if (!podcasts.length) return res.status(404).json({ message: "podcasts not found" })
    res.json({ data: podcasts })
}

export const findByTitle = async (req, res) => {
    const { id: title } = req.params
    const podcast = await podcastsModel.findOne({ title })
        .populate("artist", "-__v -_id")
        .select("title")
        .lean()
    if (!podcast) return res.status(404).json({ message: "podcast not found" })
    const comments = await commentsModel.find({ podcast_id: podcast._id }).select("body")
    res.json({ data: { ...podcast, comments } })
}

export const create = async (req, res) => {
    // is valid
    const { title, artistId } = req.body
    const validationResult = podcastSchema.safeParse({ title, artistId })
    if (!validationResult.success) return res.status(400).json({
        message: validationResult.error.errors[0].message,
        errors: validationResult.error.flatten().fieldErrors
    })
    // is not exits
    const podcast = await podcastsModel.findOne({
        $and: [
            { title }, { artistId }
        ]
    })
    if (podcast) return res.status(401).json({ message: "podcast with this title and artist already exists" })
    const newPodcast = await podcastsModel.create({ title, artist: artistId })
    res.status(301).json({ message: "podcast created", data: newPodcast })
}
//   /:id
export const update = async (req, res) => {
    const { id } = req.params
    if (!isValidObjectId(id)) return res
        .status(400)
        .json({
            message: "objectId not valid"
        })
    const { title, artistId } = req.body
    const validationResult = podcastSchema.safeParse({ title, artistId })
    if (!validationResult.success) return res
        .status(400)
        .json({
            message: validationResult.error.errors[0].message,
            errors: validationResult.error.flatten().fieldErrors
        })
    try {

        const podcast = await podcastsModel.findByIdAndUpdate(id, {
            $set: {
                title,
                artist: artistId
            },
        },
            { new: true }
        )
        if (!podcast) return res.status(404).json({
            message: "podcast not found"
        })
        res
            .status(200)
            .json({
                message: "podcast edited",
                data: podcast
            })
    } catch (error) {
        res.status(500).json({
            message: "server error",
            error: error.message
        })
    }
}

export const remove = async (req, res) => {
    const { id } = req.params
    // check to object id is valid?
    if (!isValidObjectId(id)) return res.status(400).json({ message: "object id is not valid" })
    // if podcast exists deleted
    const podcast = await podcastsModel.findByIdAndDelete(id)
    if (!podcast) return res.status(404).json({ message: "podcast not found" })
    res.json({ message: "podcast deleted" })
}