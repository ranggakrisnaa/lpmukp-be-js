const prisma = require('../config/prisma.config')
const { ErrHandler } = require('../middlewares/errhandler.middleware')

class TransactionHistoryService {
    static async getAllTransactionHistories(
        id,
        pageNumber,
        pageSize,
        transactionType,
        transactionDate
    ) {
        let dateConvert
        let optionFilter1 = { status: 'Berhasil' }
        let optionFilter2 = {
            otp_expiredAt: {
                equals: null,
            },
        }

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

            optionFilter2 = {
                OR: [
                    {
                        otp_expiredAt: {
                            equals: null,
                        },
                    },
                    {
                        updated_at: {
                            lte: dateConvert,
                        },
                    },
                ],
            }
        }

        const foundWallet = await prisma.wallets.findFirst({
            where: {
                user_id: id,
            },
        })
        if (!foundWallet) throw new ErrHandler(404, 'Wallet data is not found.')

        const totalCountInstallmentLogs = await prisma.transaction_logs.count()
        const totalCountWalletLogs = await prisma.wallet_logs.count({
            where: {
                wallet_id: foundWallet.id,
            },
        })

        const totalPagesInstallmentLogs = Math.ceil(
            totalCountInstallmentLogs / pageSize
        )
        const totalPagesWalletLogs = Math.ceil(totalCountWalletLogs / pageSize)

        const offset = (pageNumber - 1) * pageSize

        const [installmentTransactionLogs, walletTransactionLogs] =
            await Promise.all([
                prisma.transaction_logs.findMany({
                    skip: offset,
                    take: pageSize,
                    where: {
                        ...optionFilter1,
                    },
                }),
                prisma.wallet_logs.findMany({
                    where: {
                        AND: [
                            {
                                wallet_id: foundWallet.id,
                            },
                            {
                                OR: [
                                    {
                                        topups: {
                                            ...optionFilter1,
                                        },
                                    },
                                    {
                                        withdraws: {
                                            ...optionFilter2,
                                        },
                                    },
                                ],
                            },
                        ],
                    },
                    select: {
                        topups: true,
                        withdraws: true,
                    },
                    skip: offset,
                    take: pageSize,
                }),
            ])

        const hasPrevPage = pageNumber > 1
        const hasNextPageInstallmentLogs =
            pageNumber < totalPagesInstallmentLogs
        const hasNextPageWalletLogs = pageNumber < totalPagesWalletLogs

        let pagination = {}
        let combinedLogs = {}

        if (transactionType == 'Pembayaran Tagihan Pinjaman') {
            pagination = {
                currentPage: pageNumber,
                hasPrevPage,
                hasNextPageInstallmentLogs,
                totalPagesInstallmentLogs,
            }

            combinedLogs = {
                installmentTransactionLogs,
                pagination,
            }
        } else if (transactionType == 'Topup dan Withdraw') {
            pagination = {
                currentPage: pageNumber,
                hasPrevPage,
                hasNextPageWalletLogs,
                totalPagesWalletLogs,
            }

            combinedLogs = {
                walletTransactionLogs,
                pagination,
            }
        } else {
            pagination = {
                currentPage: pageNumber,
                hasPrevPage,
                hasNextPageInstallmentLogs,
                hasNextPageWalletLogs,
                totalPagesInstallmentLogs,
                totalPagesWalletLogs,
            }

            combinedLogs = {
                installmentTransactionLogs,
                walletTransactionLogs,
                pagination,
            }
        }
        return combinedLogs
    }
}

module.exports = TransactionHistoryService
