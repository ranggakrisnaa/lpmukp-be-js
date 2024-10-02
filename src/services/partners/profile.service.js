const prisma = require('../../config/prisma.config')
const { ErrHandler } = require('../../middlewares/errhandler.middleware')
const UserRepository = require('../../repositories/user.repository')
const FsUtil = require('../../utils/fs.util')
const config = require('../../config/dotenv.config')

class ProfileService {
    static async getProfileAccount(id) {
        const foundUser = await prisma.users.findFirst({
            where: { id },
            select: {
                name: true,
                phone_number: true,
                profiles: {
                    select: {
                        nik: true,
                        email: true,
                        gender: true,
                        photo: true,
                    },
                },
            },
        })
        if (!foundUser) throw new ErrHandler(404, 'User is not found.')

        return foundUser
    }

    static async updateProfileAccount(reqBody, id) {
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
                profiles: {
                    update: {
                        email: reqBody.email,
                        gender: reqBody.gender,
                    },
                },
            },
        })
    }
    static async addProfileImage(id, reqFile) {
        const foundUser = await UserRepository.findUserbyId(id)
        const foundProfile = await prisma.profiles.findFirst({
            where: {
                user_id: foundUser.id,
            },
        })

        const imageUrl = foundProfile?.photo?.split('/').pop()
        FsUtil.deleteFileExists(imageUrl)

        if (!reqFile) throw new ErrHandler(404, 'File image is not found.')

        const imagePath = `${config.APP_URL}/images/${reqFile?.filename}`

        return await prisma.profiles.update({
            where: {
                id: foundProfile.id,
            },
            data: {
                photo: imagePath,
            },
        })
    }
}

module.exports = ProfileService
