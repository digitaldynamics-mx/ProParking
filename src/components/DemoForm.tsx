import { useState, type ChangeEvent, type FocusEvent } from 'react';

type Status = 'idle' | 'submitting' | 'success' | 'error';

interface Fields {
  nombre: string;
  negocio: string;
  tipo: string;
  whatsapp: string;
  autos: string;
  mensaje: string;
}

interface Errors {
  nombre?: string;
  negocio?: string;
  tipo?: string;
  whatsapp?: string;
  autos?: string;
}

const INITIAL: Fields = { nombre: '', negocio: '', tipo: '', whatsapp: '', autos: '', mensaje: '' };

function validateField(name: keyof Fields, value: string): string | undefined {
  switch (name) {
    case 'nombre':
      if (!value.trim()) return 'El nombre es requerido.';
      if (value.trim().length < 2) return 'Ingresa al menos 2 caracteres.';
      break;
    case 'negocio':
      if (!value.trim()) return 'El nombre del negocio es requerido.';
      if (value.trim().length < 2) return 'Ingresa al menos 2 caracteres.';
      break;
    case 'tipo':
      if (!value) return 'Selecciona el tipo de negocio.';
      break;
    case 'whatsapp': {
      const digits = value.replace(/\D/g, '');
      if (!digits) return 'El número de WhatsApp es requerido.';
      const clean = digits.startsWith('52') && digits.length === 12 ? digits.slice(2) : digits;
      if (clean.length !== 10) return 'Ingresa un número de 10 dígitos.';
      if (!/^[2-9]/.test(clean)) return 'El número no parece válido.';
      break;
    }
    case 'autos':
      if (!value) return 'Selecciona un rango aproximado.';
      break;
  }
}

function validateAll(fields: Fields): Errors {
  const keys: (keyof Fields)[] = ['nombre', 'negocio', 'tipo', 'whatsapp', 'autos'];
  const errors: Errors = {};
  for (const k of keys) {
    const e = validateField(k, fields[k]);
    if (e) errors[k] = e;
  }
  return errors;
}

const inputBase =
  'w-full border border-[#2C2C2A]/15 rounded-sm px-4 py-3 text-[#2C2C2A] placeholder:text-[#888780]/60 focus:outline-none focus:border-[#2C2C2A]/40 transition text-sm bg-white';
const labelBase = 'block text-xs font-semibold text-[#2C2C2A]/70 uppercase tracking-wide mb-1.5';
const errorBase = 'text-[#D85A30] text-xs mt-1.5 font-medium';

