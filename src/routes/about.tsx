import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { PageHero, SectionHeader } from "@/components/site/Section";
import { FinalCTA } from "@/components/site/FinalCTA";
import { Check } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Clearwork" },
      { name: "description", content: "We help growing businesses simplify operations with CRM, ERP and E-commerce — tailored, deployed and supported." },
      { property: "og:title", content: "About Clearwork" },
      { property: "og:description", content: "A software team that designs, implements and supports business systems for growing companies." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: About,
});

function About() {
  const values = [
    "Fit the system to the business, not the business to the system.",
    "Clarity over cleverness in every screen and every conversation.",
    "Deploy quickly, then improve steadily with the team using it.",
    "Stay responsive after launch — the work doesn't end at go-live.",
  ];
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <PageHero
        eyebrow="About"
        title="A small software team focused on business operations."
        intro="We work with growing companies to design, implement and support the systems that run their day-to-day — CRM, ERP and E-commerce. The work is practical, calm and measured against outcomes the business can feel."
        secondaryLabel="Talk to us"
        secondaryTo="/contact"
      />
      <section className="py-16 md:py-24">
        <div className="container-page grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <SectionHeader eyebrow="How we work" title="A few principles we hold to." />
          </div>
          <div className="md:col-span-7">
            <ul className="space-y-4">
              {values.map((v) => (
                <li key={v} className="flex items-start gap-3 rounded-xl border border-border bg-card p-5">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-[color:var(--brand)]" strokeWidth={2.5} />
                  <span className="text-sm text-ink md:text-base">{v}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      <FinalCTA />
      <Footer />
    </div>
  );
}
