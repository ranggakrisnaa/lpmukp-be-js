class PrismaUtil {
    static excludeField(user, keys) {
        return Object.fromEntries(
            Object.entries(user).filter(([key]) => !keys.includes(key))
        )
    }

    static parseNIK(nik) {
        const regex =
            /^(1[1-9]|21|[37][1-6]|5[1-3]|6[1-5]|[89][12])\d{2}\d{2}([04][1-9]|[1256][0-9]|[37][01])(0[1-9]|1[0-2])\d{2}\d{4}$/

        return regex.test(nik)
    }
}

module.exports = PrismaUtil
