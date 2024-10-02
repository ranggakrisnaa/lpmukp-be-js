const fs = require('fs')

class FsUtil {
    static deleteFileExists(fileName) {
        const folderPath = `public/images/${fileName}`
        if (fs.existsSync(folderPath)) {
            fs.unlinkSync(folderPath)
        }
    }
}

module.exports = FsUtil
