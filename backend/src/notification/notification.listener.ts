import { OnEvent } from '@nestjs/event-emitter';
import { PrismaService } from 'src/prisma/prisma.service';
import { Events } from 'src/events/events';
import { EmailService } from './email.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class NotificationListener {
  constructor(
    private prisma: PrismaService,
    private emailService: EmailService,
  ) {}

  @OnEvent(Events.TRANSACTION_APPROVED)
  async handleTransactionApproved(payload: { bookingId: string }) {
    const booking = await this.prisma.booking.findUnique({
      where: { id: payload.bookingId },
      include: { user: true },
    });

    if (!booking) return;

    const email = booking.user?.email ?? booking.guestEmail;
    if (!email) return;

    await this.emailService.send(
      email,
      'Reserva confirmada ✅',
      `<p>Tu reserva ha sido confirmada para el ${booking.date.toDateString()}</p>`,
    );
  }

  @OnEvent(Events.TRANSACTION_REJECTED)
  async handleTransactionRejected(payload: { bookingId: string }) {
    const booking = await this.prisma.booking.findUnique({
      where: { id: payload.bookingId },
      include: { user: true },
    });

    if (!booking) return;

    const email = booking.user?.email ?? booking.guestEmail;

    if (!email) return;

    await this.emailService.send(
      email,
      'Reserva Rechazado ',
      `<p>Tu reserva ha sido rechazada para el ${booking.date}, porfavor agenda denuevo</p>`,
    );
  }

  @OnEvent(Events.BOOKING_PROOF_UPLOADED)
  async handleProofUploaded(payload: { bookingId: string }) {
    const booking = await this.prisma.booking.findUnique({
      where: { id: payload.bookingId },
      include: { worker: { include: { user: true } } },
    });

    if (!booking) return;

    await this.emailService.send(
      booking.worker.user.email,
      'Comprobante recibido',
      `<p>Se ha enviado un comprobante para la reserva del ${booking.date.toDateString()}</p>`,
    );
  }

  @OnEvent(Events.BOOKING_CREATED)
  async handleBookingCreated(payload: { bookingId: string }) {
    const booking = await this.prisma.booking.findUnique({
      where: { id: payload.bookingId },
      include: {
        worker: { include: { user: true } },
        service: { include: { service: true } },
      },
    });

    if (!booking) return;
    if (!booking.worker?.user?.email) return;
    if (!booking.service || booking.service.length === 0) return;

    const services = booking.service
      .map((s) => s.service?.name)
      .filter(Boolean)
      .join(', ');

    await this.emailService.send(
      booking.worker.user.email,
      'Nueva cita agendada 📅',
      `
    <h3>Nueva reserva</h3>
    <p><b>Fecha:</b> ${booking.date.toDateString()}</p>
    <p><b>Servicios:</b> ${services}</p>
    `,
    );
  }
}