export default function DemoForm() {
  const [fields, setFields] = useState<Fields>(INITIAL);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>('idle');

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setFields((prev) => ({ ...prev, [name]: value }));
  }

  function handleBlur(e: FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    const key = name as keyof Fields;
    const err = validateField(key, value);
    setErrors((prev) => ({ ...prev, [key]: err }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validateAll(fields);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setStatus('submitting');
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: import.meta.env.PUBLIC_WEB3FORMS_KEY,
          subject: `Demo request — ${fields.negocio} (${fields.tipo})`,
          from_name: 'ProParking Landing',
          ...fields,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div className="text-center py-14 px-6">
        <div className="w-14 h-14 rounded-full bg-[#1D9E75]/10 border-2 border-[#1D9E75] flex items-center justify-center mx-auto mb-6">
          <svg className="w-7 h-7 text-[#1D9E75]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7"/>
          </svg>
        </div>
        <h3
          className="font-serif italic text-[#2C2C2A] mb-3"
          style={{ fontSize: '1.9rem', lineHeight: 1.15 }}
        >
          Solicitud recibida.
        </h3>
        <p className="text-[#888780] max-w-sm mx-auto leading-relaxed">
          Te contactamos hoy mismo por WhatsApp para confirmar tu demo de 15 minutos.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-5">
        {/* Nombre */}
        <div>
          <label htmlFor="nombre" className={labelBase}>Nombre</label>
          <input
            id="nombre" name="nombre" type="text"
            placeholder="Tu nombre completo"
            value={fields.nombre} onChange={handleChange} onBlur={handleBlur}
            className={`${inputBase} ${errors.nombre ? 'border-[#D85A30]/50' : ''}`}
            autoComplete="name"
          />
          {errors.nombre && <p className={errorBase}>{errors.nombre}</p>}
        </div>

        {/* Negocio */}
        <div>
          <label htmlFor="negocio" className={labelBase}>Nombre del negocio</label>
          <input
            id="negocio" name="negocio" type="text"
            placeholder="Restaurante El Rincón..."
            value={fields.negocio} onChange={handleChange} onBlur={handleBlur}
            className={`${inputBase} ${errors.negocio ? 'border-[#D85A30]/50' : ''}`}
            autoComplete="organization"
          />
          {errors.negocio && <p className={errorBase}>{errors.negocio}</p>}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        {/* Tipo */}
        <div>
          <label htmlFor="tipo" className={labelBase}>Tipo de negocio</label>
          <select
            id="tipo" name="tipo"
            value={fields.tipo} onChange={handleChange} onBlur={handleBlur}
            className={`${inputBase} ${errors.tipo ? 'border-[#D85A30]/50' : ''}`}
          >
            <option value="" disabled>Selecciona...</option>
            <option value="Restaurante">Restaurante</option>
            <option value="Hotel">Hotel</option>
            <option value="Plaza">Plaza comercial</option>
            <option value="Operador de valet">Operador de valet</option>
            <option value="Otro">Otro</option>
          </select>
          {errors.tipo && <p className={errorBase}>{errors.tipo}</p>}
        </div>

        {/* WhatsApp */}
        <div>
          <label htmlFor="whatsapp" className={labelBase}>WhatsApp</label>
          <input
            id="whatsapp" name="whatsapp" type="tel"
            placeholder="6671234567"
            value={fields.whatsapp} onChange={handleChange} onBlur={handleBlur}
            className={`${inputBase} font-mono ${errors.whatsapp ? 'border-[#D85A30]/50' : ''}`}
            autoComplete="tel"
            inputMode="numeric"
          />
          {errors.whatsapp && <p className={errorBase}>{errors.whatsapp}</p>}
        </div>
      </div>

      {/* Autos por día */}
      <div>
        <label htmlFor="autos" className={labelBase}>Autos por día (aproximado)</label>
        <select
          id="autos" name="autos"
          value={fields.autos} onChange={handleChange} onBlur={handleBlur}
          className={`${inputBase} ${errors.autos ? 'border-[#D85A30]/50' : ''}`}
        >
          <option value="" disabled>Selecciona un rango...</option>
          <option value="1-20">1 – 20 autos</option>
          <option value="21-50">21 – 50 autos</option>
          <option value="51-100">51 – 100 autos</option>
          <option value="100+">Más de 100 autos</option>
        </select>
        {errors.autos && <p className={errorBase}>{errors.autos}</p>}
      </div>

      {/* Mensaje (optional) */}
      <div>
        <label htmlFor="mensaje" className={labelBase}>
          Mensaje <span className="text-[#888780]/60 normal-case font-normal">(opcional)</span>
        </label>
        <textarea
          id="mensaje" name="mensaje"
          placeholder="Cuéntanos algo sobre tu operación actual..."
          rows={3}
          value={fields.mensaje} onChange={handleChange}
          className={`${inputBase} resize-none`}
        />
      </div>

      {status === 'error' && (
        <p className="text-[#D85A30] text-sm font-medium">
          Ocurrió un error. Intenta de nuevo o escríbenos directamente por WhatsApp.
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="w-full bg-[#D85A30] text-white py-4 font-semibold hover:bg-[#c04f28] transition rounded-sm disabled:opacity-60 disabled:cursor-not-allowed text-sm tracking-wide"
      >
        {status === 'submitting' ? 'Enviando...' : 'Agendar demo en 15 minutos'}
      </button>

      <p
        className="text-center text-[#888780] text-xs font-mono"
        style={{ fontFamily: "'JetBrains Mono', monospace" }}
      >
        Sin tarjeta · Sin permanencia · Soporte en español
      </p>
    </form>
  );
}
