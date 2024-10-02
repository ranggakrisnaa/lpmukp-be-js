const OperationalLogbookController = require('../../controllers/partners/operational_logbook.controller')

const router = require('express').Router()

router.post(
    '/operational-logbooks/:id',
    OperationalLogbookController.createOperationalLogbook
)
router.get(
    '/operational-logbooks/:id',
    OperationalLogbookController.getAllOperationalLogbook
) // by userID
router.get(
    '/operational-logbooks/detail/:id',
    OperationalLogbookController.getOperationalLogbookById
) // by logbookID
router.get(
    '/operational-logbooks/amounts/:id',
    OperationalLogbookController.getAllAmountOperationalLogbook
) // by userID
router.put(
    '/operational-logbooks/:id',
    OperationalLogbookController.updateOperationalLogbook
) // by logbookID

module.exports = router
