import { response } from 'express';
import { google, calendar_v3 } from 'googleapis';

export class GoogleCalendarService {
  private calendar: calendar_v3.Calendar;

  constructor() {
    const auth = new google.auth.JWT({
      email: process.env.GCAL_CLIENT_EMAIL,
      key: process.env.GCAL_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      scopes: ['https://www.googleapis.com/auth/calendar'],
    });

    this.calendar = google.calendar({
      version: 'v3',
      auth,
    });
  }

  async createBookingEvent(params: {
    start: Date;
    end: Date;
    serviceName: string;
    workerName: string;
    clientName: string;
  }) {
    const response = await this.calendar.events.insert({
      calendarId: 'primary',
      requestBody: {
        summary: `${params.serviceName} - ${params.workerName}`,
        description: `Cliente: ${params.clientName}`,
        start: {
          dateTime: params.start.toISOString(),
        },
        end: {
          dateTime: params.end.toISOString(),
        },
      },
    });

    return response.data.id;
  }

  async deleteEvent(eventId: string) {
    await this.calendar.events.delete({
      calendarId: 'primary',
      eventId,
    });
  }
}
