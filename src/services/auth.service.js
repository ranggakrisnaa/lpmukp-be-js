const { nikParser } = require('nik-parser')
const { ErrHandler } = require('../middlewares/errhandler.middleware')
const UserRepository = require('../repositories/user.repository')
const JwtUtil = require('../utils/jwt.util')
const prisma = require('../config/prisma.config')
const OtpauthUtil = require('../utils/otpauth.util')

class AuthService {
    static async userRegister(name, nik, phone_number) {
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
            const data = await tx.users.create({ data: payload })

            await tx.profiles.create({ data: { nik, user_id: data.id, name } })

            await tx.roles.create({
                data: { user_id: data.id, name: 'user' },
            })

            return data
        })
    }

    static async userLogin(phone_number) {
        const foundUser = await UserRepository.findUserbyPhone(phone_number)
        if (!foundUser) throw new ErrHandler(404, 'User is not found.')

        return foundUser
    }

    static async generateOtp(phone_number) {
        const foundUser = await UserRepository.findUserbyPhone(phone_number)
        if (!foundUser) throw new ErrHandler(404, 'User is not found.')

        const response = await OtpauthUtil.generateOTP(phone_number)
        const otp = response.data.data

        const currentTime = new Date()
        const expiredTime = new Date(currentTime.getTime() + 3 * 60 * 1000)

        let otp_try_daily = foundUser.otp_try_daily
        const foundOtpDay = new Date(foundUser.otp_expired_at)

        // validate if change day reset otp try daily to 0
        if (currentTime.getDay() != foundOtpDay.getDay()) otp_try_daily = 0

        await prisma.users.update({
            where: { id: foundUser.id },
            data: {
                otp_code: +otp,
                otp_expired_at: expiredTime,
                otp_try_daily: otp_try_daily + 1,
            },
        })

        return otp
    }

    static async createAuthToken(userId) {
        const foundUser = await UserRepository.findUserbyUUID(userId)
        if (!foundUser) throw new ErrHandler(404, 'User is not found.')

        const accessToken = JwtUtil.signToken(foundUser.uuid, '3h')
        const refreshToken = JwtUtil.signToken(foundUser.uuid, '1d')

        const isUser = await prisma.roles.findFirst({
            where: { user_id: foundUser.id },
        })

        return { accessToken, refreshToken, isUser: isUser?.name }
    }

    static async refreshToken(refreshToken) {
        if (!refreshToken)
            throw new ErrHandler(
                401,
                'Access Denied. No refresh token provided.'
            )

        const decoded = JwtUtil.verifyToken(refreshToken)
        const accessToken = JwtUtil.signToken(decoded.id, '1h')

        return accessToken
    }
}

module.exports = AuthService
