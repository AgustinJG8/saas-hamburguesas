"use client";

import { useEffect, useState } from "react";
import { supabase } from "./lib/supabase";

export default function Home() {
  // Cambiamos el nombre a 'items' para que el Menú lo reconozca
  const [items, setItems] = useState<any[]>([]);
  const [carrito, setCarrito] = useState<any[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    const obtenerMenu = async () => {
      // Conectamos a tu tabla "hamburguesas"
      const { data } = await supabase.from("hamburguesas").select("*");
      setItems(data || []);
    };
    obtenerMenu();
  }, []);

  // Función para añadir al carrito (Diseño original)
  const alCarrito = (producto: any) => {
    setCarrito([...carrito, producto]);
    setIsCartOpen(true);
  };

  // Función para pagar con Stripe (Diseño original)
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
      await (stripe as any)?.redirectToCheckout({ sessionId });

    } catch (error) {
      console.error(error);
      alert("Error al procesar el pago");
    }
  };

  return (
    <main className="min-h-screen bg-white font-sans text-gray-900">

      {/* --- NAVBAR CON SUBDIVISIONES DESPLEGABLES --- */}
      <nav className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 px-6 py-4 flex justify-between items-center font-sans">
        <div className="text-2xl font-black text-red-600 tracking-tighter">The House of Chicken</div>

        <div className="hidden md:flex gap-8 font-bold text-sm uppercase tracking-widest items-center">
          <a href="#" className="hover:text-red-600 transition">Inicio</a>

          {/* Menú con Dropdown */}
          <div className="relative group py-2">
            <button className="hover:text-red-600 transition flex items-center gap-1 font-bold uppercase tracking-widest">
              Menú <span className="text-[10px]">▼</span>
            </button>
            {/* El Submenú que se despliega al pasar el mouse */}
            <div className="absolute left-0 top-full hidden group-hover:block bg-white border border-gray-100 shadow-xl rounded-xl min-w-[220px] overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
              {[
                { key: 'HAMBURGUESAS THC', title: 'HAMBURGUESAS THC' },
                { key: 'THC ESPECIALES', title: 'THC ESPECIALES' },
                { key: 'KIDS MENU', title: 'KIDS MENU' },
                { key: 'ENTRADAS', title: 'ENTRADAS' },
                { key: 'PAPAS Y MAS', title: 'PAPAS Y MAS' },
                { key: 'BEBIDAS', title: 'BEBIDAS' },
                { key: 'POSTRES', title: 'POSTRES' }
              ].map((cat) => (
                <a
                  key={cat.key}
                  href={`#${cat.key.replace(/\s+/g, '-')}`}
                  className="block px-6 py-3 text-[11px] font-bold text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors border-b border-gray-50 last:border-0"
                >
                  {cat.title}
                </a>
              ))}
            </div>
          </div>

          <a href="#" className="hover:text-red-600 transition">Referencias</a>
        </div>

        <button onClick={() => setIsCartOpen(!isCartOpen)} className="bg-black text-white p-2 rounded-full px-4 flex items-center gap-2">
          🛒 <span className="font-bold">{carrito.length}</span>
        </button>
      </nav>

      {/* --- SECCIÓN DE MENÚ CON IMÁGENES AJUSTADAS Y ANCLAS --- */}
      <section id="menu" className="py-24 bg-black">
        <div className="container mx-auto px-4">
          {[
            { key: 'HAMBURGUESAS THC', title: 'HAMBURGUESAS THC', sub: '' },
            { key: 'THC ESPECIALES', title: 'THC ESPECIALES', sub: '' },
            { key: 'KIDS MENU', title: 'KIDS MENU', sub: '' },
            { key: 'ENTRADAS', title: 'ENTRADAS', sub: '' },
            { key: 'PAPAS Y MAS', title: 'PAPAS Y MAS', sub: 'Incluye aderezos y extras' },
            { key: 'BEBIDAS', title: 'BEBIDAS', sub: 'Refrescos y bebidas preparadas' },
            { key: 'POSTRES', title: 'POSTRES', sub: 'Conos, malteadas y dulces' }
          ].map((section) => {
            const categoryProducts = items.filter(p => p.category?.toUpperCase().trim() === section.key);
            if (categoryProducts.length === 0) return null;

            return (
              <div key={section.key} id={section.key.replace(/\s+/g, '-')} className="mb-20 scroll-mt-24">
                <div className="mb-10 border-l-8 border-red-600 pl-6 text-left">
                  <h2 className="text-5xl font-black text-white italic uppercase tracking-tighter leading-none">{section.title}</h2>
                  {section.sub && <p className="text-red-500 font-bold uppercase tracking-[0.2em] text-[10px] mt-2 leading-none">{section.sub}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {categoryProducts.map((p: any) => (
                    <div key={p.id} className="bg-zinc-900 rounded-3xl overflow-hidden border border-zinc-800 p-4 hover:border-red-600 transition-all group flex flex-col">

                      {/* IMAGEN: Ahora usa object-cover para no dejar espacios libres */}
                      <div className="relative h-64 w-full overflow-hidden rounded-2xl bg-zinc-800">
                        {p.imagen_url ? (
                          <img
                            src={p.imagen_url}
                            alt={p.nombre}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-zinc-700 font-black italic">THC</div>
                        )}
                      </div>

                      <div className="mt-5 text-left flex-grow">
                        <h3 className="text-white font-black italic uppercase text-xl leading-tight">{p.nombre}</h3>
                        <p className="text-zinc-500 text-sm mt-2 line-clamp-2 font-medium">{p.descripcion}</p>
                      </div>

                      <div className="flex justify-between items-center mt-6 pt-4">
                        <span className="text-red-600 font-black text-3xl">
                          ${p.precio}
                        </span>
                        <button
                          onClick={() => alCarrito(p)}
                          className="bg-white text-black text-[11px] font-black px-6 py-3 rounded-xl uppercase italic hover:bg-red-600 hover:text-white transition-colors"
                        >
                          Añadir
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>
      {/* --- CARRITO LATERAL (Tu diseño original) --- */}
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
                <div key={index} className="flex justify-between items-center mb-4 border-b pb-4 text-left">
                  <div>
                    <p className="font-bold uppercase text-gray-900">{item.nombre}</p>
                    <p className="text-red-600 font-black">${item.precio}</p>
                  </div>
                </div>
              ))}
              {carrito.length === 0 && <p className="text-gray-400 italic">El carrito está vacío...</p>}
            </div>
            <div className="mt-auto pt-8 border-t-4 border-black">
              <div className="flex justify-between text-2xl font-black mb-6 text-gray-900">
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