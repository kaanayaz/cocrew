import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { packIndex } = await request.json();

  // Credit packs (must match frontend constants)
  const packs = [
    { credits: 50, price: 10 },
    { credits: 200, price: 35 },
    { credits: 500, price: 75 },
  ];

  const pack = packs[packIndex];
  if (!pack) {
    return NextResponse.json({ error: "Invalid pack" }, { status: 400 });
  }

  // When Stripe is configured, this will create a Checkout Session
  // For now, return a placeholder
  const stripeKey = process.env.STRIPE_SECRET_KEY;
  if (!stripeKey) {
    return NextResponse.json({
      error: "Stripe not configured. Add STRIPE_SECRET_KEY to .env.local",
    }, { status: 503 });
  }

  // TODO: Create Stripe Checkout Session and return URL
  return NextResponse.json({
    message: "Stripe integration pending",
    pack,
  });
}
