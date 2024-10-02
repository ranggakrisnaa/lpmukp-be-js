const prisma = require('../../src/config/prisma.config')

class User {
    static async main() {
        await prisma.users.createMany({
            data: [
                {
                    id: 1,
                    name: 'mamad',
                    phone_number: '+6289515944732',
                },
                {
                    id: 999,
                    name: 'putri',
                    phone_number: '+6282157586152',
                },
            ],
            skipDuplicates: true,
        })
    }
}

module.exports = User
