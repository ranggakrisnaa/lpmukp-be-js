class TimeUtil {
    static convertTime(dateTimeString) {
        const utcDateTime = new Date(dateTimeString)

        const convertedTime = utcDateTime.toLocaleString('en-US', {
            timeZone: 'Asia/Jakarta',
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false,
            fractionalSecondDigits: 3,
        })

        return convertedTime
    }

    static getDateCustom(date) {
        var day = date.getDate().toString().padStart(2, '0')
        var month = (date.getMonth() + 1).toString().padStart(2, '0')
        var year = date.getFullYear().toString()

        // Concatenate the components in the desired format
        var formattedDate = day + month + year
        return formattedDate
    }

    static formatDateToYYYYMMDD(dateString) {
        const date = new Date(dateString)
        if (isNaN(date.getTime())) {
            throw new Error('Invalid date string provided.')
        }
        const year = date.getFullYear()
        const month = String(date.getMonth() + 1).padStart(2, '0') // Months are 0-based, hence +1
        const day = String(date.getDate()).padStart(2, '0')
        return `${year}-${month}-${day}`
    }

    static getMonthCustom(dateString) {
        const options = { year: 'numeric', month: 'long' }
        return new Intl.DateTimeFormat('id-ID', options).format(dateString)
    }
}

module.exports = TimeUtil
