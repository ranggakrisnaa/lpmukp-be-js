const LoanBillService = require('../services/loan_bill.service')

class LoanBillController {
    static async getAllLoanBill(req, res, next) {
        const { pageNumber = 1, pageSize = 10 } = req.query
        const { id } = req.loggedUser
        try {
            const { data, pagination } = await LoanBillService.getAllLoanBill(
                pageNumber,
                pageSize,
                id
            )
            res.status(200).json({
                success: true,
                statusCode: 200,
                message: 'Loan bill data retrieved successfully.',
                data,
                pagination,
            })
        } catch (error) {
            next(error)
        }
    }

    static async getLoanBillById(req, res, next) {
        const { loanBillId } = req.params
        try {
            const data = await LoanBillService.getLoanBillById(+loanBillId)
            res.status(200).json({
                success: true,
                statusCode: 200,
                message: 'Loan bill data retrieved successfully.',
                data,
            })
        } catch (error) {
            next(error)
        }
    }

    static async getNowLoanBill(req, res, next) {
        try {
            const data = await LoanBillService.getNowLoanBill()
            res.status(200).json({
                success: true,
                statusCode: 200,
                message: 'Loan bill data retrieved successfully.',
                data,
            })
        } catch (error) {
            next(error)
        }
    }

    static async getInvoiceSettlement(req, res, next) {
        try {
            const data = await LoanBillService.getInvoiceSettlement()
            res.status(200).json({
                success: true,
                statusCode: 200,
                message: 'Loan bill invoice settlement retrieved successfully.',
                data,
            })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = LoanBillController
