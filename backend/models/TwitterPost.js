const mongoose = require('mongoose')

const TwitterPostSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    content: { type: String, required: true, max: 300 },
    likes: { type: Array, default: [] },
  },
  { timestamps: true }
)

module.exports = mongoose.model('twitterPost', TwitterPostSchema)
