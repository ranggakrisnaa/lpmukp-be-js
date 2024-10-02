const router = require('express').Router()
const { WithdrawController } = require('../controllers')

router.get('/withdraws', WithdrawController.index)
router.post('/withdraws', WithdrawController.store)
router.post('/withdraws/:withdrawId/otp', WithdrawController.generateOtp)
router.post('/withdraws/:withdrawId/validate', WithdrawController.validateOtp)
router.get('/withdraws/:withdrawId', WithdrawController.show)

module.exports = router
