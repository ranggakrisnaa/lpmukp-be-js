const InstallmentService = require('../services/installment.service')

class InstallmentController {
    static async createLoanInterest(req, res, next) {
        try {
            await InstallmentService.createLoanInterest(req.body)

            res.status(201).json({
                success: true,
                statusCode: 201,
                message: 'Loan interest created successfully.',
            })
        } catch (error) {
            next(error)
        }
    }

    static async updateLoanInterest(req, res, next) {
        const { id } = req.params
        try {
            await InstallmentService.updateLoanInterest(+id, req.body)

            res.status(200).json({
                success: true,
                statusCode: 200,
                message: 'Loan interest updated successfully.',
            })
        } catch (error) {
            next(error)
        }
    }

    static async createPlafond(req, res, next) {
        try {
            await InstallmentService.createPlafond(req.body)

            res.status(201).json({
                success: true,
                statusCode: 201,
                message: 'Plafond created successfully.',
            })
        } catch (error) {
            next(error)
        }
    }

    static async updatePlafond(req, res, next) {
        const { id } = req.params
        try {
            await InstallmentService.updatePlafond(+id, req.body)

            res.status(200).json({
                success: true,
                statusCode: 200,
                message: 'Plafond updated successfully.',
            })
        } catch (error) {
            next(error)
        }
    }

    static async getAllInstallment(req, res, next) {
        try {
            const data = await InstallmentService.getAllInstallment()

            res.status(200).json({
                success: true,
                statusCode: 200,
                message: 'Installment data retrieved successfully.',
                data,
            })
        } catch (error) {
            next(error)
        }
    }

    static async getDetailInstallment(req, res, next) {
        const { plafond_id, loan_interest_id } = req.query
        try {
            const data = await InstallmentService.getDetailInstallment(
                +plafond_id,
                +loan_interest_id
            )

            res.status(200).json({
                success: true,
                statusCode: 200,
                message: 'Installment data retrieved successfully.',
                data,
            })
        } catch (error) {
            next(error)
        }
    }

    static async getAllLoanInterest(req, res, next) {
        try {
            const data = await InstallmentService.getAllLoanInterest()

            res.status(200).json({
                success: true,
                statusCode: 200,
                message: 'Loan interest data retrieved successfully.',
                data,
            })
        } catch (error) {
            next(error)
        }
    }

    static async getAllPlafond(req, res, next) {
        try {
            const data = await InstallmentService.getAllPlafond()

            res.status(200).json({
                success: true,
                statusCode: 200,
                message: 'Plafond data retrieved successfully.',
                data,
            })
        } catch (error) {
            next(error)
        }
    }

    static async deleteLoanInterest(req, res, next) {
        const { id } = req.query
        try {
            await InstallmentService.deleteLoanInterest(id)

            res.status(200).json({
                success: true,
                statusCode: 200,
                message: 'Loan interest deleted successfully.',
            })
        } catch (error) {
            next(error)
        }
    }

    static async deletePlafond(req, res, next) {
        const { id } = req.query
        try {
            await InstallmentService.deletePlafond(id)

            res.status(200).json({
                success: true,
                statusCode: 200,
                message: 'Plafond deleted successfully.',
            })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = InstallmentController
