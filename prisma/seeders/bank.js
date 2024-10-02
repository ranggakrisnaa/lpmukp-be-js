const prisma = require('../../src/config/prisma.config')

class Bank {
    static async main() {
        await prisma.banks.createMany({
            data: [
                {
                    id: 1,
                    name: 'Bank Mandiri',
                    code: 'MANDIRI',
                    manual_cost: 0,
                    instant_cost: 0,
                    logo: 'mandiri.jpeg',
                },
                {
                    id: 2,
                    name: 'Bank Central Asia',
                    code: 'BCA',
                    manual_cost: 0,
                    instant_cost: 0,
                    logo: 'bca.jpeg',
                },
                {
                    id: 3,
                    name: 'Bank Negara Indonesia',
                    code: 'BNI',
                    manual_cost: 0,
                    instant_cost: 0,
                    logo: 'bni.jpeg',
                },
                {
                    id: 4,
                    name: 'Bank Rakyat Indonesia',
                    code: 'BRI',
                    manual_cost: 0,
                    instant_cost: 0,
                    logo: 'bri.jpeg',
                },
            ],
            skipDuplicates: true,
        })
    }
}

module.exports = Bank
