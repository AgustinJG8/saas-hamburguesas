import Link from 'next/link';

export default function SuccessPage() {
  return (
    <div className="relative min-h-screen w-full flex items-center justify-center p-6 bg-black">

      {/* 1. VIDEO DE FONDO (PANTALLA COMPLETA) */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="fixed inset-0 w-full h-full object-contain z-0"
      >
        <source src="/pago.exitoso.mp4" type="video/mp4" />
      </video>

      {/* 2. OVERLAY PARA PROFUNDIDAD */}
      <div className="fixed inset-0 bg-black/40 z-10 backdrop-blur-[2px]"></div>

      {/* 3. TARJETA CREATIVA (CENTRADITA) */}
      <div className="relative z-20 w-full max-w-md bg-white/90 backdrop-blur-xl rounded-[50px] p-10 text-center shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-white/20 transform animate-in fade-in zoom-in duration-500">

        {/* CHECKMARK VERDE ANIMADO */}
        <div className="mb-8 flex justify-center">
          <div className="relative">
            {/* Brillo exterior del check */}
            <div className="absolute inset-0 bg-green-500/30 blur-2xl rounded-full"></div>
            <div className="relative bg-green-500 h-24 w-24 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(34,197,94,0.6)] border-4 border-white">
              <svg
                className="h-12 w-12 text-white animate-in slide-in-from-bottom-2 duration-700"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="4"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
        </div>

        <h1 className="text-4xl font-black text-gray-900 tracking-tighter italic uppercase mb-2">
          ¡PAGO EXITOSO!
        </h1>

        <div className="space-y-4 mb-10">
          <p className="text-gray-600 font-medium leading-tight">
            Tu pedido para <span className="font-bold text-red-600">THE HOUSE OF CHICKEN</span> se ha procesado correctamente.
          </p>
          <p className="text-gray-400 text-xs font-bold uppercase tracking-widest bg-gray-100 py-2 rounded-full">
            Pedido: #THC-{Math.floor(Math.random() * 90000) + 10000}
          </p>
        </div>

        <Link
          href="/"
          className="group relative flex items-center justify-center gap-3 w-full bg-red-600 text-white py-5 rounded-2xl font-black text-xl uppercase italic tracking-widest shadow-[0_10px_20px_rgba(220,38,38,0.4)] hover:bg-red-700 transition-all hover:scale-105 active:scale-95 overflow-hidden"
        >
          <span className="relative z-10">VOLVER AL INICIO</span>
          <svg className="h-6 w-6 relative z-10 group-hover:translate-x-2 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>

    </div>
  );
}