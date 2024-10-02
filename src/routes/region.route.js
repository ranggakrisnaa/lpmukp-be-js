const router = require('express').Router()
const RegionController = require('../controllers/index').RegionController

router.get('/regions/provinces', RegionController.getAllProvince)
router.get('/regions/cities/:provinceId', RegionController.getCityByProvinceId)
router.get('/regions/districts/:cityId', RegionController.getDistrictByCityId)
router.get(
    '/regions/villages/:districtId',
    RegionController.getVillagesByDistrictId
)

module.exports = router
