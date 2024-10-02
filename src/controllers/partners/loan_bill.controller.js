const LoanBillService = require('../../services/partners/loan_bill.service')

class LoanBillController {
    static async getDebtorLoanBill(req, res, next) {
        const { nik, contract_number } = req.query
        try {
            const data = await LoanBillService.getDebtorLoanBill(
                nik,
                contract_number
            )

            res.status(200).json({
                success: true,
                statusCode: 200,
                message: 'Debtor loan bill now retrieved successfully.',
                data,
            })
        } catch (error) {
            next(error)
        }
    }

    static async getAllDebtorLoanBill(req, res, next) {
        const { contractNumber } = req.query
        try {
            const data =
                await LoanBillService.getAllDebtorLoanBill(contractNumber)

            res.status(200).json({
                success: true,
                statusCode: 200,
                message: 'Debtor all loan bill retrieved successfully.',
                data,
            })
        } catch (error) {
            next(error)
        }
    }
    static async getDetailDebtorLoanBill(req, res, next) {
        const { id } = req.params
        try {
            const data = await LoanBillService.getDetailDebtorLoanBill(+id)

            res.status(200).json({
                success: true,
                statusCode: 200,
                message: 'Debtor loan bill detail retrieved successfully.',
                data,
            })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = LoanBillController
