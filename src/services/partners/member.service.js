const { nikParser } = require('nik-parser')
const { ErrHandler } = require('../../middlewares/errhandler.middleware')
const UserRepository = require('../../repositories/user.repository')
const prisma = require('../../config/prisma.config')
const FsUtil = require('../../utils/fs.util')
const config = require('../../config/dotenv.config')

class MemberService {
    static async addMemberDebitur(name, nik, phone_number, gender, address) {
        let payload = { name, phone_number, credit_quality: 'Lancar' }

        const checkPhoneNumber =
            await UserRepository.findUserbyPhone(phone_number)
        if (checkPhoneNumber)
            throw new ErrHandler(401, 'Phone number has been registered.')

        const checkNik = await UserRepository.findUserbyNIK(nik)
        if (checkNik) throw new ErrHandler(401, 'NIK has been registered.')

        if (nik) {
            const checkNIK = nikParser(nik)
            if (!checkNIK.isValid())
                throw new ErrHandler(401, 'NIK doesn`t valid.')
        }

        return prisma.$transaction(async (tx) => {
            const user = await tx.users.create({ data: payload })

            await tx.profiles.create({
                data: {
                    nik,
                    user_id: user.id,
                    gender,
                    address,
                },
            })

            await tx.roles.create({
                data: { user_id: user.id, name: 'user' },
            })
            return user
        })
    }

    static async showAllMemberDebitur() {
        const debiturUsers = await prisma.users.findMany({
            where: {
                roles: {
                    name: 'user',
                },
            },
            select: {
                id: true,
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
        return debiturUsers
    }

    static async showDetailMemberDebitur(id) {
        const foundUser = await prisma.users.findFirst({
            where: {
                id,
                roles: {
                    name: 'user',
                },
            },
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

    static async updateMemberDebitur(id, reqBody) {
        const foundUser = await prisma.users.findFirst({
            where: {
                id,
            },
        })
        if (!foundUser) throw new ErrHandler(404, 'User is not found.')

        const checkPhoneNumber = await UserRepository.findUserbyPhone(
            reqBody.phone_number
        )
        if (
            checkPhoneNumber &&
            checkPhoneNumber.phone_number != reqBody.phone_number
        )
            throw new ErrHandler(401, 'Phone number has been registered.')

        const checkNik = await UserRepository.findUserbyNIK(reqBody.nik)
        if (checkNik && checkNik.nik != reqBody.nik)
            throw new ErrHandler(401, 'NIK has been registered.')

        if (reqBody.nik) {
            const checkNIK = nikParser(reqBody.nik)
            if (!checkNIK.isValid())
                throw new ErrHandler(401, 'NIK doesn`t valid.')
        }

        return await prisma.users.update({
            where: {
                id: id,
            },
            data: {
                name: reqBody.name,
                phone_number: reqBody.phone_number,

                profiles: {
                    update: {
                        nik: reqBody.nik,
                        gender: reqBody.gender,
                        address: reqBody.address,
                    },
                },
            },
        })
    }

    static async addProfileImageDebitur(id, reqFile) {
        const foundUser = await UserRepository.findUserbyId(id)
        const foundProfile = await prisma.profiles.findFirst({
            where: {
                user_id: foundUser.id,
            },
        })

        const imageUrl = foundProfile?.photo?.split('/').pop()
        FsUtil.deleteFileExists(imageUrl)

        if (!reqFile) throw new ErrHandler(404, 'File image is not found.')

        const imagePath = `http://localhost:${config.PORT}/images/${reqFile?.filename}`

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

module.exports = MemberService
