const prisma = require('../../config/prisma.config')
const { ErrHandler } = require('../../middlewares/errhandler.middleware')
const { generatePattern2 } = require('../../utils/pattern.util')
const PrismaUtil = require('../../utils/prisma.util')
const TimeUtil = require('../../utils/timeconvert.util')

class InstallmentPaymentService {
    static async getAllInstallmentPayment(
        pageNumber,
        pageSize,
        transactionType,
        transactionDate
    ) {
        let dateConvert
        let optionFilter1 = { status: 'Berhasil' }

        if (transactionDate) {
            dateConvert = new Date(transactionDate)
            optionFilter1 = {
                AND: [
                    { status: 'Berhasil' },
                    {
                        updated_at: {
                            lte: dateConvert,
                        },
                    },
                ],
            }
        }

        const totalCountInstallmentLogs =
            await prisma.installment_payments.count()

        const totalPagesInstallmentLogs = Math.ceil(
            totalCountInstallmentLogs / pageSize
        )

        const hasPrevPage = pageNumber > 1
        const hasNextPageInstallmentLogs =
            pageNumber < totalPagesInstallmentLogs

        const pagination = {
            currentPage: pageNumber,
            hasPrevPage,
            hasNextPageInstallmentLogs,
            totalPagesInstallmentLogs,
        }

        const offset = (pageNumber - 1) * pageSize
        const data = await prisma.installment_payments.findMany({
            where: {
                ...optionFilter1,
            },
            skip: offset,
            take: pageSize,
            include: {
                loan_bill_installment_payments: {
                    select: {
                        loan_bills: true,
                    },
                },
            },
        })
        if (!data)
            throw new ErrHandler(
                404,
                'User installment payment data is not found.'
            )

        return { data, pagination }
    }

    static async getInstallmentById(id) {
        const data = await prisma.installment_payments.findFirst({
            where: {
                id,
            },
            include: {
                payment_methods: true,
                unpaid_bills: true,
                loan_bill_installment_payments: {
                    select: {
                        loan_bills: {
                            include: {
                                unpaid_bills: true,
                            },
                        },
                    },
                },
            },
        })
        if (!data)
            throw new ErrHandler(
                404,
                'User installment payment data is not found.'
            )

        return data
    }

    static async createInstallmentPayment(reqBody, id, codeNumber) {
        const { amount } = reqBody
        const dateNow = new Date()
        const foundBeforeLoanBill = await prisma.applications.findFirst({
            where: {
                code: {
                    equals: codeNumber,
                },
            },
            select: {
                installments: {
                    select: {
                        loan_bills: {
                            where: {
                                AND: [
                                    {
                                        due_date: {
                                            lt: dateNow,
                                        },
                                    },
                                    {
                                        status: {
                                            equals: 'Belum lunas',
                                        },
                                    },
                                ],
                            },
                        },
                    },
                },
            },
        })

        const foundLoanBill = await prisma.applications.findFirst({
            where: {
                code: {
                    equals: codeNumber,
                },
            },
            select: {
                bank_id: true,
                installments: {
                    select: {
                        loan_bills: {
                            where: {
                                AND: [
                                    {
                                        due_date: {
                                            gte: dateNow,
                                        },
                                    },
                                    {
                                        status: {
                                            equals: 'Belum lunas',
                                        },
                                    },
                                ],
                            },
                        },
                    },
                },
            },
        })
        if (!foundLoanBill)
            throw new ErrHandler(404, 'Loan bill data is not found.')

        const foundPaymentMethod = await prisma.payment_methods.findFirst({
            where: {
                id: foundLoanBill.bank_id,
            },
        })
        if (!foundPaymentMethod)
            throw new ErrHandler(404, 'Payment method data is not found.')

        if (
            foundLoanBill.bill_paid >= foundLoanBill.bill_amount ||
            foundLoanBill.bill_amount == 0 ||
            foundLoanBill.status == 'Lunas'
        )
            throw new ErrHandler(400, 'Loan bill has been paid.')

        const currentDate = new Date()
        // currentDate.setDate(currentDate.getDate() + 1)
        const getCustomTime = TimeUtil.getDateCustom(foundLoanBill.due_date)
        const pattern = generatePattern2().toString()
        const totalAmount = foundBeforeLoanBill
            ? foundLoanBill.bill_amount + foundBeforeLoanBill.bill_amount
            : foundLoanBill.bill_amount
        let tempAmount = amount - foundLoanBill.service_fee

        let installmentPaymentPayload = {
            bill_amount: totalAmount,
            principal_bill: foundLoanBill.principal_bill,
            service_fee: foundLoanBill.service_fee,
            // remain_service_fee: foundLoanBill.service_fee - amount ?,
            // remain_principal_bill: totalAmount - amount <= 0 ? 0 : totalAmount - amount,
            payment_amount: amount,
            transaction_date: currentDate,
            transaction_code: `PMU-${getCustomTime}-${pattern}`,
            payment_method_id: foundPaymentMethod.id,
            status: 'Proses',
        }

        if (tempAmount > 0) {
            installmentPaymentPayload = {
                ...installmentPaymentPayload,
                remain_service_fee: 0,
                remain_principal_bill:
                    foundLoanBill.principal_bill - tempAmount < 0
                        ? 0
                        : foundLoanBill.principal_bill - tempAmount,
            }
        }

        return prisma.$transaction(async (tx) => {
            let installmentPayment
            let loanBillArray = [foundLoanBill]

            if (foundBeforeLoanBill && foundBeforeLoanBill.bill_amount > 0) {
                const unpaidBill = await prisma.unpaid_bills.create({
                    data: {
                        tenor: foundBeforeLoanBill.tenor,
                        amount: foundBeforeLoanBill.bill_amount,
                    },
                })

                installmentPaymentPayload = {
                    ...installmentPaymentPayload,
                    unpaid_bill_id: unpaidBill.id,
                }

                loanBillArray = [...loanBillArray, foundBeforeLoanBill]
            }

            installmentPayment = await tx.installment_payments.create({
                data: installmentPaymentPayload,
            })

            for (let loanBill of loanBillArray) {
                await tx.loan_bill_installment_payments.create({
                    data: {
                        installment_payment_id: installmentPayment.id,
                        loan_bill_id: loanBill.id,
                    },
                })
            }

            return PrismaUtil.excludeField(installmentPayment, ['id'])
        })
    }

