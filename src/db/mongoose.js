const mongoose = require('mongoose')

const uristring =
    process.env.MONGOLAB_URI ||
    process.env.MONGOHQ_URL ||
    'mongodb://127.0.0.1:27017'

mongoose.connect(`${uristring}/pwa-api`, {
  useNewUrlParser: true,
  useCreateIndex: true
})