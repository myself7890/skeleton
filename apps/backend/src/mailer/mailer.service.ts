import { Injectable } from '@nestjs/common';
import nodemailer from 'nodemailer';

@Injectable()
export class MailerService {
  private mailer: nodemailer.Transporter;

  constructor() {
    this.mailer = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      secure: false,
      port: 587,
      auth: {
        user: process.env.GMAIL_USERNAME,
        pass: process.env.GMAIL_PASSWORD,
      },
    });
  }

  async sendMail(to: string, subject: string, body: string): Promise<void> {
    this.mailer.sendMail({
      from: '"Team Sync Pro" <laporte.julie@gmail.com>',
      to,
      subject,
      html: body,
    });
  }
}
