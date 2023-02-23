const mongoose = require('mongoose')

const FilesSchema = new mongoose.Schema({
  fileId: { type: Number, required: true, unique: true },
  ideaId: { type: Number, ref: 'Ideas' },
  file: { type: [String], required: true, default: [] }
}, { timestamps: true })

FilesSchema.virtual('id').get(function () {
  return this.fileId
})

// Bao gồm trường ID trong kết quả trả về
FilesSchema.set('toObject', { getters: true })
FilesSchema.set('toJSON', { getters: true })
FilesSchema.options.toObject.virtuals = true
FilesSchema.options.toJSON.virtuals = true

const Files = mongoose.model('File', FilesSchema)
module.exports = Files
