import { baseEmailTemplate } from '../base/base-email.template';
import { BookingEmailContext } from '../types/email-template.types';
import { minutesToHhmm } from 'src/common/utils/time.utils';

export function bookingProofUploadedWorkerTemplate(ctx: BookingEmailContext) {
  return baseEmailTemplate(
    'Nuevo comprobante recibido',
    `
    <p>Hola <b>${ctx.worker.name}</b>,</p>

    <p>
      Se ha recibido un comprobante de pago para la siguiente reserva:
    </p>

    <ul>
      <li><b>Cliente:</b> ${ctx.client.name}</li>
      <li><b>Servicios:</b> ${ctx.services.join(', ')}</li>
      <li><b>Fecha:</b> ${ctx.date}</li>
      <li><b>Hora:</b> ${minutesToHhmm(ctx.startTime)}</li>
    </ul>

    <p>
      Ingresa al panel para aprobar o rechazar el pago.
    </p>

    <p><b>GlamStudio TG</b></p>
    `,
  );
}
