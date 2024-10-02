const prisma = require('../../src/config/prisma.config')

class Ecommerce {
    static async main() {
        await prisma.ecommerces.createMany({
            data: [
                { name: 'Shopee' },
                { name: 'Tokopedia' },
                { name: 'Bukalapak' },
                { name: 'Facebook' },
                { name: 'Instagram' },
            ],
        })
    }
}

module.exports = Ecommerce
