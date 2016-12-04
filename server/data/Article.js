const mongoose = require('mongoose')

let requiredValidationMessage = '{PATH} is required.'

let articleSchema = mongoose.Schema({
  title: { type: String, required: requiredValidationMessage },
  description: { type: String, required: requiredValidationMessage },
  content: { type: String, required: requiredValidationMessage },
  date: { type: Date, default: Date.now },
  updatedDate: { type: Date },
  author: { type: String, required: requiredValidationMessage }
})

let Article = mongoose.model('Article', articleSchema)


