import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Users, Package, BarChart3, Wallet, Wrench, Headphones,
  ClipboardList, Bell, FileCheck2, Workflow, RefreshCw, Timer,
  Factory, ShoppingBag, Building2, Truck, Stethoscope, HardHat,
  Check, ArrowRight,
} from "lucide-react";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <Hero />
      <LogosBar />
      <Challenges />
      <Solution />
      <Manages />
      <Automation />
      <Industries />
      <Process />
      <Outcomes />
      <FAQ />
      <FinalCTA />
      <Footer />
    </div>
  );
}

/* ---------------- Nav ---------------- */

function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/90 backdrop-blur">
      <div className="container-page flex h-14 items-center justify-between md:h-16">
        <a href="#top" className="flex items-center gap-2 text-[15px] font-semibold tracking-tight text-ink">
          <span className="grid h-7 w-7 place-items-center rounded-md bg-[color:var(--brand)] text-white text-xs font-bold">C</span>
          Clearwork
        </a>
        <nav className="hidden items-center gap-7 text-sm text-ink-soft md:flex">
          <a href="#solution" className="hover:text-ink">Solution</a>
          <a href="#manages" className="hover:text-ink">What it manages</a>
          <a href="#industries" className="hover:text-ink">Industries</a>
          <a href="#process" className="hover:text-ink">Process</a>
          <a href="#faq" className="hover:text-ink">FAQ</a>
        </nav>
        <a
          href="#consultation"
          className="rounded-md bg-[color:var(--brand)] px-3.5 py-2 text-xs font-medium text-white transition hover:opacity-90 md:text-sm"
        >
          Book a consultation
        </a>
      </div>
    </header>
  );
}

/* ---------------- Hero (split with form) ---------------- */

