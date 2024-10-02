const prisma = require('../../config/prisma.config')
const dotenvConfig = require('../../config/dotenv.config')
const { ErrHandler } = require('../../middlewares/errhandler.middleware')

class LogbookAcivityService {
    static async createLogbookActivity(reqBody, reqFile, userId) {
        let { nama_debitur = null, category, date, description } = reqBody
        if (nama_debitur) {
            const user = await prisma.users.findFirst({
                where: {
                    name: {
                        equals: nama_debitur,
                    },
                },
            })
            if (!user) throw new ErrHandler(404, 'User data is not found.')
            nama_debitur = user.name
        }

        return prisma.$transaction(async (tx) => {
            const logbookActivity = await tx.logbook_activities.create({
                data: {
                    user_id: userId,
                    nama_debitur,
                    category,
                    date: new Date(date),
                    description,
                },
            })

            if (reqFile) {
                for (let i = 0; i < reqFile.length; i++) {
                    const image = reqFile[i]
                    await tx.logbook_photos.create({
                        data: {
                            logbook_activity_id: logbookActivity.id,
                            photo: `http://localhost:${dotenvConfig.PORT}/images/${image.filename}`,
                        },
                    })
                }
            }
        })
    }

    static async findDebtorsByNikOrConractNumber(nik, contractNumber) {
        let query =
            nik || contractNumber
                ? {
                      OR: [
                          {
                              profiles: {
                                  nik: {
                                      equals: nik,
                                  },
                              },
                          },
                          {
                              applications: {
                                  every: {
                                      code: contractNumber,
                                  },
                              },
                          },
                          {
                              roles: {
                                  NOT: { name: 'partner' },
                              },
                          },
                      ],
                  }
                : {
                      roles: {
                          NOT: { name: 'partner' },
                      },
                  }
        const data = await prisma.users.findMany({
            where: {
                ...query,
            },
        })
        if (!data) throw new ErrHandler(404, 'User data is not found.')
        return data
    }

    static async getLogbookActivityByDate(date) {
        const data = await prisma.logbook_activities.findMany({
            where: {
                date: {
                    equals: new Date(date),
                },
            },
            include: {
                logbook_photos: true,
            },
        })

        return data
    }

    static async getLogbookActivityById(id) {
        const data = await prisma.logbook_activities.findFirst({
            where: { id },
            include: { logbook_photos: true },
        })
        if (!data)
            throw new ErrHandler(404, 'Logbook activity data is not found.')

        return data
    }
}

module.exports = LogbookAcivityService
