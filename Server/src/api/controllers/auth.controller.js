const { User, validate } = require('../models/user.model')
const jwt = require('jsonwebtoken')
const apiResponse = require('../helpers/api.response.helper')
const Joi = require('joi')
const Languages = require('../utils/languages')
const getNextSequenceValue = require('../utils/icrement.db')
require('dotenv').config()

let refreshTokens = []
const schemaLoginUser = Joi.object({
  email: Joi.string().required().email(),
  password: Joi.string().required()
})

exports.registerUser = async (req, res) => {
  try {
    const result = validate(req.body)
    if (result.error) {
      return apiResponse.response_status(res, result.error.message, 400)
    }
    const user = await User.findOne({ email: req.body.email })
    const username = await User.findOne({ username: req.body.username })
    if (user) {
      return apiResponse.response_status(res, Languages.EMAIL_EXSITS, 400)
    } else if (username) {
      return apiResponse.response_status(res, Languages.USERNAME_EXSITS, 400)
    } else {
      const userId = await getNextSequenceValue('userId')
      const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        department: req.body.department,
        role: req.body.role,
        lastName: req.body.lastName,
        firstName: req.body.firstName,
        userId
      })
      await user.save()
      return apiResponse.response_data(res, Languages.REGISTER_SUCCESS, 200, user)
    }
  } catch (error) {
    return apiResponse.response_error_500(res, error.message)
  }
}
exports.loginUser = async (req, res) => {
  try {
    const email = req.body.email
    const password = req.body.password
    const result = schemaLoginUser.validate(req.body)
    if (result.error) {
      return apiResponse.response_status(res, result.error.message, 400)
    }
    const user = await User.findOne({ email })

    if (user && password === user.password) {
      const accessToken = jwt.sign({
        id: user._id,
        role: user.role
      },
      process.env.JWT_ACCESS_KEY,
      { expiresIn: '60m' })
      const refreshToken = jwt.sign({
        id: user._id,
        role: user.role
      },
      process.env.JWT_REFRESH_KEY,
      { expiresIn: '60d' })
      refreshTokens.push(refreshToken)
      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: false,
        path: '/',
        sameSite: 'strict'
      })
      return apiResponse.response_token(res, Languages.SUCCESSFUL, accessToken, refreshToken)
    } else {
      return apiResponse.response_status(res, Languages.LOGIN_FAIL, 400)
    }
  } catch (error) {
    return apiResponse.response_error_500(res, error.message)
  }
}
exports.refreshToken = async (req, res) => {
  const refreshToken = req.header('refreshToken')
  if (!refreshToken) return apiResponse.response_status(res, Languages.NOT_AUTHENTICATED, 401)
  if (!refreshTokens.includes(refreshToken)) return apiResponse.response_status(res, Languages.REFRES_TOKEN_NOT_VALID, 403)
  jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY, (err, user) => {
    if (err) {
      return apiResponse.response_status(res, Languages.TOKEN_NOT_VALID, 403)
    } else {
      refreshTokens = refreshTokens.filter((token) => token !== refreshToken)
      const newAccessToken = jwt.sign({
        id: user._id,
        role: user.role
      },
      process.env.JWT_ACCESS_KEY,
      { expiresIn: '60m' })
      const newRefreshToken = jwt.sign({
        id: user._id,
        role: user.role
      },
      process.env.JWT_REFRESH_KEY,
      { expiresIn: '60d' })
      refreshTokens.push(refreshToken)
      res.cookie('refreshToken', newRefreshToken, {
        httpOnly: true,
        secure: false,
        path: '/',
        sameSite: 'strict'
      })
      return apiResponse.response_token(res, Languages.SUCCESSFUL, newAccessToken, newRefreshToken)
    }
  })
}
exports.logout = async (req, res) => {
  refreshTokens = refreshTokens.filter((token) => token !== req.body.token)
  res.clearCookie('refreshToken')
  return apiResponse.response_status(res, Languages.LOGOUT_SUCCESSFUL, 200)
}
