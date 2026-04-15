import Link from 'next/link';

export default function SuccessPage() {
  return (
    <div className="relative min-h-screen w-full flex items-center justify-center p-4">

      {/* 1. EL VIDEO: Usa 'fixed' para asegurar que ignore cualquier otro contenedor */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="fixed inset-0 w-full h-full object-cover z-0"
      >
        <source src="/pago.exitoso.mp4" type="video/mp4" />
      </video>

      {/* 2. EL FILTRO: Oscurece un poco el video para que resalte la tarjeta */}
      <div className="fixed inset-0 bg-black/50 z-10"></div>

      {/* 3. LA TARJETA: Con un z-index más alto para estar al frente */}
      <div className="relative z-20 w-full max-w-md bg-white rounded-[40px] p-10 text-center shadow-2xl">

        <h1 className="text-5xl font-black text-gray-900 tracking-tighter italic uppercase mb-4 leading-none">
          ¡PAGO EXITOSO!
        </h1>

        <p className="text-gray-600 font-medium mb-10">
          ¡Gracias por tu orden en The House of Chicken! Tu pago fue procesado correctamente y ya estamos preparando todo.
        </p>

        <Link
          href="/"
          className="inline-block w-full bg-red-600 text-white py-5 rounded-2xl font-black text-xl uppercase italic tracking-widest shadow-xl hover:bg-red-700 transition-all hover:scale-105 active:scale-95 text-center"
        >
          VOLVER AL INICIO
        </Link>
      </div>

    </div>
  );
}