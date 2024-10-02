const HarborService = require('../services/harbor.service')

class HarborController {
    static async getAllHarbors(req, res, next) {
        const { keywords } = req.query
        try {
            const data = await HarborService.getAllHarbors(keywords)

            res.status(200).json({
                success: true,
                statusCode: 200,
                message: 'Harbor data retrieved successfully.',
                data,
            })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = HarborController
