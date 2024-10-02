const ProfileController = require('../../controllers/partners/profile.controller')
const UploadMiddleware = require('../../middlewares/upload.middleware')

const router = require('express').Router()

router.get('/profiles', ProfileController.getProfileAccount)
router.put('/profiles', ProfileController.updateProfileAccount)
router.post(
    '/profiles/profile-images',
    UploadMiddleware.initializeUpload().single('profile-image'),
    ProfileController.addProfileImage
)

module.exports = router
