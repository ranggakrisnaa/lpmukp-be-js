const prisma = require('../config/prisma.config')

class UserRepository {
    static async findUserbyId(id) {
        return await prisma.users.findFirst({ where: { id } })
    }

    static async findUserProfileAndBussiness(id) {
        return await prisma.users.findFirst({
            where: { id },
            select: {
                profiles: {
                    include: {
                        villages: true,
                        districts: true,
                        cities: true,
                        provinces: true,
                    },
                },
            },
        })
    }

    static async findUserbyUUID(id) {
        return await prisma.users.findFirst({
            where: { uuid: id },
            include: { roles: true },
        })
    }

    static async findUserbyNIK(nik) {
        return await prisma.profiles.findFirst({
            where: {
                nik,
            },
        })
    }

    static async findUserbyPhone(phone_number) {
        return await prisma.users.findFirst({
            where: {
                phone_number,
            },
            include: {
                roles: true,
            },
        })
    }

    static async createUser(payload) {
        return await prisma.users.create({ data: payload })
    }
}

module.exports = UserRepository
