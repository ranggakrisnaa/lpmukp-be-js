const MemberController = require('../../controllers/partners/member.controller')
const UploadMiddleware = require('../../middlewares/upload.middleware')

const router = require('express').Router()

router.get('/members/:memberId', MemberController.showDetailMemberDebitur)
router.post('/members/', MemberController.addMemberDebitur)
router.get('/members/', MemberController.showAllMemberDebitur)
router.put('/members/:memberId', MemberController.updateMemberDebitur)
router.post(
    '/members/profile-images/:memberId',
    UploadMiddleware.initializeUpload().single('profile-image'),
    MemberController.addProfileImageDebitur
)

module.exports = router
