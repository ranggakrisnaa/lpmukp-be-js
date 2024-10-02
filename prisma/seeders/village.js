const prisma = require('../../src/config/prisma.config')
const villageData = require('../../public/data/villages_convert.json')

class Village {
    static async main() {
        await prisma.villages.createMany({
            data: villageData.map((item) => {
                const { id, name, kecamatan_id, pos_code } = item
                return {
                    id: +id,
                    name,
                    district_id: +kecamatan_id,
                    postal_code: pos_code,
                }
            }),
            skipDuplicates: true,
        })
    }
}

module.exports = Village
