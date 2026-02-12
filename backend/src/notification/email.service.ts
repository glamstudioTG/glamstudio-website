import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService implements OnModuleInit {
  private readonly logger = new Logger(EmailService.name);
  private transporter!: nodemailer.Transporter;

  constructor(private configService: ConfigService) {}

  onModuleInit() {
    const user = this.configService.get<string>('MAIL_USER');
    const pass = this.configService.get<string>('MAIL_PASS');

    if (!user || !pass) {
      this.logger.error('Mail environment variables missing');
      return;
    }

    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: { user, pass },
    });

    this.logger.log('Email service initialized');
  }

  async send(to: string, subject: string, html: string): Promise<void> {
    try {
      if (!this.transporter) {
        this.logger.error('Transporter not initialized');
        return;
      }

      await this.transporter.sendMail({
        from: `"GlamStudio" <${this.configService.get('MAIL_USER')}>`,
        to,
        subject,
        html,
      });

      this.logger.log(`Email sent to ${to}`);
    } catch (error) {
      this.logger.error(`Error sending email to ${to}`, error);
    }
  }
}
