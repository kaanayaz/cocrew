import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.text();
  const sig = request.headers.get("stripe-signature");

  if (!sig) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    return NextResponse.json(
      { error: "Webhook secret not configured" },
      { status: 503 }
    );
  }

  // TODO: Verify webhook signature with Stripe
  // TODO: Process checkout.session.completed event
  // TODO: Add credits to user's account via supabase.rpc("add_credits", ...)

  return NextResponse.json({ received: true });
}
