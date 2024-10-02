const { ErrHandler } = require('./errhandler.middleware')
const { ADS_KEY } = require('../config/dotenv.config')

class ApiKeyMiddleware {
    static async addApiKeyAuthorization(req, res, next) {
        try {
            const apiKey = req.header('ADS-Key')
            if (!apiKey || apiKey != ADS_KEY)
                throw new ErrHandler(
                    403,
                    'Api key authorization is not found or key is missmatch.'
                )

            next()
        } catch (error) {
            next(error)
        }
    }
}

module.exports = ApiKeyMiddleware
