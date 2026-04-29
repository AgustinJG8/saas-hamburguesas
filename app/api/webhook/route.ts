import { NextResponse } from 'next/server';
import Stripe from 'stripe';

export const runtime = 'edge';

const stripe = new Stripe((process.env.STRIPE_SECRET_KEY as string) || 'sk_dummy_key');
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(req: Request) {
  try {
    const body = await req.text();
    const signature = req.headers.get("stripe-signature");

    if (!signature || !webhookSecret) {
      return NextResponse.json(
        { error: "Webhook secret or signature missing" },
        { status: 400 }
      );
    }

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      console.error(`Webhook Error: ${errorMessage}`);
      return NextResponse.json({ error: `Webhook Error: ${errorMessage}` }, { status: 400 });
    }

    // Manejar el evento
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      
      // Aquí registrarías la orden en tu base de datos (Supabase)
      console.log("-----------------------------------------");
      console.log("🍔 ¡Pago exitoso para la sesión:", session.id);
      console.log("💰 Total pagado:", (session.amount_total || 0) / 100, session.currency?.toUpperCase());
      console.log("👤 Cliente:", session.customer_details?.email);
      console.log("-----------------------------------------");
      
      // Ejemplo futuro: await supabase.from('pedidos').insert({...})
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Error en el webhook:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
