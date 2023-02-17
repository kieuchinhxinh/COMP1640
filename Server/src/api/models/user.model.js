const Joi = require('joi')
const mongoose = require('mongoose')

const User = mongoose.model('User', new mongoose.Schema({
  userId: { type: Number, required: true, unique: true },
  username: { type: String, required: true, minlength: 5, maxlength: 100 },
  firstName: { type: String, required: true, minlength: 1, maxlength: 50 },
  lastName: { type: String, required: true, minlength: 1, maxlength: 50 },
  department: { type: String, required: true, maxlength: 30 },
  email: { type: String, required: true, minlength: 6, maxlength: 255, unique: true },
  password: { type: String, required: true, minlength: 6, maxlength: 255 },
  role: { type: Number, required: true },
  isActive: { type: Boolean, required: true, default: true }
}, { timestamps: true }))

function validateUser (user) {
  const schema = Joi.object({
    username: Joi.string().min(5).max(100).required(),
    email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().pattern(/^[a-zA-Z0-9]{8,30}$/).required(),
    firstName: Joi.string().min(1).max(50).required(),
    lastName: Joi.string().min(1).max(50).required(),
    department: Joi.string().min(1).max(30).required(),
    role: Joi.number().required()
  })
  return schema.validate(user)
}

exports.User = User
exports.validate = validateUser
