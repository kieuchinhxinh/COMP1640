const mongoose = require('mongoose')

const Files = mongoose.model('File', new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: [true, 'Upload file must have a name'] }
}))

module.exports = Files
