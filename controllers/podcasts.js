import { isValidObjectId } from "mongoose"
import podcastsModel from "../models/podcast.js"
import podcastSchema from "../validators/podcast.js"


export const find = async (req, res) => {
    const podcasts = await podcastsModel.find({})
    if (!podcasts.length) return res.status(404).json({ message: "podcasts not found" })
    res.json({ data: podcasts })
}

export const findById = async (req, res) => {
    const { id } = req.params
    if (!isValidObjectId(id)) return res.status(400).json({ message: "object id is not valid" })
    const podcast = await podcastsModel.findById(id)
    if (!podcast) return res.status(404).json({ message: "podcast not found" })
    res.json({ data: podcast })
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
    const newPodcast = await podcastsModel.create({ title, artistId })
    res.status(301).json({ message: "podcast created", data: newPodcast })
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