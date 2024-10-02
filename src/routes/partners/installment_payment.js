const router = require('express').Router()
const InstallmentPaymentController = require('../../controllers/partners/installment_payment')

router.post(
    '/installment-payments/:codeNumber',
    InstallmentPaymentController.createInstallmentPayment
)

module.exports = router
