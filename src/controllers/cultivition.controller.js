const CultivationService = require('../services/cultivation.service')

class CultivationController {
    static async addCultivationPond(req, res, next) {
        const { id } = req.loggedUser
        try {
            await CultivationService.addCultivationPond(id, req.body)

            res.status(201).json({
                success: true,
                statusCode: 201,
                message: 'Cultivation pond created successfully.',
            })
        } catch (error) {
            next(error)
        }
    }

    static async addSeedSpread(req, res, next) {
        try {
            await CultivationService.addSeedSpread(req.body)

            res.status(201).json({
                success: true,
                statusCode: 201,
                message: 'Spread seed created successfully.',
            })
        } catch (error) {
            next(error)
        }
    }

    static async addCultivationReport(req, res, next) {
        try {
            await CultivationService.addCultivationReport(req.body)

            res.status(201).json({
                success: true,
                statusCode: 201,
                message: 'Cultivation report created successfully.',
            })
        } catch (error) {
            next(error)
        }
    }

    static async addCultivationResult(req, res, next) {
        const { id } = req.loggedUser
        try {
            await CultivationService.addCultivationResult(id, req.body)

            res.status(201).json({
                success: true,
                statusCode: 201,
                message: 'Cultivation result created successfully.',
            })
        } catch (error) {
            next(error)
        }
    }

    static async getAllCultivation(req, res, next) {
        try {
            const data = await CultivationService.getAllCultivation()

            res.status(200).json({
                success: true,
                statusCode: 200,
                message: 'Cultivation data retrieved successfully.',
                data,
            })
        } catch (error) {
            next(error)
        }
    }

    static async getCultivationById(req, res, next) {
        const { cultivationId } = req.params
        try {
            const data =
                await CultivationService.getCultivationById(+cultivationId)

            res.status(200).json({
                success: true,
                statusCode: 200,
                message: 'Cultivation data retrieved successfully.',
                data,
            })
        } catch (error) {
            next(error)
        }
    }

    static async getAllComodityType(req, res, next) {
        const { comodityName } = req.query
        try {
            const data =
                await CultivationService.getAllComodityType(comodityName)

            res.status(200).json({
                success: true,
                statusCode: 200,
                message: 'Cultivation result created successfully.',
                data,
            })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = CultivationController
