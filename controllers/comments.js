import commentValidator from "../validators/comment.js"
import commentsModel from "../models/comments.js"
import podcastsModel from "../models/podcast.js"
export const create = async (req, res) => {
    const { body, podcastId } = req.body
    // validation 
    const validationResult = commentValidator.safeParse({body, podcastId})
    console.log("validation result =>", typeof(podcastId), podcastId)
    if (!validationResult.success) return res.status(402).json({
        message: validationResult.error.errors[0].message,
        errors: validationResult.error.flatten().fieldErrors
    })
    const newComment = await commentsModel.create({body})
    const updatePodcast = await podcastsModel.findByIdAndUpdate(podcastId, {
        $push: {
            comments: newComment._id
        }
    })
    res.status(301).json({
        message: "comment sent",
        data: newComment
    })
}


export const find = async (req, res) => {
    const comments = await commentsModel.find({}).lean()
    if (!comments.length) return res.status(404).json({ message: "comments not found" })
    res.json({ data: comments })
}