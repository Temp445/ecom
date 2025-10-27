import mongoose, { model, models } from "mongoose";

const userSchema = new mongoose.Schema({

    firstName: {type: String, required: true, trim: true},
    lastName: {type: String},
    email: {type: String, required: true, lowercase: true, unique: true},
    phone: {type: Number},
    password: { type: String, required: true, minlength: 6 },
    role: { type: String, enum: ["customer", "admin"], default: "customer" },
    resetPasswordToken: {type: String},
    resetPasswordExpire: Date,
},
{ timestamps: true }
)

const User = models.User || model("User", userSchema);

export default User