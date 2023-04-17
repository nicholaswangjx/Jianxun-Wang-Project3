const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, unique: true },
    description: { type: String },
    profilePic: { type: String },
    followers: { type: Array, default: [] },
    following: { type: Array, default: [] },
    description: { type: String },
  },
  { timestamps: true }
)

module.exports = mongoose.model('User', UserSchema)
