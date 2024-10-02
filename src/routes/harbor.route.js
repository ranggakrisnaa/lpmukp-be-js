const router = require('express').Router()
const HarborController = require('../controllers/harbor.controller')

router.get('/harbors', HarborController.getAllHarbors)

module.exports = router
