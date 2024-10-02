const OperationalLogbookService = require('../../services/partners/operational_logbook.service')

class OperationalLogbookController {
    static async createOperationalLogbook(req, res, next) {
        const { id } = req.params
        try {
            await OperationalLogbookService.createOperationalLogbook(
                req.body,
                +id
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

    static async getAllOperationalLogbook(req, res, next) {
        const { creationDate, type } = req.query
        const { id } = req.params
        try {
            const data =
                await OperationalLogbookService.getAllOperationalLogbook(
                    creationDate,
                    type,
                    +id
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
        try {
            const data =
                await OperationalLogbookService.getOperationalLogbookById(+id)

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

    static async getAllAmountOperationalLogbook(req, res, next) {
        try {
            const { id } = req.params
            const data =
                await OperationalLogbookService.getAllAmountOperationalLogbook(
                    +id
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

    static async updateOperationalLogbook(req, res, next) {
        const { id } = req.params
        try {
            await OperationalLogbookService.updateOperationalLogbook(
                req.body,
                +id
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
}

module.exports = OperationalLogbookController
