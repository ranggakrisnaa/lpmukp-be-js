const prisma = require('../../src/config/prisma.config')
class Application {
    static async main() {
        await prisma.applications.createMany({
            data: [
                {
                    code: '6672213',
                    alamat_usaha: 'jalan klampis',
                    lama_siklus_usaha: '3 tahun',
                    estimasi_omset_per_bulan: 2000000,
                    estimasi_biaya_per_bulan: 1000000,
                    estimasi_laba_per_bulan: 1000000,
                    pendapatan_diluar_usaha: 'ada',
                    tujuan_pembiayaan: 'Investasi',
                    estimasi_biaya_rumah_tangga: 2000000,
                    installment_id: 1,
                    bank_id: 1,
                    account_ownership: 'ya',
                    account_number: '123123123',
                    desired_financing: 'cicilan',
                    status: 'Menunggu Verifikasi',
                    user_id: 1,
                },
            ],
            skipDuplicates: true,
        })
    }
}

module.exports = Application
