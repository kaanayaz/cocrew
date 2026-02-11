import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-slate-50 to-indigo-50/30">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-slate-900">
          cocrew<span className="text-primary">.ai</span>
        </h1>
        <p className="mt-2 text-lg text-text-secondary">
          Your AI team for Shopify
        </p>
        <div className="mt-8 flex gap-4">
          <Link
            href="/login"
            className="rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-hover"
          >
            Log in
          </Link>
          <Link
            href="/signup"
            className="rounded-lg border border-border bg-white px-6 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
          >
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}
