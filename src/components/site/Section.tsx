import type { LucideIcon } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

export function PageHero({
  eyebrow,
  title,
  intro,
  primaryLabel = "Schedule a Demo",
  primaryTo = "/demo",
  secondaryLabel,
  secondaryTo,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  primaryLabel?: string;
  primaryTo?: string;
  secondaryLabel?: string;
  secondaryTo?: string;
}) {
  return (
    <section className="border-b border-border bg-gradient-to-b from-[color:var(--brand-soft)]/50 to-background">
      <div className="container-page pb-14 pt-12 md:pb-20 md:pt-20">
        <div className="mx-auto max-w-3xl">
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="mt-3 text-3xl font-semibold leading-[1.1] tracking-tight text-ink md:text-5xl md:leading-[1.05]">
            {title}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-ink-soft md:text-lg">{intro}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to={primaryTo} className="inline-flex items-center gap-2 rounded-md bg-[color:var(--brand)] px-5 py-3 text-sm font-medium text-white shadow-soft transition hover:opacity-90">
              {primaryLabel} <ArrowRight className="h-4 w-4" />
            </Link>
            {secondaryLabel && secondaryTo && (
              <Link to={secondaryTo} className="rounded-md border border-border bg-card px-5 py-3 text-sm font-medium text-ink transition hover:bg-secondary">
                {secondaryLabel}
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export function SectionHeader({ eyebrow, title, intro }: { eyebrow?: string; title: string; intro?: string }) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2 className="mt-3 text-2xl font-semibold tracking-tight text-ink md:text-4xl">{title}</h2>
      {intro && <p className="mt-4 text-base leading-relaxed text-ink-soft">{intro}</p>}
    </div>
  );
}

export function IconCard({ icon: Icon, title, text }: { icon: LucideIcon; title: string; text: string }) {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <span className="grid h-9 w-9 place-items-center rounded-lg bg-[color:var(--brand)]/10 text-[color:var(--brand)]">
        <Icon className="h-4 w-4" />
      </span>
      <h3 className="mt-4 text-base font-semibold text-ink">{title}</h3>
      <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{text}</p>
    </div>
  );
}
