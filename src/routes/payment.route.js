const router = require('express').Router()
const PaymentController = require('../controllers/payment.controller')

router.get('/payments/banks', PaymentController.getBankList)
router.get('/payments/all-payments', PaymentController.getAllPaymentMethod)

module.exports = router
