const config = require('../config/dotenv.config')

const ProfileService = require('../services').ProfileService

class ProfileController {
    static async addFileUpload(req, res, next) {
        const { id } = req.loggedUser
        try {
            await ProfileService.addFileUpload(id, req.files)

            res.status(201).json({
                success: true,
                statusCode: 201,
                message: 'User identity card images created successfully.',
            })
        } catch (error) {
            next(error)
        }
    }

    static async addFileUploadPartner(req, res, next) {
        const { id } = req.loggedUser
        try {
            const data = await ProfileService.addFileUploadPartner(
                id,
                req.files
            )

            res.status(201).json({
                success: true,
                statusCode: 201,
                message: 'User identity card images created successfully.',
                profileId: data.profile_id,
            })
        } catch (error) {
            next(error)
        }
    }

    static async addProfileImage(req, res, next) {
        const { id } = req.loggedUser
        try {
            await ProfileService.addProfileImage(id, req.file)
            res.status(201).json({
                success: true,
                statusCode: 201,
                message: 'User profile images created successfully.',
            })
        } catch (error) {
            next(error)
        }
    }

    static async addUserProfile(req, res, next) {
        const { id } = req.loggedUser
        try {
            await ProfileService.addUserProfile(id, req.body)

            res.status(201).json({
                success: true,
                statusCode: 201,
                message: 'User profile created successfully.',
            })
        } catch (error) {
            next(error)
        }
    }

    static async addBusinessProfile(req, res, next) {
        const { id } = req.loggedUser
        try {
            await ProfileService.addBusinessProfile(id, req.body)

            res.status(201).json({
                success: true,
                statusCode: 201,
                message: 'User Bussiness profile created successfully.',
            })
        } catch (error) {
            next(error)
        }
    }

    static async updateProfileUser(req, res, next) {
        const { id } = req.loggedUser
        try {
            await ProfileService.updateUserProfile(id, req.body)

            res.status(200).json({
                success: true,
                statusCode: 200,
                message: 'User profile updated successfully.',
            })
        } catch (error) {
            next(error)
        }
    }

    static async updateBusinessProfile(req, res, next) {
        const { id } = req.loggedUser
        try {
            await ProfileService.updateBusinessProfile(id, req.body)

            res.status(200).json({
                success: true,
                statusCode: 200,
                message: 'User bussiness profile updated successfully.',
            })
        } catch (error) {
            next(error)
        }
    }

    static async getUserProfile(req, res, next) {
        const { id } = req.loggedUser
        try {
            const data = await ProfileService.getUserProfile(id)

            res.status(200).json({
                success: true,
                statusCode: 200,
                message: 'User profile data retrivied successfully.',
                data,
            })
        } catch (error) {
            next(error)
        }
    }

    static async updatePhoneNumber(req, res, next) {
        const { id } = req.loggedUser
        try {
            const { new_phone_number, otp } =
                await ProfileService.updatePhoneNumber(req.body, id)

            res.cookie('phone_number', new_phone_number, {
                httpOnly: true,
                secure: config.NODE_ENV === 'production',
            })
                .status(200)
                .json({
                    success: true,
                    statusCode: 200,
                    message: 'User phone number otp generated successfulyy.',
                    otp,
                })
        } catch (error) {
            next(error)
        }
    }

    static async verifyUpdatePhoneNumber(req, res, next) {
        const { id } = req.loggedUser
        try {
            await ProfileService.verifyUpdatePhoneNumber(req, id)

            res.clearCookie('otp')
                .clearCookie('phone_number')
                .status(200)
                .json({
                    success: true,
                    statusCode: 200,
                    message: 'User phone number updated successfulyy.',
                })
        } catch (error) {
            next(error)
        }
    }

    static async addBusinessAccount(req, res, next) {
        const { id } = req.loggedUser
        try {
            await ProfileService.addBusinessAccount(req.body, id)

            res.status(201).json({
                success: true,
                statusCode: 201,
                message: 'User bussiness account created successfully.',
            })
        } catch (error) {
            next(error)
        }
    }

    static async getBusinessProfile(req, res, next) {
        const { id } = req.loggedUser
        try {
            const data = await ProfileService.getBusinessProfile(id)

            res.status(200).json({
                success: true,
                statusCode: 200,
                message: 'User bussiness profile data retrieved successfully.',
                data,
            })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = ProfileController
