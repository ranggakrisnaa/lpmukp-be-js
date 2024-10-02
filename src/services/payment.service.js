const { default: axios } = require('axios')
const config = require('../config/dotenv.config')
const prisma = require('../config/prisma.config')

class PaymentService {
    static async getBankList() {
        const listBank = await axios.get(
            `${config.XENDIT_BASE_URL}${config.XENDIT_ENV}${config.XENDIT_PAYMENT}/va/get-bank-list`,
            {
                headers: {
                    'Account-Key': `${config.XENDIT_ACCOUNT_KEY}`,
                    'Service-Key': `${config.XENDIT_SERVICE_KEY}`,
                    'Payment-Service-Key': `${config.XENDIT_PAYMENT_SERVICE_KEY}`,
                },
            }
        )

        return listBank.data.data
    }

    static async getAllPaymentMethod() {
        return await prisma.payment_methods.findMany()
    }
}

module.exports = PaymentService
