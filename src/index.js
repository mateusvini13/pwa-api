const express = require('express')
const { ObjectID } = require('mongodb')
require('./db/mongoose')

const Post = require('./models/post')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
})

//Home page
app.get('/', (req, res) => {
  res.send('Nothing to see Here. Move on.')
})

//New Post
app.post('/posts', (req, res) => {
  const newPost = new Post(req.body)

  newPost.save().then((savedPost) => {
    res.status(201).send(savedPost)
  }).catch((e) => {
    res.status(400).send(e)
  })
})

//All Posts
app.get('/posts', (req, res) => {
  Post.find(req.query).then((docs) => {
    res.status(200).send(docs)
  }).catch(() => {
    res.status(500).send()
  })

})

//Get Post Details by id
app.get('/posts/:id', (req, res) => {
  Post.findById(req.params.id).then((doc) => {
    if(!doc){
      return res.status(404).send()
    }
    res.status(200).send(doc)
  }).catch(() => {
    res.status(500).send()
  })
})

//Delete Post by id
app.delete('/posts/:id', (req, res) => {
  Post.deleteOne({_id: req.params.id}).then((result) => {
    res.status(200).send({deleted: result.deletedCount})
  }).catch((e) => {
    console.log(e)
    res.status(500).send()
  })
})

//Update Post by id
app.patch('/posts/:id', (req, res) => {
  Post.updateOne({_id: new ObjectID(req.params.id)}, req.body).then((result) => {
    console.log(result)
    res.status(200).send({modified: result.nModified})
  }).catch((e) => {
    console.log(e)
    res.status(500).send()
  })
})

app.listen(port, () => {
  console.log(`Howdy, I\'m online and ready for duty on port ${port}`)
})