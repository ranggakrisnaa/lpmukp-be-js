const MemberService = require('../../services/partners/member.service')

class MemberController {
    static async addMemberDebitur(req, res, next) {
        const { name, nik, phone_number, gender, address } = req.body
        try {
            const data = await MemberService.addMemberDebitur(
                name,
                nik,
                phone_number,
                gender,
                address
            )

            res.status(201).json({
                success: true,
                statusCode: 201,
                message: 'Member created successfully',
                data,
            })
        } catch (error) {
            next(error)
        }
    }

    static async showDetailMemberDebitur(req, res, next) {
        const { memberId } = req.params
        try {
            const data = await MemberService.showDetailMemberDebitur(+memberId)

            res.status(200).json({
                success: true,
                statusCode: 200,
                message: 'Member data retrieved successfully',
                data,
            })
        } catch (error) {
            next(error)
        }
    }

    static async showAllMemberDebitur(req, res, next) {
        try {
            const data = await MemberService.showAllMemberDebitur()
            res.status(200).json({
                success: true,
                statusCode: 200,
                message: 'Member data updated successfully',
                data,
            })
        } catch (error) {
            next(error)
        }
    }

    static async updateMemberDebitur(req, res, next) {
        const { memberId } = req.params
        try {
            await MemberService.updateMemberDebitur(+memberId, req.body)

            res.status(200).json({
                success: true,
                statusCode: 200,
                message: 'Member data updated successfully',
            })
        } catch (error) {
            next(error)
        }
    }

    static async addProfileImageDebitur(req, res, next) {
        const { memberId } = req.params
        try {
            await MemberService.addProfileImageDebitur(+memberId, req.file)
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

module.exports = MemberController
