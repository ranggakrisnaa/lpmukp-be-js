const cron = require('node-cron')
const { ApplicationService, LoanBILLService } = require('../services')

class CronJobUtil {
    static startCronJob() {
        const task = cron.schedule('* * * * *', async () => {
            await ApplicationService.getApplication()
            await LoanBILLService.getAllLoanBill()
        })

        task.start()
    }
}

module.exports = CronJobUtil
