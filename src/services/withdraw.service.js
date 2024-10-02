const prisma = require('../config/prisma.config')
const { ErrHandler } = require('../middlewares/errhandler.middleware')
const PrismaUtil = require('../utils/prisma.util')
const otpAuthUtil = require('../utils/otpauth.util')

class WithdrawService {
    static async index(id, reqParams) {
        const withdraws = await prisma.withdraws.findMany({
            where: {
                wallet: {
                    user_id: id,
                },
            },
            orderBy: {
                createdAt: reqParams.oldest ? 'asc' : 'desc',
            },
            include: {
                wallet: true,
                bank: true,
            },
        })
        return withdraws.map((withdraw) =>
            PrismaUtil.excludeField(withdraw, ['id'])
        )
    }

    static async store(id, reqBody) {
        const foundUser = await prisma.users.findFirst({
            where: { id },
            include: {
                wallets: true,
            },
        })
        if (!foundUser) throw new ErrHandler(404, 'User is not found.')

        let wallet = foundUser.wallets[0]
        if (foundUser.wallets < 1) {
            wallet = await prisma.wallets.create({
                data: {
                    name: 'Dompet ' + foundUser.name,
                    balance: 0,
                    user_id: id,
                },
            })
        }

        if (wallet.balance < reqBody.amount)
            throw new ErrHandler(400, 'Insufficient balance.')

        const foundBusinessAccount = await prisma.business_account.findFirst({
            where: { id: reqBody.bussiness_account_id },
            include: { bank: true },
        })
        if (!foundBusinessAccount)
            throw new ErrHandler(404, 'Business account is not found.')

        const bank = foundBusinessAccount.bank

        let otp = (
            await otpAuthUtil.generateOTP(foundUser.phone_number)
        ).data.data.toString()
        return await prisma.$transaction(async (tx) => {
            return await tx.withdraws.create({
                data: {
                    wallet_id: wallet.id,
                    bank_id: bank.id,
                    account_name: foundBusinessAccount.account_name,
                    account_number: foundBusinessAccount.account_number,
                    amount: reqBody.amount,
                    cost: bank.instant ? bank.instant_cost : bank.manual_cost,
                    otp: otp,
                    otp_expiredAt: new Date(
                        new Date().getTime() + 10 * 60 * 1000
                    ),
                    paidAt: null,
                },
            })
        })
    }

    static async generateOtp(id, withdrawId) {
        var withdraw = await prisma.withdraws.findFirst({
            where: {
                wallet: {
                    user_id: id,
                },
                id: withdrawId,
            },
            include: {
                wallet: {
                    include: {
                        users: true,
                    },
                },
            },
        })

        if (!withdraw) throw new ErrHandler(404, 'Withdraw is not found.')
        if (!withdraw.otp || withdraw.paidAt)
            throw new ErrHandler(400, 'Withdraw is already validated.')

        let otp = (
            await otpAuthUtil.generateOTP(withdraw.wallet.users.phone_number)
        ).data.data.toString()
        return await prisma.withdraws.update({
            where: { id: withdrawId },
            data: {
                otp: otp,
                otp_expiredAt: new Date(new Date().getTime() + 10 * 60 * 1000),
            },
        })
    }

    static async validateOtp(id, withdrawId, reqBody) {
        const withdraw = await prisma.withdraws.findFirst({
            where: {
                wallet: {
                    user_id: id,
                },
                id: withdrawId,
            },
        })
        if (!withdraw) throw new ErrHandler(404, 'Withdraw is not found.')
        if (!withdraw.otp || !withdraw.otp_expiredAt || withdraw.paidAt)
            throw new ErrHandler(400, 'Withdraw is already validated.')
        if (withdraw.otp !== reqBody.otp)
            throw new ErrHandler(400, 'Invalid OTP.')
        if (withdraw.otp_expiredAt < new Date())
            throw new ErrHandler(
                400,
                'OTP is expired. Please make new withdraw request'
            )

        return prisma.$transaction(async (tx) => {
            await tx.withdraws.update({
                where: { id: withdrawId },
                data: {
                    otp: null,
                    otp_expiredAt: null,
                },
            })

            await tx.wallets.update({
                where: { id: withdraw.wallet_id },
                data: {
                    balance: {
                        decrement: withdraw.amount,
                    },
                },
            })
        })
    }

    static async show(id, withdrawId) {
        const withdraw = await prisma.withdraws.findFirst({
            where: {
                wallet: {
                    user_id: id,
                },
                id: withdrawId,
            },
            include: {
                bank: true,
                wallet: {
                    include: {
                        users: true,
                    },
                },
            },
        })
        if (!withdraw) throw new ErrHandler(404, 'Withdraw is not found.')
        return PrismaUtil.excludeField(withdraw, ['id'])
    }
}

module.exports = WithdrawService
