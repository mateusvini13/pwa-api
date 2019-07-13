const User = require('../models/user')

module.exports = {
  addUser: async (req, res) => {
    const newUser = new User(req.body)

    try {
      const savedUser = await newUser.save()
      res.status(201).send(savedUser)
    } catch (e) {
      res.status(500).send(e.message)
    }

  },
  getUsers: async (req, res) => {

    try {
      const users = await User.find(req.query)
      res.send(users)
    } catch (e) {
      res.status(500).send()
    }

  },
  getUser: async (req, res) => {
    const _id = req.params.id

    try {
      const user = await User.findById(_id)
      if(!user){
        return res.status(404).send()
      }
      res.send(user)
    } catch (e) {
      res.status(500).send()
    }

  }
}
