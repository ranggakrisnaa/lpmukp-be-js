// const { default: axios } = require('axios')
// const config = require('../config/dotenv.config')
const prisma = require('../config/prisma.config')
const TimeUtil = require('../utils/timeconvert.util')
const { ErrHandler } = require('../middlewares/errhandler.middleware')

class TopupService {
    static async getUserTopupWalletById(id, topupId) {
        const data = await prisma.topups.findFirst({
            where: { AND: [{ user_id: id }, { id: topupId }] },
        })
        if (!data) throw new ErrHandler(404, 'Top up data is not found.')

        return data
    }

    static async getAllTopupWallets(id) {
        return await prisma.topups.findMany({ where: { user_id: id } })
    }

    static async createTopupWallet(reqBody, id) {
        const { nominal_topup } = reqBody

        const foundUser = await prisma.users.findFirst({
            where: {
                id,
            },
            include: {
                topups: true,
                wallets: true,
                business_account: {
                    include: {
                        bank: true,
                    },
                },
            },
        })
        if (!foundUser) throw new ErrHandler(404, 'User is not found.')

        const foundPaymentMethod = await prisma.payment_methods.findFirst({
            where: {
                code: foundUser.business_account[0].bank.code,
            },
        })
        if (!foundPaymentMethod)
            throw new ErrHandler(404, 'Payment method data is not found.')

        if (foundUser.wallets.length < 1) {
            await prisma.wallets.create({
                data: {
                    name: 'Dompet ' + foundUser.name,
                    balance: 0,
                    user_id: id,
                },
            })
        }

        const currentDate = new Date()
        currentDate.setDate(currentDate.getDate() + 1)
        return prisma.$transaction(async (tx) => {
            let totalCost = 0
            let calculatedPercentageCost = 0

            if (foundPaymentMethod.handling_cost) {
                calculatedPercentageCost =
                    foundPaymentMethod.percentage_cost > 0
                        ? foundPaymentMethod.percentage_cost * nominal_topup
                        : 0

                totalCost =
                    nominal_topup +
                    calculatedPercentageCost +
                    foundPaymentMethod.handling_cost
            }

            // const paymentPayload = {
            //     country: 'ID',
            //     currency: 'IDR',
            //     name: foundPaymentMethod.account_name,
            //     description: `Pembayaran saldo user dengan nominal ${nominal_topup}`,
            //     amount: totalCost != 0 ? totalCost : nominal_topup,
            //     reference_id: foundUser.user_id,
            //     expires_at: currentDate,
            //     bank_code: foundPaymentMethod.code,
            // }

            // const createPayment = await axios.post(
            //     `${config.XENDIT_BASE_URL}${config.XENDIT_ENV}${config.XENDIT_PAYMENT}/va/create`,
            //     paymentPayload,
            //     {
            //         headers: {
            //             'Account-Key': `${config.XENDIT_ACCOUNT_KEY}`,
            //             'Service-Key': `${config.XENDIT_SERVICE_KEY}`,
            //             'Payment-Service-Key': `${config.XENDIT_PAYMENT_SERVICE_KEY}`,
            //         },
            //     }
            // )
            const getCustomTime = TimeUtil.getDateCustom(new Date())

            const topup = await tx.topups.create({
                data: {
                    transaction_code: `topup-${getCustomTime}`,
                    payment_method_id: foundPaymentMethod.id,
                    admin_fee:
                        calculatedPercentageCost == 0
                            ? foundPaymentMethod.handling_cost
                            : calculatedPercentageCost,
                    status: 'Proses Pembayaran',
                    subtotal: nominal_topup,
                    total: totalCost != 0 ? totalCost : nominal_topup,
                    meta: null,
                    user_id: foundUser.id,
                },
            })

            await tx.wallet_logs.create({
                data: {
                    topup_id: topup.id,
                    wallet_id: foundUser.wallets[0].id,
                },
            })

            return topup
        })
    }

    static async topupWalletCallback(reqBody, id, topup_id) {
        const { status } = reqBody

        const foundTopup = await prisma.topups.findFirst({
            where: {
                topup_id,
            },
        })
        if (!foundTopup)
            throw new ErrHandler(404, 'Payment method data is not found.')

        const foundWallet = await prisma.wallets.findFirst({
            where: {
                user_id: id,
            },
            include: {
                users: true,
            },
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

        if (isPaid && foundTopup?.status == 'Proses Pembayaran')
            return prisma.$transaction(async (tx) => {
                await tx.topups.update({
                    where: {
                        id: foundTopup.id,
                    },
                    data: {
                        status: 'Berhasil',
                    },
                })

                await tx.notifications.create({
                    data: {
                        type: 'Transaksi Top Up Saldo',
                        title: 'Top Up Berhasil!',
                        content: `Halo ${foundWallet.users.name},Top up saldo Anda sebesar ${foundTopup.subtotal} telah berhasil dlakukan`,
                        user_id: id,
                    },
                })

                await tx.wallets.update({
                    where: {
                        id: foundWallet.id,
                    },
                    data: {
                        balance: {
                            increment: foundTopup.subtotal,
                        },
                    },
                })
            })
    }
}

module.exports = TopupService
