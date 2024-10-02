const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient({
    log: [
        {
            emit: 'event',
            level: 'query',
        },
        {
            emit: 'stdout',
            level: 'error',
        },
        {
            emit: 'stdout',
            level: 'info',
        },
        {
            emit: 'stdout',
            level: 'warn',
        },
    ],
})

prisma.$on('query', (e) => {
    if (process.env.NODE_ENV === 'development') {
        console.warn('Query: ' + e.query)
        console.warn('Params: ' + e.params)
        console.warn('Duration: ' + e.duration + 'ms')
    }
})

module.exports = prisma
