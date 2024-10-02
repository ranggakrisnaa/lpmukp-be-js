const prisma = require('../config/prisma.config')
const { ErrHandler } = require('../middlewares/errhandler.middleware')

class RegionService {
    static async getAllProvince(query) {
        const data = await prisma.provinces.findMany({
            where: {
                name: {
                    contains: query,
                },
            },
        })
        if (!data) {
            throw new ErrHandler(404, 'Data province is not found.')
        }

        return data
    }

    static async getCityByProvinceId(query, provinceId) {
        const data = await prisma.cities.findMany({
            where: {
                OR: [
                    {
                        name: {
                            contains: query,
                        },
                        province_id: {
                            equals: provinceId,
                        },
                    },
                ],
            },
        })
        if (!data) throw new ErrHandler(404, 'Data city is not found.')

        return data
    }

    static async getDistrictByCityId(query, cityId) {
        const data = await prisma.districts.findMany({
            where: {
                OR: [
                    {
                        name: {
                            contains: query,
                        },
                        city_id: {
                            equals: cityId,
                        },
                    },
                ],
            },
        })
        if (!data) throw new ErrHandler(404, 'Data district is not found.')

        return data
    }

    static async getVillagesByDistrictId(query, districtId) {
        const data = await prisma.villages.findMany({
            where: {
                OR: [
                    {
                        name: {
                            contains: query,
                        },
                        district_id: {
                            equals: districtId,
                        },
                    },
                ],
            },
        })
        if (!data) throw new ErrHandler(404, 'Data village is not found.')

        return data
    }
}

module.exports = RegionService
