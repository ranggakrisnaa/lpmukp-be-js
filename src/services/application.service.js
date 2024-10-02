const prisma = require('../config/prisma.config')
const { ErrHandler } = require('../middlewares/errhandler.middleware')
const { generatePattern } = require('../utils/pattern.util')

class ApplicationService {
    static async addApplication(id, reqBody) {
        let { bank_id, ...restReqBody } = reqBody
        const user = await prisma.users.findFirst({ where: { id } })

        let payload = {
            ...restReqBody,
            code: generatePattern().toString(),
            user_id: user.id,
            status: 'Menunggu Verifikasi',
        }

        const stepData = [
            'Pengecekan Informasi Kredit',
            'Survey Kelayakan & Penilaian jaminan',
            'Verifikasi Dokumen',
            'Credit Risk Memorandum (CRM)',
            'Putusan Kredit',
            'Penerbitan SP3',
            'Tanggapan & Persyaratan Pencairan',
            'Pencairan',
        ]

        return prisma.$transaction(async (tx) => {
            const installment = await tx.installments.findFirst({
                where: { id: restReqBody.installment_id },
            })
            if (!installment)
                throw new ErrHandler(404, 'Data installment is not found.')

            const bank = await tx.banks.findFirst({
                where: {
                    id: bank_id,
                },
            })
            if (!bank) throw new ErrHandler(404, 'Data bank is not found.')

            if (bank) payload = { ...payload, bank_id: bank.id }
            if (installment)
                payload = { ...payload, installment_id: installment.id }

            const data = await tx.applications.create({ data: payload })

            await tx.business_accounts.create({
                data: {
                    bank_id: bank.id,
                    user_id: user.id,
                    account_number: reqBody.account_number,
                },
            })

            for (let i = 0; i < stepData.length; i++) {
                const step = stepData[i]

                await tx.application_logs.create({
                    data: {
                        step,
                        status: 'Menunggu Verifikasi',
                        application_id: data.id,
                    },
                })
            }

            await tx.notifications.create({
                data: {
                    status: 'Pengajuan Pembiayaan User',
                    title: 'Pengajuan Pembiayaan Sedang Diproses!',
                    content: `Halo ${user.name} pengajuan pendanaan anda sedang diproses.`,
                    user_id: user.id,
                },
            })
        })
    }

    static async getApplication(id) {
        const dataApplications = await prisma.users.findFirst({
            where: { id },
            orderBy: {
                created_at: 'desc',
            },
            select: {
                name: true,
                profiles: {
                    select: {
                        nik: true,
                    },
                },
                applications: {
                    select: {
                        id: true,
                        code: true,
                        jangka_waktu: true,
                        installments: {
                            select: {
                                id: true,
                                total_tagihan: true,
                                tagihan: true,
                                realisasi_plafond: true,
                                plafonds: {
                                    select: {
                                        plafond: true,
                                    },
                                },
                                loan_interests: true,
                            },
                        },
                        application_logs: {
                            select: {
                                step: true,
                                status: true,
                            },
                        },
                    },
                },
            },
        })

        if (!dataApplications) return

        let messagePayload = {
            type: 'Pengajuan Pembiayaan User',
            title: 'Update Status Pembiayaan!',
            user_id: id,
        }

        const applicationLogs = dataApplications.applications.flatMap(
            (application) =>
                application.application_logs.map((log) => ({
                    status: log.status,
                    step: log.step,
                }))
        )

        const { name } = dataApplications
        const data = dataApplications.applications[0]
        for (let i = 0; i < applicationLogs.length; i++) {
            const applicationLog = applicationLogs[i]
            const { step, status } = applicationLog
            let content = ''

            switch (step) {
                case 'Pengecekan Informasi Kredit':
                case 'Survey Kelayakan & Penilaian jaminan':
                case 'Verifikasi Dokumen':
                case 'Credit Risk Memorandum (CRM)':
                case 'Penerbitan SP3':
                    content = `Halo ${name} pengajuan pendanaan anda sedang dalam proses ${step}. Proses ini akan berlangsung maksimal 2 hari kerja`
                    if (status === 'Diterima') {
                        content = `Halo ${name} pengajuan pendanaan anda dalam proses ${step} telah diterima. Dan akan berlanjut ke proses selanjutnya!`
                    }
                    break
                case 'Pencairan':
                    content = `Halo ${name} pengajuan pendanaan anda sedang dalam proses ${step}. Proses ini akan berlangsung maksimal 2 hari kerja`
                    if (status === 'Diterima') {
                        content = `Halo ${name} pengajuan pendanaan anda dalam proses ${step} telah diterima. Saldo pinjaman akan segera dikirimkan!`
                        const foundLoanBill = await prisma.loan_bills.findFirst(
                            {
                                where: {
                                    installment_id:
                                        dataApplications.applications[0]
                                            .installments.id,
                                },
                            }
                        )

                        if (!foundLoanBill) {
                            const { jangka_waktu } = data
                            const { realisasi_plafond } = data.installments
                            const { bunga_pinjaman } =
                                data.installments.loan_interests
                            const now = new Date()

                            for (let i = 1; i <= jangka_waktu; i++) {
                                const currentDate = new Date(now)
                                currentDate.setMonth(currentDate.getMonth() + i)

                                const principalBill =
                                    realisasi_plafond / jangka_waktu
                                const serviceFee =
                                    (bunga_pinjaman / 12) * realisasi_plafond

                                await prisma.loan_bills.create({
                                    data: {
                                        tenor: `${i}/${jangka_waktu}`,
                                        due_date: currentDate,
                                        bill_amount: Math.trunc(
                                            principalBill + serviceFee
                                        ),
                                        principal_bill:
                                            Math.trunc(principalBill),
                                        service_fee: Math.trunc(serviceFee),
                                        installment_id: data.installments.id,
                                        remain_principal_bill: 0,
                                        remain_service_fee: 0,
                                    },
                                })
                            }
                        } else {
                            return dataApplications
                        }
                        break
                    }

                    if (content) {
                        const checkNotif = await prisma.notifications.findFirst(
                            {
                                where: { user_id: id },
                            }
                        )
                        if (!checkNotif && content != checkNotif?.content) {
                            await prisma.notifications.create({
                                data: {
                                    ...messagePayload,
                                    content,
                                },
                            })
                        }
                    }
            }
        }

        return dataApplications
    }
}

module.exports = ApplicationService
