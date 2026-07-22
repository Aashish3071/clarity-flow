import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

export function FinalCTA({
  title = "Ready to see how it could work for your business?",
  text = "Schedule a personalised demo to discuss your current processes, explore the right solution and see how it can support the way your business already works.",
}: { title?: string; text?: string }) {
  return (
    <section className="bg-ink py-20 text-primary-foreground md:py-24">
      <div className="container-page grid gap-8 md:grid-cols-12 md:items-center">
        <div className="md:col-span-8">
          <h2 className="text-2xl font-semibold tracking-tight text-white md:text-4xl">{title}</h2>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/70 md:text-base">{text}</p>
        </div>
        <div className="md:col-span-4">
          <Link
            to="/demo"
            className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-white px-6 py-4 text-sm font-semibold text-ink transition hover:opacity-90"
          >
            Schedule a Demo <ArrowRight className="h-4 w-4" />
          </Link>
          <p className="mt-3 text-center text-xs text-white/60">30-minute discovery call. No obligation.</p>
        </div>
      </div>
    </section>
  );
}
