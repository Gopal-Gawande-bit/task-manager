import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
  name: { type: String },
  password: { type: String },
  email: { type: String, unique: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
})

const User = mongoose.model("User", userSchema)

export default User
