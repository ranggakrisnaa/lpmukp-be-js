const router = require('express').Router()
const TopupController = require('../controllers/topup.controller')

router.post('/topups', TopupController.createTopupWallet)
router.get('/topups/:topupId', TopupController.getUserTopupWalletById)
router.get('/topups', TopupController.getAllTopupWallets)
router.post('/topups/verify/:topupId', TopupController.topupWalletCallback)

module.exports = router
