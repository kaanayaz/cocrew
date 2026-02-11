import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center p-6 animate-fade-in-up">
      <p className="text-6xl font-bold text-slate-200">404</p>
      <h2 className="mt-4 text-lg font-semibold text-text-primary">
        Page not found
      </h2>
      <p className="mt-1 text-sm text-text-secondary">
        The page you&apos;re looking for doesn&apos;t exist.
      </p>
      <Link href="/home">
        <Button className="mt-6 gap-2">
          <Home className="h-4 w-4" />
          Go to dashboard
        </Button>
      </Link>
    </div>
  );
}
