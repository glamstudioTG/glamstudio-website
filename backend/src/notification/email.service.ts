import * as nodemailer from 'nodemailer';

export class EmailService {
  private transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'cuentaoficialltatiana@gmail.com',
      pass: process.env.MAIL_PASS,
    },
  });

  async send(to: string, subject: string, html: string) {
    await this.transporter.sendMail({
      from: '"GlamStudio" <cuentaoficialltatiana@gmail.com>',
      to,
      subject,
      html,
    });
  }
}
