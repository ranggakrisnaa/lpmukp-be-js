const router = require('express').Router()
const TransactionHistoryController = require('../controllers/transaction_history.controller')

router.get(
    '/transaction-histories',
    TransactionHistoryController.getAllTransactionHistories
)

module.exports = router
