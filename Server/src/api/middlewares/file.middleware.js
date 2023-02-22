const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'upload/images')
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '_' + Date.now() +
    path.extname(file.originalname))
  }
})

const fileFilter = (req, file, cb) => {
  const allowedMimes = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/svg',
    'file/pdf',
    'file/docs',
    'file/doc'
  ]
  if (allowedMimes.includes(file.mimetype)) {
    cb(null, true)
  } else {
    return cb(new Error('file type is only include jpeg, jpg, png, svg, docs, doc, pdf.'), false)
  }
}

const maxSize = 5 * 1024 * 1024

const fileLimits = {
  fileSize: maxSize,
  files: 5
}
exports.upload = multer({ storage, fileFilter, limits: fileLimits }).array('file', 5)
