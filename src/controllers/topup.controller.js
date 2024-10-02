const TopupService = require('../services/topup.service')

class TopupController {
    static async createTopupWallet(req, res, next) {
        const { id } = req.loggedUser
        try {
            const createPayment = await TopupService.getUserTopupWalletById(
                req.body,
                id
            )

            res.status(201).json({
                success: true,
                statusCode: 201,
                message: 'Top up wallet user created successfully.',
                meta: createPayment,
            })
        } catch (error) {
            next(error)
        }
    }

    static async getAllTopupWallets(req, res, next) {
        const { id } = req.loggedUser
        try {
            const data = await TopupService.getAllTopupWallets(id)
            res.status(200).json({
                success: true,
                statusCode: 200,
                message: 'Top up wallet user retrieved successfully.',
                data,
            })
        } catch (error) {
            next(error)
        }
    }

    static async getUserTopupWalletById(req, res, next) {
        const { id } = req.loggedUser
        const { topupId } = req.params
        try {
            const data = await TopupService.getUserTopupWalletById(id, +topupId)
            res.status(200).json({
                success: true,
                statusCode: 200,
                message: 'Top up wallet user retrieved successfully.',
                data,
            })
        } catch (error) {
            next(error)
        }
    }

    static async topupWalletCallback(req, res, next) {
        const { id } = req.loggedUser
        const { topupId } = req.params
        try {
            await TopupService.topupWalletCallback(req.body, id, topupId)

            res.status(200).json({
                success: true,
                statusCode: 200,
                message: 'Top up wallet user paided successfully.',
            })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = TopupController
