const TransactionHistoryService = require('../services/transaction_history.service')

class TransactionHistoryController {
    static async getAllTransactionHistories(req, res, next) {
        const { id } = req.loggedUser
        const {
            pageNumber = 1,
            pageSize = 10,
            transactionType,
            transactionDate,
        } = req.query
        try {
            const data =
                await TransactionHistoryService.getAllTransactionHistories(
                    id,
                    pageNumber,
                    pageSize,
                    transactionType,
                    transactionDate
                )

            res.status(200).json({
                success: true,
                statusCode: 200,
                message: 'Transaction data retrieved successfully.',
                data,
            })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = TransactionHistoryController
