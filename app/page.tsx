"use client";

import React, { useState, useEffect } from "react";
import { supabase } from "./lib/supabase";

// --- 1. DEFINICIÓN DE DATOS ---
interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  category: string;
}

// --- 2. DISEÑO DE LA TARJETA ---
const ProductCard = ({ product }: { product: Product }) => (
  <div className="bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800 hover:border-red-600 transition-all group">
    <div className="relative h-64 overflow-hidden">
      <img
        src={product.image_url}
        alt={product.name}
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
      />
      <div className="absolute top-4 right-4 bg-red-600 text-white font-bold px-3 py-1 rounded-full shadow-lg">
        ${product.price} MXN
      </div>
    </div>
    <div className="p-6">
      <h3 className="text-xl font-bold text-white mb-2 uppercase italic">{product.name}</h3>
      <p className="text-zinc-400 text-sm mb-6 line-clamp-2">{product.description}</p>
      <button className="w-full bg-white text-black font-black py-3 rounded-xl hover:bg-red-600 hover:text-white transition-colors uppercase italic tracking-tighter">
        Añadir al carrito
      </button>
    </div>
  </div>
);

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getProducts() {
      const { data } = await supabase.from("products").select("*");
      if (data) setProducts(data);
      setLoading(false);
    }
    getProducts();
  }, []);

  if (loading) return <div className="bg-black h-screen flex items-center justify-center text-white italic font-black text-2xl">CARGANDO THC...</div>;

  return (
    <main className="bg-black min-h-screen">
      {/* --- HERO SECTION CON VIDEO --- */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <video autoPlay loop muted playsInline className="absolute z-0 w-full h-full object-cover opacity-60">
          <source src="/burger.mp4" type="video/mp4" />
        </video>
        <div className="relative z-10 text-center">
          <h1 className="text-8xl md:text-9xl font-black text-white italic tracking-tighter drop-shadow-2xl">THC</h1>
          <p className="text-red-600 font-bold tracking-[0.5em] uppercase text-xl">The House of Chicken</p>
        </div>
      </section>

      {/* --- SECCIÓN DE MENÚ (Categorías) --- */}
      <section id="menu" className="py-24 px-4 bg-black">
        <div className="container mx-auto">
          {[
            { id: 'hamburguesas', title: 'HAMBURGUESAS THC', sub: 'Nuestras clásicas de pollo' },
            { id: 'especiales', title: 'THC ESPECIALES', sub: 'Recetas únicas de la casa' },
            { id: 'kids', title: 'KIDS MENU', sub: 'Para los más pequeños' },
            { id: 'entradas', title: 'ENTRADAS', sub: 'Para empezar con todo' },
            { id: 'papas', title: 'PAPAS Y MAS', sub: 'Complementos, aderezos y extras' },
            { id: 'bebidas', title: 'BEBIDAS', sub: 'Refrescos y aguas frescas' },
            { id: 'postres', title: 'POSTRES', sub: 'Conos, malteadas y paladar dulce THC' }
          ].map((category) => {
            const categoryProducts = products.filter(
              (p: Product) => p.category?.toUpperCase() === category.title
            );

            if (categoryProducts.length === 0) return null;

            return (
              <div key={category.id} className="mb-24">
                <div className="mb-12 border-l-8 border-red-600 pl-6">
                  <h2 className="text-5xl font-black text-white italic tracking-tighter uppercase">
                    {category.title}
                  </h2>
                  <p className="text-zinc-500 font-bold uppercase tracking-widest text-xs mt-2">{category.sub}</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {categoryProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Cierre de etiquetas clave */}
    </main>
  );
}