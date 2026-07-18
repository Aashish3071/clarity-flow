import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <Hero />
      <Costs />
      <BetterWay />
      <LessRepetition />
      <BuiltAround />
      <BeforeAfter />
      <Process />
      <FAQ />
      <FinalCTA />
      <LeadForm />
      <Footer />
    </div>
  );
}

/* ---------------- Nav ---------------- */

function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur">
      <div className="container-page flex h-16 items-center justify-between">
        <a href="#top" className="flex items-center gap-2 font-serif text-xl tracking-tight text-ink">
          <span className="inline-block h-2 w-2 rounded-full bg-ink" />
          Clearwork
        </a>
        <nav className="hidden items-center gap-8 text-sm text-ink-soft md:flex">
          <a href="#problem" className="hover:text-ink">Problem</a>
          <a href="#approach" className="hover:text-ink">Approach</a>
          <a href="#process" className="hover:text-ink">Process</a>
          <a href="#faq" className="hover:text-ink">FAQ</a>
        </nav>
        <a
          href="#consultation"
          className="rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:opacity-90"
        >
          Book a consultation
        </a>
      </div>
    </header>
  );
}

/* ---------------- Hero ---------------- */

function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="container-page grid gap-16 pt-20 pb-28 md:grid-cols-12 md:pt-32 md:pb-40">
        <div className="md:col-span-7">
          <p className="eyebrow mb-8">For growing businesses</p>
          <h1 className="text-[2.75rem] leading-[1.05] md:text-[4.5rem]">
            Run your business with clarity,
            <span className="italic text-ink-soft"> not complexity.</span>
          </h1>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-ink-soft">
            When information is scattered across different tools, everyday work becomes slower,
            decisions take longer, and valuable opportunities are missed. Bringing everything
            together creates a smoother way to manage customers, operations, and growth.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <a
              href="#consultation"
              className="rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-soft transition hover:opacity-90"
            >
              Book a Free Consultation
            </a>
            <a
              href="#approach"
              className="rounded-full border border-border bg-card px-6 py-3 text-sm font-medium text-ink transition hover:bg-secondary"
            >
              See How It Works
            </a>
          </div>
        </div>

        <div className="md:col-span-5">
          <HeroDiagram />
        </div>
      </div>
      <div className="hairline container-page" />
    </section>
  );
}

function HeroDiagram() {
  const nodes = [
    { x: 50, y: 22, label: "Customers" },
    { x: 12, y: 48, label: "Sales" },
    { x: 88, y: 48, label: "Finance" },
    { x: 26, y: 82, label: "Operations" },
    { x: 74, y: 82, label: "Support" },
  ];
  return (
    <div className="relative aspect-square w-full rounded-3xl border border-border bg-card p-6 shadow-card">
      <svg viewBox="0 0 100 100" className="h-full w-full">
        {nodes.map((n, i) => (
          <line
            key={i}
            x1="50"
            y1="50"
            x2={n.x}
            y2={n.y}
            stroke="currentColor"
            strokeWidth="0.3"
            className="text-line"
          />
        ))}
        <circle cx="50" cy="50" r="6" className="fill-ink" />
        {nodes.map((n, i) => (
          <g key={i}>
            <circle cx={n.x} cy={n.y} r="3" className="fill-background stroke-ink" strokeWidth="0.6" />
            <text
              x={n.x}
              y={n.y - 5}
              textAnchor="middle"
              className="fill-ink-soft"
              style={{ fontSize: "3px", fontFamily: "Inter" }}
            >
              {n.label}
            </text>
          </g>
        ))}
      </svg>
      <div className="absolute bottom-5 left-6 right-6 flex items-center justify-between text-xs text-muted-foreground">
        <span>One connected system</span>
        <span className="font-mono">01</span>
      </div>
    </div>
  );
}

/* ---------------- Costs ---------------- */

