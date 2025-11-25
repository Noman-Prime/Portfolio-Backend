import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.URL_DB);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.log("Database connection failed:");
  }
};

export default connectDB;