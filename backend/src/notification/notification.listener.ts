import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { PrismaService } from 'src/prisma/prisma.service';
import { EmailService } from './email.service';
import { Events } from 'src/events/events';

import { buildBookingEmailContext } from './email-templates/utils/build-booking-email-context';

import { bookingCreatedClientTemplate } from './email-templates/booking/booking-created.template';
import { bookingProofUploadedWorkerTemplate } from './email-templates/booking/booking-proof-uploaded.template';
import { bookingConfirmedClientTemplate } from './email-templates/booking/booking-confirmed.template';
import { bookingRejectedClientTemplate } from './email-templates/booking/booking-rejected.template';

@Injectable()
export class NotificationListener {
  constructor(
    private readonly prisma: PrismaService,
    private readonly emailService: EmailService,
  ) {}

  @OnEvent(Events.BOOKING_CREATED)
  async handleBookingCreated(payload: { bookingId: string }) {
    const booking = await this.prisma.booking.findUnique({
      where: { id: payload.bookingId },
      include: {
        user: true,
        worker: { include: { user: true } },
        service: { include: { service: true } },
      },
    });

    if (!booking) return;
    if (!booking.worker?.user?.email) return;

    const ctx = buildBookingEmailContext(booking);

    await this.emailService.send(
      ctx.worker.email,
      'Nueva reserva pendiente',
      bookingCreatedClientTemplate(ctx),
    );
  }

  @OnEvent(Events.BOOKING_PROOF_UPLOADED)
  async handleBookingProofUploaded(payload: { bookingId: string }) {
    const booking = await this.prisma.booking.findUnique({
      where: { id: payload.bookingId },
      include: {
        user: true,
        worker: { include: { user: true } },
        service: { include: { service: true } },
      },
    });

    if (!booking) return;
    if (!booking.worker?.user?.email) return;

    const ctx = buildBookingEmailContext(booking);

    await this.emailService.send(
      ctx.worker.email,
      'Nuevo comprobante recibido',
      bookingProofUploadedWorkerTemplate(ctx),
    );
  }

  @OnEvent(Events.TRANSACTION_APPROVED)
  async handleTransactionApproved(payload: { bookingId: string }) {
    const booking = await this.prisma.booking.findUnique({
      where: { id: payload.bookingId },
      include: {
        user: true,
        worker: { include: { user: true } },
        service: { include: { service: true } },
      },
    });

    if (!booking) return;

    const ctx = buildBookingEmailContext(booking);
    if (!ctx.client.email) return;

    await this.emailService.send(
      ctx.client.email,
      'Reserva confirmada',
      bookingConfirmedClientTemplate(ctx),
    );
  }

  @OnEvent(Events.TRANSACTION_REJECTED)
  async handleTransactionRejected(payload: { bookingId: string }) {
    const booking = await this.prisma.booking.findUnique({
      where: { id: payload.bookingId },
      include: {
        user: true,
        worker: { include: { user: true } },
        service: { include: { service: true } },
      },
    });

    if (!booking) return;

    const ctx = buildBookingEmailContext(booking);
    if (!ctx.client.email) return;

    await this.emailService.send(
      ctx.client.email,
      'Estado de tu reserva',
      bookingRejectedClientTemplate(ctx),
    );
  }
}
