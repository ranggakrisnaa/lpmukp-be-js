function generatePattern(start = 5, step = 4, length = 4) {
    let pattern = ''
    let current = start
    const date = new Date()
    const d = date.valueOf()

    for (let i = 0; i < length; i++) {
        pattern += current
        current += step
        pattern += d
    }

    return pattern.slice(0, 11)
}

function generatePattern2(length = 1, digits = 4) {
    let pattern = ''

    for (let i = 0; i < length; i++) {
        let randomNumber = Math.floor(Math.random() * 10000)
        let formattedNumber = String(randomNumber).padStart(digits, '0')
        pattern += formattedNumber

        if (i < length - 1) {
            pattern += ' '
        }
    }

    return pattern
}

module.exports = { generatePattern, generatePattern2 }
