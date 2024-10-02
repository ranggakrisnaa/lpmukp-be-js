const prisma = require('../config/prisma.config')
const PrismaUtil = require('../utils/prisma.util')

class WalletService {
    static async getUserWallet(id) {
        const data = await prisma.wallets.findFirst({
            where: {
                user_id: id,
            },
        })

        return PrismaUtil.excludeField(data, ['id', 'user_id'])
    }
}

module.exports = WalletService
