const WalletService = require('../services/wallet.service')

class WalletController {
    static async getUserWallet(req, res, next) {
        const { id } = req.loggedUser
        try {
            const data = await WalletService.getUserWallet(id)

            res.status(200).json({
                success: true,
                statusCode: 200,
                message: 'Wallet data user retrieved successfully.',
                data,
            })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = WalletController
