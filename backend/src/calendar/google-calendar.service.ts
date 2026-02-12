import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { google, calendar_v3 } from 'googleapis';

@Injectable()
export class GoogleCalendarService implements OnModuleInit {
  private readonly logger = new Logger(GoogleCalendarService.name);
  private calendar!: calendar_v3.Calendar;

  constructor(private configService: ConfigService) {}

  onModuleInit() {
    const clientEmail = this.configService.get<string>('GCAL_CLIENT_EMAIL');
    const privateKeyRaw = this.configService.get<string>('GCAL_PRIVATE_KEY');
    const calendarId = this.configService.get<string>('GCAL_CALENDAR_ID');

    if (!clientEmail || !privateKeyRaw || !calendarId) {
      this.logger.error('Google Calendar environment variables missing');
      return;
    }

    const privateKey = privateKeyRaw.replace(/\\n/g, '\n');

    const auth = new google.auth.JWT({
      email: clientEmail,
      key: privateKey,
      scopes: ['https://www.googleapis.com/auth/calendar'],
    });

    this.calendar = google.calendar({
      version: 'v3',
      auth,
    });

    this.logger.log('Google Calendar service initialized');
  }

  async createBookingEvent(params: {
    start: Date;
    end: Date;
    serviceName: string;
    workerName: string;
    clientName: string;
  }): Promise<string | null> {
    try {
      const calendarId = this.configService.get<string>('GCAL_CALENDAR_ID');

      const response = await this.calendar.events.insert({
        calendarId,
        requestBody: {
          summary: `${params.serviceName} - ${params.workerName}`,
          description: `Cliente: ${params.clientName}`,
          start: { dateTime: params.start.toISOString() },
          end: { dateTime: params.end.toISOString() },
        },
      });

      this.logger.log(`Calendar event created: ${response.data.id}`);

      return response.data.id ?? null;
    } catch (error) {
      this.logger.error('Error creating calendar event', error);
      return null;
    }
  }

  async deleteEvent(eventId: string): Promise<void> {
    try {
      const calendarId = this.configService.get<string>('GCAL_CALENDAR_ID');

      await this.calendar.events.delete({
        calendarId,
        eventId,
      });

      this.logger.log(`Calendar event deleted: ${eventId}`);
    } catch (error) {
      this.logger.error('Error deleting calendar event', error);
    }
  }
}
