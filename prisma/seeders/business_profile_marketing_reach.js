const prisma = require('../../src/config/prisma.config')

class BusinessProfileMarketingReach {
    static async main() {
        await prisma.business_profile_marketing_reaches.createMany({
            data: [
                {
                    marketing_reach_id: 1,
                    business_profile_id: 1,
                },
                {
                    marketing_reach_id: 2,
                    business_profile_id: 1,
                },
            ],
            skipDuplicates: true,
        })
    }
}

module.exports = BusinessProfileMarketingReach
