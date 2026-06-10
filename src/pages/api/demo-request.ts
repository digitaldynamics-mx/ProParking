export const prerender = false;

import type { APIRoute } from 'astro';
import { Resend } from 'resend';

const TO = 'proparkingdigitalpartner@gmail.com';

function buildHtml(data: Record<string, string>) {
  const row = (label: string, value: string) =>
    value
      ? `<tr>
          <td style="padding:8px 16px;color:#888780;font-size:13px;white-space:nowrap;vertical-align:top;">${label}</td>
          <td style="padding:8px 16px;color:#2C2C2A;font-size:13px;">${value}</td>
        </tr>`
      : '';

  return `
    <div style="font-family:system-ui,sans-serif;max-width:560px;margin:0 auto;background:#F1EFE8;border-radius:12px;overflow:hidden;border:1px solid #e0ddd6;">
      <div style="background:#2C2C2A;padding:24px 28px;">
        <p style="margin:0 0 6px;color:#D85A30;font-size:11px;letter-spacing:.2em;text-transform:uppercase;font-family:monospace;">ProParking · Digital Partner</p>
        <h1 style="margin:0;color:#F1EFE8;font-size:20px;font-weight:700;">Nueva solicitud de demo</h1>
      </div>
      <div style="padding:8px 0;">
        <table style="width:100%;border-collapse:collapse;">
          ${row('Nombre',        data.nombre)}
          ${row('Negocio',       data.negocio)}
          ${row('Tipo',          data.tipo)}
          ${row('WhatsApp',      data.whatsapp)}
          ${row('Autos por día', data.autos)}
          ${row('Mensaje',       data.mensaje)}
        </table>
      </div>
      <div style="padding:14px 28px 20px;border-top:1px solid rgba(44,44,42,.1);">
        <p style="margin:0;font-size:11px;font-family:monospace;color:#888780;">
          Recibido el ${new Date().toLocaleString('es-MX', { timeZone: 'America/Mazatlan', dateStyle: 'long', timeStyle: 'short' })}
        </p>
      </div>
    </div>
  `;
}

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    console.log('[demo-request]', new Date().toISOString(), body);

    const apiKey = import.meta.env.RESEND_API_KEY;

    if (!apiKey) {
      console.warn('[demo-request] RESEND_API_KEY not set — email not sent.');
    } else {
      const resend = new Resend(apiKey);
      const { error } = await resend.emails.send({
        from: 'ProParking <onboarding@resend.dev>',
        to: [TO],
        subject: `Demo request — ${body.negocio ?? 'Sin nombre'} (${body.tipo ?? ''})`,
        html: buildHtml(body),
      });
      if (error) console.error('[demo-request] Resend error:', error);
    }

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('[demo-request] error:', err);
    return new Response(JSON.stringify({ ok: false }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