function Hero() {
  return (
    <section id="top" className="relative overflow-hidden border-b border-border bg-gradient-to-b from-[color:var(--brand-soft)]/60 to-background">
      <div className="container-page grid gap-10 pt-12 pb-16 md:grid-cols-12 md:gap-12 md:pt-20 md:pb-24">
        {/* Left: pitch */}
        <div className="md:col-span-7 md:pr-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-ink-soft">
            <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--brand)]" />
            CRM & ERP implementation
          </span>
          <h1 className="mt-5 text-[2.1rem] font-semibold leading-[1.1] tracking-tight text-ink md:text-[3.4rem] md:leading-[1.05]">
            One system to run your sales, operations, and finance.
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-ink-soft md:text-lg">
            We design and implement CRM and ERP systems tailored to how your business
            actually works — so your team spends less time on admin and more time moving forward.
          </p>

          <ul className="mt-6 space-y-3">
            {[
              "Custom CRM for leads, customers, and sales pipeline",
              "ERP for inventory, purchasing, finance, and operations",
              "Automation for approvals, reports, and reminders",
              "Rolled out in weeks, not months",
            ].map((t) => (
              <li key={t} className="flex items-start gap-3 text-sm text-ink md:text-base">
                <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[color:var(--brand)]/10 text-[color:var(--brand)]">
                  <Check className="h-3 w-3" strokeWidth={3} />
                </span>
                {t}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a href="#consultation" className="inline-flex items-center gap-2 rounded-md bg-[color:var(--brand)] px-5 py-3 text-sm font-medium text-white shadow-soft transition hover:opacity-90">
              Book a Free Consultation <ArrowRight className="h-4 w-4" />
            </a>
            <a href="#manages" className="rounded-md border border-border bg-card px-5 py-3 text-sm font-medium text-ink transition hover:bg-secondary">
              See what it manages
            </a>
          </div>
        </div>

        {/* Right: form */}
        <div className="md:col-span-5">
          <ConsultationForm />
        </div>
      </div>
    </section>
  );
}

/* ---------------- Consultation Form ---------------- */

const leadSchema = z.object({
  name: z.string().trim().min(2, "Please enter your full name."),
  company: z.string().trim().min(2, "Please enter your company name."),
  email: z.string().trim().email("Enter a valid business email."),
  phone: z.string().trim().min(6, "Enter a valid phone number.").regex(/^[+()\d\s\-]+$/, "Digits, spaces and + ( ) - only."),
  country: z.string().min(1, "Select a country."),
  improve: z.string().min(1, "Select an option."),
  message: z.string().trim().max(1000).optional().or(z.literal("")),
});
type LeadForm = z.infer<typeof leadSchema>;

function ConsultationForm() {
  const [submitted, setSubmitted] = useState(false);
  const [firstName, setFirstName] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, touchedFields },
  } = useForm<LeadForm>({
    resolver: zodResolver(leadSchema),
    mode: "onBlur",
    reValidateMode: "onChange",
    defaultValues: {
      name: "", company: "", email: "", phone: "",
      country: "", improve: "", message: "",
    },
  });

  const onSubmit = (v: LeadForm) => {
    setFirstName(v.name.split(" ")[0]);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div id="consultation" className="rounded-2xl border border-border bg-card p-8 shadow-card">
        <div className="grid h-10 w-10 place-items-center rounded-full bg-[color:var(--brand)]/10 text-[color:var(--brand)]">
          <Check className="h-5 w-5" strokeWidth={3} />
        </div>
        <h3 className="mt-4 text-xl font-semibold text-ink">Thank you, {firstName}.</h3>
        <p className="mt-2 text-sm text-ink-soft">
          We've received your request. A specialist will reach out within one business day to
          schedule your 30-minute consultation.
        </p>
      </div>
    );
  }

  return (
    <form
      id="consultation"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="scroll-mt-20 rounded-2xl border border-border bg-card p-6 shadow-card md:p-7"
    >
      <div className="mb-5">
        <h3 className="text-lg font-semibold text-ink">Book a Free Consultation</h3>
        <p className="mt-1 text-sm text-ink-soft">30 minutes. No obligation.</p>
      </div>

      <div className="grid gap-3.5">
        <Field label="Full name" error={errors.name?.message} touched={!!touchedFields.name}>
          <input {...register("name")} autoComplete="name" className={inp(!!errors.name)} />
        </Field>
        <Field label="Company" error={errors.company?.message} touched={!!touchedFields.company}>
          <input {...register("company")} autoComplete="organization" className={inp(!!errors.company)} />
        </Field>
        <div className="grid gap-3.5 sm:grid-cols-2">
          <Field label="Business email" error={errors.email?.message} touched={!!touchedFields.email}>
            <input {...register("email")} type="email" autoComplete="email" className={inp(!!errors.email)} />
          </Field>
          <Field label="Phone number" error={errors.phone?.message} touched={!!touchedFields.phone}>
            <input {...register("phone")} type="tel" autoComplete="tel" className={inp(!!errors.phone)} />
          </Field>
        </div>
        <div className="grid gap-3.5 sm:grid-cols-2">
          <Field label="Country" error={errors.country?.message}>
            <select {...register("country")} defaultValue="" className={inp(!!errors.country)}>
              <option value="" disabled>Select</option>
              {["United Arab Emirates","Saudi Arabia","United States","United Kingdom","Canada","India","Australia","Other"].map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </Field>
          <Field label="What would you like to improve?" error={errors.improve?.message}>
            <select {...register("improve")} defaultValue="" className={inp(!!errors.improve)}>
              <option value="" disabled>Select</option>
              {["Sales & CRM","Inventory & Purchasing","Finance & Invoicing","Projects & Operations","Reporting & Visibility","Something else"].map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </Field>
        </div>
        <Field label="Message" error={errors.message?.message} touched={!!touchedFields.message}>
          <textarea {...register("message")} rows={3} className={inp(!!errors.message)} placeholder="A sentence or two about what you'd like to improve." />
        </Field>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-5 w-full rounded-md bg-[color:var(--brand)] px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-50"
      >
        Book a Free Consultation
      </button>

      <ul className="mt-4 grid grid-cols-2 gap-x-3 gap-y-1.5 text-[11px] text-ink-soft">
        {["No obligation","30-minute consultation","Practical recommendations","No sales pressure"].map(t => (
          <li key={t} className="flex items-center gap-1.5">
            <Check className="h-3 w-3 text-[color:var(--brand)]" strokeWidth={3} /> {t}
          </li>
        ))}
      </ul>
    </form>
  );
}

function inp(invalid: boolean) {
  return [
    "mt-1.5 w-full rounded-md border bg-background px-3 py-2.5 text-sm text-ink outline-none transition focus:ring-2 focus:ring-[color:var(--brand)]/20",
    invalid ? "border-destructive focus:border-destructive" : "border-border focus:border-[color:var(--brand)]",
  ].join(" ");
}

function Field({ label, error, touched, children }: { label: string; error?: string; touched?: boolean; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-xs font-medium text-ink">{label}</span>
      {children}
      {error && touched !== false && <span className="mt-1 block text-[11px] text-destructive">{error}</span>}
    </label>
  );
}

/* ---------------- Logos Bar ---------------- */

function LogosBar() {
  return (
    <section className="border-b border-border bg-surface py-6">
      <div className="container-page">
        <p className="text-center text-xs font-medium uppercase tracking-widest text-muted-foreground">
          Trusted by teams across distribution, manufacturing, services & retail
        </p>
        <div className="mt-4 grid grid-cols-2 gap-4 opacity-70 sm:grid-cols-3 md:grid-cols-6">
          {["NORTHWIND","MERIDIAN","ATLAS CO.","VERTEX","KESTREL","PARAGON"].map(n => (
            <div key={n} className="text-center text-sm font-semibold tracking-wider text-ink-soft">{n}</div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Challenges ---------------- */

function Challenges() {
  const items = [
    { t: "Scattered information", d: "Customer, order, and finance data live in different tools that don't talk to each other." },
    { t: "Repeated manual work", d: "Teams re-enter the same details across spreadsheets, emails, and folders." },
    { t: "Slow approvals", d: "Requests wait in inboxes. Decisions stall. Delivery slips." },
    { t: "Missed follow-ups", d: "Leads and customer requests fall through the cracks between systems." },
    { t: "Unclear reporting", d: "Pulling numbers takes hours. Managers make decisions with stale data." },
    { t: "Growth becomes harder", d: "Onboarding new staff, branches, or products creates more chaos, not less." },
  ];
  return (
    <section className="py-20 md:py-28">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">The problem</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-ink md:text-4xl">
            Growing businesses outgrow their tools.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink-soft">
            The same signs appear again and again — different industries, same underlying issue.
          </p>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {items.map((it) => (
            <div key={it.t} className="rounded-xl border border-border bg-card p-5 shadow-soft">
              <h3 className="text-base font-semibold text-ink">{it.t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{it.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Solution ---------------- */

function Solution() {
  return (
    <section id="solution" className="border-y border-border bg-surface py-20 md:py-28">
      <div className="container-page grid gap-12 md:grid-cols-12 md:items-center">
        <div className="md:col-span-6">
          <p className="eyebrow">The solution</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-ink md:text-4xl">
            A CRM and ERP system, tailored to your business.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-ink-soft md:text-lg">
            Instead of forcing your team into generic software, we implement a
            single connected system — shaped to how your business already works.
          </p>
          <ul className="mt-6 space-y-3 text-sm text-ink md:text-base">
            {[
              "One place for customers, sales, operations, and finance",
              "Configured to match your existing process, not the other way around",
              "Clean interfaces your team will actually use",
              "Room to grow — add functions as priorities change",
            ].map(t => (
              <li key={t} className="flex items-start gap-3">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-[color:var(--brand)]" strokeWidth={2.5} />
                {t}
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-6">
          <DashboardMock />
        </div>
      </div>
    </section>
  );
}

function DashboardMock() {
  return (
    <div className="rounded-2xl border border-border bg-card p-4 shadow-card md:p-5">
      <div className="flex items-center gap-1.5 border-b border-border pb-3">
        <span className="h-2.5 w-2.5 rounded-full bg-destructive/40" />
        <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/60" />
        <span className="h-2.5 w-2.5 rounded-full bg-green-500/50" />
        <span className="ml-3 text-xs text-muted-foreground">app.yourbusiness.com/dashboard</span>
      </div>
      <div className="grid grid-cols-3 gap-3 pt-4">
        {[
          { l: "Open leads", v: "142", c: "+12%" },
          { l: "Orders today", v: "38", c: "+4%" },
          { l: "Revenue MTD", v: "$284K", c: "+9%" },
        ].map(k => (
          <div key={k.l} className="rounded-lg border border-border bg-background p-3">
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{k.l}</p>
            <p className="mt-1 text-lg font-semibold text-ink">{k.v}</p>
            <p className="text-[10px] font-medium text-[color:var(--brand)]">{k.c}</p>
          </div>
        ))}
      </div>
      <div className="mt-3 rounded-lg border border-border bg-background p-3">
        <div className="flex items-center justify-between">
          <p className="text-xs font-semibold text-ink">Sales Pipeline</p>
          <p className="text-[10px] text-muted-foreground">This month</p>
        </div>
        <div className="mt-3 flex items-end gap-1.5">
          {[40, 65, 50, 80, 55, 90, 70, 100, 85, 60, 95, 78].map((h, i) => (
            <div key={i} className="flex-1 rounded-t bg-[color:var(--brand)]/70" style={{ height: `${h * 0.6}px` }} />
          ))}
        </div>
      </div>
      <div className="mt-3 grid grid-cols-2 gap-3">
        <div className="rounded-lg border border-border bg-background p-3">
          <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Recent activity</p>
          <ul className="mt-2 space-y-1.5 text-[11px] text-ink-soft">
            <li>• Quote #4821 approved</li>
            <li>• PO #2210 received</li>
            <li>• Invoice #7734 paid</li>
          </ul>
        </div>
        <div className="rounded-lg border border-border bg-background p-3">
          <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Approvals</p>
          <ul className="mt-2 space-y-1.5 text-[11px] text-ink-soft">
            <li>• Expense report — Ops</li>
            <li>• Discount request — Sales</li>
            <li>• Vendor onboarding</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

/* ---------------- What it manages ---------------- */

function Manages() {
  const groups = [
    {
      icon: Users,
      title: "CRM",
      subtitle: "Sales & customers",
      items: ["Leads", "Customers", "Quotations", "Sales Pipeline", "Follow-ups", "Contact history"],
    },
    {
      icon: Package,
      title: "ERP",
      subtitle: "Operations & finance",
      items: ["Inventory", "Purchasing", "Projects", "Finance", "Operations", "Customer Support"],
    },
    {
      icon: Workflow,
      title: "Automation",
      subtitle: "Repetitive work, handled",
      items: ["Approvals", "Notifications", "Reports", "Reminders", "Workflows", "Data sync"],
    },
  ];
  return (
    <section id="manages" className="py-20 md:py-28">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">What it manages</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-ink md:text-4xl">
            Everything your business runs on — in one place.
          </h2>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {groups.map((g) => {
            const Icon = g.icon;
            return (
              <div key={g.title} className="rounded-2xl border border-border bg-card p-6 shadow-soft">
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-lg bg-[color:var(--brand)]/10 text-[color:var(--brand)]">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="text-base font-semibold text-ink">{g.title}</h3>
                    <p className="text-xs text-ink-soft">{g.subtitle}</p>
                  </div>
                </div>
                <ul className="mt-5 grid grid-cols-2 gap-2">
                  {g.items.map((it) => (
                    <li key={it} className="flex items-center gap-2 rounded-md bg-secondary px-2.5 py-2 text-xs font-medium text-ink">
                      <span className="h-1 w-1 rounded-full bg-[color:var(--brand)]" />
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Automation benefits ---------------- */

function Automation() {
  const cards = [
    { icon: Timer, t: "Hours back every week", d: "Repetitive tasks stop consuming your team's time." },
    { icon: FileCheck2, t: "Faster approvals", d: "Requests move automatically to the right person." },
    { icon: Bell, t: "Nothing forgotten", d: "Reminders and notifications trigger on schedule." },
    { icon: BarChart3, t: "Reports ready on time", d: "Numbers are prepared automatically — no manual pulling." },
    { icon: RefreshCw, t: "Consistent data", d: "One update reflects everywhere it needs to." },
    { icon: ClipboardList, t: "Clear accountability", d: "Every task and request has an owner and a status." },
  ];
  return (
    <section className="border-y border-border bg-surface py-20 md:py-28">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">Automation</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-ink md:text-4xl">
            Let the system handle the repetitive work.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink-soft">
            Automation isn't about replacing people — it's about removing the busywork so they can focus on decisions.
          </p>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {cards.map((c) => {
            const Icon = c.icon;
            return (
              <div key={c.t} className="rounded-xl border border-border bg-card p-5">
                <Icon className="h-5 w-5 text-[color:var(--brand)]" />
                <h3 className="mt-3 text-base font-semibold text-ink">{c.t}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{c.d}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Industries ---------------- */

function Industries() {
  const list = [
    { icon: Factory, t: "Manufacturing" },
    { icon: Truck, t: "Distribution & Logistics" },
    { icon: ShoppingBag, t: "Retail & E-commerce" },
    { icon: Building2, t: "Professional Services" },
    { icon: HardHat, t: "Construction & Contracting" },
    { icon: Stethoscope, t: "Healthcare & Clinics" },
    { icon: Wrench, t: "Field Services" },
    { icon: Wallet, t: "Trading & Wholesale" },
  ];
  return (
    <section id="industries" className="py-20 md:py-28">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">Industries we serve</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-ink md:text-4xl">
            Built for operational businesses.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink-soft">
            We work with growing companies that have real operations to run.
          </p>
        </div>

        <div className="mt-12 grid gap-3 sm:grid-cols-2 md:grid-cols-4">
          {list.map(({ icon: Icon, t }) => (
            <div key={t} className="flex items-center gap-3 rounded-xl border border-border bg-card p-4">
              <span className="grid h-9 w-9 place-items-center rounded-md bg-[color:var(--brand)]/10 text-[color:var(--brand)]">
                <Icon className="h-4.5 w-4.5" />
              </span>
              <span className="text-sm font-medium text-ink">{t}</span>
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
    { n: "01", t: "Understand", d: "We learn how your business runs today — the people, the process, the pain points." },
    { n: "02", t: "Design", d: "A clear plan for your CRM and ERP setup, sized to what actually matters first." },
    { n: "03", t: "Implement", d: "We configure, migrate data, and roll out — with minimum disruption to your team." },
    { n: "04", t: "Support", d: "Training, adjustments, and ongoing improvements as your business grows." },
  ];
  return (
    <section id="process" className="border-y border-border bg-surface py-20 md:py-28">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">How we work</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-ink md:text-4xl">
            A straightforward, four-step implementation.
          </h2>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-4">
          {steps.map((s) => (
            <div key={s.n} className="relative rounded-xl border border-border bg-card p-5">
              <span className="text-xs font-semibold text-[color:var(--brand)]">STEP {s.n}</span>
              <h3 className="mt-2 text-lg font-semibold text-ink">{s.t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{s.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Outcomes / Credibility ---------------- */

function Outcomes() {
  const metrics = [
    { m: "62%", d: "less time preparing weekly reports" },
    { m: "3.4×", d: "faster response to new enquiries" },
    { m: "9 hrs", d: "returned to each manager, weekly" },
    { m: "1 view", d: "replacing seven spreadsheets" },
  ];
  const quotes = [
    { q: "We stopped asking each other for the latest numbers. They're already there in the morning.", w: "Operations Director", c: "Building materials group" },
    { q: "Onboarding a new coordinator used to take a month. Now they contribute within a week.", w: "General Manager", c: "Logistics company" },
    { q: "Fewer emails, fewer surprises, fewer late nights. That's the change we wanted.", w: "Managing Partner", c: "Professional services firm" },
  ];
  return (
    <section className="py-20 md:py-28">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">Real outcomes</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-ink md:text-4xl">
            Measured change, from businesses like yours.
          </h2>
          <p className="mt-4 text-sm text-ink-soft">Anonymised at client request.</p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-4">
          {metrics.map((k) => (
            <div key={k.m} className="rounded-xl border border-border bg-card p-6 text-center">
              <p className="text-3xl font-semibold text-ink md:text-4xl">{k.m}</p>
              <p className="mt-2 text-sm text-ink-soft">{k.d}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {quotes.map((s, i) => (
            <figure key={i} className="rounded-xl border border-border bg-card p-6">
              <blockquote className="text-sm leading-relaxed text-ink">"{s.q}"</blockquote>
              <figcaption className="mt-4 border-t border-border pt-3 text-xs text-ink-soft">
                <span className="block font-medium text-ink">{s.w}</span>
                {s.c}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- FAQ ---------------- */

function FAQ() {
  const faqs = [
    { q: "What exactly do you deliver?", a: "A CRM and ERP system, configured for your business. That includes design, setup, data migration, training, and ongoing support." },
    { q: "How long does implementation take?", a: "Most rollouts move from first conversation to a working system within a few weeks, depending on scope." },
    { q: "Do we have to change how we work?", a: "No. We start by understanding your current process and shape the system around it — not the other way around." },
    { q: "Can we start small and expand later?", a: "Yes. Many clients begin with sales or inventory and add finance, projects, or support as they're ready." },
    { q: "How much training will our team need?", a: "Minimal. The interfaces are kept familiar and we provide short walkthroughs for day-to-day use." },
    { q: "What happens after launch?", a: "Ongoing support is included — adjustments, guidance, and improvements as your business changes." },
  ];
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="border-y border-border bg-surface py-20 md:py-28">
      <div className="container-page grid gap-10 md:grid-cols-12">
        <div className="md:col-span-4">
          <p className="eyebrow">FAQ</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-ink md:text-4xl">
            Questions we hear often.
          </h2>
          <p className="mt-4 text-sm text-ink-soft">
            Something else on your mind?{" "}
            <a href="#consultation" className="text-[color:var(--brand)] underline underline-offset-4">Ask us directly</a>.
          </p>
        </div>
        <div className="md:col-span-8">
          <div className="divide-y divide-border overflow-hidden rounded-xl border border-border bg-card">
            {faqs.map((f, i) => {
              const isOpen = open === i;
              return (
                <button key={i} onClick={() => setOpen(isOpen ? null : i)} className="block w-full px-5 py-5 text-left transition hover:bg-secondary md:px-6">
                  <div className="flex items-start justify-between gap-6">
                    <span className="text-sm font-semibold text-ink md:text-base">{f.q}</span>
                    <span className="mt-0.5 text-sm text-[color:var(--brand)]">{isOpen ? "−" : "+"}</span>
                  </div>
                  <div className="grid transition-all duration-300" style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}>
                    <div className="overflow-hidden">
                      <p className="pt-3 pr-6 text-sm leading-relaxed text-ink-soft">{f.a}</p>
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
    <section className="bg-ink py-20 text-primary-foreground md:py-28">
      <div className="container-page grid gap-10 md:grid-cols-12 md:items-center">
        <div className="md:col-span-7">
          <h2 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">
            See what a tailored CRM and ERP could look like for your business.
          </h2>
          <p className="mt-4 max-w-xl text-base text-white/70">
            Book a free 30-minute consultation. We'll review your current setup and share
            practical recommendations — no obligation, no sales pressure.
          </p>
          <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/80">
            {["No obligation","30-minute consultation","Practical recommendations"].map(t => (
              <li key={t} className="flex items-center gap-2"><Check className="h-4 w-4 text-white" strokeWidth={3} /> {t}</li>
            ))}
          </ul>
        </div>
        <div className="md:col-span-5">
          <a href="#consultation" className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-white px-6 py-4 text-sm font-semibold text-ink transition hover:opacity-90">
            Book a Free Consultation <ArrowRight className="h-4 w-4" />
          </a>
          <p className="mt-3 text-center text-xs text-white/60">Response within one business day.</p>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Footer ---------------- */

function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="container-page flex flex-col gap-6 py-10 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-2 text-sm font-semibold text-ink">
          <span className="grid h-7 w-7 place-items-center rounded-md bg-[color:var(--brand)] text-white text-xs font-bold">C</span>
          Clearwork
        </div>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-ink-soft">
          <a href="#solution" className="hover:text-ink">Solution</a>
          <a href="#manages" className="hover:text-ink">What it manages</a>
          <a href="#industries" className="hover:text-ink">Industries</a>
          <a href="#consultation" className="hover:text-ink">Book consultation</a>
          <a href="mailto:hello@clearwork.co" className="hover:text-ink">hello@clearwork.co</a>
        </div>
        <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} Clearwork</p>
      </div>
    </footer>
  );
}
