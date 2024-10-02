const prisma = require('../../src/config/prisma.config')

class Wallet {
    static async main() {
        await prisma.wallets.createMany({
            data: [
                {
                    id: 1,
                    name: 'rangga',
                    balance: 30000000,
                    user_id: 1,
                },
            ],
            skipDuplicates: true,
        })
    }
}

module.exports = Wallet
