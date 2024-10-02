const prisma = require('../config/prisma.config')
const { ErrHandler } = require('../middlewares/errhandler.middleware')
const { generatePattern2 } = require('../utils/pattern.util')
const PrismaUtil = require('../utils/prisma.util')
const TimeUtil = require('../utils/timeconvert.util')

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

    static async createInstallmentPayment(reqBody) {
        const { amount } = reqBody
        const dateNow = new Date()
        const foundBeforeLoanBill = await prisma.loan_bills.findFirst({
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
        })
        const foundLoanBill = await prisma.loan_bills.findFirst({
            where: {
                due_date: {
                    gte: dateNow,
                },
            },
            include: {
                installments: {
                    include: {
                        applications: {
                            include: {
                                users: true,
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
                code: {
                    contains: foundLoanBill.installments.applications[0].bank,
                },
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

    // static async verifyInstallmentPayment(id, reqBody, installmentPaymentId) {
    //     const { status } = reqBody;

    //     const foundUser = await prisma.users.findFirst({ where: { id } });
    //     const foundWallet = await prisma.wallets.findFirst({
    //         where: { user_id: id },
    //     });

    //     let isPaid = false;

    //     switch (status) {
    //         case 'ACTIVE':
    //         case 'CANCELLED':
    //         case 'PENDING':
    //             isPaid = false;
    //             break;
    //         case 'COMPLETED':
    //         case 'SUCCEEDED':
    //             isPaid = true;
    //             break;
    //         default:
    //             throw new ErrHandler(404, 'Status is not found.');
    //     }

    //     const foundInstallment = await prisma.installment_payments.findFirst({
    //         where: {
    //             installment_payment_id: installmentPaymentId,
    //         },
    //         include: {
    //             unpaid_bills: true,
    //             payment_methods: true,
    //             loan_bill_installment_payments: {
    //                 include: {
    //                     loan_bills: true,
    //                 },
    //             },
    //         },
    //     });
    //     if (!foundInstallment)
    //         throw new ErrHandler(404, 'Data installment payment is not found.');

    //     if (isPaid && foundInstallment.status !== 'Berhasil') {
    //         const transactions = [];

    //         foundInstallment.loan_bill_installment_payments.forEach(loanBillInstallmentPayment => {
    //             const loanBill = loanBillInstallmentPayment.loan_bills;
    //             const totalAmount = loanBill.bill_paid + foundInstallment.payment_amount;
    //             let loanBillPayload = {
    //                 bill_paid: totalAmount,
    //                 bill_amount: {
    //                     decrement: foundInstallment.payment_amount,
    //                 },
    //                 remain_bill: loanBill.bill_amount - foundInstallment.payment_amount,
    //                 status: 'Belum lunas',
    //             };

    //             transactions.push(async (tx) => {
    //                 let remainPaymentAmount = foundInstallment.payment_amount - loanBill.service_fee;
    //                 if (remainPaymentAmount >= 0) {
    //                     loanBillPayload = {
    //                         ...loanBillPayload,
    //                         service_fee: 0,
    //                     };

    //                     if (remainPaymentAmount >= 0) {
    //                         remainPaymentAmount = loanBill.principal_bill - remainPaymentAmount;
    //                         loanBillPayload = {
    //                             ...loanBillPayload,
    //                             principal_bill: remainPaymentAmount,
    //                         };

    //                         if (remainPaymentAmount <= 0) {
    //                             loanBillPayload = {
    //                                 ...loanBillPayload,
    //                                 principal_bill: 0,
    //                             };
    //                         }
    //                     }
    //                 }

    //                 if (!foundWallet && loanBill.bill_amount < totalAmount) {
    //                     const remainAmount = totalAmount - loanBill.bill_amount;
    //                     await tx.wallets.create({
    //                         data: {
    //                             name: `dompet ${foundUser.name}`,
    //                             balance: remainAmount,
    //                             user_id: id,
    //                         },
    //                     });
    //                 }

    //                 if (loanBill.bill_amount <= foundInstallment.payment_amount) {
    //                     loanBillPayload = {
    //                         ...loanBillPayload,
    //                         bill_amount: 0,
    //                         status: 'Lunas',
    //                     };
    //                 }

    //                 await tx.loan_bills.update({
    //                     where: {
    //                         id: loanBillInstallmentPayment.loan_bill_id,
    //                     },
    //                     data: {
    //                         ...loanBillPayload,
    //                     },
    //                 });
    //             });
    //         });

    //         await prisma.$transaction(async (tx) => {
    //             for (const transaction of transactions) {
    //                 await transaction(tx);
    //             }

    //             await tx.installment_payments.updateMany({
    //                 where: {
    //                     OR: [
    //                         { id: foundInstallment.id },
    //                         { status: { not: 'Berhasil' } },
    //                     ],
    //                 },
    //                 data: {
    //                     status: 'Gagal',
    //                 },
    //             });

    //             const html = await ejs.renderFile(
    //                 path.join('./src', 'views', 'installment_payment_invoice.ejs'),
    //                 { data: foundInstallment }
    //             );
    //             pdf.create(html).toFile(
    //                 `public/invoices/invoice-pembayaran-${foundInstallment.transaction_code}.pdf`,
    //                 function (err) {
    //                     if (err) return err;
    //                 }
    //             );

    //             await tx.installment_payments.update({
    //                 where: {
    //                     id: foundInstallment.id,
    //                 },
    //                 data: {
    //                     status: 'Berhasil',
    //                     invoice_url: `http://localhost:${dotenvConfig.PORT}/invoices/invoice-pembayaran-${foundInstallment.transaction_code}.pdf`,
    //                 },
    //             });

    //             return;
    //         });
    //     } else {
    //         throw new ErrHandler(400, 'Installment payment is paided.');
    //     }
    // }

    // static async getInstallmentPaymentNow() {
    //     const data = await prisma.installment_payments.findFirst({
    //         where: {
    //             due_date: {
    //                 lte: new Date(),
    //             },
    //         },
    //         select: {
    //             loan_bill_installment_payments: {
    //                 select: {
    //                     loan_bills: true,
    //                 },
    //             },
    //         },
    //     })
    //     if (!data)
    //         throw new ErrHandler(
    //             404,
    //             'User installment payment data is not found.'
    //         )

    //     return data
    // }

    // static async createInstallmentBankPayment(reqBody) {
    //     const { jumlah_pembayaran } = reqBody
    //     const date = new Date()

    //     if (!jumlah_pembayaran)
    //         throw new ErrHandler(404, 'Please fill the field first.')

    //     const foundInstallment = await prisma.installment_payments.findFirst({
    //         where: {
    //             AND: [
    //                 {
    //                     due_date: {
    //                         lte: date,
    //                     },
    //                 },
    //                 {
    //                     status: {
    //                         not: 'Lunas',
    //                     },
    //                 },
    //             ],
    //         },
    //         include: {
    //             applications: {
    //                 include: {
    //                     users: {
    //                         select: {
    //                             user_id: true,
    //                             business_accounts: {
    //                                 select: {
    //                                     bank: true,
    //                                 },
    //                             },
    //                         },
    //                     },
    //                 },
    //             },
    //             payment_methods: true,
    //         },
    //     })
    //     if (!foundInstallment)
    //         throw new ErrHandler(404, 'Installment payment data is not found or iamount is paid in full.')

    //     const foundPaymentMethod = await prisma.payment_methods.findFirst({
    //         where: {
    //             code: foundInstallment.applications.users.business_accounts[0]
    //                 .bank.code,
    //         },
    //     })

    //     if (!foundPaymentMethod)
    //         throw new ErrHandler(404, 'Payment method is not found.')
    //     if (foundInstallment?.amount < jumlah_pembayaran)
    //         throw new ErrHandler(
    //             401,
    //             'The amount exceeds the specified billing limit.'
    //         )

    //     const currentDate = new Date()
    //     currentDate.setDate(currentDate.getDate() + 1)
    //     return prisma.$transaction(async (tx) => {
    //         let totalCost = 0
    //         let calculatedPercentageCost = 0

    //         if (foundPaymentMethod.handling_cost) {
    //             calculatedPercentageCost =
    //                 foundPaymentMethod.percentage_cost > 0
    //                     ? foundPaymentMethod.percentage_cost * jumlah_pembayaran
    //                     : 0

    //             totalCost =
    //                 jumlah_pembayaran +
    //                 calculatedPercentageCost +
    //                 foundPaymentMethod.handling_cost
    //         }

    //         // const paymentPayload = {
    //         //     country: 'ID',
    //         //     currency: 'IDR',
    //         //     name: foundPaymentMethod.account_name,
    //         //     description: `Pembayaran tagihan user pada tenor ke-${foundInstallment.order}`,
    //         //     amount: totalCost != 0 ? totalCost : jumlah_pembayaran,
    //         //     reference_id: foundInstallment.applications.users.user_id,
    //         //     expires_at: currentDate,
    //         //     bank_code: foundPaymentMethod.code,
    //         // }

    //         // const createPayment = await axios.post(
    //         //     `${config.XENDIT_BASE_URL}${config.XENDIT_ENV}${config.XENDIT_PAYMENT}/va/create`,
    //         //     paymentPayload,
    //         //     {
    //         //         headers: {
    //         //             'Account-Key': `${config.XENDIT_ACCOUNT_KEY}`,
    //         //             'Service-Key': `${config.XENDIT_SERVICE_KEY}`,
    //         //             'Payment-Service-Key': `${config.XENDIT_PAYMENT_SERVICE_KEY}`,
    //         //         },
    //         //     }
    //         // )

    //         const getCustomTime = TimeUtil.getDateCustom(
    //             foundInstallment.due_date
    //         )

    //         const installmentData = await tx.installment_payments.update({
    //             where: {
    //                 id: foundInstallment.id,
    //             },
    //             data: {
    //                 payment_amount: jumlah_pembayaran,
    //                 transaction_code: `tagihan-${getCustomTime}`,
    //                 transaction_date: date,
    //                 payment_code: foundInstallment.installment_payment_id,
    //                 payment_method_id: foundPaymentMethod.id,
    //                 amount_before: 0,
    //                 status: 'Proses Pembayaran',
    //             },
    //         })

    //         await tx.transaction_logs.create({
    //             data: {
    //                 name: 'Pembayaran setoran kredit',
    //                 type: 'Saldo Keluar',
    //                 code: `tagihan-${getCustomTime}`,
    //                 amount: jumlah_pembayaran,
    //                 admin_fee:
    //                     calculatedPercentageCost == 0
    //                         ? foundPaymentMethod.handling_cost
    //                         : calculatedPercentageCost,
    //                 status: 'Proses',
    //                 transaction_date: date,
    //                 paymount_method: foundPaymentMethod.code,
    //                 total_amount: totalCost,
    //                 user_id: foundInstallment.applications.user_id,
    //             },
    //         })

    //         // return {
    //         //     id: createPayment.data.data.id,
    //         //     reference_id: createPayment.data.data.reference_id,
    //         //     bank_code: createPayment.data.data.bank_code,
    //         //     account_number: foundPaymentMethod.account_number,
    //         //     account_name: foundPaymentMethod.account_name,
    //         //     amount: createPayment.data.data.amount,
    //         //     description: createPayment.data.data.description,
    //         //     status: createPayment.data.data.status,
    //         //     expires_at: createPayment.data.data.expires_at,
    //         // }

    //         return PrismaUtil.excludeField(installmentData, ['id'])
    //     })
    // }

    // static async verifyBankPayment(reqBody, installmentPaymentId) {
    //     const date = new Date()
    //     const { status } = reqBody
    //     let isPaid = false

    //     switch (status) {
    //         case 'ACTIVE':
    //         case 'CANCELLED':
    //         case 'PENDING':
    //             isPaid = false
    //             break
    //         case 'COMPLETED':
    //         case 'SUCCEEDED':
    //             isPaid = true
    //             break
    //         default:
    //             throw new ErrHandler(404, 'Status is not found.')
    //     }

    //     const foundInstallment = await prisma.installment_payments.findFirst({
    //         where: {
    //             installment_payment_id: installmentPaymentId,
    //         },
    //         include: {
    //             applications: {
    //                 include: {
    //                     users: {
    //                         select: {
    //                             user_id: true,
    //                             transaction_logs: {
    //                                 where: {
    //                                     transaction_date: {
    //                                         gte: date,
    //                                     },
    //                                 }
    //                             }

    //                         }
    //                     },
    //                 },
    //             },
    //         },
    //     })

    //     const foundInstallmentNext =
    //         await prisma.installment_payments.findFirst({
    //             where: {
    //                 due_date: {
    //                     gte: date,
    //                 },
    //             },
    //         })

    //     const foundTransaction = await prisma.transaction_logs.findFirst({
    //         where: {
    //             AND: [
    //                 {
    //                     user_id: foundInstallment.applications.user_id,
    //                 },
    //                 {
    //                     transaction_date: {
    //                         gte: foundInstallment.transaction_date,
    //                     },
    //                 },
    //             ],
    //         },
    //     })

    //     if (isPaid && foundInstallment?.status == 'Proses Pembayaran') {
    //         let remainSaldo = 0

    //         return prisma.$transaction(async (tx) => {
    //             remainSaldo =
    //                 foundInstallment.amount - foundInstallment.payment_amount
    //             await tx.installment_payments.update({
    //                 where: {
    //                     id: foundInstallment.id,
    //                 },
    //                 data: {
    //                     amount: foundInstallment.payment_amount,
    //                     status: 'Lunas',
    //                 },
    //             })

    //             await tx.installment_payments.update({
    //                 where: {
    //                     id: foundInstallmentNext.id,
    //                 },
    //                 data: {
    //                     amount: { increment: remainSaldo },
    //                     amount_before: remainSaldo,
    //                 },
    //             })

    //             await tx.notifications.create({
    //                 data: {
    //                     type: 'Transaksi Pembayaran Tagihan User',
    //                     title: 'Transaksi Pembayaran Tagihan User telah berhasil dilakukan',
    //                     content: `Pembayaran angsuran kredit Anda sebesar ${foundInstallment.amount} telah berhasil dibayarkan.`,
    //                     user_id: foundInstallment?.applications.user_id,
    //                 },
    //             })

    //             await tx.transaction_logs.update({
    //                 where: {
    //                     id: foundTransaction.id,
    //                 },
    //                 data: {
    //                     status: 'Berhasil',
    //                 },
    //             })
    //         })
    //     }
    // }

    // static async createInstallmentWalletPayment(id, reqBody) {
    //     const { jumlah_pembayaran } = reqBody
    //     const date = new Date()
    //     const wallet = await prisma.wallets.findFirst({
    //         where: {
    //             user_id: id,
    //         },
    //     })

    //     const foundInstallment = await prisma.installment_payments.findFirst({
    //         where: {
    //             AND: [
    //                 {
    //                     due_date: {
    //                         lte: date,
    //                     },
    //                 },
    //                 {
    //                     status: {
    //                         not: 'Lunas',
    //                     },
    //                 },
    //             ],
    //         },
    //         include: {
    //             applications: {
    //                 include: {
    //                     users: {
    //                         select: {
    //                             user_id: true,
    //                             business_accounts: {
    //                                 select: {
    //                                     bank: true,
    //                                 },
    //                             },
    //                         },
    //                     },
    //                 },
    //             },
    //         },
    //     })
    //     const foundPaymentMethod = await prisma.payment_methods.findFirst({
    //         where: {
    //             code: foundInstallment.applications.users.business_accounts[0]
    //                 .bank.code,
    //         },
    //     })
    //     if (!foundPaymentMethod)
    //         throw new ErrHandler(404, 'Payment method is not found.')
    //     if (foundInstallment.status == 'Lunas')
    //         throw new ErrHandler(
    //             401,
    //             'The installment amount this month is paid in full.'
    //         )

    //     const getCustomTime = TimeUtil.getDateCustom(foundInstallment.due_date)

    //     return prisma.$transaction(async (tx) => {
    //         if (wallet.balance < foundInstallment.amount)
    //             throw new ErrHandler(401, 'The saldo is less than bill amount.')

    //         const installmentData = await tx.installment_payments.update({
    //             where: {
    //                 id: foundInstallment.id,
    //             },
    //             data: {
    //                 transaction_code: `tagihan-${getCustomTime}`,
    //                 transaction_date: date,
    //                 payment_method_id: foundPaymentMethod.id,
    //                 amount_before: 0,
    //                 payment_code: foundInstallment.installment_payment_id,
    //                 payment_amount: jumlah_pembayaran,
    //                 status: 'Proses Pembayaran',
    //             },
    //         })

    //         await tx.transaction_logs.create({
    //             data: {
    //                 name: 'Pembayaran setoran kredit',
    //                 type: 'Saldo Keluar',
    //                 code: `tagihan-${getCustomTime}`,
    //                 amount: jumlah_pembayaran,
    //                 admin_fee: 0,
    //                 status: 'Proses',
    //                 transaction_date: date,
    //                 paymount_method: foundPaymentMethod.code,
    //                 total_amount: jumlah_pembayaran,
    //                 user_id: foundInstallment.applications.user_id,
    //             },
    //         })

    //         return PrismaUtil.excludeField(installmentData, ['id'])
    //     })
    // }

    // static async verifyWalletOtp(id, installmentPaymentId) {
    //     const date = new Date()
    //     const foundInstallment = await prisma.installment_payments.findFirst({
    //         where: {
    //             installment_payment_id: installmentPaymentId,
    //         },
    //         include: {
    //             applications: {
    //                 include: {
    //                     users: {
    //                         select: {
    //                             user_id: true,
    //                         },
    //                     },
    //                 },
    //             },
    //         },
    //     })
    //     if (!foundInstallment)
    //         throw new ErrHandler(404, 'Installment payment data is not found.')

    //     const foundInstallmentNext =
    //         await prisma.installment_payments.findFirst({
    //             where: {
    //                 due_date: {
    //                     gte: date,
    //                 },
    //             },
    //         })

    //     const wallet = await prisma.wallets.findFirst({
    //         where: {
    //             id,
    //         },
    //     })

    //     const foundTransaction = await prisma.transaction_logs.findFirst({
    //         where: {
    //             AND: [
    //                 {
    //                     user_id: foundInstallment.applications.user_id,
    //                 },
    //                 {
    //                     transaction_date: {
    //                         gte: foundInstallment.transaction_date,
    //                     },
    //                 },
    //             ],
    //         },
    //     })

    //     let remainSaldo = 0

    //     return prisma.$transaction(async (tx) => {
    //         remainSaldo =
    //             foundInstallment.amount - foundInstallment.payment_amount
    //         await tx.installment_payments.update({
    //             where: {
    //                 id: foundInstallment.id,
    //             },
    //             data: {
    //                 amount: foundInstallment.payment_amount,
    //                 status: 'Lunas',
    //             },
    //         })

    //         await tx.wallets.update({
    //             where: {
    //                 id: wallet.id,
    //             },
    //             data: {
    //                 balance: { decrement: foundInstallment.payment_amount },
    //             },
    //         })

    //         await tx.installment_payments.update({
    //             where: {
    //                 id: foundInstallmentNext.id,
    //             },
    //             data: {
    //                 amount: { increment: remainSaldo },
    //                 amount_before: remainSaldo,
    //             },
    //         })

    //         await tx.notifications.create({
    //             data: {
    //                 type: 'Transaksi Pembayaran User',
    //                 title: 'Transaksi Pembayaran User telah berhasil dilakukan',
    //                 content: `Pembayaran angsuran kredit Anda sebesar ${foundInstallment.amount} telah berhasil dibayarkan.`,
    //                 user_id: foundInstallment?.applications.user_id,
    //             },
    //         })

    //         await tx.transaction_logs.update({
    //             where: {
    //                 id: foundTransaction.id,
    //             },
    //             data: {
    //                 status: 'Berhasil',
    //             },
    //         })
    //     })
    // }
}

module.exports = InstallmentPaymentService
