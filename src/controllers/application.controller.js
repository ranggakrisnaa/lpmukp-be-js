const ApplicationService = require('../services/index').ApplicationService

class ApplicationController {
    static async addAplication(req, res, next) {
        const { id } = req.loggedUser
        try {
            await ApplicationService.addApplication(id, req.body)

            res.status(201).json({
                success: true,
                statusCode: 201,
                message: 'User application created successfully.',
            })
        } catch (error) {
            next(error)
        }
    }

    static async getApplication(req, res, next) {
        const { id } = req.loggedUser
        try {
            const data = await ApplicationService.getApplication(id)

            res.status(200).json({
                success: true,
                statusCode: 200,
                message: 'User application retrieved successfully.',
                data,
            })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = ApplicationController