function Costs() {
  const items = [
    "Leads go unnoticed.",
    "Customer information is difficult to find.",
    "Teams spend time searching instead of working.",
    "Approvals get delayed.",
    "Reports take hours to prepare.",
    "Important follow-ups are missed.",
    "Information gets entered more than once.",
    "Managers struggle to see the full picture.",
  ];
  return (
    <section id="problem" className="py-28 md:py-40">
      <div className="container-page">
        <div className="max-w-3xl">
          <p className="eyebrow mb-6">The hidden cost</p>
          <h2 className="text-4xl leading-[1.1] md:text-6xl">
            When work is spread across too many systems, it quietly gets more expensive.
          </h2>
        </div>

        <div className="mt-20 grid gap-x-12 gap-y-8 md:grid-cols-2">
          {items.map((t, i) => (
            <div key={i} className="flex items-start gap-5 border-t border-border pt-6">
              <span className="mt-1 font-mono text-xs text-muted-foreground">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="text-lg text-ink">{t}</p>
            </div>
          ))}
        </div>

        <p className="mt-20 max-w-2xl font-serif text-3xl italic text-ink-soft md:text-4xl">
          Small inefficiencies become expensive as a business grows.
        </p>
      </div>
    </section>
  );
}

/* ---------------- Better Way ---------------- */

