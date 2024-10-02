const prisma = require('../config/prisma.config')
const { ErrHandler } = require('../middlewares/errhandler.middleware')

class UserService {
    static async getUserAccount(id) {
        const foundUser = await prisma.users.findFirst({
            where: { id },
            select: {
                name: true,
                phone_number: true,
                profiles: {
                    select: {
                        nik: true,
                    },
                },
            },
        })
        if (!foundUser) throw new ErrHandler(404, 'User is not found.')

        return foundUser
    }

    static async updateUserAccount(reqBody, id) {
        const foundUser = await prisma.users.findFirst({
            where: {
                id,
            },
        })
        if (!foundUser) throw new ErrHandler(404, 'User is not found.')

        return await prisma.users.update({
            where: {
                id: foundUser.id,
            },
            data: {
                name: reqBody.name,
            },
        })
    }
}

module.exports = UserService