    static async verifyInstallmentPayment(id, reqBody, installmentPaymentId) {
        const { status } = reqBody

        const foundUser = await prisma.users.findFirst({ where: { id } })
        const foundWallet = await prisma.wallets.findFirst({
            where: { user_id: id },
        })

        let isPaid = false

        switch (status) {
            case 'ACTIVE':
            case 'CANCELLED':
            case 'PENDING':
                isPaid = false
                break
            case 'COMPLETED':
            case 'SUCCEEDED':
                isPaid = true
                break
            default:
                throw new ErrHandler(404, 'Status is not found.')
        }

        const foundInstallment = await prisma.installment_payments.findFirst({
            where: { installment_payment_id: installmentPaymentId },
            include: {
                unpaid_bills: true,
                payment_methods: true,
                loan_bill_installment_payments: {
                    include: {
                        loan_bills: true,
                    },
                    orderBy: {
                        id: 'desc',
                    },
                },
            },
        })

        if (!foundInstallment)
            throw new ErrHandler(404, 'Data installment payment is not found.')
        if (isPaid && foundInstallment.status !== 'Berhasil') {
            let remainPaymentAmount = foundInstallment.payment_amount

            await prisma.$transaction(async (tx) => {
                for (const loanBillInstallmentPayment of foundInstallment.loan_bill_installment_payments) {
                    const loanBill = loanBillInstallmentPayment.loan_bills
                    // const remainAmount =
                    //     loanBill.bill_amount - remainPaymentAmount
                    const remainServiceFee =
                        loanBill.service_fee - remainPaymentAmount
                    const remainPrincipal =
                        loanBill.principal_bill - remainPaymentAmount
                    // const totalAmount = loanBill.bill_paid + remainPaymentAmount;

                    let loanBillPayload = {
                        bill_paid: foundInstallment.payment_amount,
                        bill_amount: loanBill.bill_amount - remainPaymentAmount,
                        remain_principal_bill:
                            remainPrincipal < 0 ? 0 : remainPrincipal,
                        remain_service_fee:
                            remainServiceFee < 0 ? 0 : remainServiceFee,
                        service_fee: loanBill.service_fee,
                        principal_bill: loanBill.principal_bill,
                        status: 'Belum lunas',
                    }

                    if (remainPaymentAmount > loanBill.service_fee) {
                        remainPaymentAmount -= loanBill.service_fee
                        loanBillPayload.service_fee = 0
                    } else {
                        loanBillPayload.service_fee -= remainPaymentAmount
                        remainPaymentAmount = 0
                    }

                    if (remainPaymentAmount > 0) {
                        if (remainPaymentAmount >= loanBill.principal_bill) {
                            remainPaymentAmount -= loanBill.principal_bill
                            loanBillPayload.principal_bill = 0
                        } else {
                            loanBillPayload.principal_bill -=
                                remainPaymentAmount
                            remainPaymentAmount = 0
                        }
                    }

                    if (!foundWallet && loanBill.remain_bill < 0) {
                        await tx.wallets.create({
                            data: {
                                name: `dompet ${foundUser.name}`,
                                balance: Math.abs(loanBill.remain_bill),
                                user_id: id,
                            },
                        })
                    }

                    if (loanBillPayload.remain_bill <= 0) {
                        loanBillPayload.bill_amount = 0
                        loanBillPayload.remain_bill = 0
                        loanBillPayload.status = 'Lunas'
                    }

                    await tx.loan_bills.update({
                        where: { id: loanBillInstallmentPayment.loan_bill_id },
                        data: loanBillPayload,
                    })

                    if (remainPaymentAmount <= 0) return
                }

                await tx.installment_payments.updateMany({
                    where: {
                        OR: [
                            { id: foundInstallment.id },
                            { status: { not: 'Berhasil' } },
                        ],
                    },
                    data: { status: 'Gagal' },
                })
            })

            return
        } else {
            throw new ErrHandler(400, 'Installment payment is already paid.')
        }
    }
}

module.exports = InstallmentPaymentService
