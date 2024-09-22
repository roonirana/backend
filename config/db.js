import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();
const url = process.env.MONGODB_URL;

export const connectDB = async () => {
    try {
        mongoose.connect(url);
        console.log("DATABASE CONNECTED");
    } catch (err) {
        console.error(err.message);
    }
};
