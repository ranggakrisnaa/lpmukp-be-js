const Validator = require('../middlewares/validator.middleware')
const JoiUtil = require('../utils/joi.util')
const ApplicationController =
    require('../controllers/index').ApplicationController
const router = require('express').Router()

router.post(
    '/applications',
    Validator.validate(JoiUtil.applicationSchema),
    ApplicationController.addAplication
)
router.get('/applications', ApplicationController.getApplication)

module.exports = router
