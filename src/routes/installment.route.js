const router = require('express').Router()
const InstalllmentController =
    require('../controllers/index').InstallmentController

router.post(
    '/installments/loan-interest',
    InstalllmentController.createLoanInterest
)
router.put(
    '/installments/loan-interest/:id',
    InstalllmentController.updateLoanInterest
)
router.post('/installments/plafond', InstalllmentController.createPlafond)
router.put('/installments/plafond/:id', InstalllmentController.updatePlafond)
router.get('/installments', InstalllmentController.getAllInstallment)
router.get(
    '/installments/loan-interest',
    InstalllmentController.getAllLoanInterest
)
router.get('/installments/plafond', InstalllmentController.getAllPlafond)
router.get('/installments/detail', InstalllmentController.getDetailInstallment)
router.delete(
    '/installments/loan-interest',
    InstalllmentController.deleteLoanInterest
)
router.delete('/installments/plafond', InstalllmentController.deletePlafond)

module.exports = router
