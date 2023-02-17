const mongoose = require('mongoose')
const Joi = require('joi')

const Category = mongoose.model('Category', new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true,
    maxlength: 30
  },
  create_at: {
    type: Date,
    default: Date.now
  }
}))

function validateCategory (category) {
  const schema = Joi.object({
    name: Joi.string().max(100).required()
  })
  return schema.validate(category)
}

exports.Category = Category
exports.validate = validateCategory
