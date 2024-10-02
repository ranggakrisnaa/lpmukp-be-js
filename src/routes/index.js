const router = require('express').Router()
const authRoute = require('./auth.route')
const userRoute = require('./user.route')
const profileRoute = require('./profile.route')
const ApplicationRoute = require('./application.route')
const RegionRoute = require('./region.route')
const InstallmentRoute = require('./installment.route')
const NotificationRoute = require('./notification.route')
const InstallmentPaymentRoute = require('./installment_payment.route')
const PaymentRoute = require('./payment.route')
const TopupRoute = require('./topup.route')
// const ChatbotRoute = require('./chatbot.route')
const WithdrawRoute = require('./withdraw.route')
const HarborRoute = require('./harbor.route')
const BankRoute = require('./bank.route')
const PaymentMethodRoute = require('./payment_method.route')
const TransactionHistoryRoute = require('./transaction_history.route')
const WalletRoute = require('./wallet.route')
const LoanBillRoute = require('./loan_bill.route')
const OperationalLogbookRoute = require('./operational_logbook.route')
const CultivationRoute = require('./cultivition.route')
const AuthMiddleware = require('../middlewares/auth.middleware')

router.use(authRoute)
router.use(RegionRoute)
router.use(InstallmentRoute)
router.use(HarborRoute)
router.use(BankRoute)
router.use(PaymentMethodRoute)
// router.use(ChatbotRoute)
router.use(PaymentRoute)
router.use(AuthMiddleware.Authentication)
router.use(userRoute)
router.use(NotificationRoute)
router.use(profileRoute)
router.use(ApplicationRoute)
router.use(InstallmentPaymentRoute)
router.use(TopupRoute)
router.use(WithdrawRoute)
router.use(TransactionHistoryRoute)
router.use(WalletRoute)
router.use(LoanBillRoute)
router.use(OperationalLogbookRoute)
router.use(CultivationRoute)

module.exports = router