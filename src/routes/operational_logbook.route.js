const router = require('express').Router()
const OperationalLogbookController = require('../controllers/operational_logbook.controller')
const Validator = require('../middlewares/validator.middleware')
const JoiUtil = require('../utils/joi.util')

router.get(
    '/operational-logbooks/amounts',
    OperationalLogbookController.getAllAmountOperationalLogbook
)
router.post(
    '/operational-logbooks',
    Validator.validate(JoiUtil.operationalLogbookSchema),
    OperationalLogbookController.createOperationalLogbook
)
router.get(
    '/operational-logbooks',
    OperationalLogbookController.getAllOperationalLogbook
)
router.get(
    '/operational-logbooks/:id',
    OperationalLogbookController.getOperationalLogbookById
)
router.put(
    '/operational-logbooks/:id',
    Validator.validate(JoiUtil.operationalLogbookUpdateSchema),
    OperationalLogbookController.updateOperationalLogbook
)

module.exports = router
