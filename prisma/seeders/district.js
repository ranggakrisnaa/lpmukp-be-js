const prisma = require('../../src/config/prisma.config')
const districtsData = require('../../public/data/districts_convert.json')

class District {
    static async main() {
        await prisma.districts.createMany({
            data: districtsData.map((item) => {
                const { id, name, kabupaten_id } = item
                return {
                    id: +id,
                    name,
                    city_id: +kabupaten_id,
                }
            }),
            skipDuplicates: true,
        })
    }
}

module.exports = District
