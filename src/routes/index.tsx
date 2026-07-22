import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Users, Package, ShoppingCart, ArrowRight, Sparkles, Check,
  Search, Sliders, Database, Rocket, LifeBuoy,
  HardHat, Factory, Store, Truck, Stethoscope, Briefcase,
  Zap, Eye, Layers, Timer, GitBranch,
} from "lucide-react";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { HeroArt } from "@/components/site/HeroArt";
import { FAQ } from "@/components/site/FAQ";
import { FinalCTA } from "@/components/site/FinalCTA";
import { SectionHeader } from "@/components/site/Section";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Clearwork — Business software built around how your business works" },
      { name: "description", content: "CRM, ERP and E-commerce solutions tailored, deployed and supported for growing companies. Schedule a demo to see it applied to your business." },
      { property: "og:title", content: "Clearwork — Business software built around your business" },
      { property: "og:description", content: "CRM, ERP and E-commerce for growing companies. Tailored, deployed, supported." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <Hero />
      <Products />
      <WhyChoose />
      <SmartCRM />
      <Industries />
      <Process />
      <HomeFAQ />
      <FinalCTA />
      <Footer />
    </div>
  );
}

/* ---------------- Hero ---------------- */

function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border bg-gradient-to-b from-[color:var(--brand-soft)]/60 to-background">
      <div className="container-page grid gap-12 pt-12 pb-16 md:grid-cols-12 md:gap-10 md:pb-24 md:pt-20 lg:pt-24">
        <div className="md:col-span-6 md:pr-4 lg:col-span-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-ink-soft">
            <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--brand)]" />
            CRM • ERP • E-commerce
          </span>
          <h1 className="mt-5 text-[2rem] font-semibold leading-[1.08] tracking-tight text-ink sm:text-[2.5rem] md:text-[3.25rem] md:leading-[1.05] lg:text-[3.6rem]">
            Business software built around the way your business works.
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-ink-soft md:text-lg">
            Bring your customers, sales, operations, inventory and finance into one connected
            system designed to simplify everyday work and support business growth.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link to="/demo" className="inline-flex items-center gap-2 rounded-md bg-[color:var(--brand)] px-5 py-3 text-sm font-medium text-white shadow-soft transition hover:opacity-90">
              Schedule a Demo <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/products" className="rounded-md border border-border bg-card px-5 py-3 text-sm font-medium text-ink transition hover:bg-secondary">
              Explore Products
            </Link>
          </div>

          <p className="mt-5 text-xs text-ink-soft">
            30-minute discovery call · Tailored recommendations · 14-Day Guided Trial available
          </p>
        </div>

        <div className="md:col-span-6 lg:col-span-6">
          <HeroArt />
        </div>
      </div>
    </section>
  );
}

/* ---------------- Products ---------------- */

