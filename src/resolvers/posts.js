const Post = require('../models/post')

module.exports = {
  addPost: (req, res) => {
    const newPost = new Post(req.body)
  
    newPost.save().then((savedPost) => {
      res.status(201).send(savedPost)
    }).catch((e) => {
      res.status(400).send(e)
    })
  },
  getPosts: (req, res) => {
    Post.find(req.query).then((docs) => {
      res.status(200).send(docs)
    }).catch(() => {
      res.status(500).send()
    })
  },
  getPost: (req, res) => {
    Post.findById(req.params.id).then((doc) => {
      if(!doc){
        return res.status(404).send()
      }
      res.status(200).send(doc)
    }).catch((e) => {
      res.status(500).send(e)
    })
  },
  deletePost: (req, res) => {
    Post.deleteOne({_id: req.params.id}).then((result) => {
      res.status(200).send({deleted: result.deletedCount})
    }).catch((e) => {
      console.log(e)
      res.status(500).send()
    })
  },
  updatePost: (req, res) => {
    Post.updateOne({_id: new ObjectID(req.params.id)}, req.body).then((result) => {
      console.log(result)
      res.status(200).send({modified: result.nModified})
    }).catch((e) => {
      console.log(e)
      res.status(500).send()
    })
  }
}
