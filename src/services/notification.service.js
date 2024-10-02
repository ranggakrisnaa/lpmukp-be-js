const prisma = require('../config/prisma.config')

class NotificationService {
    static async getAllNotification() {
        return await prisma.notifications.findMany()
    }
}

module.exports = NotificationService
