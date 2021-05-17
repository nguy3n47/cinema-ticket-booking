require('dotenv').config();

import nodemailer from 'nodemailer';

const config = {
  host: process.env.EMAIL_HOST || 'smtp.gmail.com',
  port: 587,
  auth: {
    user: process.env.EMAIL_ACC,
    pass: process.env.EMAIL_PASSWORD,
  },
};

export default class MailService {
  static async sendMail(destination, subject, content) {
    const transporter = nodemailer.createTransport(config);
    try {
      const option = {
        from: `CGV Cinemas 📽️ <${process.env.EMAIL_ACC}>`,
        to: destination,
        subject,
        html: content,
      };
      const info = await transporter.sendMail(option);
      console.log(info);
      return true;
    } catch (err) {
      console.log(err);
      return false;
    } finally {
      transporter.close();
    }
  }
}
