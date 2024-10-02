const AuthService = require('../../services/partners/auth.service')
const config = require('../../config/dotenv.config')

class AuthController {
    static async userRegister(req, res, next) {
        const { name, nik, phone_number } = req.body
        try {
            await AuthService.userRegister(name, nik, phone_number)

            res.status(201).json({
                success: true,
                statusCode: 201,
                message: 'User created successfully',
            })
        } catch (error) {
            next(error)
        }
    }

    static async userLogin(req, res, next) {
        const { phone_number } = req.body
        try {
            const data = await AuthService.userLogin(phone_number)

            res.status(200).json({
                success: true,
                statusCode: 200,
                message: 'User login successfully',
                userId: data.uuid,
            })
        } catch (error) {
            next(error)
        }
    }

    static async generateOtp(req, res, next) {
        const { phoneNumber } = req.params
        try {
            const token = await AuthService.generateOtp(phoneNumber)

            res.status(201).json({
                success: true,
                statusCode: 201,
                message: 'Token user generated successfully',
                token,
            })
        } catch (error) {
            next(error)
        }
    }

    static async createAuthToken(req, res, next) {
        const { otp } = req.body
        const { userId } = req.params
        try {
            const { accessToken, refreshToken, isUser } =
                await AuthService.createAuthToken(userId, otp)

            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                secure: config.NODE_ENV === 'production',
            })
                .cookie('Authorization', accessToken, {
                    httpOnly: true,
                    secure: config.NODE_ENV === 'production',
                })
                .status(200)
                .json({
                    success: true,
                    statusCode: 200,
                    message: 'User verified successfully',
                    as: isUser?.name,
                })
        } catch (error) {
            next(error)
        }
    }

    static async refreshToken(req, res, next) {
        const refreshToken = req.cookies['refreshToken']
        try {
            const accessToken = await AuthService.refreshToken(refreshToken)

            res.cookie('Authorization', accessToken).status(201).json({
                success: true,
                statusCode: 201,
                message: 'Refresh token has been generated successfully.',
            })
        } catch (error) {
            next(error)
        }
    }

    static async logoutUser(req, res, next) {
        try {
            res.clearCookie('Authorization')
                .clearCookie('refreshToken')
                .status(200)
                .json({
                    success: true,
                    statusCode: 200,
                    message: 'User logout successfully',
                })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = AuthController
