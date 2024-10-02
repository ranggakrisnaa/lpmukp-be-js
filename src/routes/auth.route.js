const router = require('express').Router()
const AuthController = require('../controllers/index').AuthController
const AuthMiddleware = require('../middlewares/auth.middleware')
const Validator = require('../middlewares/validator.middleware')
const JoiUtil = require('../utils/joi.util')

router.post(
    '/auth/register',
    Validator.validate(JoiUtil.registerSchema),
    AuthController.userRegister
)
router.post(
    '/auth/login',
    Validator.validate(JoiUtil.loginSchema),
    AuthController.userLogin
)
router.post('/auth/generate-otp/:phoneNumber', AuthController.generateOtp)
router.post(
    '/auth/verify-otp/:userId',
    Validator.validate(JoiUtil.otpSchema),
    AuthMiddleware.verifyOtp,
    AuthController.createAuthToken
)
router.post('/auth/refresh-token', AuthController.refreshToken)
router.post('/auth/logout', AuthController.logoutUser)

module.exports = router
