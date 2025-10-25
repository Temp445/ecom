import mongoose, { model, models } from "mongoose"

const ProductSchema = new mongoose.Schema({

    name:{ type: String, required: true, unique: true, trim: true },
    pathUrl: {type: String, required: true, unique: true, trim: true},
    description:{type: String, required: true},
    thumbnail: { type: String },
    images:[{type: String}],
    price:{ type: Number, required: true},
    discountPrice: { type: Number },
    stock: {type: Number, required: true},
    model: {type: String},
    brand: {type: String},
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true,
    },
},
 { timestamps: true }
)

const Product = models.Product || model("Product", ProductSchema);

export default Product