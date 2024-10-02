const prisma = require('../../config/prisma.config')

class LoanBillService {
    static async getDebtorLoanBill(nik, contract_number) {
        let query = {
            roles: {
                none: {
                    name: 'partner',
                },
            },
        }
        if (nik) {
            query.OR = [
                {
                    profiles: {
                        nik: {
                            equals: nik,
                        },
                    },
                },
                {
                    applications: {
                        some: {
                            code: {
                                equals: contract_number,
                            },
                        },
                    },
                },
            ]
        }
        if (contract_number) {
            query.OR = [
                {
                    applications: {
                        some: {
                            code: {
                                equals: contract_number,
                            },
                        },
                    },
                },
                {
                    profiles: {
                        nik: {
                            equals: nik,
                        },
                    },
                },
            ]
        }
        const foundUser = await prisma.users.findFirst({
            where: { ...query },
            select: {
                name: true,
                applications: {
                    select: {
                        code: true,
                        installments: {
                            select: {
                                loan_bills: {
                                    where: {
                                        due_date: { gte: new Date() },
                                    },
                                    select: {
                                        bill_amount: true,
                                        due_date: true,
                                        tenor: true,
                                    },
                                },
                            },
                        },
                    },
                },
                profiles: {
                    select: {
                        nik: true,
                    },
                },
            },
        })

        return {
            ...foundUser,
            applications: {
                code: foundUser.applications[0].code,
                installments: {
                    loan_bills:
                        foundUser.applications[0].installments.loan_bills[0],
                },
            },
        }
    }

    static async getAllDebtorLoanBill(contractNumber) {
        const foundLoanBill = await prisma.applications.findFirst({
            where: {
                code: {
                    equals: contractNumber,
                },
            },
            select: {
                installments: {
                    select: {
                        loan_bills: {
                            select: {
                                id: true,
                                tenor: true,
                                bill_amount: true,
                                due_date: true,
                                status: true,
                            },
                        },
                    },
                },
            },
        })

        return foundLoanBill
    }

    static async getDetailDebtorLoanBill(id) {
        return await prisma.loan_bills.findFirst({
            where: {
                id,
            },
        })
    }
}

module.exports = LoanBillService
