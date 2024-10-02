const router = require('express').Router()
const NotificationController = require('../controllers/notification.controller')

router.get('/notifications', NotificationController.getAllNotification)

module.exports = router
