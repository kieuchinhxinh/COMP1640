const mongoose = require('mongoose')
const Joi = require('joi')

const Comment = mongoose.model('Comment', new mongoose.Schema({
  id: { type: Number, required: true },
  ideaId: { type: Number, required: true },
  content: { type: String, maxlength: 10000, required: true },
  anonymous: { type: Boolean, default: false },
  file: { type: Number, default: 0, required: true }
}))
