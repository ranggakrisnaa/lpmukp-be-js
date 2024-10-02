const { default: axios } = require('axios')
const OTPAuth = require('otpauth')
const config = require('../config/dotenv.config')

class OtpauthUtil {
    static totp = new OTPAuth.TOTP({
        issuer: 'ACME',
        label: 'AzureDiamond',
        algorithm: 'SHA1',
        digits: 4,
        period: 180,
        secret: 'NB2W45DFOIZA',
    })

    static generateTOTP() {
        return this.totp.generate()
    }

    static validateTOTP(token) {
        return this.totp.validate({ token, window: 1 })
    }

    static async generateOTP(phonenumber) {
        return await axios.post(
            `${config.XENDIT_BASE_URL}${config.XENDIT_ENV2}/otp/wa`,
            {
                phonenumber,
            },
            {
                headers: {
                    'Account-Key': `${config.XENDIT_ACCOUNT_KEY}`,
                    'Service-Key': `${config.XENDIT_SERVICE_KEY}`,
                    'OTP-Service-Key': `${config.ADS_SERVICE_OTP_KEY}`,
                },
            }
        )
    }
}

module.exports = OtpauthUtil
