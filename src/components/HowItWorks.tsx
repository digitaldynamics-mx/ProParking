import { useCallback, useEffect, useRef, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
  {
    num: '01',
    title: 'Llega el auto.',
    body: 'El Ticketero coloca un llavero con QR y registra al cliente en 30 segundos.',
    visual: (
      <div className="bg-[#2C2C2A] rounded-xl p-5 w-full max-w-[240px] shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <span className="font-mono text-[#888780] text-[9px] tracking-widest uppercase">Ticket nuevo</span>
          <div className="w-2 h-2 rounded-full bg-[#1D9E75]" />
        </div>
        <div className="space-y-2.5 mb-4">
          {[
            ['Placa',    'GHT-5820'],
            ['Vehículo', 'Toyota Camry'],
            ['Cliente',  'Mesa 12'],
          ].map(([k, v]) => (
            <div key={k} className="flex justify-between text-xs">
              <span className="text-[#888780]">{k}</span>
              <span className="font-mono text-[#F1EFE8] font-medium">{v}</span>
            </div>
          ))}
        </div>
        <div className="bg-white rounded-lg p-2 flex items-center gap-3">
          <svg viewBox="0 0 21 21" className="w-10 h-10 flex-shrink-0" xmlns="http://www.w3.org/2000/svg">
            <rect x="1" y="1" width="7" height="7" fill="#2C2C2A"/>
            <rect x="2" y="2" width="5" height="5" fill="white"/>
            <rect x="3" y="3" width="3" height="3" fill="#2C2C2A"/>
            <rect x="13" y="1" width="7" height="7" fill="#2C2C2A"/>
            <rect x="14" y="2" width="5" height="5" fill="white"/>
            <rect x="15" y="3" width="3" height="3" fill="#2C2C2A"/>
            <rect x="1" y="13" width="7" height="7" fill="#2C2C2A"/>
            <rect x="2" y="14" width="5" height="5" fill="white"/>
            <rect x="3" y="15" width="3" height="3" fill="#2C2C2A"/>
            <rect x="9" y="2" width="2" height="1" fill="#2C2C2A"/>
            <rect x="10" y="4" width="1" height="2" fill="#2C2C2A"/>
            <rect x="9" y="9" width="3" height="1" fill="#2C2C2A"/>
            <rect x="13" y="9" width="2" height="2" fill="#2C2C2A"/>
            <rect x="16" y="10" width="2" height="1" fill="#2C2C2A"/>
            <rect x="9" y="12" width="2" height="2" fill="#2C2C2A"/>
            <rect x="14" y="14" width="3" height="1" fill="#2C2C2A"/>
            <rect x="10" y="16" width="1" height="3" fill="#2C2C2A"/>
            <rect x="13" y="17" width="2" height="1" fill="#2C2C2A"/>
            <rect x="16" y="15" width="3" height="2" fill="#2C2C2A"/>
          </svg>
          <span className="font-mono text-[#2C2C2A] text-xs font-medium">#4821</span>
        </div>
      </div>
    ),
  },
  {
    num: '02',
    title: 'Fotos de evidencia.',
    body: 'Hasta 5 fotos del estado del auto al ingresar. Nunca más discutirás un rayón.',
    visual: (
      <div className="w-full max-w-[240px]">
        <div className="grid grid-cols-2 gap-2 mb-3">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="aspect-[4/3] bg-[#2C2C2A] rounded-lg relative overflow-hidden"
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <svg className="w-6 h-6 text-[#888780]/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                    d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z"
                  />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                    d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z"
                  />
                </svg>
              </div>
              {i === 1 && (
                <div className="absolute top-1.5 right-1.5 w-3 h-3 rounded-full bg-[#D85A30] border-2 border-white" title="Daño previo marcado" />
              )}
            </div>
          ))}
        </div>
        <div className="bg-[#2C2C2A] rounded-lg px-3 py-2.5 flex items-center justify-between">
          <span className="font-mono text-[#888780] text-[10px]">4 de 5 fotos</span>
          <span className="font-mono text-[#1D9E75] text-[10px]">21:04 · Jun 10</span>
        </div>
      </div>
    ),
  },
  {
    num: '03',
    title: 'El cliente pide su auto.',
    body: 'Por WhatsApp, con un botón. Nadie llama, nadie grita.',
    visual: (
      <div className="w-full max-w-[240px] bg-[#E5DDD5] rounded-xl overflow-hidden shadow-lg">
        <div className="bg-[#075E54] px-4 py-3 flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-[#25D366] flex items-center justify-center flex-shrink-0">
            <span className="text-white text-xs font-bold">P</span>
          </div>
          <div>
            <p className="text-white text-sm font-semibold leading-none">ProParking</p>
            <p className="text-white/60 text-[10px]">en línea</p>
          </div>
        </div>
        <div className="p-3 space-y-2">
          <div className="flex justify-end">
            <div className="bg-[#DCF8C6] rounded-xl rounded-tr-sm px-3 py-2 max-w-[85%]">
              <p className="text-[#2C2C2A] text-xs">Traigan mi carro por favor 🙏</p>
              <p className="text-[#888780] text-[9px] text-right mt-0.5">21:06 ✓✓</p>
            </div>
          </div>
          <div className="flex justify-start">
            <div className="bg-white rounded-xl rounded-tl-sm px-3 py-2 max-w-[90%]">
              <p className="text-[#2C2C2A] text-xs leading-snug">
                Recibido ✅ Tu <strong>Toyota Camry</strong> llegará en aprox. <strong>3 minutos</strong>.
              </p>
              <p className="text-[#888780] text-[9px] text-right mt-0.5">21:06</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 pt-1">
            <div className="w-1.5 h-1.5 rounded-full bg-[#1D9E75] animate-pulse" />
            <span className="font-mono text-[#1D9E75] text-[9px] font-medium">Runner asignado · en camino</span>
          </div>
        </div>
      </div>
    ),
  },
  {
    num: '04',
    title: 'Cobro sin errores.',
    body: 'El Cajero captura los billetes recibidos y el sistema calcula el cambio.',
    visual: (
      <div className="bg-[#2C2C2A] rounded-xl p-5 w-full max-w-[240px] shadow-lg">
        <p className="font-mono text-[#888780] text-[9px] tracking-widest uppercase mb-4">Registro de cobro</p>
        <div className="space-y-2 mb-4">
          {[
            { bill: '$500', qty: 0 },
            { bill: '$200', qty: 1, active: true },
            { bill: '$100', qty: 2, active: true },
            { bill: '$50',  qty: 0 },
          ].map(({ bill, qty, active }) => (
            <div key={bill} className="flex items-center justify-between">
              <span className={`font-mono text-sm ${active ? 'text-[#F1EFE8]' : 'text-[#888780]/50'}`}>{bill}</span>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded border border-white/10 flex items-center justify-center">
                  <span className="text-[#888780] text-[9px]">−</span>
                </div>
                <span className={`font-mono text-sm w-4 text-center ${active ? 'text-[#D85A30]' : 'text-[#888780]/40'}`}>{qty}</span>
                <div className="w-4 h-4 rounded border border-white/10 flex items-center justify-center">
                  <span className="text-[#888780] text-[9px]">+</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="border-t border-white/8 pt-3 space-y-1.5">
          <div className="flex justify-between text-xs">
            <span className="text-[#888780]">Recibido</span>
            <span className="font-mono text-[#F1EFE8]">$400</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-[#888780]">Cobro</span>
            <span className="font-mono text-[#F1EFE8]">$130</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#888780] text-xs">Cambio</span>
            <span className="font-mono text-[#1D9E75] font-medium">$270</span>
          </div>
        </div>
      </div>
    ),
  },
  {
    num: '05',
    title: 'Entrega validada.',
    body: 'Un QR temporal concilia con el del llavero. El folio cierra.',
    visual: (
      <div className="w-full max-w-[240px] text-center">
        <div className="bg-[#2C2C2A] rounded-xl p-7 shadow-lg">
          <div className="w-16 h-16 rounded-full bg-[#1D9E75]/15 border-2 border-[#1D9E75] flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-[#1D9E75]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7"/>
            </svg>
          </div>
          <p className="font-mono text-[#F1EFE8] font-medium mb-1">Ticket #4821</p>
          <p className="font-mono text-[#1D9E75] text-xs mb-4">Entregado · Jun 10, 21:08</p>
          <div className="bg-white/5 rounded-lg px-3 py-2">
            <p className="font-mono text-[#888780] text-[9px] tracking-wide">
              ✓ Conciliado con llavero QR
            </p>
          </div>
        </div>
      </div>
    ),
  },
];

export default function HowItWorks() {
  const autoplayRef = useRef(
    Autoplay({ delay: 8000, stopOnMouseEnter: true, stopOnInteraction: false })
  );

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: false, align: 'start', containScroll: 'keepSnaps' },
    [autoplayRef.current]
  );

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const [progressKey, setProgressKey] = useState(0);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const updateState = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setCanPrev(emblaApi.canScrollPrev());
    setCanNext(emblaApi.canScrollNext());
    setProgressKey((k) => k + 1);
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on('select', updateState);
    emblaApi.on('reInit', updateState);
    updateState();
    return () => { emblaApi.off('select', updateState); };
  }, [emblaApi, updateState]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo  = useCallback((i: number) => emblaApi?.scrollTo(i), [emblaApi]);

  return (
    <div aria-label="Carrusel: cómo funciona ProParking" role="region">

      {/* ── Arrow row (always visible, above carousel) ── */}
      <div className="flex items-center justify-end gap-3 mb-6">
        <span className="font-mono text-[#888780] text-[11px] tracking-widest uppercase mr-auto">
          {selectedIndex + 1} / {scrollSnaps.length || 5}
        </span>
        <button
          onClick={scrollPrev}
          disabled={!canPrev}
          aria-label="Paso anterior"
          className="w-12 h-12 rounded-full border border-[#F1EFE8]/15 flex items-center justify-center text-[#F1EFE8]/60 hover:border-[#D85A30] hover:text-[#D85A30] transition-all disabled:opacity-20 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={scrollNext}
          disabled={!canNext}
          aria-label="Siguiente paso"
          className="w-12 h-12 rounded-full bg-[#D85A30] border border-[#D85A30] flex items-center justify-center text-white hover:bg-[#c04f28] hover:border-[#c04f28] transition-all disabled:opacity-20 disabled:cursor-not-allowed"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* ── Carousel viewport ── */}
      <div className="overflow-hidden cursor-grab active:cursor-grabbing" ref={emblaRef}>
        <div className="flex">
          {slides.map((slide, i) => (
            <div
              key={i}
              className="flex-none w-[calc(100%-2rem)] md:w-[calc(66.667%-1rem)] mr-4 md:mr-6"
              role="group"
              aria-roledescription="diapositiva"
              aria-label={`${slide.num} de 05`}
            >
              <div className="bg-white border border-[#2C2C2A]/8 rounded-2xl p-7 md:p-9 h-full flex flex-col md:flex-row gap-8 items-start md:items-center">
                <div className="flex-1 min-w-0">
                  <p className="font-mono text-[#D85A30] text-sm font-medium mb-4">{slide.num}</p>
                  <h3
                    className="font-serif italic text-[#2C2C2A] mb-4 leading-tight"
                    style={{ fontSize: 'clamp(1.6rem, 3.2vw, 2.1rem)' }}
                  >
                    {slide.title}
                  </h3>
                  <p className="text-[#888780] leading-relaxed">{slide.body}</p>
                </div>
                <div className="flex-shrink-0 w-full md:w-auto flex justify-center">
                  {slide.visual}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Progress bar + dot nav ── */}
      <div className="mt-7 mb-5 h-px bg-[#F1EFE8]/8 overflow-hidden">
        <div key={progressKey} className="h-full bg-[#D85A30] progress-bar" />
      </div>

      <div className="flex gap-2" role="tablist" aria-label="Diapositivas">
        {scrollSnaps.map((_, i) => (
          <button
            key={i}
            role="tab"
            aria-selected={i === selectedIndex}
            aria-label={`Ir al paso ${i + 1}`}
            onClick={() => scrollTo(i)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === selectedIndex ? 'bg-[#D85A30] w-6' : 'bg-[#F1EFE8]/15 w-1.5'
            }`}
          />
        ))}
      </div>

    </div>
  );
}
