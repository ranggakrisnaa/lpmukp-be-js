const PaymentMethodService = require('../services/payment_method.service')

class PaymentMethodController {
    static async getAllPaymentMethods(req, res, next) {
        const { paymentCode } = req.query
        try {
            const data =
                await PaymentMethodService.getAllPaymentMethods(paymentCode)

            res.status(200).json({
                success: true,
                statusCode: 200,
                message: 'Payment method data retrieved successfully',
                data,
            })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = PaymentMethodController
