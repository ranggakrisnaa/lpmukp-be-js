const prisma = require('../../src/config/prisma.config')
const comodityData = require('../../public/data/comodity.json')

class ComodityType {
    static async main() {
        await prisma.comodityType.createMany({
            data: comodityData.map((data) => {
                return {
                    name: data.nama,
                    price: data.harga,
                }
            }),
            skipDuplicates: true,
        })
    }
}

module.exports = ComodityType
