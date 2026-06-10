import { useEffect, useRef, useState } from 'react';

interface StatItem {
  prefix?: string;
  value: number;
  suffix?: string;
  label: string;
  note: string;
  delay: number;
}

const STATS: StatItem[] = [
  {
    prefix: '−',
    value: 84,
    suffix: '%',
    label: 'En diferencias de caja al mes',
    note: 'vs. operaciones sin trazabilidad',
    delay: 0,
  },
  {
    value: 3,
    suffix: ' min',
    label: 'Promedio de entrega',
    note: 'desde que el cliente solicita su auto',
    delay: 150,
  },
  {
    value: 100,
    suffix: '%',
    label: 'De auditoría disponible',
    note: 'cada transacción, foto y movimiento',
    delay: 300,
  },
  {
    value: 0,
    label: 'Reclamos por daños no documentados',
    note: 'evidencia fotográfica desde el ingreso',
    delay: 450,
  },
];

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

function useCountUp(target: number, duration: number, triggered: boolean, delay: number) {
  const [val, setVal] = useState(0);
  const frame = useRef<number>(0);

  useEffect(() => {
    if (!triggered) return;
    if (target === 0) return; // keep 0 as-is — it's dramatic enough

    const start = performance.now() + delay;
    let started = false;

    const tick = (now: number) => {
      if (now < start) {
        frame.current = requestAnimationFrame(tick);
        return;
      }
      if (!started) { started = true; }
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      setVal(Math.round(target * easeOutCubic(progress)));
      if (progress < 1) frame.current = requestAnimationFrame(tick);
    };

    frame.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame.current);
  }, [triggered, target, duration, delay]);

  return target === 0 ? 0 : val;
}

function StatCard({
  stat,
  triggered,
  variant,
}: {
  stat: StatItem;
  triggered: boolean;
  variant: 'featured' | 'standard' | 'zero';
}) {
  const count = useCountUp(stat.value, 1600, triggered, stat.delay);
  const display = `${stat.prefix ?? ''}${count}${stat.suffix ?? ''}`;

  const base = 'rounded-2xl p-8 md:p-10 flex flex-col justify-between transition-all duration-700';
  const style: Record<string, string> = {
    opacity: triggered ? '1' : '0',
    transform: triggered ? 'translateY(0)' : 'translateY(24px)',
    transitionDelay: `${stat.delay}ms`,
  };

  if (variant === 'featured') {
    return (
      <div className={`${base} bg-[#D85A30] row-span-1 md:row-span-2`} style={style}>
        <div>
          <p
            className="font-serif italic text-white leading-none mb-4"
            style={{ fontSize: 'clamp(4rem, 9vw, 7rem)' }}
          >
            {display}
          </p>
          <p className="text-white/90 text-xl font-semibold leading-snug">{stat.label}</p>
        </div>
        <p className="font-mono text-white/55 text-xs tracking-wide mt-6">{stat.note}</p>
      </div>
    );
  }

  if (variant === 'zero') {
    return (
      <div className={`${base} bg-[#2C2C2A] border border-[#1D9E75]/30`} style={style}>
        <div className="flex items-start justify-between gap-4">
          <p
            className="font-serif italic text-[#1D9E75] leading-none"
            style={{ fontSize: 'clamp(3.5rem, 7vw, 5.5rem)' }}
          >
            0
          </p>
          <div className="w-8 h-8 rounded-full border border-[#1D9E75]/50 flex items-center justify-center flex-shrink-0 mt-1">
            <svg className="w-4 h-4 text-[#1D9E75]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>
        <div className="mt-4">
          <p className="text-[#F1EFE8]/90 font-semibold leading-snug">{stat.label}</p>
          <p className="font-mono text-[#888780] text-xs tracking-wide mt-2">{stat.note}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`${base} bg-[#F1EFE8]`} style={style}>
      <p
        className="font-serif italic text-[#2C2C2A] leading-none mb-3"
        style={{ fontSize: 'clamp(3rem, 6vw, 4.5rem)' }}
      >
        {display}
      </p>
      <div>
        <p className="text-[#2C2C2A] font-semibold leading-snug">{stat.label}</p>
        <p className="font-mono text-[#888780] text-xs tracking-wide mt-2">{stat.note}</p>
      </div>
    </div>
  );
}

export default function Stats() {
  const [triggered, setTriggered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setTriggered(true); },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
    >
      {/* Featured: −84% — spans 2 rows on md+ */}
      <div className="sm:col-span-2 md:col-span-1 md:row-span-2 flex flex-col">
        <StatCard stat={STATS[0]} triggered={triggered} variant="featured" />
      </div>

      {/* 3 min */}
      <StatCard stat={STATS[1]} triggered={triggered} variant="standard" />

      {/* 100% */}
      <StatCard stat={STATS[2]} triggered={triggered} variant="standard" />

      {/* 0 */}
      <div className="sm:col-span-2 md:col-span-2">
        <StatCard stat={STATS[3]} triggered={triggered} variant="zero" />
      </div>
    </div>
  );
}
