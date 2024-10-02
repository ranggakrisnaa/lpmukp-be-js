const router = require('express').Router()
const LoanBillRoute = require('./loan_bill.route')
const authRoute = require('./auth.route')
const profileRoute = require('./profile.route')
const memberRoute = require('./member.route')
const InstallmentPaymentRoute = require('./installment_payment')
const OperationalLogbookRoute = require('./operational_logbook.route')
const LogbookActivityRoute = require('./logbook_activity.route')
const AuthMiddleware = require('../../middlewares/auth.middleware')

router.use(authRoute)
router.use(AuthMiddleware.Authentication)
router.use(profileRoute)
router.use(LoanBillRoute)
router.use(memberRoute)
router.use(InstallmentPaymentRoute)
router.use(OperationalLogbookRoute)
router.use(LogbookActivityRoute)

module.exports = router
