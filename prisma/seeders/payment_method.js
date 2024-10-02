const prisma = require('../../src/config/prisma.config')

class PaymentMethod {
    static async main() {
        await prisma.payment_methods.createMany({
            data: [
                {
                    id: 1,
                    type: 'Virtual Account',
                    name: 'Lpmukp-Transaction',
                    code: 'BNI',
                    account_name: 'LPMUKP',
                    account_number: '1982981322',
                    handling_cost: 3000,
                    percentage_cost: 0,
                    icon: 'BNI.jpg',
                },
                {
                    id: 2,
                    type: 'Virtual Account',
                    name: 'Lpmukp-Transaction',
                    code: 'MANDIRI',
                    account_name: 'LPMUKP',
                    account_number: '1982981322',
                    handling_cost: 3000,
                    percentage_cost: 0,
                    icon: 'MANDIRI.jpg',
                },
                {
                    id: 3,
                    type: 'Virtual Account',
                    name: 'Lpmukp-Transaction',
                    code: 'MANDIRI',
                    account_name: 'LPMUKP',
                    account_number: '1982981322',
                    handling_cost: 3000,
                    percentage_cost: 0,
                    icon: 'MANDIRI.jpg',
                },
            ],
            skipDuplicates: true,
        })
    }
}

module.exports = PaymentMethod
