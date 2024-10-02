const prisma = require('../config/prisma.config')
const { ErrHandler } = require('../middlewares/errhandler.middleware')
// const { generatePattern2 } = require('../utils/pattern.util')
const PrismaUtil = require('../utils/prisma.util')
const TimeUtil = require('../utils/timeconvert.util')

class LoanBillService {
    static async getAllLoanBill(pageNumber, pageSize, id) {
        const nowDate = new Date()

        const foundNowLoanBill = await prisma.loan_bills.findFirst({
            where: {
                due_date: {
                    gte: nowDate,
                },
            },
        })
        if (!foundNowLoanBill)
            throw new ErrHandler(404, 'Loan bill data this month is not found.')

        const foundWallet = await prisma.wallets.findFirst({
            where: {
                user_id: id,
            },
        })

        if (
            foundWallet &&
            foundWallet.balance > 0 &&
            foundNowLoanBill.bill_amount > 0
        ) {
            await prisma.$transaction(async (tx) => {
                const remainAmount =
                    foundNowLoanBill.bill_amount - foundWallet.balance
                let loanBillPayload = {
                    bill_amount: remainAmount < 0 ? 0 : remainAmount,
                    bill_paid:
                        remainAmount < 0
                            ? foundNowLoanBill.bill_amount
                            : remainAmount,
                    remain_bill: remainAmount < 0 ? 0 : remainAmount,
                    status: 'Belum lunas',
                }

                let remainBalance =
                    foundWallet.balance - foundNowLoanBill.service_fee

                if (remainBalance > 0) {
                    remainBalance =
                        foundNowLoanBill.principal_bill - remainBalance
                    if (remainBalance <= 0) {
                        loanBillPayload.principal_bill = 0
                        remainBalance = 0
                        loanBillPayload.status = 'Lunas'
                    }

                    loanBillPayload.service_fee = 0
                    loanBillPayload.principal_bill = remainBalance
                } else {
                    loanBillPayload.service_fee = {
                        increment: remainBalance,
                    }
                }

                await tx.loan_bills.update({
                    where: { id: foundNowLoanBill.id },
                    data: { ...loanBillPayload },
                })

                await tx.wallets.update({
                    where: { id: foundWallet.id },
                    data: { balance: remainBalance },
                })
            })
        }

        const totalCountLoanBill = await prisma.loan_bills.count()

        const totalPagesLoanBill = Math.ceil(totalCountLoanBill / pageSize)

        const hasPrevPage = pageNumber > 1
        const hasNextPageLoanBill = pageNumber < totalPagesLoanBill

        const pagination = {
            currentPage: pageNumber,
            hasPrevPage,
            hasNextPageLoanBill,
            totalPagesLoanBill,
        }

        const offset = (pageNumber - 1) * pageSize

        const loanBill = await prisma.loan_bills.findMany({
            skip: offset || 0,
            take: pageSize || 0,
            include: {
                installments: {
                    select: {
                        tagihan: true,
                    },
                },
            },
        })

        const data = loanBill.map((loanBill) => {
            const timeToString = new Date(loanBill.due_date)
            return {
                ...loanBill,
                due_date: TimeUtil.getMonthCustom(timeToString),
            }
        })

        return { data, pagination }
    }

    static async getLoanBillById(loanBillId) {
        const loanBillBefore = await prisma.loan_bills.findFirst({
            where: {
                OR: [
                    {
                        due_date: {
                            lt: new Date(),
                        },
                    },
                    {
                        status: {
                            not: 'Lunas',
                        },
                    },
                ],
            },
        })
        const data = await prisma.loan_bills.findFirst({
            where: {
                id: loanBillId,
            },
            include: {
                installments: {
                    select: {
                        tagihan: true,
                    },
                },
                loan_bill_installment_payments: {
                    select: {
                        installment_payments: {
                            select: {
                                transaction_date: true,
                                transaction_code: true,
                                payment_amount: true,
                            },
                            where: {
                                status: {
                                    equals: 'Berhasil',
                                },
                            },
                        },
                    },
                },
            },
        })
        if (!data) throw new ErrHandler(404, 'Loan bill data is not found.')

        const allData = {
            ...data,
            bill_amount: data.bill_amount + loanBillBefore?.bill_amount,
            loan_bill_installment_payments:
                data.loan_bill_installment_payments.filter(
                    (payment) => payment.installment_payments !== null
                ),
            due_date: TimeUtil.getMonthCustom(data.due_date),
            loanBillBefore: {
                tenor: loanBillBefore?.tenor,
                amount: loanBillBefore?.bill_amount,
            },
        }
        if (!data) throw new ErrHandler(404, 'Loan bill data is not found.')
        return PrismaUtil.excludeField(allData, ['id'])
    }

    static async getNowLoanBill() {
        const data = await prisma.loan_bills.findFirst({
            where: {
                due_date: {
                    gte: new Date(),
                },
            },
            include: {
                installments: {
                    select: {
                        tagihan: true,
                    },
                },
            },
        })

        const dataMapped = {
            ...data,
            due_date: TimeUtil.getMonthCustom(data.due_date),
        }

        return PrismaUtil.excludeField(dataMapped, ['id'])
    }

    static async getInvoiceSettlement() {
        const data = await prisma.installment_payments.findMany({
            include: {
                unpaid_bills: true,
                payment_methods: true,
                loan_bill_installment_payments: {
                    include: {
                        loan_bills: true,
                    },
                },
            },
            orderBy: {
                created_at: 'desc',
            },
        })

        if (!data)
            throw new ErrHandler(404, 'Your invoice settlement is not found.')

        return { ...data[0], remain_bill: 0 }
    }
}

module.exports = LoanBillService
