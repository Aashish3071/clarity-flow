import type { LucideIcon } from "lucide-react";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { PageHero, SectionHeader, IconCard } from "@/components/site/Section";
import { FAQ } from "@/components/site/FAQ";
import { FinalCTA } from "@/components/site/FinalCTA";
import { Check } from "lucide-react";

export type ProductPageProps = {
  eyebrow: string;
  title: string;
  intro: string;
  overview: string;
  problems: { icon: LucideIcon; t: string; d: string }[];
  capabilities: { title: string; items: string[] }[];
  benefits: { icon: LucideIcon; t: string; d: string }[];
  industries: string[];
  faqs: { q: string; a: string }[];
};

export function ProductPage(p: ProductPageProps) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <PageHero eyebrow={p.eyebrow} title={p.title} intro={p.intro} secondaryLabel="Explore other products" secondaryTo="/products" />

      {/* Overview */}
      <section className="py-16 md:py-24">
        <div className="container-page grid gap-10 md:grid-cols-12 md:items-start">
          <div className="md:col-span-4">
            <p className="eyebrow">Overview</p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-ink md:text-3xl">
              What this product does.
            </h2>
          </div>
          <div className="md:col-span-8">
            <p className="text-base leading-relaxed text-ink-soft md:text-lg">{p.overview}</p>
          </div>
        </div>
      </section>

      {/* Problems */}
      <section className="border-y border-border bg-surface py-16 md:py-24">
        <div className="container-page">
          <SectionHeader eyebrow="Problems it solves" title="Familiar problems, quietly removed." />
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {p.problems.map((it) => (
              <IconCard key={it.t} icon={it.icon} title={it.t} text={it.d} />
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="py-16 md:py-24">
        <div className="container-page">
          <SectionHeader eyebrow="Key capabilities" title="Everything you need in one place." />
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {p.capabilities.map((c) => (
              <div key={c.title} className="rounded-2xl border border-border bg-card p-6 shadow-soft">
                <h3 className="text-base font-semibold text-ink">{c.title}</h3>
                <ul className="mt-4 space-y-2">
                  {c.items.map((i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-ink">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-[color:var(--brand)]" strokeWidth={2.5} />
                      {i}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="border-y border-border bg-surface py-16 md:py-24">
        <div className="container-page">
          <SectionHeader eyebrow="Business benefits" title="Where the change shows up." />
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {p.benefits.map((b) => (
              <IconCard key={b.t} icon={b.icon} title={b.t} text={b.d} />
            ))}
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="py-16 md:py-24">
        <div className="container-page">
          <SectionHeader eyebrow="Suitable industries" title="Where this product fits well." />
          <div className="mx-auto mt-10 flex max-w-3xl flex-wrap justify-center gap-2">
            {p.industries.map((i) => (
              <span key={i} className="rounded-full border border-border bg-card px-4 py-2 text-sm text-ink">
                {i}
              </span>
            ))}
          </div>
        </div>
      </section>

      <FAQ items={p.faqs} title="Questions about this product." />
      <FinalCTA />
      <Footer />
    </div>
  );
}
