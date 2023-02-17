const jwt = require('jsonwebtoken')
const apiResponse = require('../helpers/api.response.helper')
const Languages = require('../utils/languages')
require('dotenv').config()

const checkToken = (token, role, res, next) => {
  jwt.verify(token, process.env.JWT_ACCESS_KEY, (err, user) => {
    if (err) {
      return apiResponse.response_status(res, Languages.TOKEN_NOT_VALID, 403)
    }
    if (user.role === 1) { next() }
  })
}

exports.verifyToken = (req, res, next) => {
  const token = req.header('token')
  if (token) {
    const accessToken = token.split(' ')[1]
    jwt.verify(accessToken, process.env.JWT_REFRESH_KEY, (err, user) => {
      if (err) {
        return apiResponse.response_status(res, Languages.TOKEN_NOT_VALID, 403)
      }
      next()
    })
  } else {
    return apiResponse.response_status(res, Languages.NOT_AUTHENTICATED, 401)
  }
}
exports.isAdmin = (req, res, next) => {
  const token = req.header('token')
  if (token) {
    const accessToken = token.split(' ')[1]
    checkToken(accessToken, 1, res, next())
  } else {
    return apiResponse.response_status(res, Languages.NOT_AUTHENTICATED, 401)
  }
}
exports.isStaff = (req, res, next) => {
  const token = req.header('Authorization')
  if (token) {
    const accessToken = token.split(' ')[1]
    checkToken(accessToken, 4, res, next())
  } else {
    return apiResponse.response_status(res, Languages.NOT_AUTHENTICATED, 401)
  }
}
exports.isQAM = (req, res, next) => {
  const token = req.header('Authorization')
  if (token) {
    const accessToken = token.split(' ')[1]
    checkToken(accessToken, 2, res, next())
  } else {
    return apiResponse.response_status(res, Languages.NOT_AUTHENTICATED, 401)
  }
}
exports.isQAC = (req, res, next) => {
  const token = req.header('Authorization')
  if (token) {
    const accessToken = token.split(' ')[1]
    checkToken(accessToken, 3, res, next())
  } else {
    return apiResponse.response_status(res, Languages.NOT_AUTHENTICATED, 401)
  }
}
