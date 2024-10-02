const router = require('express').Router()
const CultivationController = require('../controllers/cultivition.controller')

router.post('/cultivations', CultivationController.addCultivationPond)
router.post('/cultivations/spread-seeds', CultivationController.addSeedSpread)
router.post('/cultivations/reports', CultivationController.addCultivationReport)
router.post('/cultivations/results', CultivationController.addCultivationResult)
router.get('/cultivations/comodities', CultivationController.getAllComodityType)
router.get('/cultivations', CultivationController.getAllCultivation)
router.get(
    '/cultivations/:cultivationId',
    CultivationController.getCultivationById
)

module.exports = router
