const path = require("path")
require('dotenv').config({path: path.join(__dirname, '..', 'env', '.env')})

const nodemailer = require("nodemailer");

const mailer = async(mailId, username, textMsg, msg)=> {
    try {
      const transporter = nodemailer.createTransport({
        host: "smtp.zeptomail.com",
        port: 587,
        secure: false,
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASSWORD,
        },
      });
      
    const info = await transporter.sendMail({
        from: `Maticz ${process.env.MAIL_USER}`,
        to: mailId,
        subject: `Hello ${username}`,
        text: `${textMsg}`,
        html: `<h1>${msg}</h1>`,
    });
    return info
    } catch (error) {
      console.log("mailer", error);
    }
}

module.exports = mailer