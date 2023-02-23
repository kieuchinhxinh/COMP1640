
const express = require('express')
const router = express.Router()
const userRouter = require('./user.route')
const categoryRouter = require('./category.route')
const ideaRouter = require('./idea.route')

router.use('/user', userRouter)
router.use('/category', categoryRouter)
router.use('/idea', ideaRouter)

module.exports = router
