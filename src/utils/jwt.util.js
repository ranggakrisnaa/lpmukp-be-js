const jwt = require('jsonwebtoken')
const config = require('../config/dotenv.config')
const privateKey = config.JWT_KEY

class JwtUtil {
    static signToken(userId, expired) {
        return jwt.sign({ userId: userId }, privateKey, { expiresIn: expired })
    }

    static verifyToken(token) {
        return jwt.verify(token, privateKey)
    }
}

module.exports = JwtUtil
