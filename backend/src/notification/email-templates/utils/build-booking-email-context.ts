import { Booking } from '@prisma/client';

export function buildBookingEmailContext(booking: any) {
  const clientName = booking.user?.name ?? booking.guestName ?? 'Cliente';
  const clientEmail = booking.user?.email ?? booking.guestEmail;

  return {
    bookingId: booking.id,

    client: {
      name: clientName,
      email: clientEmail,
    },

    worker: {
      id: booking.worker.id,
      name: booking.worker.user.name,
      email: booking.worker.user.email,
    },

    services: booking.service.map((bs: any) => bs.service.name),

    date: booking.date.toISOString().slice(0, 10),
    startTime: booking.startTime,
    endTime: booking.endTime,
  };
}
