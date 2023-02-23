const apiResponse = require('../helpers/api.response.helper')
const Languages = require('../utils/languages')
const fs = require('fs')
const getNextSequenceValue = require('../utils/icrement.db')
const { Ideas, validate } = require('../models/idea.model')
const Files = require('../models/file.model')
const { Category } = require('../models/category.model')
const path = require('path')

module.exports = {
  async createIdea (req, res) {
    const directoryFile = path.join(__dirname, '../../../upload/documents/')
    const listFile = req.listFile
    try {
      const { title, content, anonymous, categoryId } = req.body
      const userId = req.userId
      const resultValidate = validate(req.body)
      const categoryValue = await Category.findOne({ id: categoryId })
      if (!categoryValue) {
        if (listFile.length !== 0) {
          listFile.forEach(element => {
            fs.unlink(directoryFile + element)
          })
        }
        return apiResponse.response_status(res, Languages.CATEGORY_NOT_EXSITS, 400)
      }
      if (resultValidate.error) {
        if (listFile.length !== 0) {
          listFile.forEach(element => {
            fs.unlink(directoryFile + element)
          })
        }
        return apiResponse.response_status(res, resultValidate.error.message, 400)
      }
      const id = await getNextSequenceValue('ideaId')
      if (listFile.length > 0) {
        const fileId = await getNextSequenceValue('fileId')
        await Files.create({ fileId, ideaId: id, file: listFile })
        await new Ideas({ id, userId, title, content, anonymous, categoryId, file: fileId }).save()
      } else { await new Ideas({ id, userId, title, content, anonymous, categoryId }).save() }
      return apiResponse.response_status(res, Languages.CREATE_IDEA_SUCCESS, 200)
    } catch (error) {
      if (listFile.length !== 0) {
        listFile.forEach(element => {
          fs.unlink(directoryFile + element)
        })
      }
      return apiResponse.response_error_500(res, error.message)
    }
  },
  async paginationListIdea (req, res) {
    try {
      const page = parseInt(req.query.page) || 1
      const limit = parseInt(req.query.limit) || 5
      const skip = (limit * page) - limit
      const listIdea = await Ideas.find().populate('file').skip(skip).limit(limit).exec(function (_err, idea) {
        console.log(_err)
      })
      const totalIdea = await Ideas.find().countDocuments()
      const response = apiResponse.response_data(res, Languages.SUCCESSFUL, 200, {
        listIdea,
        totalIdea
      })
      return response
    } catch (error) {
      return apiResponse.response_error_500(res, error.message)
    }
  }
}
