import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    // username: {
    //     type: String,
    //     unique: true,
    // },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: [8, "Password must contain atleast 8 characters"],
    },
    //role based user field
    role: {
        type: String,
        enum: ["customer", "admin", "superAdmin"],
        default: "customer",
    }

}, { timestamps: true }) 

let user = mongoose.model("USERX", userSchema);
export default user;
