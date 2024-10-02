const prisma = require('../../src/config/prisma.config')

class Profile {
    static async main() {
        await prisma.profiles.createMany({
            data: [
                {
                    nik: '3521053030001',
                    gender: 'laki-laki',
                    place_birth: 'surabaya',
                    date_birth: new Date('1999-06-05'),
                    marital_status: 'menikah',
                    address: 'jalan anggrek 20 blitar',
                    jumlah_tanggungan: 2,
                    alamat_domisili: 'jalan ahmad yani',
                    user_id: 1,
                },
            ],
            skipDuplicates: true,
        })
    }
}

module.exports = Profile
