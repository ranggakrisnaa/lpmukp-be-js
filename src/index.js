require('dotenv').config()
require('./utils/cronjob.util').startCronJob()
// require('./controllers/chatbot.controller').startAuth()
// require('./config/whatsapp.config').client.then((client) => start(client))
// require('./config/xendit.config')
const listEndpoints = require('express-list-endpoints')
const path = require('path')
const express = require('express')
const debtorRoute = require('./routes/index')
const partnerRoute = require('./routes/partners/index')
const { handlerError } = require('./middlewares/errhandler.middleware')
const cookieParser = require('cookie-parser')
const config = require('./config/dotenv.config')
const morgan = require('morgan')
const cors = require('cors')
const ApiKeyMiddleware = require('./middlewares/apikey.middleware')

const app = express()

app.use(
    morgan(function (tokens, req, res) {
        return [
            tokens.method(req, res),
            tokens.url(req, res),
            tokens.status(req, res),
            tokens.res(req, res, 'content-length'),
            '-',
            tokens['response-time'](req, res),
            'ms',
        ].join(' ')
    })
)
app.use(cors())
app.use(express.json())
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.get('/', (_, res) => {
    res.status(200).json({
        success: true,
        statusCode: 200,
        message: 'Success to hit api project',
    })
})
app.get('/list', (_, res) => {
    const data = listEndpoints(app).map(
        (list) => `${list.path} -> ${list.methods}`
    )

    res.status(200).json({
        success: true,
        statusCode: 200,
        message: 'Data list endpoint retrieved successfully.',
        total: data.length,
        data,
    })
})
app.use(ApiKeyMiddleware.addApiKeyAuthorization)
app.use('/api/v1/partners', partnerRoute)
app.use('/api/v1', debtorRoute)
app.use(handlerError)

app.listen(config.PORT, () => {
    console.warn(`app listening on address http://localhost:${config.PORT}`)
})

module.exports = app
