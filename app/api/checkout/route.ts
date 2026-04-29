import { NextResponse } from "next/server";
import Stripe from "stripe";
import { supabase } from "../../lib/supabase";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_dummy_key');

export async function POST(req: Request) {
    try {
        const { productIds } = await req.json();

        if (!productIds || productIds.length === 0) {
             return NextResponse.json({ error: "El carrito está vacío." }, { status: 400 });
        }

        // Consultar productos reales a Supabase para evitar manipulaciones de precio
        const { data: dbProducts, error } = await supabase
            .from("hamburguesas")
            .select("id, nombre, precio")
            .in("id", productIds);

        if (error || !dbProducts) {
             return NextResponse.json({ error: "Error al consultar los precios oficiales." }, { status: 500 });
        }

        // Construir los line items con la info real de DB
        const line_items = productIds.map((id: number | string) => {
             const dbProduct = dbProducts.find((p) => p.id == id);
             if (!dbProduct) throw new Error(`Producto no válido: ${id}`);
             return {
                 price_data: {
                     currency: "mxn",
                     product_data: { name: dbProduct.nombre },
                     unit_amount: Math.round(dbProduct.precio * 100), // Stripe usa centavos
                 },
                 quantity: 1,
             };
        });

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items,
            mode: "payment",
            success_url: `${req.headers.get("origin")}/success`,
            cancel_url: `${req.headers.get("origin")}/?canceled=true`,
        });

        return NextResponse.json({ url: session.url });
    } catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : String(err);
        return NextResponse.json({ error: `Error conectando con Stripe: ${errorMessage}` }, { status: 500 });
    }
}