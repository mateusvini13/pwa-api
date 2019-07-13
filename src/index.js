const express = require('express')
const { ObjectID } = require('mongodb')
require('./db/mongoose')

const { addPost, getPosts, getPost, updatePost, deletePost } = require('./resolvers/posts')
const { addUser, getUsers, getUser, updateUser, deleteUser } = require('./resolvers/users')

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

//Posts
app.post('/posts', addPost)
app.get('/posts', getPosts)
app.get('/posts/:id', getPost)
app.patch('/posts/:id', updatePost)
app.delete('/posts/:id', deletePost)

// //Users
app.post('/users', addUser)
app.get('/users', getUsers)
app.get('/users/:id', getUser)
// app.patch('/users/:id', updateUser)
// app.delete('/users/:id', deleteUser)

app.listen(port, () => {
  console.log(`Howdy, I\'m online and ready for duty on port ${port}`)
})
