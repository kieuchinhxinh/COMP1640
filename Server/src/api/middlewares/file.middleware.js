const util = require('util')
const multer = require('multer')
const path = require('path')
let listFile = []
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../../../upload'))
  },
  filename: (req, file, cb) => {
    const filname = `${Date.now()}_${file.originalname}`
    cb(null, filname)
    listFile.push(filname)
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

const upload = multer({ storage, fileFilter, limits: fileLimits }).array('files', 5)
const uploadFilesMiddleware = util.promisify(upload)

const uploadFiles = async (req, res, next) => {
  listFile = []
  await uploadFilesMiddleware(req, res)
  if (listFile.length !== 0) {
    req.listFile = listFile
  } else { req.listFile = [] }
  next()
}
module.exports = uploadFiles
