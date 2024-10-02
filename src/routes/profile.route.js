const router = require('express').Router()
const ProfileController = require('../controllers/index').ProfileController
const UploadMiddleware = require('../middlewares/upload.middleware')
const Validator = require('../middlewares/validator.middleware')
const JoiUtil = require('../utils/joi.util')

router.post(
    '/profiles/file-upload',
    UploadMiddleware.initializeUpload().array('file-uploads', 4),
    ProfileController.addFileUpload
)
router.post(
    '/profiles/profile-images',
    UploadMiddleware.initializeUpload().single('profile-image'),
    ProfileController.addProfileImage
)
router.post(
    '/profiles/personal-profile',
    Validator.validate(JoiUtil.userProfileSchema),
    ProfileController.addUserProfile
)
router.put(
    '/profiles/personal-profile',
    Validator.validate(JoiUtil.userProfileUpdateSchema),
    ProfileController.updateProfileUser
)
router.post(
    '/profiles/business-profile',
    Validator.validate(JoiUtil.businessProfileSchema),
    ProfileController.addBusinessProfile
)
router.put(
    '/profiles/business-profile',
    Validator.validate(JoiUtil.businessProfileUpdateSchema),
    ProfileController.updateBusinessProfile
)
router.get('/profiles/personal-profile', ProfileController.getUserProfile)
router.post(
    '/profile/change-phonenumber',
    Validator.validate(JoiUtil.changePhoneNumberSchema),
    ProfileController.updatePhoneNumber
)
router.post(
    '/profile/change-phonenumber/verify',
    Validator.validate(JoiUtil.verifyChangePhoneNumberSchema),
    ProfileController.verifyUpdatePhoneNumber
)
router.post(
    '/profiles/business-account',
    Validator.validate(JoiUtil.businessAccountSchema),
    ProfileController.addBusinessAccount
)
router.get('/profiles/business-profile', ProfileController.getBusinessProfile)

module.exports = router
