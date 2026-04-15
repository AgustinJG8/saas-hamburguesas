import Link from 'next/link';

export default function SuccessPage() {
  return (
    <main className="min-h-screen bg-white font-sans text-gray-900 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-zinc-50 border border-zinc-100 p-8 rounded-3xl text-center shadow-2xl">
        <div className="w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden shadow-sm flex items-center justify-center bg-white border border-zinc-100">
          <video 
            autoPlay 
            loop 
            muted 
            playsInline 
            className="w-full h-full object-cover"
          >
            <source src="/pago.exitoso.mp4" type="video/mp4" />
          </video>
        </div>
        <h1 className="text-4xl font-black italic tracking-tighter mb-4 text-gray-900 uppercase">
          ¡Pago Exitoso!
        </h1>
        <p className="text-gray-600 font-medium mb-8">
          ¡Gracias por tu orden en The House of Chicken! Tu pago fue procesado correctamente y ya estamos preparando todo.
        </p>
        <Link href="/" className="inline-block bg-red-600 text-white font-black uppercase tracking-widest px-8 py-4 rounded-xl shadow-lg hover:bg-red-700 hover:scale-105 transition-all w-full">
          Volver al Inicio
        </Link>
      </div>
    </main>
  );
}