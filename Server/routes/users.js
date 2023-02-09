const express = require('express')
const router = express.Router()
const AuthController = require('../controllers/auth_controller')
const { verifyToken } = require('../middlewares/auth_middleware')

router.post("/register",AuthController.registerUser)
router.post("/login",AuthController.loginUser)
router.post("/refresh_token",AuthController.refreshToken)
router.post("/logout",verifyToken,AuthController.logout)

module.exports= router;