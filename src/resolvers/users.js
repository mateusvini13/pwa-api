const User = require('../models/user')

module.exports = {
  addUser: (req, res) => {
    const newUser = new User(req.body)

    newUser.save().then((savedUser) => {
      res.status(201).send(savedUser)
    }).catch((e) => {
      res.status(500).send(e.message)
    })
  },
  getUsers: (req, res) => {
    User.find(req.query).then((users) => {
      res.status(200).send(users)
    }).catch((e) => {
      res.status(500).send(e)
    })
  }
}
