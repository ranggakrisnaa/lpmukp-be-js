const UserService = require('../services/user.service')

class UserController {
    static async getUserAccount(req, res, next) {
        const { id } = req.loggedUser
        try {
            const data = await UserService.getUserAccount(id)

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

    static async updateUserAccount(req, res, next) {
        const { id } = req.loggedUser
        try {
            await UserService.updateUserAccount(req.body, id)

            res.status(200).json({
                success: true,
                statusCode: 200,
                message: 'User account updated successfully',
            })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = UserController
