import mongoose, { model, models } from "mongoose"

const reviewSchema = new mongoose.Schema ({

    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title:{type: String},
    description:{ type: String, required: true},
    rating:{type: Number,  default: 1},
    images: [ {type: String} ]

})

const Review = models.Review || model("Review", reviewSchema)

export default Review