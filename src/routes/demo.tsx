import { createFileRoute } from "@tanstack/react-router";
import { MinimalNav } from "@/components/site/Nav";
import { DemoForm } from "@/components/site/DemoForm";
import { FAQ } from "@/components/site/FAQ";
import { Check, Users, Package, ShoppingCart, Calendar, Clock, MessageSquare, ClipboardCheck } from "lucide-react";

export const Route = createFileRoute("/demo")({
  head: () => ({
    meta: [
      { title: "Schedule a Demo — See CRM, ERP & E-commerce in your business context | Clearwork" },
      { name: "description", content: "Book a 30-minute demo. Share your current setup, then pick a time that suits you. Tailored, no obligation." },
      { property: "og:title", content: "Schedule a Demo — Clearwork" },
      { property: "og:description", content: "See how CRM, ERP or E-commerce could work in your business. 30-minute demo, no obligation." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: DemoPage,
});

function DemoPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <MinimalNav />

      {/* Hero + Form */}
      <section className="border-b border-border bg-gradient-to-b from-[color:var(--brand-soft)]/60 to-background">
        <div className="container-page grid gap-10 pt-10 pb-14 md:grid-cols-12 md:gap-12 md:pt-16 md:pb-20">
          <div className="md:col-span-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-ink-soft">
              <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--brand)]" /> Personalised demo
            </span>
            <h1 className="mt-4 text-3xl font-semibold leading-[1.1] tracking-tight text-ink md:text-[2.75rem] md:leading-[1.05]">
              See how it could work in your business.
            </h1>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-ink-soft md:text-lg">
              Share a short summary of your current setup. In 30 minutes, we'll walk through CRM, ERP or E-commerce
              tailored to your situation — with practical recommendations, no obligation.
            </p>
            <ul className="mt-6 space-y-2.5 text-sm text-ink">
              {[
                "30-minute walkthrough with a specialist",
                "Focused on your current processes",
                "Clear next steps after the call",
              ].map((t) => (
                <li key={t} className="flex items-start gap-2.5">
                  <Check className="mt-0.5 h-4 w-4 text-[color:var(--brand)]" strokeWidth={2.5} />
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div className="md:col-span-6">
            <DemoForm />
          </div>
        </div>
      </section>

      {/* Calendly */}
      <section id="schedule" className="border-b border-border bg-background py-16 md:py-20">
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow">Pick a time</p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-ink md:text-3xl">
              Choose a slot that suits you.
            </h2>
            <p className="mt-3 text-sm text-ink-soft">Times shown in your local timezone.</p>
          </div>
          <div className="mx-auto mt-8 max-w-4xl overflow-hidden rounded-2xl border border-border bg-card shadow-card">
            <iframe
              title="Schedule a demo"
              src="https://calendly.com/clearwork/demo?hide_gdpr_banner=1&background_color=ffffff&text_color=1a1a1a&primary_color=1e3a8a"
              className="h-[700px] w-full border-0"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* What happens */}
      <section className="border-b border-border bg-surface py-16 md:py-20">
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow">What happens on the call</p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-ink md:text-3xl">
              A structured 30 minutes.
            </h2>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-4">
            {[
              { icon: MessageSquare, t: "5 min", d: "A quick review of what you shared, in your words." },
              { icon: ClipboardCheck, t: "15 min", d: "A walkthrough of CRM, ERP or E-commerce, framed for your situation." },
              { icon: Clock, t: "5 min", d: "Questions — anything, from pricing to implementation timing." },
              { icon: Calendar, t: "5 min", d: "A clear next step: a proposal, a scoped pilot, or nothing at all." },
            ].map((s) => (
              <div key={s.t} className="rounded-xl border border-border bg-card p-5">
                <s.icon className="h-5 w-5 text-[color:var(--brand)]" />
                <div className="mt-3 text-xs font-semibold uppercase tracking-wider text-[color:var(--brand)]">{s.t}</div>
                <p className="mt-1 text-sm leading-relaxed text-ink">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Brief product overview */}
      <section className="py-16 md:py-20">
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow">What we'll cover</p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-ink md:text-3xl">
              The three products at a glance.
            </h2>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {[
              { icon: Users, t: "CRM", d: "Leads, customers, quotations and sales activity in one place, with Smart CRM assistance." },
              { icon: Package, t: "ERP", d: "Inventory, purchasing, finance, operations and projects on one connected system." },
              { icon: ShoppingCart, t: "E-commerce", d: "Products, online orders, customers and inventory managed from one platform." },
            ].map((p) => (
              <div key={p.t} className="rounded-2xl border border-border bg-card p-6 shadow-soft">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-[color:var(--brand)]/10 text-[color:var(--brand)]">
                  <p.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-lg font-semibold text-ink">{p.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{p.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FAQ
        title="Before you book."
        items={[
          { q: "Do we need to prepare anything?", a: "Just a short summary of what you're trying to improve. If you have a current tool or spreadsheet you'd like to show, bring it — but it's not required." },
          { q: "Who should join from our side?", a: "Whoever will own the outcome. That's usually a founder, an operations lead or a department head. Extra people are welcome." },
          { q: "Is this a sales pitch?", a: "No. The call is a working conversation. If the fit isn't right, we'll say so and suggest alternatives." },
          { q: "What happens after the call?", a: "You'll receive a short written summary and a clear next step — a proposal, a scoped pilot, or nothing at all if it isn't the right time." },
        ]}
      />

      {/* Final CTA */}
      <section className="bg-ink py-14 text-primary-foreground md:py-20">
        <div className="container-page text-center">
          <h2 className="mx-auto max-w-2xl text-2xl font-semibold tracking-tight text-white md:text-3xl">
            Ready to book your 30 minutes?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-white/70">
            Scroll up to pick a time — or fill in the form and we'll reach out to schedule.
          </p>
          <a href="#schedule" className="mt-6 inline-flex items-center gap-2 rounded-md bg-white px-6 py-3.5 text-sm font-semibold text-ink transition hover:opacity-90">
            Pick a time
          </a>
        </div>
      </section>
    </div>
  );
}
