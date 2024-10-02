const prisma = require('../../src/config/prisma.config')

class MarketingReach {
    static async main() {
        await prisma.marketing_reaches.createMany({
            data: [
                { name: 'Menjual sendiri ke Pasar Traditional' },
                {
                    name: 'Suplai ke Pasar Ritel (mall modern baik besar maupun cabang. contoh Giant, indomart, dll)',
                },
                { name: 'Pasar Internasional (ekspor)' },
                {
                    name: 'Dibeli langsung oleh Perusahaan atau pengumpul (kemitraan)',
                },
            ],
            skipDuplicates: true,
        })
    }
}

module.exports = MarketingReach
