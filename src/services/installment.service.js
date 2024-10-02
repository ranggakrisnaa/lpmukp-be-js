const prisma = require('../config/prisma.config')
const { ErrHandler } = require('../middlewares/errhandler.middleware')

class InstallmentService {
    static async createLoanInterest(reqBody) {
        const { bunga_pinjaman } = reqBody

        return prisma.$transaction(async (tx) => {
            const data = await tx.loan_interests.create({
                data: { bunga_pinjaman },
            })

            const foundInstallments = await tx.installments.findMany({
                distinct: ['plafond_id'],
            })

            // looping some installment data
            for (let i = 0; i < foundInstallments.length; i++) {
                const installment = foundInstallments[i]
                const foundPlafond = await tx.plafonds.findFirst({
                    where: { id: installment.plafond_id },
                })

                // count bunga, tagihan, and total tagihan for installment
                const bunga = (data.bunga_pinjaman / 12) * foundPlafond.plafond
                // const tagihan = Math.trunc(
                //     (bunga * foundPlafond.plafond + foundPlafond.plafond) /
                //     data.jangka_waktu
                // )
                const totalTagihan = foundPlafond.plafond + bunga
                // const serviceFee = tagihan - foundPlafond.plafond / data.jangka_waktu

                // if plafond id null update installment rows if not create the installment with the exist plafond
                if (installment.loan_interest_id === null) {
                    await tx.installments.update({
                        where: { id: installment.id },
                        data: {
                            loan_interest_id: data.id,
                            tagihan: 0,
                            total_tagihan: totalTagihan,
                        },
                    })
                } else {
                    await tx.installments.create({
                        data: {
                            loan_interest_id: data.id,
                            plafond_id: installment.plafond_id,
                            tagihan: 0,
                            total_tagihan: totalTagihan,
                        },
                    })
                }
            }

            if (foundInstallments.length == 0)
                await tx.installments.create({
                    data: { loan_interest_id: data.id },
                })

            return
        })
    }

    static async updateLoanInterest(id, reqBody) {
        const { bunga_pinjaman } = reqBody
        const findLoanInterest = await prisma.loan_interests.findFirst({
            where: { id },
        })

        const payload = {
            bunga_pinjaman: bunga_pinjaman || findLoanInterest.bunga_pinjaman,
        }

        await prisma.loan_interests.update({ where: { id }, data: payload })
        return
    }

    static async createPlafond(reqBody) {
        const { plafond } = reqBody

        return prisma.$transaction(async (tx) => {
            const data = await tx.plafonds.create({ data: { plafond } })

            const foundInstallments = await tx.installments.findMany({
                distinct: ['loan_interest_id'],
            })
            if (foundInstallments.length < 1)
                throw new ErrHandler(
                    404,
                    'Data plafond not found, create loan interest first.'
                )

            // looping some installment data
            for (let i = 0; i < foundInstallments.length; i++) {
                const installment = foundInstallments[i]
                const foundLoanInterest = await tx.loan_interests.findFirst({
                    where: { id: installment.loan_interest_id },
                })

                // count bunga and tagihan for installment
                const bunga =
                    (foundLoanInterest.bunga_pinjaman / 12) * data.plafond
                // const tagihan = Math.trunc(
                //     (bunga * data.plafond + data.plafond) /
                //     foundLoanInterest.jangka_waktu
                // )
                const totalTagihan = data.plafond + bunga

                // if plafond id null update installment rows if not create the installment with the exist plafond
                if (installment.plafond_id === null) {
                    await tx.installments.update({
                        where: { id: installment.id },
                        data: {
                            plafond_id: data.id,
                            tagihan: 0,
                            total_tagihan: totalTagihan,
                        },
                    })
                } else {
                    await tx.installments.create({
                        data: {
                            loan_interest_id: installment.loan_interest_id,
                            plafond_id: data.id,
                            tagihan: 0,
                            total_tagihan: totalTagihan,
                        },
                    })
                }
            }
            return
        })
    }

    static async updatePlafond(id, reqBody) {
        const { plafond } = reqBody

        await prisma.plafonds.update({ where: { id }, data: { plafond } })
        return
    }

    static async getAllInstallment() {
        return await prisma.installments.findMany({
            include: { loan_interests: true, plafonds: true },
        })
    }

    static async getDetailInstallment(plafond_id, loan_interest_id) {
        const data = await prisma.installments.findFirst({
            where: {
                AND: [
                    {
                        plafond_id,
                    },
                    {
                        loan_interest_id,
                    },
                ],
            },
        })

        if (!data) throw new ErrHandler('404', 'Data installment is not found.')

        return data
    }

    static async getAllLoanInterest() {
        return await prisma.loan_interests.findMany()
    }

    static async getAllPlafond() {
        return await prisma.plafonds.findMany()
    }

    static async deleteLoanInterest(ids) {
        // delete multiple data if id more than 1 and single data if one data
        if (ids.length > 1) {
            const parseId = ids.map((id) => parseInt(id, 10))
            const data = await prisma.loan_interests.findFirst({
                where: { id: { in: parseId } },
            })
            if (!data) {
                throw new ErrHandler(404, 'Data loan interest is not found.')
            }

            return await prisma.loan_interests.deleteMany({
                where: { id: { in: parseId } },
            })
        } else {
            const data = await prisma.loan_interests.findFirst({
                where: { id: +ids },
            })
            if (!data) {
                throw new ErrHandler(404, 'Data loan interest is not found.')
            }

            return await prisma.loan_interests.delete({ where: { id: +ids } })
        }
    }

    static async deletePlafond(ids) {
        // delete multiple data if id more than 1 and single data if one data
        if (ids.length > 1) {
            const parseId = ids.map((id) => parseInt(id, 10))
            const data = await prisma.plafonds.findFirst({
                where: { id: { in: parseId } },
            })
            if (!data) {
                throw new ErrHandler(404, 'Data loan interest is not found.')
            }

            return await prisma.plafonds.deleteMany({
                where: { id: { in: parseId } },
            })
        } else {
            const data = await prisma.plafonds.findFirst({
                where: { id: +ids },
            })
            if (!data) {
                throw new ErrHandler(404, 'Data loan interest is not found.')
            }

            return await prisma.plafonds.delete({ where: { id: +ids } })
        }
    }
}

module.exports = InstallmentService
