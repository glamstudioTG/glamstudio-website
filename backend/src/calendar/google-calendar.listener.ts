import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { PrismaService } from 'src/prisma/prisma.service';
import { Events } from 'src/events/events';
import { GoogleCalendarService } from './google-calendar.service';

@Injectable()
export class GoogleCalendarListener {
  private readonly logger = new Logger(GoogleCalendarListener.name);

  constructor(
    private prisma: PrismaService,
    private googleService: GoogleCalendarService,
  ) {}

  @OnEvent(Events.TRANSACTION_APPROVED)
  async handleBookingConfirmed(payload: { bookingId: string }) {
    try {
      const booking = await this.prisma.booking.findUnique({
        where: { id: payload.bookingId },
        include: {
          worker: { include: { user: true } },
          service: { include: { service: true } },
          user: true,
        },
      });

      if (!booking) return;

      const start = new Date(booking.date);
      start.setMinutes(start.getMinutes() + booking.startTime);

      const end = new Date(booking.date);
      end.setMinutes(end.getMinutes() + booking.endTime);

      const serviceName = booking.service
        .map((bs) => bs.service.name)
        .join(', ');

      const clientName = booking.user?.name ?? booking.guestName ?? 'Cliente';

      const eventId = await this.googleService.createBookingEvent({
        start,
        end,
        serviceName,
        workerName: booking.worker.user.name,
        clientName,
      });

      if (eventId) {
        await this.prisma.booking.update({
          where: { id: booking.id },
          data: { calendarEventId: eventId },
        });
      }
    } catch (error) {
      this.logger.error('Error in TRANSACTION_APPROVED listener', error);
    }
  }

  @OnEvent(Events.TRANSACTION_REJECTED)
  async handleBookingRejected(payload: { bookingId: string }) {
    try {
      const booking = await this.prisma.booking.findUnique({
        where: { id: payload.bookingId },
      });

      if (!booking?.calendarEventId) return;

      await this.googleService.deleteEvent(booking.calendarEventId);

      await this.prisma.booking.update({
        where: { id: booking.id },
        data: { calendarEventId: null },
      });
    } catch (error) {
      this.logger.error('Error in TRANSACTION_REJECTED listener', error);
    }
  }
}
