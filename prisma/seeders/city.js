const prisma = require('../../src/config/prisma.config')
const citiesData = require('../../public/data/cities_convert.json')

class City {
    static async main() {
        await prisma.cities.createMany({
            data: citiesData.map((item) => {
                const { id, name, type, provinsi_id } = item
                return {
                    id: +id,
                    name,
                    type,
                    province_id: +provinsi_id,
                }
            }),
            skipDuplicates: true,
        })
    }
}

module.exports = City
