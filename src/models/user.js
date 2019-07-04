const mongoose = require('mongoose')
const validator = require('validator')

const User = new mongoose.model('User', {
  name: { 
    type: String, 
    required: true, 
    trim: true 
  },
  password: { 
    type: String,
    required: true,
    trim: true,
    validate(value){
      if(value.toLowerCase().includes('senha')){
        throw new Error(`A senha não pode conter a palavra "senha"`)
      }

      if(value.length < 6){
        throw new Error('A senha deve ter 6 caracteres ou mais')
      }
    }
  },
  email: {
    type: String,
    trim: true,
    required: true,
    validate(value){
      if(!validator.isEmail(value)){
        throw new Error('Por favor, insira um e-mail válido')
      }
    }
  }
})

module.exports = User
