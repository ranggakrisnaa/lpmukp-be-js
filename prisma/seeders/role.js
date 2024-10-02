const prisma = require('../../src/config/prisma.config')

class Role {
    static async main() {
        await prisma.roles.createMany({
            data: [
                {
                    user_id: 999,
                    name: 'partner',
                },
            ],
            skipDuplicates: true,
        })
    }
}

module.exports = Role
