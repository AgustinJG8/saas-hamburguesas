"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { supabase } from "./lib/supabase";

export interface Product {
  id: string | number;
  nombre: string;
  descripcion?: string;
  precio: number;
  imagen_url?: string;
  category?: string;
}

export default function Home() {
  // Cambiamos el nombre a 'items' para que el Menú lo reconozca
  const [items, setItems] = useState<Product[]>([]);
  const [carrito, setCarrito] = useState<Product[]>([]);
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
  const alCarrito = (producto: Product) => {
    setCarrito([...carrito, producto]);
    setIsCartOpen(true);
  };
  const eliminarDelCarrito = (index: number) => {
    const nuevoCarrito = carrito.filter((_, i) => i !== index);
    setCarrito(nuevoCarrito);
  };

  const pagarTodo = async () => {
    if (carrito.length === 0) return;

    const total = carrito.reduce((sum, item) => sum + item.precio, 0);
    const nombrePedido = "Pedido The House of Chicken";

    try {
      const respuesta = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre: nombrePedido,
          precio: total
        }),
      });

      const data = await respuesta.json();

      if (data.error) {
        throw new Error(data.error);
      }

      const { sessionId } = data;
      const { loadStripe } = await import("@stripe/stripe-js");
      const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await (stripe as any)?.redirectToCheckout({ sessionId });

    } catch (error) {
      console.error("Detalle del error:", error);
      alert("Hubo un problema con Stripe. Revisa la consola de Vercel.");
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
      {/* --- EL HERO VA AQUÍ (Línea 102 aproximadamente) --- */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <video autoPlay loop muted playsInline className="absolute top-0 left-0 w-full h-full object-cover">
          <source src="/burger.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/40 z-10"></div>
        <div className="relative z-20 text-center text-white px-6">
          <h1 className="text-7xl md:text-9xl font-black italic tracking-tighter mb-4 drop-shadow-2xl">THC</h1>
          <p className="text-xl md:text-2xl font-bold uppercase tracking-[0.3em] mb-8">Gigante • Especial • Crujiente</p>
          <a href="#menu" className="bg-red-600 hover:bg-red-700 text-white px-10 py-4 rounded-full font-black text-xl transition-all shadow-2xl inline-block hover:scale-105">
            ORDENAR AHORA
          </a>
        </div>
      </section>
      {/* ----------------------------------------------- */}

      {/* --- ABAJO SIGUE TU SECCIÓN DE MENÚ --- */}
      <section id="menu" className="py-24 bg-black"></section>

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
                  {categoryProducts.map((p: Product) => (
                    <div key={p.id} className="bg-zinc-900 rounded-3xl overflow-hidden border border-zinc-800 p-4 hover:border-red-600 transition-all group flex flex-col">

                      {/* IMAGEN: Ahora usa object-cover para no dejar espacios libres */}
                      <div className="relative h-64 w-full overflow-hidden rounded-2xl bg-zinc-800">
                        {p.imagen_url ? (
                          <Image
                            src={p.imagen_url}
                            alt={p.nombre}
                            fill
                            unoptimized
                            className="object-cover group-hover:scale-110 transition-transform duration-500"
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
                <div key={index} className="relative flex justify-between items-center mb-4 border-b pb-4 text-left pr-10">
                  <div>
                    <p className="font-bold uppercase text-gray-900 text-sm">{item.nombre}</p>
                    <p className="text-red-600 font-black">${item.precio}</p>
                  </div>

                  {/* Este es el botón que llama a la función que acabamos de pegar arriba */}
                  <button
                    onClick={() => eliminarDelCarrito(index)}
                    className="absolute right-0 text-gray-400 hover:text-red-600 font-bold"
                  >
                    ✕
                  </button>
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