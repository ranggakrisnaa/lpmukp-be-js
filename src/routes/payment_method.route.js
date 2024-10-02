const PaymentMethodController = require('../controllers/payment_method.controller')

const router = require('express').Router()

router.get('/payment-methods', PaymentMethodController.getAllPaymentMethods)

module.exports = router
