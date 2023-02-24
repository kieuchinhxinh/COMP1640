const mongoose = require('mongoose')
const Joi = require('joi')

const Category = mongoose.model('Category', new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true, maxlength: 30 },
  startDate: { type: String, required: true },
  endDate: { type: String, required: true }
}, {
  timestamps: {
    currentTime: () => Date.now() + 7 * 60 * 60 * 1000
  }
}))

function validateCategory (category) {
  const schema = Joi.object({
    name: Joi.string().max(100).required(),
    startDate: Joi.string().regex(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/),
    endDate: Joi.string().regex(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/)
  })
  return schema.validate(category)
}

exports.Category = Category
exports.validate = validateCategory
