const cron = require("cron")
const bcrypt = require('bcrypt');
const generator = require('generate-password');
const mailer = require('../helper/mailHelper')

const cronJob = async (userDoc) => {
    try {
        const job = new cron.CronJob(`*/1 * * * *`, async () => {
            const randomPass = generator.generate({
                length: 10,
                numbers: true
            })
            const saltRounds = 10;
            const hashPassword = await bcrypt.hash(randomPass, saltRounds);
            userDoc["password"] = hashPassword;
            await userDoc.save()

            const mailInfo = await mailer(userDoc.email, userDoc.name, "Password Changed", `Successfully Password Changed 
            Your New Password: ${randomPass}`)
            const d = new Date()
            console.log("Register Message sent: ", mailInfo, d.toLocaleString());
        })
        job.start()
    } catch (error) {
        console.log("cronJob",error.message);
    }
}

module.exports = cronJob