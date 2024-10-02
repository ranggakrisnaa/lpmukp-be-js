const prisma = require('../config/prisma.config')
const { ErrHandler } = require('../middlewares/errhandler.middleware')

class CultivationService {
    static async addCultivationPond(id, reqBody) {
        const payload = {
            user_id: id,
            ...reqBody,
        }

        return await prisma.cultivation.create({
            data: payload,
        })
    }

    static async addSeedSpread(reqBody) {
        const foundCultivation = await prisma.cultivation.findFirst({
            where: { id: reqBody.cultivation_id },
        })
        if (!foundCultivation)
            throw new ErrHandler(404, 'Cultivation data is not found.')

        const payload = {
            ...reqBody,
            cultivation_id: foundCultivation.id,
            spread_date: new Date(reqBody.spread_date),
        }

        return await prisma.seedSpread.create({ data: payload })
    }

    static async addCultivationReport(reqBody) {
        const foundCultivation = await prisma.cultivation.findFirst({
            where: { id: reqBody.cultivation_id },
        })
        if (!foundCultivation)
            throw new ErrHandler(404, 'Cultivation data is not found.')

        const payload = {
            ...reqBody,
            date: new Date(reqBody.date),
        }
        return await prisma.cultivationReport.create({ data: payload })
    }

    static async addCultivationResult(id, reqBody) {
        const { cultivation_id, ...restReqBody } = reqBody
        const foundCultivation = await prisma.cultivation.findFirst({
            where: { id: cultivation_id },
        })
        if (!foundCultivation)
            throw new ErrHandler(404, 'Cultivation data is not found.')

        const payload = {
            ...restReqBody,
            tanggal_panen: new Date(reqBody.tanggal_panen),
        }

        return prisma.$transaction(async (tx) => {
            const cultivationResult = await tx.cultivationResult.create({
                data: payload,
            })

            return await tx.cultivation.update({
                where: {
                    id: foundCultivation.id,
                },
                data: {
                    cultivation_result_id: cultivationResult.id,
                },
            })
        })
    }

    static async getAllCultivation() {
        return prisma.cultivation.findMany({
            select: {
                pond_name: true,
                pond_address: true,
                status: true,
            },
        })
    }

    static async getCultivationById(id) {
        const data = prisma.cultivation.findFirst({
            where: { id },
            include: {
                SeedSpread: true,
            },
        })
        if (!data) throw new ErrHandler(404, 'Cultivation data is not found.')

        return data
    }

    static async getAllComodityType(comodityName) {
        return await prisma.comodityType.findMany({
            where: {
                name: {
                    contains: comodityName,
                },
            },
        })
    }
}

module.exports = CultivationService
