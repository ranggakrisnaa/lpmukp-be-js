const LogbookAcivityService = require('../../services/partners/logbook_activity.service')

class LogbookAcivityController {
    static async createLogbookActivity(req, res, next) {
        const { id } = req.loggedUser
        try {
            await LogbookAcivityService.createLogbookActivity(
                req.body,
                req.files,
                id
            )

            return res.status(201).json({
                success: true,
                statusCode: 201,
                message: 'Logbook activity created successfully.',
            })
        } catch (error) {
            next(error)
        }
    }

    static async findDebtorsByNikOrConractNumber(req, res, next) {
        const { nik, contractNumber } = req.query
        try {
            const data =
                await LogbookAcivityService.findDebtorsByNikOrConractNumber(
                    nik,
                    contractNumber
                )

            return res.status(200).json({
                success: true,
                statusCode: 200,
                message: 'Debtors data retrieved successfully.',
                data,
            })
        } catch (error) {
            next(error)
        }
    }

    static async getLogbookActivityByDate(req, res, next) {
        const { date } = req.query
        try {
            const data =
                await LogbookAcivityService.getLogbookActivityByDate(date)

            return res.status(200).json({
                success: true,
                statusCode: 200,
                message: 'Logbook activity data retrieved successfully.',
                data,
            })
        } catch (error) {
            next(error)
        }
    }

    static async getLogbookActivityById(req, res, next) {
        const { id } = req.params
        try {
            const data = await LogbookAcivityService.getLogbookActivityById(+id)

            return res.status(200).json({
                success: true,
                statusCode: 200,
                message: 'Logbook activity data retrieved successfully.',
                data,
            })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = LogbookAcivityController
