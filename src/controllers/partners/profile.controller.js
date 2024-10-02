const ProfileService = require('../../services/partners/profile.service')

class ProfileController {
    static async getProfileAccount(req, res, next) {
        const { id } = req.loggedUser
        try {
            const data = await ProfileService.getProfileAccount(id)

            res.status(200).json({
                success: true,
                statusCode: 200,
                message: 'User data retrieved successfully',
                data,
            })
        } catch (error) {
            next(error)
        }
    }

    static async updateProfileAccount(req, res, next) {
        const { id } = req.loggedUser
        try {
            await ProfileService.updateProfileAccount(req.body, id)

            res.status(200).json({
                success: true,
                statusCode: 200,
                message: 'User account updated successfully',
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
}

module.exports = ProfileController
