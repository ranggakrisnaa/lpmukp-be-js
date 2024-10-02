const prisma = require('../../src/config/prisma.config')
const harborsData = require('../../public/data/harbors_convert.json')

class Harbor {
    static async main() {
        await prisma.harbors.createMany({
            data: harborsData.map((item) => {
                const { name, location } = item
                return {
                    name,
                    location,
                }
            }),
            skipDuplicates: true,
        })
    }
}

module.exports = Harbor
