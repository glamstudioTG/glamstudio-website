import { OnEvent } from '@nestjs/event-emitter';
import { PrismaService } from 'src/prisma/prisma.service';
import { Events } from 'src/events/events';
import { GoogleCalendarService } from './google-calendar.service';

export class GoogleCalendarListener {
  constructor(
    private prisma: PrismaService,
    private googleService: GoogleCalendarService,
  ) {}

  @OnEvent(Events.TRANSACTION_APPROVED)
  async handleBookingConfirmed(payload: { bookingId: string }) {
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

    const serviceName = booking.service.map((bs) => bs.service.name).join(', ');

    const clientName = booking.user
      ? booking.user.name
      : booking.guestName || 'Cliente';

    const eventId = await this.googleService.createBookingEvent({
      start,
      end,
      serviceName,
      workerName: booking.worker.user.name,
      clientName,
    });

    await this.prisma.booking.update({
      where: { id: booking.id },
      data: { calendarEventId: eventId },
    });
  }

  @OnEvent(Events.TRANSACTION_REJECTED)
  async handleBookingRejected(payload: { bookingId: string }) {
    const booking = await this.prisma.booking.findUnique({
      where: { id: payload.bookingId },
    });

    if (!booking?.calendarEventId) return;

    await this.googleService.deleteEvent(booking.calendarEventId);

    await this.prisma.booking.update({
      where: { id: booking.id },
      data: { calendarEventId: null },
    });
  }
}
