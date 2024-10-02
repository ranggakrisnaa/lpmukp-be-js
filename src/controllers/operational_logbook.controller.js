const OperationalLogbookService = require('../services/operational_logbook.service')

class OperationalLogbookController {
    static async getAllOperationalLogbook(req, res, next) {
        const { creationDate, type } = req.query
        const userId = req.loggedUser.id
        try {
            const data =
                await OperationalLogbookService.getAllOperationalLogbook(
                    creationDate,
                    type,
                    +userId
                )

            res.status(200).json({
                success: true,
                statusCode: 200,
                message: 'Operational logbook data retrieved successfully.',
                data,
            })
        } catch (error) {
            next(error)
        }
    }

    static async getOperationalLogbookById(req, res, next) {
        const { id } = req.params
        const userId = req.loggedUser.id
        try {
            const data =
                await OperationalLogbookService.getOperationalLogbookById(
                    +id,
                    +userId
                )

            res.status(200).json({
                success: true,
                statusCode: 200,
                message: 'Operational logbook data retrieved successfully.',
                data,
            })
        } catch (error) {
            next(error)
        }
    }

    static async createOperationalLogbook(req, res, next) {
        const { id } = req.loggedUser
        try {
            await OperationalLogbookService.createOperationalLogbook(
                req.body,
                id
            )
            res.status(201).json({
                success: true,
                statusCode: 201,
                message: 'Operational logbook created successfully.',
            })
        } catch (error) {
            next(error)
        }
    }

    static async updateOperationalLogbook(req, res, next) {
        const { id } = req.params
        const userId = req.loggedUser.id
        try {
            await OperationalLogbookService.updateOperationalLogbook(
                req.body,
                +id,
                +userId
            )
            res.status(200).json({
                success: true,
                statusCode: 200,
                message: 'Operational logbook updated successfully.',
            })
        } catch (error) {
            next(error)
        }
    }

    static async getAllAmountOperationalLogbook(req, res, next) {
        try {
            const userId = req.loggedUser.id
            const data =
                await OperationalLogbookService.getAllAmountOperationalLogbook(
                    +userId
                )
            res.status(200).json({
                success: true,
                statusCode: 200,
                message: 'Operational logbook amount retrieved successfully.',
                data,
            })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = OperationalLogbookController
