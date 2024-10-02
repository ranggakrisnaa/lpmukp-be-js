const { Prisma } = require('@prisma/client')

// eslint-disable-next-line no-unused-vars
const handlerError = async (err, _req, res, _) => {
    console.warn(err)
    if (err instanceof ErrHandler) {
        res.status(err.statusCode).json({
            success: false,
            statusCode: err.statusCode,
            message: err.message,
        })
    } else if (
        err instanceof Prisma.PrismaClientKnownRequestError &&
        err.code === 'P2002'
    ) {
        res.status(409).json({
            status: 409,
            success: false,
            message: `Duplicate field value: ${err.meta.target}`,
        })
    } else {
        res.status(500).json({
            success: false,
            statusCode: 500,
            message: err.message,
        })
    }
}

class ErrHandler extends Error {
    statusCode = 0
    constructor(statusCode, message) {
        super(message)
        this.statusCode = statusCode
    }
}

module.exports = { ErrHandler, handlerError }
