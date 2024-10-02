const router = require('express').Router()
const InstallmentPaymentController = require('../controllers/installment_payment.controller')
// const AuthMiddleware = require('../middlewares/auth.middleware')

router.get(
    '/installment-payments',
    InstallmentPaymentController.getAllInstallmentPayment
)
// router.get(
//     '/installment-payments/now',
//     InstallmentPaymentController.getInstallmentPaymentNow
// )
router.get(
    '/installment-payments/:id',
    InstallmentPaymentController.getInstallmentPaymentById
)
router.post(
    '/installment-payments',
    InstallmentPaymentController.createInstallmentPayment
)
router.post(
    '/installment-payments/verify/:installmentPaymentId',
    InstallmentPaymentController.verifyInstallmentPayment
)
// router.post(
//     '/installment-payments/wallets',
//     InstallmentPaymentController.createInstallmentWalletPayment
// )
// router.post(
//     '/installment-payments/wallets/verify/:installmentPaymentId',
//     AuthMiddleware.verifyOtp,
//     InstallmentPaymentController.verifyWalletOtp
// )

module.exports = router
