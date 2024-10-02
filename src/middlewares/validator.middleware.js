const { ErrHandler } = require('./errhandler.middleware')

class Validator {
    static validate(schema) {
        return function (req, _, next) {
            try {
                const { error, _ } = schema.validate(req.body)
                if (error) {
                    throw new ErrHandler(409, error.message.replace(/"/g, ''))
                }

                next()
            } catch (error) {
                next(error)
            }
        }
    }
}

module.exports = Validator
