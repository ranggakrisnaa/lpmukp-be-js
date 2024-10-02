const prisma = require('../config/prisma.config')
const PrismaUtil = require('../utils/prisma.util')

class PaymentMethodService {
    static async getAllPaymentMethods(paymentCode) {
        const data = await prisma.payment_methods.findMany({
            where: {
                code: {
                    contains: paymentCode,
                },
            },
        })

        return data.map((payment) => PrismaUtil.excludeField(payment, ['id']))
    }
}

module.exports = PaymentMethodService
