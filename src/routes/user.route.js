const router = require('express').Router()
const UserController = require('../controllers/user.controller')

router.get('/users/me', UserController.getUserAccount)
router.put('/users/me', UserController.updateUserAccount)

module.exports = router
