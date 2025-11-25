import mongoose from "mongoose";

const adminLoginSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    trim: true
  }
});

const login = mongoose.model("AdminLogin", adminLoginSchema);
export default login;
