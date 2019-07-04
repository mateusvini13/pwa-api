const mongoose = require('mongoose')
const validator = require('validator')

const Post = new mongoose.model('Post', {
  title: { type: String, required: true, trim: true },
  slug: { type: String, required: true, trim: true, lowercase: true },
  thumbnail: { type: String, trim: true },
  author: { type: String, trim: true, default: 'Autor desconhecido' },
  cover: { type: String, trim: true },
  resume: { type: String, trim: true, default: 'Nenhum resumo encontrado' },
  content: { type: String, trim: true, default: 'Nenhum conteúdo encontrado' }
})

module.exports = Post
