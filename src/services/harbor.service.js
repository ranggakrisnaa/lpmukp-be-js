const prisma = require('../config/prisma.config')

class HarborService {
    static async getAllHarbors(keywords) {
        let query = {}
        if (keywords) {
            query = {
                where: {
                    OR: [
                        {
                            name: {
                                contains: keywords,
                            },
                        },
                        {
                            location: {
                                contains: keywords,
                            },
                        },
                    ],
                },
            }
        }

        return await prisma.harbors.findMany({
            ...query,
        })
    }
}

module.exports = HarborService
