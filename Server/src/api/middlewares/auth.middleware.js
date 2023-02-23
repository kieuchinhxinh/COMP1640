const jwt = require('jsonwebtoken')
const apiResponse = require('../helpers/api.response.helper')
const Languages = require('../utils/languages')
require('dotenv').config()

exports.verifyToken = (req, res, next) => {
  const token = req.header('Authorization')
  if (token) {
    const accessToken = token.split(' ')[1]
    const result = jwt.verify(accessToken, '10')
    req.userId = result.id
    if (result) {
      next()
    } else { return apiResponse.response_status(res, Languages.TOKEN_NOT_VALID, 403) }
  } else {
    return apiResponse.response_status(res, Languages.NOT_AUTHENTICATED, 401)
  }
}
exports.isAdmin = (req, res, next) => {
  const token = req.header('Authorization')
  if (token) {
    const accessToken = token.split(' ')[1]
    const result = jwt.verify(accessToken, '10')
    req.userId = result.id
    if (result.role === 1) {
      next()
    } else { return apiResponse.response_status(res, Languages.TOKEN_NOT_VALID, 403) }
  } else {
    return apiResponse.response_status(res, Languages.NOT_AUTHENTICATED, 401)
  }
}
exports.isStaff = (req, res, next) => {
  const token = req.header('Authorization')
  if (token) {
    const accessToken = token.split(' ')[1]
    const result = jwt.verify(accessToken, '10')
    req.userId = result.id
    if (result.role === 4) {
      next()
    } else { return apiResponse.response_status(res, Languages.TOKEN_NOT_VALID, 403) }
  } else {
    return apiResponse.response_status(res, Languages.NOT_AUTHENTICATED, 401)
  }
}
exports.isQAM = (req, res, next) => {
  const token = req.header('Authorization')
  if (token) {
    const accessToken = token.split(' ')[1]
    const result = jwt.verify(accessToken, '10')
    if (result.role === 2) {
      next()
    } else { return apiResponse.response_status(res, Languages.TOKEN_NOT_VALID, 403) }
  } else {
    return apiResponse.response_status(res, Languages.NOT_AUTHENTICATED, 401)
  }
}
exports.isQAC = (req, res, next) => {
  const token = req.header('Authorization')
  if (token) {
    const accessToken = token.split(' ')[1]
    const result = jwt.verify(accessToken, '10')
    if (result.role === 3) {
      next()
    } else { return apiResponse.response_status(res, Languages.TOKEN_NOT_VALID, 403) }
  } else {
    return apiResponse.response_status(res, Languages.NOT_AUTHENTICATED, 401)
  }
}
