"use client";

import { useEffect, useState } from "react";
import { supabase } from "./lib/supabase";

export default function Home() {
  const [hamburguesas, setHamburguesas] = useState<any[]>([]);
  const [carrito, setCarrito] = useState<any[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    const obtenerMenu = async () => {
      const { data } = await supabase.from("hamburguesas").select("*");
      setHamburguesas(data || []);
    };
    obtenerMenu();
  }, []);

  // Función para añadir al carrito
  const alCarrito = (producto: any) => {
    setCarrito([...carrito, producto]);
    setIsCartOpen(true);
  };

  // Función para pagar con Stripe
  const pagarTodo = async () => {
    if (carrito.length === 0) return;

    const total = carrito.reduce((sum, item) => sum + item.precio, 0);

    try {
      const respuesta = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre: `Pedido Pollo SaaS (${carrito.length} items)`,
          precio: total
        }),
      });

      const { sessionId } = await respuesta.json();
      const { loadStripe } = await import("@stripe/stripe-js");
      const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

      // Usamos (stripe as any) para que el editor deje de marcar rojo
      await (stripe as any)?.redirectToCheckout({ sessionId });

    } catch (error) {
      console.error(error);
      alert("Error al procesar el pago");
    }
  };

  return (
    <main className="min-h-screen bg-white font-sans text-gray-900">

      {/* --- NAVBAR --- */}
      <nav className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 px-6 py-4 flex justify-between items-center">
        <div className="text-2xl font-black text-red-600 tracking-tighter">POLLO SAAS</div>
        <div className="hidden md:flex gap-8 font-bold text-sm uppercase tracking-widest">
          <a href="#" className="hover:text-red-600 transition">Inicio</a>
          <a href="#menu" className="hover:text-red-600 transition">Menú</a>
          <a href="#" className="hover:text-red-600 transition">Referencias</a>
        </div>
        <button
          onClick={() => setIsCartOpen(!isCartOpen)}
          className="relative bg-black text-white p-2 rounded-full px-4 flex items-center gap-2"
        >
          🛒 <span className="font-bold">{carrito.length}</span>
        </button>
      </nav>

      {/* --- HERO SECTION CON VIDEO --- */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute z-0 w-auto min-w-full min-h-full max-w-none"
        >
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>
        {/* Overlay para que el texto se lea bien */}
        <div className="absolute inset-0 bg-black/40 z-10"></div>

        <div className="relative z-20 text-center text-white px-6">
          <h1 className="text-7xl md:text-9xl font-black italic tracking-tighter mb-4 drop-shadow-2xl">
            YUMMY
          </h1>
          <p className="text-xl md:text-2xl font-bold uppercase tracking-[0.3em] mb-8">
            Gigante • Especial • Crujiente
          </p>
          <a href="#menu" className="bg-red-600 hover:bg-red-700 text-white px-10 py-4 rounded-full font-black text-xl transition-all shadow-2xl inline-block">
            ORDENAR AHORA
          </a>
        </div>
      </section>

      {/* --- MENU SECTION --- */}
      <section id="menu" className="py-24 px-6 max-w-7xl mx-auto">
        <h2 className="text-5xl font-black mb-16 text-center italic tracking-tight">NUESTRO MENÚ</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {hamburguesas.map((item) => (
            <div key={item.id} className="group relative">
              <div className="relative h-80 w-full rounded-[2.5rem] overflow-hidden shadow-2xl mb-6">
                <img
                  src={item.imagen_url || "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?q=80&w=2070&auto=format&fit=crop"}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute bottom-4 left-4 bg-white px-4 py-1 rounded-full font-black text-red-600">
                  ${item.precio} MXN
                </div>
              </div>
              <h3 className="text-3xl font-black mb-2 uppercase">{item.nombre}</h3>
              <p className="text-gray-500 mb-6 leading-relaxed">{item.descripcion}</p>
              <button
                onClick={() => alCarrito(item)}
                className="w-full bg-gray-100 hover:bg-red-600 hover:text-white py-4 rounded-2xl font-black transition-all"
              >
                AÑADIR AL CARRITO
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* --- CARRITO LATERAL (SIDEBAR) --- */}
      {isCartOpen && (
        <div className="fixed inset-0 z-[100] flex justify-end">
          <div className="absolute inset-0 bg-black/50" onClick={() => setIsCartOpen(false)}></div>
          <div className="relative w-full max-w-md bg-white h-full shadow-2xl p-8 flex flex-col">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-black">TU ORDEN</h2>
              <button onClick={() => setIsCartOpen(false)} className="text-2xl">✕</button>
            </div>

            <div className="flex-grow overflow-y-auto">
              {carrito.map((item, index) => (
                <div key={index} className="flex justify-between items-center mb-4 border-b pb-4">
                  <div>
                    <p className="font-bold uppercase">{item.nombre}</p>
                    <p className="text-red-600 font-black">${item.precio}</p>
                  </div>
                </div>
              ))}
              {carrito.length === 0 && <p className="text-gray-400 italic">El carrito está vacío...</p>}
            </div>

            <div className="mt-auto pt-8 border-t-4 border-black">
              <div className="flex justify-between text-2xl font-black mb-6">
                <span>TOTAL</span>
                <span>${carrito.reduce((sum, item) => sum + item.precio, 0)} MXN</span>
              </div>
              <button
                onClick={pagarTodo}
                className="w-full bg-red-600 text-white py-6 rounded-2xl font-black text-xl shadow-xl hover:bg-red-700 transition-all"
              >
                PAGAR Y PEDIR 🍗
              </button>
            </div>
          </div>
        </div>
      )}

    </main>
  );
}