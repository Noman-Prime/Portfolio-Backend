import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minLength: [6, "At least 6 characters are required"],
    trim: true,
  },
  role: {
    type: String,
    default: "admin",
  },
}, { timestamps: true });

const Admin = mongoose.model("Admin", adminSchema);
export default Admin;