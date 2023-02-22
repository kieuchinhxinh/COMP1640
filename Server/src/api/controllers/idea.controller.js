const apiResponse = require('../helpers/api.response.helper')
const upload = require('../middlewares/file.middleware')
const Languages = require('../utils/languages')
const getNextSequenceValue = require('../utils/icrement.db')
const { Ideas, validate } = require('../models/idea.model')

module.exports = {
  async createIdea (req, res) {
    try {
      const { title, content, anonymous, categoryId } = req.body
      const userId = req.userId
      const resultValidate = validate(req.body)
      if (resultValidate.error) {
        return apiResponse.response_status(res, resultValidate.error.message, 400)
      }
      const ideaId = await getNextSequenceValue('ideaId')
      const createIdea = new Ideas({
        id: ideaId,
        userId,
        title,
        content,
        anonymous,
        categoryId
      }).save()
    } catch (error) {
      return apiResponse.response_error_500(res, error.message)
    }
  }
}
