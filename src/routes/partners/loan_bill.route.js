const router = require('express').Router()
const LoanBillController = require('../../controllers/partners/loan_bill.controller')
const AuthMiddleware = require('../../middlewares/auth.middleware')

router.get(
    '/loan-bills/all/:contractNumber',
    AuthMiddleware.checkRole('partner'),
    LoanBillController.getAllDebtorLoanBill
)
router.get(
    '/loan-bills/debtors',
    AuthMiddleware.checkRole('partner'),
    LoanBillController.getDebtorLoanBill
)
router.get(
    '/loan-bills/:id',
    AuthMiddleware.checkRole('partner'),
    LoanBillController.getDetailDebtorLoanBill
)

module.exports = router
