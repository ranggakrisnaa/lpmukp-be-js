const BankService = require('../services/bank.service')

class BankController {
    static async getAllBanks(req, res, next) {
        const { bankName } = req.query
        try {
            const data = await BankService.getAllBanks(bankName)

            res.status(200).json({
                success: true,
                statusCode: 200,
                message: 'Data bank retrieved successfully',
                data,
            })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = BankController
