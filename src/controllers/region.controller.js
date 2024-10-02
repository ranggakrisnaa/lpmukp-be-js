const RegionService = require('../services/index').RegionService

class RegionController {
    static async getAllProvince(req, res, next) {
        const { query } = req.query
        const data = await RegionService.getAllProvince(query)
        try {
            res.status(200).json({
                success: true,
                statusCode: 200,
                message: 'Province data retrieved successfully.',
                data,
            })
        } catch (error) {
            next(error)
        }
    }

    static async getCityByProvinceId(req, res, next) {
        const { query } = req.query
        const { provinceId } = req.params
        try {
            const data = await RegionService.getCityByProvinceId(
                query,
                +provinceId
            )

            res.status(200).json({
                success: true,
                statusCode: 200,
                message: 'City data retrieved successfully.',
                data,
            })
        } catch (error) {
            next(error)
        }
    }

    static async getDistrictByCityId(req, res, next) {
        const { query } = req.query
        const { cityId } = req.params
        try {
            const data = await RegionService.getDistrictByCityId(query, +cityId)

            res.status(200).json({
                success: true,
                statusCode: 200,
                message: 'District data retrieved successfully.',
                data,
            })
        } catch (error) {
            next(error)
        }
    }

    static async getVillagesByDistrictId(req, res, next) {
        const { query } = req.query
        const { districtId } = req.params
        try {
            const data = await RegionService.getVillagesByDistrictId(
                query,
                +districtId
            )

            res.status(200).json({
                success: true,
                statusCode: 200,
                message: 'District data retrieved successfully.',
                data,
            })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = RegionController
