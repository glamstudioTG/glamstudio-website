import { baseEmailTemplate } from '../base/base-email.template';
import { BookingEmailContext } from '../types/email-template.types';
import { minutesToHhmm } from 'src/common/utils/time.utils';

export function bookingConfirmedClientTemplate(ctx: BookingEmailContext) {
  return baseEmailTemplate(
    'Tu reserva ha sido confirmada',
    `
    <p>Hola <b>${ctx.client.name}</b>,</p>

    <p>
      Nos complace informarte que tu reserva ha sido
      <b>confirmada exitosamente</b>.
    </p>

    <ul>
      <li><b>Servicios:</b> ${ctx.services.join(', ')}</li>
      <li><b>Fecha:</b> ${ctx.date}</li>
      <li><b>Hora:</b> ${minutesToHhmm(ctx.startTime)}</li>
      <li><b>Especialista:</b> ${ctx.worker.name}</li>
    </ul>

    <h4>Recomendaciones</h4>
    <ul>
      <li>Llega con 10 minutos de anticipación</li>
      <li>Asiste sin maquillaje en la zona a tratar</li>
      <li>Evita bebidas estimulantes antes del servicio</li>
    </ul>

    <p>
      Atentamente,<br/>
      <b>Equipo GlamStudio TG</b>
    </p>
    `,
  );
}
