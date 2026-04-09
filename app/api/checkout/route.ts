import { NextResponse } from "next/server";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export async function POST(req: Request) {
    try {
        const { nombre, precio } = await req.json();

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: [
                {
                    price_data: {
                        currency: "mxn",
                        product_data: { name: nombre },
                        unit_amount: Math.round(precio * 100), // Stripe usa centavos
                    },
                    quantity: 1,
                },
            ],
            mode: "payment",
            success_url: `${req.headers.get("origin")}/?success=true`,
            cancel_url: `${req.headers.get("origin")}/?canceled=true`,
        });

        return NextResponse.json({ sessionId: session.id });
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}