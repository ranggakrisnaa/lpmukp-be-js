const PaymentService = require('../services/payment.service')

class PaymentController {
    static async getBankList(req, res, next) {
        try {
            const data = await PaymentService.getBankList()

            res.status(200).json({
                success: true,
                statusCode: 200,
                message: 'Bank list retrieved successfully.',
                data,
            })
        } catch (error) {
            next(error)
        }
    }

    static async CreateVaBank(req, res, next) {
        try {
            const data = await PaymentService.CreateVaBank()

            res.status(200).json({
                success: true,
                statusCode: 200,
                message: 'Bank list retrieved successfully.',
                data,
            })
        } catch (error) {
            next(error)
        }
    }

    static async getAllPaymentMethod(req, res, next) {
        try {
            const data = await PaymentService.getAllPaymentMethod()

            res.status(200).json({
                success: true,
                statusCode: 200,
                message: 'Payment method data retrieved successfully.',
                data,
            })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = PaymentController
