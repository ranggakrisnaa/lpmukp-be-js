const router = require('express').Router()
const WalletController = require('../controllers/wallet.controller')

router.get('/wallets', WalletController.getUserWallet)

module.exports = router
