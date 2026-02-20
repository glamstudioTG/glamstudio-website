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
      <li style="margin-top:10px;">
        <div style="
          background-color:#ecfeff;
          border-left:4px solid #06b6d4;
          padding:10px 12px;
          border-radius:6px;
          font-size:14px;
          line-height:1.5;
        ">
          <strong style="color:#0891b2;">
            Información importante:
          </strong>
          Al llegar al conjunto, por favor indicar en portería que se dirige a la
          <strong>Casa F6</strong> para permitir su ingreso sin inconvenientes.
        </div>
    </li>
    </ul>

    <p>
      Atentamente,<br/>
      <b>Equipo GlamStudio TG</b>
    </p>
    `,
  );
}
