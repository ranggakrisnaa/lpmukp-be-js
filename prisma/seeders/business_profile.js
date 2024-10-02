const prisma = require('../../src/config/prisma.config')

class BusinessProfile {
    static async main() {
        await prisma.business_profiles.createMany({
            data: [
                {
                    id: 1,
                    name: 'usaha ikan cupang',
                    harbor_id: 3,
                    lama_usaha: '4 tahun',
                    jenis_asset: 'motor',
                    estimasi_nilai_asset: 10000000,
                    user_id: 1,
                    business_type_id: 1,
                },
            ],
            skipDuplicates: true,
        })
    }
}

module.exports = BusinessProfile
