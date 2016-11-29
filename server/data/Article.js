const mongoose = require('mongoose')

let requiredValidationMessage = '{PATH} is required.'

let articleSchema = mongoose.Schema({
  title: { type: String, requiredValidationMessage },
  description: { type: String, requiredValidationMessage },
  content: { type: String, requiredValidationMessage },
  date: { type: Date, requiredValidationMessage },
  author: { type: String, requiredValidationMessage }
})

let Article = mongoose.model('Article', articleSchema)


