const router = require('express').Router()
const LogbookAcivityController = require('../../controllers/partners/logbook_activity.controller')
const UploadMiddleware = require('../../middlewares/upload.middleware')

router.post(
    '/logbook-activities',
    UploadMiddleware.initializeUpload().array('photos-activity'),
    LogbookAcivityController.createLogbookActivity
)
router.get(
    '/logbook-activities/find-debtors',
    LogbookAcivityController.findDebtorsByNikOrConractNumber
)
router.get(
    '/logbook-activities',
    LogbookAcivityController.getLogbookActivityByDate
)
router.get(
    '/logbook-activities/:id',
    LogbookAcivityController.getLogbookActivityById
)

module.exports = router
