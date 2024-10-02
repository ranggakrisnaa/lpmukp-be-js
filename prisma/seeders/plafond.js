const prisma = require('../../src/config/prisma.config')

class Plafond {
    static async main() {
        await prisma.plafonds.createMany({
            data: [
                {
                    id: 1,
                    plafond: 5000000,
                },
            ],
            skipDuplicates: true,
        })
    }
}

module.exports = Plafond
