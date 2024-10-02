const router = require('express').Router()
const LoanBillController = require('../controllers/loan_bill.controller')

router.get('/loan-bills/invoice', LoanBillController.getInvoiceSettlement)
router.get('/loan-bills/now', LoanBillController.getNowLoanBill)
router.get('/loan-bills/:loanBillId', LoanBillController.getLoanBillById)
router.get('/loan-bills', LoanBillController.getAllLoanBill)

module.exports = router
