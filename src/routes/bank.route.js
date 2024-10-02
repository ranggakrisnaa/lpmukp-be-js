const router = require('express').Router()
const BankController = require('../controllers/bank.controller')

router.get('/banks', BankController.getAllBanks)

module.exports = router
