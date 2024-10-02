const prisma = require('../../src/config/prisma.config')

class BusinessProfileEcommerce {
    static async main() {
        await prisma.business_profile_ecommerces.createMany({
            data: [
                {
                    ecommerce_id: 1,
                    business_profile_id: 1,
                },
                {
                    ecommerce_id: 2,
                    business_profile_id: 1,
                },
            ],
            skipDuplicates: true,
        })
    }
}

module.exports = BusinessProfileEcommerce
