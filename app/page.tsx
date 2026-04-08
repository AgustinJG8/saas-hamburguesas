"use client"; // Le dice a Next.js que esta página es interactiva

import { useEffect, useState } from "react";
import { supabase } from "./lib/supabase"; // Importamos el puente que creaste

export default function Home() {
  const [hamburguesas, setHamburguesas] = useState<any[]>([]);

  useEffect(() => {
    // Función para "traer" las hamburguesas de Supabase
    const obtenerMenu = async () => {
      const { data, error } = await supabase
        .from("hamburguesas") // Tu tabla de Supabase
        .select("*");

      if (error) {
        console.error("Error cargando el menú:", error);
      } else {
        setHamburguesas(data || []);
      }
    };

    obtenerMenu();
  }, []);

  return (
    <main className="p-8 bg-white min-h-screen">
      <h1 className="text-4xl font-bold text-red-600 mb-8">Pollo SaaS Menu</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {hamburguesas.map((item) => (
          <div key={item.id} className="border p-4 rounded-xl shadow-sm hover:shadow-md transition">
            <h2 className="text-xl font-bold">{item.nombre}</h2>
            <p className="text-gray-600 my-2">{item.descripcion}</p>
            <div className="flex justify-between items-center mt-4">
              <span className="text-lg font-bold text-green-600">${item.precio} MXN</span>
              <button className="bg-red-500 text-white px-4 py-2 rounded-lg font-semibold">
                Comprar
              </button>
            </div>
          </div>
        ))}
      </div>

      {hamburguesas.length === 0 && (
        <p className="text-gray-500">Cargando el delicioso menú de pollo...</p>
      )}
    </main>
  );
}