const prisma = require('../../src/config/prisma.config')

class BusinessType {
    static async main() {
        await prisma.business_types.createMany({
            data: [
                { name: 'Penangkapan' },
                { name: 'Budidaya' },
                { name: 'Pengolahan' },
                { name: 'Pemasaran' },
                { name: 'Garam' },
                { name: 'Jasa' },
            ],
            skipDuplicates: true,
        })
    }
}

module.exports = BusinessType
