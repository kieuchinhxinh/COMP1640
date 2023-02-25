const { Category, validate } = require('../models/category.model')
const apiResponse = require('../helpers/api.response.helper')
const Languages = require('../utils/languages')
const getNextSequenceValue = require('../utils/icrement.db')

module.exports = {
  async createCategory (req, res) {
    try {
      const { name, startDate, endDate } = req.body
      const result = validate(req.body)
      if (result.error) {
        return apiResponse.response_status(res, result.error.message, 400)
      }
      const category = await Category.findOne({ name })
      if (category) {
        return apiResponse.response_status(res, Languages.CATEGORY_EXSITS, 400)
      } else {
        const valueStartDate = new Date(startDate).getTime()
        const valueEndDate = new Date(endDate).getTime()
        const now = new Date().getTime()
        if (valueStartDate > now && valueEndDate > valueStartDate) {
          const id = await getNextSequenceValue('categoryId')
          const newCategory = new Category({ id, name, startDate, endDate })
          await newCategory.save()
          return apiResponse.response_data(res, Languages.CATEGORY_SUCCESS, 200, newCategory)
        }
      }
    } catch (error) {
      return apiResponse.response_error_500(res, error.message)
    }
  },
  async getListCategory (req, res) {
    try {
      const listCategory = await Category.find({}, { _id: 0, __v: 0 })
      if (listCategory.error) {
        return apiResponse.response_status(res, listCategory.error.message, 400)
      }
      return apiResponse.response_data(res, Languages.SUCCESSFUL, 200, listCategory)
    } catch (error) {
      return apiResponse.response_error_500(res, error.message)
    }
  },
  async updateCategory (req, res) {
    try {
      const { id, startDate, endDate } = req.body
      validate(req.body)
      const category = await Category.findOne({ id })
      if (!category) {
        return apiResponse.response_status(res, Languages.CATEGORY_NOT_EXSITS, 400)
      } else {
        const startDateUpdate = new Date(startDate).getTime()
        const endDateUpdate = new Date(endDate).getTime()
        const startDateDB = new Date(category.startDate).getTime()
        if (startDateUpdate > startDateDB && endDateUpdate > startDateUpdate) {
          const id = await getNextSequenceValue('categoryId')
          const updateCategory = Category.findOneAndUpdate(id, { $set: { startDate, endDate } })
          return apiResponse.response_data(res, Languages.CATEGORY_UPDATED_SUCCESS, 200, updateCategory)
        }
      }
    } catch (error) {
      return apiResponse.response_error_500(res, error.message)
    }
  }
}
