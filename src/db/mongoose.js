const mongoose = require('mongoose')

const uristring =
    process.env.MONGODB_URI ||
    'mongodb://127.0.0.1:27017'

mongoose.connect(`${uristring}/pwa-api`, {
  useNewUrlParser: true,
  useCreateIndex: true
})