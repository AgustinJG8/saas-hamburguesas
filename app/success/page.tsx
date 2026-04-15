import Link from 'next/link';

export default function SuccessPage() {
  return (
    <div className="relative min-h-screen w-full flex items-center justify-center p-4 bg-black">

      {/* 1. EL VIDEO: Cambiamos 'object-cover' por 'object-contain' */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="fixed inset-0 w-full h-full object-contain z-0"
      >
        <source src="/pago.exitoso.mp4" type="video/mp4" />
      </video>

      {/* 2. FILTRO SUTIL: Un poco menos intenso para que se aprecie mejor la animación */}
      <div className="fixed inset-0 bg-black/30 z-10"></div>

      {/* 3. LA TARJETA: La bajamos un poco y le damos transparencia para que luzca la animación */}
      <div className="relative z-20 w-full max-w-sm bg-white/90 backdrop-blur-md rounded-[40px] p-8 text-center shadow-2xl mt-auto mb-10 md:mb-20">

        <h1 className="text-4xl font-black text-gray-900 tracking-tighter italic uppercase mb-2 leading-none">
          ¡PAGO EXITOSO!
        </h1>

        <p className="text-gray-600 font-bold text-sm mb-6 uppercase tracking-tight">
          ¡Gracias por tu orden en THC! Ya estamos preparando todo.
        </p>

        <Link
          href="/"
          className="inline-block w-full bg-red-600 text-white py-4 rounded-2xl font-black text-lg uppercase italic tracking-widest shadow-xl hover:bg-red-700 transition-all hover:scale-105 active:scale-95 text-center"
        >
          VOLVER AL INICIO
        </Link>
      </div>

    </div>
  );
}