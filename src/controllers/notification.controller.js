const NotificationService = require('../services/notification.service')

class NotificationController {
    static async getAllNotification(req, res, next) {
        try {
            const data = await NotificationService.getAllNotification()

            res.status(200).json({
                success: true,
                statusCode: 200,
                message: 'User notification data retrieved successfully.',
                data,
            })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = NotificationController
