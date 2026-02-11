"use client";

import { useState } from "react";
import { CREDIT_PACKS } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Coins,
  Zap,
  TrendingUp,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";

export default function BillingPage() {
  const [credits] = useState(50);
  const [purchasing, setPurchasing] = useState<number | null>(null);

  async function handlePurchase(packIndex: number) {
    setPurchasing(packIndex);
    // In Phase 9 wiring, this will redirect to Stripe Checkout
    setTimeout(() => {
      alert(
        "Stripe Checkout integration will be available once you provide your Stripe keys."
      );
      setPurchasing(null);
    }, 1000);
  }

  return (
    <div className="p-6 animate-fade-in-up">
      {/* Back link */}
      <Link
        href="/settings"
        className="mb-4 inline-flex items-center gap-1 text-sm text-text-secondary hover:text-text-primary"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Settings
      </Link>

      <h1 className="text-2xl font-bold text-text-primary">Billing</h1>
      <p className="mt-1 text-sm text-text-secondary">
        Manage your credits and payment
      </p>

      {/* Credit balance */}
      <div className="mt-6 max-w-sm rounded-xl border border-indigo/20 bg-indigo/5 p-5">
        <div className="flex items-center gap-2 text-indigo">
          <Zap className="h-5 w-5" />
          <span className="text-sm font-semibold uppercase tracking-wider">
            Credit Balance
          </span>
        </div>
        <p className="mt-2 text-3xl font-bold text-indigo">{credits}</p>
        <div className="mt-2 h-2 overflow-hidden rounded-full bg-indigo/10">
          <div
            className="h-full rounded-full bg-indigo transition-all"
            style={{ width: `${Math.min((credits / 500) * 100, 100)}%` }}
          />
        </div>
        <p className="mt-1 text-xs text-text-muted">
          {credits} of 500 max capacity
        </p>
      </div>

      {/* Credit packs */}
      <div className="mt-8">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-text-muted">
          Buy Credits
        </h2>
        <div className="grid gap-4 sm:grid-cols-3 max-w-2xl stagger-children">
          {CREDIT_PACKS.map((pack, i) => (
            <div
              key={i}
              className={
                pack.label === "POPULAR"
                  ? "relative rounded-xl border-2 border-indigo bg-white p-5 shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
                  : "rounded-xl border border-border bg-white p-5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
              }
            >
              {pack.label && (
                <Badge
                  className={
                    pack.label === "POPULAR"
                      ? "absolute -top-2.5 left-1/2 -translate-x-1/2 bg-indigo text-white text-[10px]"
                      : "absolute -top-2.5 left-1/2 -translate-x-1/2 bg-emerald-500 text-white text-[10px]"
                  }
                >
                  {pack.label}
                </Badge>
              )}

              <div className="flex items-center gap-2 text-text-primary">
                <Coins className="h-5 w-5 text-indigo" />
                <span className="text-2xl font-bold">{pack.credits}</span>
                <span className="text-sm text-text-muted">credits</span>
              </div>

              <p className="mt-3 text-2xl font-bold text-text-primary">
                ${pack.price}
              </p>
              <p className="text-xs text-text-muted">
                ${pack.perCredit}/credit
              </p>

              <Button
                className="mt-4 w-full"
                variant={pack.label === "POPULAR" ? "default" : "outline"}
                onClick={() => handlePurchase(i)}
                disabled={purchasing === i}
              >
                {purchasing === i ? "Processing..." : "Buy now"}
              </Button>
            </div>
          ))}
        </div>
      </div>

      <Separator className="my-8 max-w-2xl" />

      {/* Usage chart placeholder */}
      <div className="max-w-2xl">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-text-muted">
          Usage (last 30 days)
        </h2>
        <div className="flex h-40 items-center justify-center rounded-xl border border-dashed border-slate-200">
          <div className="text-center">
            <TrendingUp className="mx-auto h-8 w-8 text-text-muted" />
            <p className="mt-2 text-sm text-text-muted">
              Usage chart will appear once you start using credits
            </p>
          </div>
        </div>
      </div>

      <Separator className="my-8 max-w-2xl" />

      {/* Recent transactions */}
      <div className="max-w-2xl">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-text-muted">
          Recent Transactions
        </h2>
        <div className="flex h-24 items-center justify-center rounded-xl border border-dashed border-slate-200">
          <p className="text-sm text-text-muted">No transactions yet</p>
        </div>
      </div>
    </div>
  );
}
