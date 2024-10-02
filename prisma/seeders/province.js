const prisma = require('../../src/config/prisma.config')
const provinceData = require('../../public/data/provinces_convert.json')

class Province {
    static async main() {
        await prisma.provinces.createMany({
            data: provinceData.map((item) => {
                const { id, name } = item
                return {
                    id: +id,
                    name,
                }
            }),
            skipDuplicates: true,
        })
    }
}

module.exports = Province
