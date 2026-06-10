import { useState } from 'react';

export default function MobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        onClick={() => setOpen(!open)}
        className="p-2 text-[#2C2C2A] hover:text-[#D85A30] transition"
        aria-label="Abrir menú"
      >
        {open ? (
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </button>

      {open && (
        <div className="absolute top-16 left-0 right-0 bg-[#F1EFE8] border-b border-[#2C2C2A]/10 px-6 py-6 flex flex-col gap-5 z-50 shadow-lg">
          <a href="#como-funciona" className="text-[#2C2C2A]/70 hover:text-[#D85A30] font-medium transition" onClick={() => setOpen(false)}>Cómo funciona</a>
          <a href="#para-el-dueno" className="text-[#2C2C2A]/70 hover:text-[#D85A30] font-medium transition" onClick={() => setOpen(false)}>Panel admin</a>
          <a href="#resultados"    className="text-[#2C2C2A]/70 hover:text-[#D85A30] font-medium transition" onClick={() => setOpen(false)}>Resultados</a>
          <a href="#precios"       className="text-[#2C2C2A]/70 hover:text-[#D85A30] font-medium transition" onClick={() => setOpen(false)}>Precios</a>
          <a href="#demo" className="bg-[#D85A30] text-white px-5 py-3 font-semibold text-center hover:bg-[#c04f28] transition rounded-sm" onClick={() => setOpen(false)}>
            Solicitar demo
          </a>
        </div>
      )}
    </div>
  );
}
