import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Resend } from 'resend';

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);
  private resend: Resend;
  private fromEmail: string;

  constructor(private configService: ConfigService) {
    const apiKey = this.configService.get<string>('RESEND_API_KEY');

    if (!apiKey) {
      this.logger.error('RESEND_API_KEY is missing');
      throw new Error('RESEND_API_KEY not configured');
    }

    this.resend = new Resend(apiKey);

    this.fromEmail =
      this.configService.get<string>('MAIL_USER') || 'onboarding@resend.dev';
  }

  async send(to: string, subject: string, html: string): Promise<void> {
    try {
      const response = await this.resend.emails.send({
        from: `GlamStudio <${this.fromEmail}>`,
        to,
        subject,
        html,
      });

      this.logger.log(`Email sent to ${to} | ID: ${response.data?.id}`);
    } catch (error) {
      this.logger.error(`Error sending email to ${to}`, error);
    }
  }
}
