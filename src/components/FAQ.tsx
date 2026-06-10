import { useState } from 'react';

const preguntas = [
  {
    q: '¿Mis empleados necesitan smartphone propio?',
    a: 'Sí, necesitan un teléfono Android o iOS. La app de ProParking es gratuita y funciona en cualquier equipo moderno. No requiere modelo específico ni gama alta.',
  },
  {
    q: '¿Cuánto tiempo toma configurar ProParking?',
    a: 'La configuración inicial toma menos de un día. Te acompañamos en cada paso y capacitamos a tu equipo sin costo adicional. La mayoría de nuestros clientes operan desde el primer turno.',
  },
  {
    q: '¿Funciona sin conexión a internet?',
    a: 'Algunas funciones operan en modo offline y sincronizan automáticamente cuando hay señal. Recomendamos tener WiFi disponible en el área de operaciones para el mejor rendimiento.',
  },
  {
    q: '¿Hay contrato de permanencia?',
    a: 'No. Todos nuestros planes son mensuales. Puedes cancelar cuando quieras, sin penalización ni letra chica.',
  },
  {
    q: '¿Qué pasa si un cliente reclama un daño?',
    a: 'El Ticketero toma fotos del vehículo al momento de la entrada. Esas imágenes quedan guardadas con timestamp y vinculadas al ticket. Tienes evidencia antes de que arranque el motor.',
  },
  {
    q: '¿Cómo solicita su auto el cliente?',
    a: 'Por WhatsApp, sin descargar ninguna app. El cliente escanea el QR de su ticket, manda un mensaje automático y el sistema notifica al Runner disponible. El SLA es de 3 minutos.',
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="divide-y divide-[#2C2C2A]/10">
      {preguntas.map(({ q, a }, i) => (
        <div key={i}>
          <button
            className="w-full text-left py-6 flex items-start justify-between gap-6 group"
            onClick={() => setOpen(open === i ? null : i)}
          >
            <span
              className="font-semibold text-[#2C2C2A] group-hover:text-[#D85A30] transition-colors text-lg leading-snug"
              style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" }}
            >
              {q}
            </span>
            <span
              className={`text-[#D85A30] text-2xl leading-none mt-0.5 flex-shrink-0 transition-transform duration-300 ${open === i ? 'rotate-45' : ''}`}
            >
              +
            </span>
          </button>
          {open === i && (
            <p
              className="pb-6 text-[#888780] leading-relaxed animate-fade-in"
              style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" }}
            >
              {a}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
