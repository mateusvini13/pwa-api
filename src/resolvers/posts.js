const Post = require('../models/post')
const slugify = require('slugify')

module.exports = {
  addPost: async (req, res) => {
    req.body.slug = slugify(req.body.title, {lower: true})
    const newPost = new Post(req.body)

    try {
      const savedPost = await newPost.save()
      res.status(201).send(savedPost)
    } catch (e) {
      res.status(500).send(e.message)
    }

  },
  getPosts: async (req, res) => {

    try {
      const posts = await Post.find(req.query)
      res.send(posts)
    } catch (e) {
      res.status(500).send()
    }

  },
  getPost: async (req, res) => {
    const _id = req.params.id

    try {
      const post = await Post.findById(_id)
      if(!post) {
        return res.status(404).send()
      }
      res.send(post)
    } catch (e) {
      res.status(500).send()
    }

  },
  updatePost: async (req, res) => {
    const _id = new ObjectID(req.params.id)

    try {
      const result = await Post.updateOne({_id}, req.body)
      res.send({modified: result.nModified})
    } catch (e) {
      res.status(500).send()
    }
    
  },
  deletePost: async (req, res) => {
    const _id = req.params.id

    try {
      const result = await Post.deleteOne({_id})
      res.send({deleted: result.deletedCount})
    } catch (e) {
      res.status(500).send()
    }
    
  }
}
