import { baseEmailTemplate } from '../base/base-email.template';
import { BookingEmailContext } from '../types/email-template.types';

export function bookingRejectedClientTemplate(ctx: BookingEmailContext) {
  return baseEmailTemplate(
    'Estado de tu reserva',
    `
    <p>Hola <b>${ctx.client.name}</b>,</p>

    <p>
      Lamentamos informarte que tu reserva no pudo ser aprobada.
    </p>

    <p>
      Puedes realizar una nueva reserva o comunicarte con nosotros
      para recibir asistencia.
    </p>

    <p>
      <b>Equipo GlamStudio TG</b>
    </p>
    `,
  );
}
