const prisma = require('../config/prisma.config')
const PrismaUtil = require('../utils/prisma.util')

class BankService {
    static async getAllBanks(bankName) {
        let query = {}
        if (bankName) {
            query = {
                where: {
                    OR: [
                        {
                            code: {
                                contains: bankName,
                            },
                        },
                        {
                            name: {
                                contains: bankName,
                            },
                        },
                    ],
                },
            }
        }
        const data = await prisma.banks.findMany({
            ...query,
        })

        return data.map((bank) => PrismaUtil.excludeField(bank, ['id']))
    }
}

module.exports = BankService