function Products() {
  const items = [
    {
      icon: Users,
      title: "CRM",
      to: "/products/crm",
      body: "One place to manage leads, customers, quotations, sales activities and long-term customer relationships.",
      extra: "Smart CRM helps teams stay organised by suggesting follow-ups, surfacing relevant information and reducing repetitive work.",
    },
    {
      icon: Package,
      title: "ERP",
      to: "/products/erp",
      body: "Manage inventory, purchasing, finance, operations and projects through one connected system.",
    },
    {
      icon: ShoppingCart,
      title: "E-commerce",
      to: "/products/ecommerce",
      body: "Manage products, customers, online orders and inventory from one connected platform.",
    },
  ];
  return (
    <section id="products" className="py-16 md:py-24">
      <div className="container-page">
        <SectionHeader eyebrow="Products" title="Three connected products. One system of record." intro="Adopt what you need today. Add what you need next — without switching platforms." />
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {items.map((p) => (
            <div key={p.title} className="group flex flex-col rounded-2xl border border-border bg-card p-6 shadow-soft transition hover:-translate-y-0.5 hover:shadow-card">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-[color:var(--brand)]/10 text-[color:var(--brand)]">
                <p.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-5 text-xl font-semibold text-ink">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{p.body}</p>
              {p.extra && (
                <div className="mt-3 rounded-lg bg-secondary p-3 text-xs leading-relaxed text-ink-soft">
                  <span className="inline-flex items-center gap-1.5 font-medium text-ink">
                    <Sparkles className="h-3.5 w-3.5 text-[color:var(--brand)]" /> Smart CRM
                  </span>
                  <div className="mt-1">{p.extra}</div>
                </div>
              )}
              <Link to={p.to} className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-[color:var(--brand)] hover:opacity-80">
                Learn more <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Why choose ---------------- */

function WhyChoose() {
  const items = [
    { icon: Timer, t: "Spend less time updating records", d: "Information flows between customers, orders and finance without duplicate entry." },
    { icon: Database, t: "Work from one reliable source", d: "Teams stop hunting through spreadsheets, folders and inboxes for the current version." },
    { icon: Eye, t: "Improve visibility across teams", d: "Everyone sees the same status, from first enquiry through delivery and invoicing." },
    { icon: Zap, t: "Reduce repetitive administration", d: "Approvals, reminders and reports move on their own instead of by hand." },
    { icon: GitBranch, t: "Support faster business decisions", d: "Real numbers are ready when you need them — not two days later." },
    { icon: Layers, t: "Grow without adding complexity", d: "New branches, staff and products fit into the system already in place." },
  ];
  return (
    <section className="border-y border-border bg-surface py-16 md:py-24">
      <div className="container-page">
        <SectionHeader eyebrow="Why businesses choose this" title="Business outcomes, not software features." />
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {items.map((c) => (
            <div key={c.t} className="rounded-xl border border-border bg-card p-5">
              <c.icon className="h-5 w-5 text-[color:var(--brand)]" />
              <h3 className="mt-3 text-base font-semibold text-ink">{c.t}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{c.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Smart CRM ---------------- */

function SmartCRM() {
  const points = [
    "Suggests follow-ups so customers don't wait unnecessarily.",
    "Highlights important customer activity as it happens.",
    "Helps organise contacts, notes and history in one place.",
    "Surfaces useful insights from work you're already doing.",
    "Makes information easier to find without leaving the screen you're on.",
    "Supports everyday work without changing how your team already operates.",
  ];
  return (
    <section className="py-16 md:py-24">
      <div className="container-page grid gap-12 md:grid-cols-12 md:items-center">
        <div className="md:col-span-6">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[color:var(--brand)]/10 px-3 py-1 text-xs font-semibold text-[color:var(--brand)]">
            <Sparkles className="h-3.5 w-3.5" /> Smart CRM
          </span>
          <h2 className="mt-4 text-2xl font-semibold tracking-tight text-ink md:text-4xl">
            A quieter layer of assistance, built into the CRM.
          </h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-ink-soft">
            Smart CRM works in the background of your normal workflow — offering
            useful suggestions and context without asking your team to change how they work.
          </p>
          <ul className="mt-6 space-y-2.5 text-sm text-ink md:text-base">
            {points.map((p) => (
              <li key={p} className="flex items-start gap-3">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-[color:var(--brand)]" strokeWidth={2.5} />
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="md:col-span-6">
          <div className="rounded-2xl border border-border bg-card p-5 shadow-card">
            <div className="flex items-center gap-2 border-b border-border pb-3">
              <span className="grid h-6 w-6 place-items-center rounded-md bg-[color:var(--brand)]/10 text-[color:var(--brand)]">
                <Sparkles className="h-3.5 w-3.5" />
              </span>
              <span className="text-sm font-semibold text-ink">Smart CRM</span>
              <span className="ml-auto text-[11px] text-muted-foreground">Assistance panel</span>
            </div>
            <ul className="mt-4 space-y-2">
              {[
                "Follow up with ABC Company — quote sent 4 days ago",
                "Invoice #7821 awaiting approval from finance",
                "Low inventory alert: SKU M-204 (12 units left)",
                "Meeting scheduled tomorrow with Vertex Group",
                "Quotation Q-411 awaiting response from client",
              ].map((s) => (
                <li key={s} className="flex items-start gap-3 rounded-lg border border-border bg-background p-3 text-sm text-ink">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--brand)]" />
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Industries ---------------- */

function Industries() {
  const list = [
    { icon: HardHat, t: "Construction", d: "Coordinate projects, subcontractors and site operations." },
    { icon: Factory, t: "Manufacturing", d: "Track production, inventory and orders on one plan." },
    { icon: Store, t: "Retail", d: "Unify stores, online orders and stock in real time." },
    { icon: Truck, t: "Trading", d: "Manage suppliers, purchasing and distribution from one place." },
    { icon: Stethoscope, t: "Healthcare", d: "Organise patients, appointments and clinic operations." },
    { icon: Briefcase, t: "Professional Services", d: "Deliver client work, timesheets and billing without friction." },
  ];
  return (
    <section className="border-y border-border bg-surface py-16 md:py-24">
      <div className="container-page">
        <SectionHeader eyebrow="Industries" title="Shaped to how each industry works." />
        {/* Horizontal scroll on mobile, grid on desktop */}
        <div className="mt-10 -mx-5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-2 md:mx-0 md:grid md:grid-cols-3 md:overflow-visible md:px-0">
          {list.map(({ icon: Icon, t, d }) => (
            <div key={t} className="snap-start shrink-0 basis-[85%] rounded-xl border border-border bg-card p-5 md:basis-auto">
              <span className="grid h-9 w-9 place-items-center rounded-md bg-[color:var(--brand)]/10 text-[color:var(--brand)]">
                <Icon className="h-4 w-4" />
              </span>
              <h3 className="mt-3 text-base font-semibold text-ink">{t}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Process ---------------- */

function Process() {
  const steps = [
    { icon: Search, t: "Discover", d: "Understand how the business runs today — teams, workflows and priorities." },
    { icon: Sliders, t: "Configure", d: "Tailor the solution around existing workflows, not the other way around." },
    { icon: Database, t: "Prepare", d: "Import data, connect systems and validate everything before go-live." },
    { icon: Rocket, t: "Launch", d: "Go live with confidence and a clear plan for the first weeks." },
    { icon: LifeBuoy, t: "Support", d: "Continue improving after implementation as the business changes." },
  ];
  return (
    <section className="py-16 md:py-24">
      <div className="container-page">
        <SectionHeader eyebrow="Implementation" title="A calm, five-step rollout." />
        <ol className="mt-12 grid gap-4 md:grid-cols-5">
          {steps.map((s, i) => (
            <li key={s.t} className="relative rounded-xl border border-border bg-card p-5">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[color:var(--brand)]">Step {String(i + 1).padStart(2, "0")}</span>
              <s.icon className="mt-3 h-5 w-5 text-ink" />
              <h3 className="mt-3 text-base font-semibold text-ink">{s.t}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{s.d}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ---------------- FAQ ---------------- */

function HomeFAQ() {
  return (
    <FAQ
      title="Common questions before scheduling a demo."
      items={[
        { q: "How long does implementation take?", a: "Most rollouts move from first conversation to a working system within a few weeks. Scope, data and integration needs shape the timeline." },
        { q: "Can it work with our existing processes?", a: "Yes. Discovery starts with your current workflows, and the system is configured around them rather than replacing them wholesale." },
        { q: "Can additional functionality be added later?", a: "Yes. Most companies start with a focused area and expand into other modules once teams are comfortable." },
        { q: "How much training is required?", a: "Minimal. Interfaces are kept familiar and short walkthroughs cover the day-to-day for each role." },
        { q: "What support is available after launch?", a: "Ongoing support is included — adjustments, guidance and improvements as the business changes." },
      ]}
    />
  );
}
