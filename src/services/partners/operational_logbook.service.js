const prisma = require('../../config/prisma.config')
const { ErrHandler } = require('../../middlewares/errhandler.middleware')

class OperationalLogbookService {
    static async createOperationalLogbook(reqBody, id) {
        const payload = {
            ...reqBody,
            date: new Date(reqBody.date),
            user_id: id,
        }

        return await prisma.operational_logbooks.create({ data: payload })
    }

    static async getAllOperationalLogbook(creationDate, type, userId) {
        let queryFilter = {
            ...(creationDate && { date: new Date(creationDate) }),
            ...(type && { type: { equals: type } }),
        }

        return await prisma.operational_logbooks.findMany({
            where: {
                ...queryFilter,
                user_id: userId,
            },
        })
    }

    static async getOperationalLogbookById(id) {
        const data = await prisma.operational_logbooks.findFirst({
            where: {
                id,
            },
        })
        if (!data)
            throw new ErrHandler(404, 'Operational logbook data is not found.')

        return data
    }

    static async getAllAmountOperationalLogbook(id) {
        const getAmountIn = await prisma.operational_logbooks.findMany({
            where: {
                type: 'Pemasukan',
                user_id: id,
            },
        })

        const getAmountOut = await prisma.operational_logbooks.findMany({
            where: {
                type: 'Pengeluaran',
                user_id: id,
            },
        })

        return {
            total_revenue: getAmountIn.reduce(
                (accumulator, data) => (accumulator += Number(data.amount)),
                0
            ),
            total_expenses: getAmountOut.reduce(
                (accumulator, data) => (accumulator += Number(data.amount)),
                0
            ),
        }
    }

    // FIXME: update fix
    static async updateOperationalLogbook(reqBody, id) {
        const foundOperationalLogbook =
            await prisma.operational_logbooks.findFirst({
                where: { id },
            })
        if (!foundOperationalLogbook)
            throw new ErrHandler(404, 'Operational Logbook data is not found.')

        const payload = {
            date: new Date(reqBody.date) || foundOperationalLogbook.date,
            category: reqBody.category || foundOperationalLogbook.category,
            description:
                reqBody.description || foundOperationalLogbook.description,
            user_id: foundOperationalLogbook.user_id,
            amount: reqBody.amount || foundOperationalLogbook.amount,
            type: reqBody.type || foundOperationalLogbook.type,
        }

        return await prisma.operational_logbooks.update({
            where: {
                id: foundOperationalLogbook.id,
            },
            data: payload,
        })
    }
}

module.exports = OperationalLogbookService
