import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { format, addDays, isSameDay, isWeekend } from "date-fns";
import { Calendar } from "@/components/ui/calendar";

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
      <Credibility />
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
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur">
      <div className="container-page flex h-14 items-center justify-between md:h-16">
        <a href="#top" className="flex items-center gap-2 font-serif text-lg tracking-tight text-ink md:text-xl">
          <span className="inline-block h-2 w-2 rounded-full bg-ink" />
          Clearwork
        </a>
        <nav className="hidden items-center gap-8 text-sm text-ink-soft md:flex">
          <a href="#problem" className="hover:text-ink">Problem</a>
          <a href="#approach" className="hover:text-ink">Approach</a>
          <a href="#outcomes" className="hover:text-ink">Outcomes</a>
          <a href="#process" className="hover:text-ink">Process</a>
          <a href="#faq" className="hover:text-ink">FAQ</a>
        </nav>
        <a
          href="#consultation"
          className="rounded-full bg-primary px-3.5 py-2 text-xs font-medium text-primary-foreground transition hover:opacity-90 md:px-4 md:text-sm"
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
      <div className="container-page grid gap-12 pt-14 pb-20 md:grid-cols-12 md:gap-16 md:pt-32 md:pb-40">
        <div className="md:col-span-7">
          <p className="eyebrow mb-6 md:mb-8">For growing businesses</p>
          <h1 className="text-[2.25rem] leading-[1.08] md:text-[4.5rem] md:leading-[1.05]">
            Run your business with clarity,
            <span className="italic text-ink-soft"> not complexity.</span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-ink-soft md:mt-8 md:text-lg">
            When information is scattered across different tools, everyday work becomes slower,
            decisions take longer, and valuable opportunities are missed. Bringing everything
            together creates a smoother way to manage customers, operations, and growth.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3 md:mt-10">
            <a
              href="#consultation"
              className="rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground shadow-soft transition hover:opacity-90 md:px-6"
            >
              Book a Free Consultation
            </a>
            <a
              href="#approach"
              className="rounded-full border border-border bg-card px-5 py-3 text-sm font-medium text-ink transition hover:bg-secondary md:px-6"
            >
              See How It Works
            </a>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 text-xs text-ink-soft md:mt-14">
            <span className="font-mono">120+ implementations</span>
            <span className="hidden h-3 w-px bg-line md:block" />
            <span className="font-mono">Avg. 4-week rollout</span>
            <span className="hidden h-3 w-px bg-line md:block" />
            <span className="font-mono">Serving teams of 15–500</span>
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
          <line key={i} x1="50" y1="50" x2={n.x} y2={n.y} stroke="currentColor" strokeWidth="0.3" className="text-line" />
        ))}
        <circle cx="50" cy="50" r="6" className="fill-ink" />
        {nodes.map((n, i) => (
          <g key={i}>
            <circle cx={n.x} cy={n.y} r="3" className="fill-background stroke-ink" strokeWidth="0.6" />
            <text x={n.x} y={n.y - 5} textAnchor="middle" className="fill-ink-soft" style={{ fontSize: "3px", fontFamily: "Inter" }}>
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
    <section id="problem" className="py-20 md:py-40">
      <div className="container-page">
        <div className="max-w-3xl">
          <p className="eyebrow mb-5 md:mb-6">The hidden cost</p>
          <h2 className="text-[2rem] leading-[1.1] md:text-6xl">
            When work is spread across too many systems, it quietly gets more expensive.
          </h2>
        </div>

        <div className="mt-14 grid gap-x-12 gap-y-6 md:mt-20 md:grid-cols-2 md:gap-y-8">
          {items.map((t, i) => (
            <div key={i} className="flex items-start gap-4 border-t border-border pt-5 md:gap-5 md:pt-6">
              <span className="mt-1 font-mono text-xs text-muted-foreground">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="text-base text-ink md:text-lg">{t}</p>
            </div>
          ))}
        </div>

        <p className="mt-14 max-w-2xl font-serif text-2xl italic text-ink-soft md:mt-20 md:text-4xl">
          Small inefficiencies become expensive as a business grows.
        </p>
      </div>
    </section>
  );
}

/* ---------------- Better Way ---------------- */

function BetterWay() {
  const pillars = ["Customers", "Sales", "Projects", "Inventory", "Support", "Finance", "Approvals", "Reports"];
  return (
    <section id="approach" className="border-y border-border bg-surface py-20 md:py-40">
      <div className="container-page grid gap-12 md:grid-cols-12 md:gap-16">
        <div className="md:col-span-5">
          <p className="eyebrow mb-5 md:mb-6">A better way to work</p>
          <h2 className="text-[2rem] leading-[1.1] md:text-5xl">
            Everything the business runs on, working from one place.
          </h2>
          <p className="mt-6 max-w-md text-base leading-relaxed text-ink-soft md:mt-8 md:text-lg">
            The goal is not more software. The goal is making work easier — so people
            can act on information the moment it appears, without switching between tools.
          </p>
        </div>
        <div className="md:col-span-7">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {pillars.map((p) => (
              <div key={p} className="aspect-square rounded-2xl border border-border bg-card p-4 shadow-soft transition hover:-translate-y-1 md:p-5">
                <div className="flex h-full flex-col justify-between">
                  <span className="font-mono text-[10px] tracking-widest text-muted-foreground">///</span>
                  <span className="font-serif text-xl text-ink md:text-2xl">{p}</span>
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
    <section className="py-20 md:py-40">
      <div className="container-page">
        <div className="max-w-3xl">
          <p className="eyebrow mb-5 md:mb-6">Less repetition</p>
          <h2 className="text-[2rem] leading-[1.1] md:text-6xl">
            Less repetition. <span className="italic text-ink-soft">More progress.</span>
          </h2>
        </div>

        <div className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-border bg-border md:mt-20 md:grid-cols-3">
          {items.map((it) => (
            <div key={it.k} className="bg-card p-7 md:p-10">
              <p className="font-mono text-xs tracking-widest text-muted-foreground">{it.k.toUpperCase()}</p>
              <p className="mt-5 text-base leading-relaxed text-ink md:mt-6 md:text-lg">{it.v}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Built Around ---------------- */

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
    <section className="border-y border-border bg-surface py-20 md:py-40">
      <div className="container-page">
        <div className="max-w-3xl">
          <p className="eyebrow mb-5 md:mb-6">Built around your business</p>
          <h2 className="text-[2rem] leading-[1.1] md:text-5xl">
            Shaped to the way your business already works — not the other way around.
          </h2>
        </div>

        <div className="mt-14 grid gap-5 md:mt-20 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
          {cards.map((c, i) => (
            <div key={c.t} className="group rounded-3xl border border-border bg-card p-7 shadow-soft transition hover:shadow-card md:p-8">
              <div className="flex items-center justify-between">
                <h3 className="text-xl md:text-2xl">{c.t}</h3>
                <span className="font-mono text-xs text-muted-foreground">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <p className="mt-5 text-base leading-relaxed text-ink-soft md:mt-6">{c.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Credibility ---------------- */

function Credibility() {
  const outcomes = [
    { k: "Distribution, 80 staff", m: "62%", d: "reduction in time spent preparing weekly reports." },
    { k: "Professional services, 40 staff", m: "3.4×", d: "faster response to new client enquiries." },
    { k: "Manufacturing, 220 staff", m: "9 hrs", d: "returned to each manager every week." },
    { k: "Retail group, 120 staff", m: "1 view", d: "replacing seven spreadsheets across branches." },
  ];
  const stories = [
    {
      q: "We stopped asking each other for the latest numbers. They're already there in the morning.",
      w: "Operations Director",
      c: "Building materials group",
    },
    {
      q: "Onboarding a new coordinator used to take a month. Now they're contributing within a week.",
      w: "General Manager",
      c: "Logistics company",
    },
    {
      q: "Nothing revolutionary — just quieter. Fewer emails, fewer surprises, fewer late nights.",
      w: "Managing Partner",
      c: "Consulting firm",
    },
  ];
  return (
    <section id="outcomes" className="py-20 md:py-40">
      <div className="container-page">
        <div className="max-w-3xl">
          <p className="eyebrow mb-5 md:mb-6">Outcomes we see repeatedly</p>
          <h2 className="text-[2rem] leading-[1.1] md:text-5xl">
            Quiet, measurable change — not marketing claims.
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink-soft md:mt-8 md:text-lg">
            A selection of anonymised results and observations from businesses we've worked with.
            Names and identifying details are withheld by request.
          </p>
        </div>

        <div className="mt-12 grid gap-px overflow-hidden rounded-3xl border border-border bg-border md:mt-16 md:grid-cols-4">
          {outcomes.map((o) => (
            <div key={o.k} className="bg-card p-7 md:p-8">
              <p className="font-mono text-[10px] tracking-widest text-muted-foreground">{o.k.toUpperCase()}</p>
              <p className="mt-5 font-serif text-4xl text-ink md:text-5xl">{o.m}</p>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">{o.d}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 grid gap-5 md:mt-14 md:grid-cols-3 md:gap-6">
          {stories.map((s, i) => (
            <figure key={i} className="rounded-3xl border border-border bg-card p-7 shadow-soft md:p-8">
              <span className="font-serif text-4xl leading-none text-ink-soft">"</span>
              <blockquote className="mt-2 font-serif text-lg leading-snug text-ink md:text-xl">
                {s.q}
              </blockquote>
              <figcaption className="mt-6 border-t border-border pt-4 text-sm text-ink-soft">
                <span className="block text-ink">{s.w}</span>
                <span className="text-xs text-muted-foreground">{s.c}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Before / After ---------------- */

function BeforeAfter() {
  const before = ["Information everywhere", "Manual updates", "Repeated work", "Delayed responses", "Limited visibility"];
  const after = ["One reliable source of information", "Consistent processes", "Less administration", "Faster response times", "Clear business visibility"];
  return (
    <section className="border-t border-border py-20 md:py-40">
      <div className="container-page">
        <div className="max-w-2xl">
          <p className="eyebrow mb-5 md:mb-6">What changes</p>
          <h2 className="text-[2rem] leading-[1.1] md:text-5xl">
            The difference is felt in the everyday.
          </h2>
        </div>

        <div className="mt-12 grid gap-5 md:mt-16 md:grid-cols-2 md:gap-6">
          <div className="rounded-3xl border border-border bg-card p-8 md:p-10">
            <p className="eyebrow mb-6 md:mb-8">Before</p>
            <ul className="space-y-4 md:space-y-5">
              {before.map((b) => (
                <li key={b} className="flex items-start gap-4 text-base text-ink-soft md:text-lg">
                  <span className="mt-3 h-px w-6 shrink-0 bg-line" />
                  {b}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl border border-ink bg-ink p-8 text-primary-foreground md:p-10">
            <p className="eyebrow mb-6 md:mb-8" style={{ color: "oklch(0.75 0.01 85)" }}>After</p>
            <ul className="space-y-4 md:space-y-5">
              {after.map((b) => (
                <li key={b} className="flex items-start gap-4 text-base md:text-lg">
                  <span className="mt-3 h-px w-6 shrink-0 bg-primary-foreground/60" />
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
    <section id="process" className="border-y border-border bg-surface py-20 md:py-40">
      <div className="container-page">
        <div className="max-w-2xl">
          <p className="eyebrow mb-5 md:mb-6">What happens next</p>
          <h2 className="text-[2rem] leading-[1.1] md:text-5xl">A calm, considered process.</h2>
        </div>

        <div className="mt-14 grid gap-8 md:mt-20 md:grid-cols-4 md:gap-10">
          {steps.map((s, i) => (
            <div key={s.t} className="border-t border-border pt-5 md:pt-6">
              <p className="font-mono text-xs tracking-widest text-muted-foreground">
                Step {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-3 text-2xl md:mt-4 md:text-3xl">{s.t}</h3>
              <p className="mt-3 text-base leading-relaxed text-ink-soft md:mt-4">{s.d}</p>
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
    <section id="faq" className="py-20 md:py-40">
      <div className="container-page grid gap-10 md:grid-cols-12 md:gap-16">
        <div className="md:col-span-4">
          <p className="eyebrow mb-5 md:mb-6">FAQ</p>
          <h2 className="text-[2rem] leading-[1.1] md:text-5xl">Questions we hear often.</h2>
        </div>
        <div className="md:col-span-8">
          <div className="divide-y divide-border border-y border-border">
            {faqs.map((f, i) => {
              const isOpen = open === i;
              return (
                <button key={i} onClick={() => setOpen(isOpen ? null : i)} className="block w-full py-6 text-left md:py-7">
                  <div className="flex items-start justify-between gap-6 md:gap-8">
                    <span className="text-base text-ink md:text-lg">{f.q}</span>
                    <span className="mt-1 font-mono text-sm text-muted-foreground">{isOpen ? "−" : "+"}</span>
                  </div>
                  <div className="grid transition-all duration-300" style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}>
                    <div className="overflow-hidden">
                      <p className="pt-4 pr-6 text-sm leading-relaxed text-ink-soft md:pr-8 md:text-base">{f.a}</p>
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
    <section className="border-t border-border bg-ink py-20 text-primary-foreground md:py-40">
      <div className="container-page max-w-4xl">
        <h2 className="text-[2rem] leading-[1.08] text-primary-foreground md:text-6xl md:leading-[1.05]">
          Every growing business reaches a point where old ways of working start holding it back.
        </h2>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-primary-foreground/70 md:mt-8 md:text-lg">
          A short conversation is often enough to identify where time is being lost and what can
          be improved. Start with understanding the opportunities before making any decisions.
        </p>
        <a href="#consultation" className="mt-8 inline-flex rounded-full bg-background px-5 py-3 text-sm font-medium text-ink transition hover:opacity-90 md:mt-10 md:px-6">
          Schedule Your Consultation
        </a>
      </div>
    </section>
  );
}

/* ---------------- Lead Form + Scheduler ---------------- */

const leadSchema = z.object({
  name: z.string().trim().min(2, "Please enter your full name.").max(80, "Name is too long."),
  company: z.string().trim().min(2, "Please enter your company name.").max(120, "Company name is too long."),
  email: z.string().trim().email("Enter a valid business email address.").max(160),
  phone: z
    .string()
    .trim()
    .min(6, "Enter a valid phone number.")
    .max(24, "Phone number is too long.")
    .regex(/^[+()\d\s\-]+$/, "Only digits, spaces and + ( ) - are allowed."),
  country: z.string().min(1, "Select a country."),
  size: z.string().min(1, "Select a business size."),
  challenge: z.string().min(1, "Select an option."),
  message: z.string().trim().max(1000, "Please keep the message under 1000 characters.").optional().or(z.literal("")),
});

type LeadForm = z.infer<typeof leadSchema>;

function LeadForm() {
  const [step, setStep] = useState<"details" | "schedule" | "done">("details");
  const [details, setDetails] = useState<LeadForm | null>(null);
  const [slot, setSlot] = useState<{ date: Date; time: string } | null>(null);

  return (
    <section id="consultation" className="scroll-mt-20 py-20 md:py-40">
      <div className="container-page grid gap-10 md:grid-cols-12 md:gap-16">
        <div className="md:col-span-5">
          <p className="eyebrow mb-5 md:mb-6">Book a consultation</p>
          <h2 className="text-[2rem] leading-[1.1] md:text-5xl">
            A quiet 30 minutes. A clearer view of what's possible.
          </h2>
          <p className="mt-6 text-base leading-relaxed text-ink-soft md:mt-8">
            Share a little about your business, then choose a time that suits you.
            We'll come prepared with observations, not a pitch.
          </p>

          <ol className="mt-10 space-y-4 border-t border-border pt-6 text-sm text-ink-soft">
            <StepIndicator n={1} label="Your details" active={step === "details"} done={step !== "details"} />
            <StepIndicator n={2} label="Choose a time" active={step === "schedule"} done={step === "done"} />
            <StepIndicator n={3} label="Confirmation" active={step === "done"} done={false} />
          </ol>
        </div>

        <div className="md:col-span-7">
          {step === "details" && (
            <DetailsStep
              onSubmit={(v) => {
                setDetails(v);
                setStep("schedule");
              }}
            />
          )}
          {step === "schedule" && details && (
            <ScheduleStep
              onBack={() => setStep("details")}
              onConfirm={(s) => {
                setSlot(s);
                setStep("done");
              }}
            />
          )}
          {step === "done" && details && slot && <DoneStep details={details} slot={slot} />}
        </div>
      </div>
    </section>
  );
}

function StepIndicator({ n, label, active, done }: { n: number; label: string; active: boolean; done: boolean }) {
  return (
    <li className="flex items-center gap-4">
      <span
        className={`grid h-6 w-6 shrink-0 place-items-center rounded-full border font-mono text-[11px] ${
          done
            ? "border-ink bg-ink text-primary-foreground"
            : active
              ? "border-ink text-ink"
              : "border-border text-muted-foreground"
        }`}
      >
        {done ? "✓" : n}
      </span>
      <span className={active || done ? "text-ink" : ""}>{label}</span>
    </li>
  );
}

/* ---- Step 1: Details ---- */

function DetailsStep({ onSubmit }: { onSubmit: (v: LeadForm) => void }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid, touchedFields },
  } = useForm<LeadForm>({
    resolver: zodResolver(leadSchema),
    mode: "onBlur",
    reValidateMode: "onChange",
    defaultValues: {
      name: "",
      company: "",
      email: "",
      phone: "",
      country: "",
      size: "",
      challenge: "",
      message: "",
    },
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="rounded-3xl border border-border bg-card p-6 shadow-card md:p-10"
    >
      <div className="grid gap-4 md:grid-cols-2 md:gap-5">
        <Field label="Full name" error={errors.name?.message} touched={!!touchedFields.name}>
          <input
            {...register("name")}
            autoComplete="name"
            aria-invalid={!!errors.name}
            className={inputClass(!!errors.name)}
          />
        </Field>
        <Field label="Company name" error={errors.company?.message} touched={!!touchedFields.company}>
          <input
            {...register("company")}
            autoComplete="organization"
            aria-invalid={!!errors.company}
            className={inputClass(!!errors.company)}
          />
        </Field>
        <Field label="Business email" error={errors.email?.message} touched={!!touchedFields.email}>
          <input
            {...register("email")}
            type="email"
            inputMode="email"
            autoComplete="email"
            aria-invalid={!!errors.email}
            className={inputClass(!!errors.email)}
          />
        </Field>
        <Field label="Phone number" error={errors.phone?.message} touched={!!touchedFields.phone}>
          <input
            {...register("phone")}
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            aria-invalid={!!errors.phone}
            className={inputClass(!!errors.phone)}
          />
        </Field>
        <SelectField
          label="Country"
          error={errors.country?.message}
          register={register("country")}
          invalid={!!errors.country}
          options={["United Arab Emirates", "United States", "United Kingdom", "Canada", "Other"]}
        />
        <SelectField
          label="Business size"
          error={errors.size?.message}
          register={register("size")}
          invalid={!!errors.size}
          options={["1–10", "11–50", "51–200", "201–500", "500+"]}
        />
      </div>
      <div className="mt-4 md:mt-5">
        <SelectField
          label="Biggest operational challenge"
          error={errors.challenge?.message}
          register={register("challenge")}
          invalid={!!errors.challenge}
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
      <div className="mt-4 md:mt-5">
        <Field label="Message (optional)" error={errors.message?.message} touched={!!touchedFields.message}>
          <textarea
            {...register("message")}
            rows={4}
            className={inputClass(!!errors.message)}
            placeholder="A sentence or two about what you're hoping to improve."
          />
        </Field>
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-7 w-full rounded-full bg-primary px-6 py-4 text-sm font-medium text-primary-foreground transition hover:opacity-90 disabled:opacity-50 md:mt-8"
      >
        Continue to choose a time →
      </button>
      {!isValid && Object.keys(errors).length > 0 && (
        <p className="mt-3 text-center text-xs text-destructive">
          Please fix the highlighted fields above.
        </p>
      )}
    </form>
  );
}

function inputClass(invalid: boolean) {
  return [
    "mt-2 w-full rounded-xl border bg-background px-4 py-3 text-base text-ink outline-none transition",
    invalid ? "border-destructive focus:border-destructive" : "border-border focus:border-ink",
  ].join(" ");
}

function Field({
  label,
  error,
  touched,
  children,
}: {
  label: string;
  error?: string;
  touched?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="text-sm text-ink-soft">{label}</span>
      {children}
      {error && touched !== false && (
        <span className="mt-1.5 block text-xs text-destructive">{error}</span>
      )}
    </label>
  );
}

function SelectField({
  label,
  options,
  register,
  error,
  invalid,
}: {
  label: string;
  options: string[];
  register: ReturnType<ReturnType<typeof useForm<LeadForm>>["register"]>;
  error?: string;
  invalid: boolean;
}) {
  return (
    <label className="block">
      <span className="text-sm text-ink-soft">{label}</span>
      <select {...register} defaultValue="" aria-invalid={invalid} className={inputClass(invalid)}>
        <option value="" disabled>
          Select
        </option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
      {error && <span className="mt-1.5 block text-xs text-destructive">{error}</span>}
    </label>
  );
}

/* ---- Step 2: Schedule ---- */

function ScheduleStep({
  onBack,
  onConfirm,
}: {
  onBack: () => void;
  onConfirm: (s: { date: Date; time: string }) => void;
}) {
  const today = useMemo(() => new Date(), []);
  const [date, setDate] = useState<Date | undefined>(() => {
    let d = addDays(today, 1);
    while (isWeekend(d)) d = addDays(d, 1);
    return d;
  });
  const [time, setTime] = useState<string | null>(null);

  const times = useMemo(() => generateSlots(date), [date]);

  return (
    <div className="rounded-3xl border border-border bg-card p-6 shadow-card md:p-10">
      <div className="mb-6 flex items-center justify-between">
        <p className="eyebrow">Choose a time</p>
        <button onClick={onBack} className="text-xs text-ink-soft underline underline-offset-4 hover:text-ink">
          ← Edit details
        </button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 md:gap-8">
        <div className="rounded-2xl border border-border bg-background p-2">
          <Calendar
            mode="single"
            selected={date}
            onSelect={(d) => {
              setDate(d ?? undefined);
              setTime(null);
            }}
            disabled={(d) =>
              d < new Date(today.getFullYear(), today.getMonth(), today.getDate()) ||
              isWeekend(d) ||
              d > addDays(today, 45)
            }
            initialFocus
            className="pointer-events-auto"
          />
        </div>

        <div>
          <p className="text-sm text-ink-soft">
            {date ? format(date, "EEEE, d MMMM yyyy") : "Select a date"}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">All times shown in your local timezone.</p>

          <div className="mt-4 grid grid-cols-3 gap-2">
            {times.map((t) => {
              const active = time === t;
              return (
                <button
                  key={t}
                  onClick={() => setTime(t)}
                  className={`rounded-xl border px-3 py-3 text-sm transition ${
                    active
                      ? "border-ink bg-ink text-primary-foreground"
                      : "border-border bg-card text-ink hover:border-ink"
                  }`}
                >
                  {t}
                </button>
              );
            })}
          </div>

          <button
            disabled={!date || !time}
            onClick={() => date && time && onConfirm({ date, time })}
            className="mt-8 w-full rounded-full bg-primary px-6 py-4 text-sm font-medium text-primary-foreground transition hover:opacity-90 disabled:opacity-40"
          >
            {date && time ? `Confirm ${format(date, "d MMM")} · ${time}` : "Select a date and time"}
          </button>
        </div>
      </div>
    </div>
  );
}

function generateSlots(date?: Date): string[] {
  if (!date) return [];
  // Deterministic pseudo-availability by day so slots don't reshuffle on re-render
  const base = ["09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30"];
  const seed = date.getDate() + date.getMonth();
  return base.filter((_, i) => (i + seed) % 3 !== 0).slice(0, 9);
}

/* ---- Step 3: Done ---- */

function DoneStep({
  details,
  slot,
}: {
  details: LeadForm;
  slot: { date: Date; time: string };
}) {
  return (
    <div className="rounded-3xl border border-border bg-card p-8 shadow-card md:p-10">
      <p className="eyebrow">Confirmed</p>
      <h3 className="mt-4 font-serif text-3xl text-ink md:text-4xl">
        Your consultation is scheduled.
      </h3>
      <p className="mt-4 text-base leading-relaxed text-ink-soft">
        Thank you, {details.name.split(" ")[0]}. A calendar invitation and short preparation note
        are on their way to <span className="text-ink">{details.email}</span>.
      </p>

      <dl className="mt-8 grid gap-4 rounded-2xl border border-border bg-background p-6 text-sm md:grid-cols-2">
        <div>
          <dt className="font-mono text-[10px] tracking-widest text-muted-foreground">DATE</dt>
          <dd className="mt-1 text-ink">{format(slot.date, "EEEE, d MMMM yyyy")}</dd>
        </div>
        <div>
          <dt className="font-mono text-[10px] tracking-widest text-muted-foreground">TIME</dt>
          <dd className="mt-1 text-ink">{slot.time} (your local time) · 30 minutes</dd>
        </div>
        <div>
          <dt className="font-mono text-[10px] tracking-widest text-muted-foreground">COMPANY</dt>
          <dd className="mt-1 text-ink">{details.company}</dd>
        </div>
        <div>
          <dt className="font-mono text-[10px] tracking-widest text-muted-foreground">FOCUS</dt>
          <dd className="mt-1 text-ink">{details.challenge}</dd>
        </div>
      </dl>

      <p className="mt-6 text-xs text-muted-foreground">
        Need to reschedule? Reply to the confirmation email and we'll take care of it.
      </p>
    </div>
  );
}

/* ---------------- Footer ---------------- */

function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="container-page flex flex-col gap-6 py-10 md:flex-row md:items-center md:justify-between md:py-12">
        <div className="flex items-center gap-2 font-serif text-lg text-ink">
          <span className="inline-block h-2 w-2 rounded-full bg-ink" />
          Clearwork
        </div>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-ink-soft">
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
