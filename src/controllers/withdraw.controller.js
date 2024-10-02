const WithdrawService = require('../services/').WithdrawService

class WithdrawController {
    static async index(req, res, next) {
        const { id } = req.loggedUser
        try {
            const data = await WithdrawService.index(id, req.query)
            res.status(200).json({
                success: true,
                statusCode: 200,
                message: 'Withdraws retrieved successfully.',
                data,
            })
        } catch (error) {
            next(error)
        }
    }

    static async store(req, res, next) {
        const { id } = req.loggedUser
        try {
            const data = await WithdrawService.store(id, req.body)
            res.status(201).json({
                success: true,
                statusCode: 201,
                message: 'Withdraw created successfully.',
                data,
            })
        } catch (error) {
            next(error)
        }
    }

    static async generateOtp(req, res, next) {
        const { id } = req.loggedUser
        const { withdrawId } = req.params
        try {
            const data = await WithdrawService.generateOtp(
                id,
                parseInt(withdrawId)
            )
            res.status(200).json({
                success: true,
                statusCode: 200,
                message: 'Withdraw otp generated successfully.',
                data,
            })
        } catch (error) {
            next(error)
        }
    }

    static async validateOtp(req, res, next) {
        const { id } = req.loggedUser
        const { withdrawId } = req.params
        try {
            await WithdrawService.validateOtp(
                id,
                parseInt(withdrawId),
                req.body
            )
            res.status(200).json({
                success: true,
                statusCode: 200,
                message: 'Withdraw validated successfully.',
            })
        } catch (error) {
            next(error)
        }
    }

    static async show(req, res, next) {
        const { id } = req.loggedUser
        const { withdrawId } = req.params
        try {
            const data = await WithdrawService.show(id, parseInt(withdrawId))
            res.status(200).json({
                success: true,
                statusCode: 200,
                message: 'Withdraw retrieved successfully.',
                data,
            })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = WithdrawController
