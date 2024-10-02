const InstallmentPaymentService = require('../services/installment_payment.service')

class InstallmentPaymentController {
    static async getAllInstallmentPayment(req, res, next) {
        // const { id } = req.loggedUser
        const {
            pageNumber = 1,
            pageSize = 10,
            transactionType,
            transactionDate,
        } = req.query
        try {
            const { data, pagination } =
                await InstallmentPaymentService.getAllInstallmentPayment(
                    pageNumber,
                    pageSize,
                    transactionType,
                    transactionDate
                )

            res.status(200).json({
                success: true,
                statusCode: 200,
                message: 'User installment payment retrieved successfully.',
                pagination,
                data,
            })
        } catch (error) {
            next(error)
        }
    }

    static async getInstallmentPaymentById(req, res, next) {
        const { id } = req.params
        try {
            const data = await InstallmentPaymentService.getInstallmentById(+id)

            res.status(200).json({
                success: true,
                statusCode: 200,
                message:
                    'User installment payment detail retrieved successfully.',
                data,
            })
        } catch (error) {
            next(error)
        }
    }

    static async createInstallmentPayment(req, res, next) {
        const { id } = req.loggedUser
        try {
            const createPayment =
                await InstallmentPaymentService.createInstallmentPayment(
                    req.body,
                    id
                )
            res.status(201).json({
                success: true,
                statusCode: 201,
                message: 'User installment payment created successfully.',
                meta: createPayment,
            })
        } catch (error) {
            next(error)
        }
    }

    static async verifyInstallmentPayment(req, res, next) {
        const { installmentPaymentId } = req.params
        const { id } = req.loggedUser
        try {
            await InstallmentPaymentService.verifyInstallmentPayment(
                id,
                req.body,
                installmentPaymentId
            )

            res.status(200).json({
                success: true,
                statusCode: 200,
                message: 'Installment Payment status changed successfully.',
            })
        } catch (error) {
            next(error)
        }
    }

    // static async createInstallmentWalletPayment(req, res, next) {
    //     const { id } = req.loggedUser
    //     try {
    //         const data =
    //             await InstallmentPaymentService.createInstallmentWalletPayment(
    //                 id,
    //                 req.body
    //             )

    //         res.status(201).json({
    //             success: true,
    //             statusCode: 201,
    //             message:
    //                 'User installment payment with wallet created successfully.',
    //             data,
    //         })
    //     } catch (error) {
    //         next(error)
    //     }
    // }

    // static async verifyWalletOtp(req, res, next) {
    //     const { id } = req.loggedUser
    //     const { installmentPaymentId } = req.params
    //     try {
    //         const data = await InstallmentPaymentService.verifyWalletOtp(
    //             id,
    //             installmentPaymentId
    //         )

    //         res.status(200).json({
    //             success: true,
    //             statusCode: 200,
    //             message:
    //                 'User installment payment with wallet paided successfully.',
    //             data,
    //         })
    //     } catch (error) {
    //         next(error)
    //     }
    // }
}

module.exports = InstallmentPaymentController
