const prisma = require('../../src/config/prisma.config')

class Installment {
    static async main() {
        await prisma.installments.createMany({
            data: [
                {
                    id: 999999999999,
                    loan_interest_id: 1,
                    plafond_id: 1,
                    tagihan: 430317,
                    total_tagihan: 5160000,
                },
            ],
            skipDuplicates: true,
        })
    }
}

module.exports = Installment
