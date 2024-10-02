const qrcode = require('qrcode-terminal')
const { Client, LocalAuth } = require('whatsapp-web.js')

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: { headless: true },
})

class Chatbot {
    static async startAuth() {
        try {
            client.on('qr', (qr) => {
                qrcode.generate(qr, { small: true })
            })

            client.on('ready', () => {
                console.warn('Client is ready!')
            })

            // client.on('message', async (message) => {
            //     const userName = client.info.me.user
            //     if (message.body === '!ping') {
            //         await message.reply('halo, apa kabar')
            //     } else if (message.body === '!help') {
            //         const media = MessageMedia.fromFilePath(
            //             './public/images/hapid.jpg'
            //         )
            //         await client.sendMessage(message.from, media)
            //     } else if (message.body === '!ban') {
            //         await message.reply(`${userName}, kamu diban paslon 01`)
            //     }
            // })

            await client.initialize()
        } catch (error) {
            console.warn(error)
        }
    }

    static async sendMessage(req, res) {
        try {
            let phone = req.params.phone
            let message = req.body.message

            if (phone == undefined || message == undefined) {
                res.send({
                    status: 'error',
                    message: 'please enter valid phone and message',
                })
            } else {
                client
                    .sendMessage(phone + '@c.us', message)
                    .then((response) => {
                        if (response.id.fromMe) {
                            res.send({
                                status: 'success',
                                message: `Message successfully sent to ${phone}`,
                            })
                        }
                    })
            }
        } catch (error) {
            console.warn(error)
        }
    }
}

module.exports = Chatbot
