const { Category, validate } = require('../models/category.model')
const apiResponse = require('../helpers/api.response.helper')
const Languages = require('../utils/languages')
const getNextSequenceValue = require('../utils/icrement.db')

exports.createCategory = async (req, res) => {
  try {
    const name = req.body.name
    const result = validate(req.body)
    if (result.error) {
      return apiResponse.response_status(res, result.error.message, 400)
    }
    const category = await Category.findOne({ name })
    if (category) {
      return apiResponse.response_status(res, Languages.CATEGORY_EXSITS, 400)
    } else {
      const id = await getNextSequenceValue('categoryId')
      const newCategory = new Category({ id, name })
      await newCategory.save()
      return apiResponse.response_data(res, Languages.CATEGORY_SUCCESS, 200, newCategory)
    }
  } catch (error) {
    return apiResponse.response_error_500(res, error.message)
  }
}
exports.getListCategory = async (req, res) => {
  try {
    const listCategory = await Category.find({}, { _id: 0, __v: 0 })
    if (listCategory.error) {
      return apiResponse.response_status(res, listCategory.error.message, 400)
    }
    return apiResponse.response_data(res, Languages.SUCCESSFUL, 200, listCategory)
  } catch (error) {
    return apiResponse.response_error_500(res, error.message)
  }
}
