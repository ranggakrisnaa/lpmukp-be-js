const prisma = require('../config/prisma.config')
const UserRepository = require('../repositories/user.repository')
const JwtUtil = require('../utils/jwt.util')
// const OtpauthUtil = require('../utils/otpauth.util')
const { ErrHandler } = require('./errhandler.middleware')

class AuthMiddleware {
    static async Authentication(req, _, next) {
        try {
            const accessToken = req.cookies['Authorization']
            const refreshToken = req.cookies['refreshToken']

            if (!accessToken && !refreshToken)
                throw new ErrHandler(401, 'Unauthenticated user.')

            const decoded = JwtUtil.verifyToken(accessToken)
            const foundUser = await UserRepository.findUserbyUUID(
                decoded.userId
            )
            if (!foundUser) throw new ErrHandler(404, 'User is not found.')

            const role = await prisma.roles.findFirst({
                where: { user_id: foundUser.id },
            })

            req.loggedUser = { id: foundUser.id, role: role.name }
            next()
        } catch (error) {
            next(error)
        }
    }

    static checkRole(role) {
        return function (req, res, next) {
            try {
                if (!req.loggedUser)
                    throw new ErrHandler(401, 'Unauthenticated user.')

                if (req.loggedUser.role != role)
                    throw new ErrHandler(403, 'Unauthorized user role.')
                next()
            } catch (error) {
                next(error)
            }
        }
    }

    static async verifyOtp(req, _, next) {
        const { otp } = req.body
        const { userId } = req.params
        try {
            if (!otp && !userId)
                throw new ErrHandler(401, 'Please input otp first.')

            const foundUser = await UserRepository.findUserbyUUID(userId)
            if (!foundUser) throw new ErrHandler(404, 'User is not found.')

            const foundOtpDay = new Date(foundUser.otp_expired_at)
            if (
                foundOtpDay < new Date() ||
                otp != foundUser.otp_code ||
                !foundUser.otp_code
            )
                throw new ErrHandler(401, 'Token otp is invalid or expired.')

            next()
        } catch (error) {
            next(error)
        }
    }
}

module.exports = AuthMiddleware
