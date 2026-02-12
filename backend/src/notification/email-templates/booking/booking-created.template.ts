import { baseEmailTemplate } from '../base/base-email.template';
import { BookingEmailContext } from '../types/email-template.types';
import { minutesToHhmm } from 'src/common/utils/time.utils';

export function bookingCreatedClientTemplate(ctx: BookingEmailContext): string {
  return baseEmailTemplate(
    'Nueva cita agendada',
    `
  <p>Hola <b>${ctx.worker.name}</b>,</p>

  <p>
    Se ha registrado una nueva reserva pendiente de confirmación.
  </p>

  <ul>
    <li><b>Cliente:</b> ${ctx.client.name}</li>
    <li><b>Servicios:</b> ${ctx.services.join(', ')}</li>
    <li><b>Fecha:</b> ${ctx.date}</li>
    <li><b>Hora:</b> ${minutesToHhmm(ctx.startTime)}</li>
  </ul>

  <p>
    Recibirás una notificación cuando el comprobante de pago sea enviado.
  </p>

  <p>
    <b>GlamStudio TG</b>
  </p>
  `,
  );
}
