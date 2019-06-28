const mongoose = require('mongoose')

const Post = new mongoose.model('Post', {
  title: { type: String },
  slug: { type: String },
  thumbnail: { type: String },
  author: { type: String },
  cover: { type: String },
  resume: { type: String },
  content: { type: String }
})

module.exports = Post