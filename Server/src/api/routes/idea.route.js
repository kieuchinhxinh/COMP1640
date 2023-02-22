const express = require('express')
const router = express.Router()
const { isStaff } = require('../middlewares/auth.middleware')
const IdeaController = require('../controllers/idea.controller')

router.post('/create', isStaff, IdeaController.createIdea)

module.exports = router