function BetterWay() {
  const pillars = [
    "Customers", "Sales", "Projects", "Inventory",
    "Support", "Finance", "Approvals", "Reports",
  ];
  return (
    <section id="approach" className="border-y border-border bg-surface py-28 md:py-40">
      <div className="container-page grid gap-16 md:grid-cols-12">
        <div className="md:col-span-5">
          <p className="eyebrow mb-6">A better way to work</p>
          <h2 className="text-4xl leading-[1.1] md:text-5xl">
            Everything the business runs on, working from one place.
          </h2>
          <p className="mt-8 max-w-md text-lg leading-relaxed text-ink-soft">
            The goal is not more software. The goal is making work easier — so people
            can act on information the moment it appears, without switching between tools.
          </p>
        </div>
        <div className="md:col-span-7">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {pillars.map((p) => (
              <div
                key={p}
                className="aspect-square rounded-2xl border border-border bg-card p-5 shadow-soft transition hover:-translate-y-1"
              >
                <div className="flex h-full flex-col justify-between">
                  <span className="font-mono text-[10px] tracking-widest text-muted-foreground">
                    ///
                  </span>
                  <span className="font-serif text-2xl text-ink">{p}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Less Repetition ---------------- */

function LessRepetition() {
  const items = [
    { k: "Enquiries", v: "New enquiries land in the right place, organised automatically." },
    { k: "Tasks", v: "Work appears when it should — nothing forgotten, nothing chased twice." },
    { k: "Records", v: "Customer information stays consistent across every team." },
    { k: "Approvals", v: "Decisions move forward without back-and-forth messages." },
    { k: "Reports", v: "The numbers you need are already there when you look." },
    { k: "Focus", v: "Teams spend more time deciding, less time updating." },
  ];
  return (
    <section className="py-28 md:py-40">
      <div className="container-page">
        <div className="max-w-3xl">
          <p className="eyebrow mb-6">Less repetition</p>
          <h2 className="text-4xl leading-[1.1] md:text-6xl">
            Less repetition. <span className="italic text-ink-soft">More progress.</span>
          </h2>
        </div>

        <div className="mt-20 grid gap-px overflow-hidden rounded-3xl border border-border bg-border md:grid-cols-3">
          {items.map((it) => (
            <div key={it.k} className="bg-card p-8 md:p-10">
              <p className="font-mono text-xs tracking-widest text-muted-foreground">{it.k.toUpperCase()}</p>
              <p className="mt-6 text-lg leading-relaxed text-ink">{it.v}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Built Around Your Business ---------------- */

function BuiltAround() {
  const cards = [
    { t: "Sales", d: "Pipeline, quotes, and follow-ups aligned with how your team already sells." },
    { t: "Operations", d: "Daily work stays organised — from job cards to delivery." },
    { t: "Customer Service", d: "Every conversation and request in one clear timeline." },
    { t: "Finance", d: "Invoices, payments, and approvals moving without chasing." },
    { t: "Management", d: "A live view of the business, ready when you need it." },
    { t: "Projects", d: "Timelines, tasks, and responsibilities in one shared view." },
  ];
  return (
    <section className="border-y border-border bg-surface py-28 md:py-40">
      <div className="container-page">
        <div className="max-w-3xl">
          <p className="eyebrow mb-6">Built around your business</p>
          <h2 className="text-4xl leading-[1.1] md:text-5xl">
            Shaped to the way your business already works — not the other way around.
          </h2>
        </div>

        <div className="mt-20 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {cards.map((c, i) => (
            <div
              key={c.t}
              className="group rounded-3xl border border-border bg-card p-8 shadow-soft transition hover:shadow-card"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-2xl">{c.t}</h3>
                <span className="font-mono text-xs text-muted-foreground">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <p className="mt-6 text-base leading-relaxed text-ink-soft">{c.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Before / After ---------------- */

function BeforeAfter() {
  const before = [
    "Information everywhere",
    "Manual updates",
    "Repeated work",
    "Delayed responses",
    "Limited visibility",
  ];
  const after = [
    "One reliable source of information",
    "Consistent processes",
    "Less administration",
    "Faster response times",
    "Clear business visibility",
  ];
  return (
    <section className="py-28 md:py-40">
      <div className="container-page">
        <div className="max-w-2xl">
          <p className="eyebrow mb-6">What changes</p>
          <h2 className="text-4xl leading-[1.1] md:text-5xl">
            The difference is felt in the everyday.
          </h2>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl border border-border bg-card p-10">
            <p className="eyebrow mb-8">Before</p>
            <ul className="space-y-5">
              {before.map((b) => (
                <li key={b} className="flex items-start gap-4 text-lg text-ink-soft">
                  <span className="mt-3 h-px w-6 bg-line" />
                  {b}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl border border-ink bg-ink p-10 text-primary-foreground">
            <p className="eyebrow mb-8" style={{ color: "oklch(0.75 0.01 85)" }}>After</p>
            <ul className="space-y-5">
              {after.map((b) => (
                <li key={b} className="flex items-start gap-4 text-lg">
                  <span className="mt-3 h-px w-6 bg-primary-foreground/60" />
                  {b}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Process ---------------- */

function Process() {
  const steps = [
    { t: "Understand", d: "We start by learning how your business runs today." },
    { t: "Recommend", d: "A clear approach tailored to what matters most for you." },
    { t: "Implement", d: "We put it in place with minimum disruption to your team." },
    { t: "Support", d: "Ongoing help as your business grows and evolves." },
  ];
  return (
    <section id="process" className="border-y border-border bg-surface py-28 md:py-40">
      <div className="container-page">
        <div className="max-w-2xl">
          <p className="eyebrow mb-6">What happens next</p>
          <h2 className="text-4xl leading-[1.1] md:text-5xl">A calm, considered process.</h2>
        </div>

        <div className="mt-20 grid gap-10 md:grid-cols-4">
          {steps.map((s, i) => (
            <div key={s.t} className="border-t border-border pt-6">
              <p className="font-mono text-xs tracking-widest text-muted-foreground">
                Step {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-4 text-3xl">{s.t}</h3>
              <p className="mt-4 text-base leading-relaxed text-ink-soft">{s.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- FAQ ---------------- */

function FAQ() {
  const faqs = [
    { q: "How long does implementation usually take?", a: "Most engagements move from first conversation to working system within a few weeks. The exact timeline depends on the scope agreed together." },
    { q: "Will this fit the way our business already works?", a: "Yes. We start by understanding your current process and shape the approach around it, rather than asking your team to change how they work." },
    { q: "Can additional workflows be added later?", a: "Absolutely. The setup is built to grow with the business — new functions can be added as priorities evolve." },
    { q: "How much training is required?", a: "Minimal. The system is designed to feel familiar, and short walkthroughs cover most day-to-day use." },
    { q: "What kind of support is available after implementation?", a: "Ongoing support is included — adjustments, guidance, and improvements as your business changes." },
  ];
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="py-28 md:py-40">
      <div className="container-page grid gap-16 md:grid-cols-12">
        <div className="md:col-span-4">
          <p className="eyebrow mb-6">FAQ</p>
          <h2 className="text-4xl leading-[1.1] md:text-5xl">Questions we hear often.</h2>
        </div>
        <div className="md:col-span-8">
          <div className="divide-y divide-border border-y border-border">
            {faqs.map((f, i) => {
              const isOpen = open === i;
              return (
                <button
                  key={i}
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="block w-full py-7 text-left"
                >
                  <div className="flex items-start justify-between gap-8">
                    <span className="text-lg text-ink">{f.q}</span>
                    <span className="mt-1 font-mono text-sm text-muted-foreground">
                      {isOpen ? "−" : "+"}
                    </span>
                  </div>
                  <div
                    className="grid transition-all duration-300"
                    style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                  >
                    <div className="overflow-hidden">
                      <p className="pt-4 pr-8 text-base leading-relaxed text-ink-soft">{f.a}</p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Final CTA ---------------- */

function FinalCTA() {
  return (
    <section className="border-t border-border bg-ink py-28 text-primary-foreground md:py-40">
      <div className="container-page max-w-4xl">
        <h2 className="text-4xl leading-[1.05] text-primary-foreground md:text-6xl">
          Every growing business reaches a point where old ways of working start holding it back.
        </h2>
        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-primary-foreground/70">
          A short conversation is often enough to identify where time is being lost and what can
          be improved. Start with understanding the opportunities before making any decisions.
        </p>
        <a
          href="#consultation"
          className="mt-10 inline-flex rounded-full bg-background px-6 py-3 text-sm font-medium text-ink transition hover:opacity-90"
        >
          Schedule Your Consultation
        </a>
      </div>
    </section>
  );
}

/* ---------------- Lead Form ---------------- */

function LeadForm() {
  const [submitted, setSubmitted] = useState(false);
  return (
    <section id="consultation" className="py-28 md:py-40">
      <div className="container-page grid gap-16 md:grid-cols-12">
        <div className="md:col-span-5">
          <p className="eyebrow mb-6">Book a consultation</p>
          <h2 className="text-4xl leading-[1.1] md:text-5xl">
            A quiet 30 minutes. A clearer view of what's possible.
          </h2>
          <p className="mt-8 text-base leading-relaxed text-ink-soft">
            Share a little about your business. We'll come prepared with observations, not a pitch.
          </p>
        </div>

        <div className="md:col-span-7">
          {submitted ? (
            <div className="rounded-3xl border border-border bg-card p-10 shadow-card">
              <h3 className="text-3xl">Thank you.</h3>
              <p className="mt-4 text-ink-soft">
                Your request has been received. We'll be in touch within one business day.
              </p>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSubmitted(true);
              }}
              className="rounded-3xl border border-border bg-card p-8 shadow-card md:p-10"
            >
              <div className="grid gap-5 md:grid-cols-2">
                <Field label="Full Name" name="name" required />
                <Field label="Company Name" name="company" required />
                <Field label="Business Email" name="email" type="email" required />
                <Field label="Phone Number" name="phone" type="tel" />
                <SelectField
                  label="Country"
                  name="country"
                  options={["United Arab Emirates", "United States", "United Kingdom", "Canada", "Other"]}
                />
                <SelectField
                  label="Business Size"
                  name="size"
                  options={["1–10", "11–50", "51–200", "201–500", "500+"]}
                />
              </div>
              <div className="mt-5">
                <SelectField
                  label="Biggest Operational Challenge"
                  name="challenge"
                  options={[
                    "Scattered information",
                    "Slow approvals",
                    "Missed follow-ups",
                    "Unclear reporting",
                    "Manual admin work",
                    "Something else",
                  ]}
                />
              </div>
              <div className="mt-5">
                <label className="block">
                  <span className="text-sm text-ink-soft">Message</span>
                  <textarea
                    name="message"
                    rows={4}
                    className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-ink outline-none transition focus:border-ink"
                  />
                </label>
              </div>
              <button
                type="submit"
                className="mt-8 w-full rounded-full bg-primary px-6 py-4 text-sm font-medium text-primary-foreground transition hover:opacity-90"
              >
                Book My Consultation
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

function Field({
  label, name, type = "text", required,
}: { label: string; name: string; type?: string; required?: boolean }) {
  return (
    <label className="block">
      <span className="text-sm text-ink-soft">{label}</span>
      <input
        type={type}
        name={name}
        required={required}
        className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-ink outline-none transition focus:border-ink"
      />
    </label>
  );
}

function SelectField({
  label, name, options,
}: { label: string; name: string; options: string[] }) {
  return (
    <label className="block">
      <span className="text-sm text-ink-soft">{label}</span>
      <select
        name={name}
        defaultValue=""
        className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-ink outline-none transition focus:border-ink"
      >
        <option value="" disabled>Select</option>
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    </label>
  );
}

/* ---------------- Footer ---------------- */

function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="container-page flex flex-col gap-8 py-12 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-2 font-serif text-lg text-ink">
          <span className="inline-block h-2 w-2 rounded-full bg-ink" />
          Clearwork
        </div>
        <div className="flex flex-wrap items-center gap-6 text-sm text-ink-soft">
          <a href="mailto:hello@clearwork.co" className="hover:text-ink">hello@clearwork.co</a>
          <a href="#" className="hover:text-ink">LinkedIn</a>
          <a href="#" className="hover:text-ink">Privacy</a>
          <a href="#" className="hover:text-ink">Terms</a>
        </div>
        <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} Clearwork. All rights reserved.</p>
      </div>
    </footer>
  );
}
