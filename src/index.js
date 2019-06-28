const express = require('express')
require('./db/mongoose')

const Post = require('./models/post')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

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
  Post.find({}).then((docs) => {
    res.status(200).send(docs)
  }).catch(() => {
    res.status(500).send()
  })

})

//Get Post Details
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

app.listen(port, () => {
  console.log(`Howdy, I\'m online and ready for duty on port ${port}`)
})