const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();

class MailService {

  constructor() {
    this.transpoter = nodemailer.createTransport({
      service: "gmail",
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD
      }
    })
  }
  async sendActivationMail(emailTo, activationLink) {

    await this.transpoter.sendMail({
      from: process.env.SMTP_USER,
      to: emailTo,
      subject: 'Активация аккаунта на' + process.env.API_URL,
      text: '',
      html: 
      `
        <div>
          <h1>Для активации перейдите по ссылке</h1>
          <a href=${activationLink}>${activationLink}</a>
        </div>
      `
    })
  }
}

module.exports = new MailService();