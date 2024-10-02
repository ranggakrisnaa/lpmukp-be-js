const prisma = require('../../src/config/prisma.config')

class LoanInterest {
    static async main() {
        await prisma.loan_interests.createMany({
            data: [
                {
                    id: 1,
                    bunga_pinjaman: 0.267,
                },
            ],
            skipDuplicates: true,
        })
    }
}

module.exports = LoanInterest
