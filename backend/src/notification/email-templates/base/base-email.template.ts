export function baseEmailTemplate(title: string, content: string): string {
  return `
  <div style="font-family: Arial, Helvetica, sans-serif; background:#f9f9f9; padding:24px">
    <div style="max-width:600px; margin:auto; background:#ffffff; border-radius:8px; overflow:hidden">
      <div style="background:#850E35; padding:16px; color:#ffffff">
        <h2 style="margin:0; font-size:20px;">GlamStudio TG</h2>
      </div>

      <div style="padding:24px; color:#333333">
        <h3 style="margin-top:0;">${title}</h3>
        ${content}
      </div>

      <div style="background:#f1f1f1; padding:16px; font-size:12px; color:#666">
        <p style="margin:0;">
          Este correo fue enviado automáticamente por GlamStudio TG.<br/>
          Si tienes alguna duda, contáctanos respondiendo este mensaje.
        </p>
      </div>
    </div>
  </div>
  `;
}
