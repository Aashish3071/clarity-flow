import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { PageHero } from "@/components/site/Section";
import { DemoForm } from "@/components/site/DemoForm";
import { Mail, Phone, MapPin } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Clearwork" },
      { name: "description", content: "Talk to us about CRM, ERP or E-commerce for your business. We reply within one business day." },
      { property: "og:title", content: "Contact Clearwork" },
      { property: "og:description", content: "Get in touch about CRM, ERP or E-commerce for your business." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Contact,
});

function Contact() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <PageHero
        eyebrow="Contact"
        title="Tell us what you're trying to improve."
        intro="Share a short summary and we'll come back with a clear next step — a call, a walkthrough or a written recommendation."
        primaryLabel="Schedule a Demo"
        primaryTo="/demo"
      />
      <section className="py-16 md:py-24">
        <div className="container-page grid gap-10 md:grid-cols-12">
          <div className="md:col-span-4">
            <h2 className="text-xl font-semibold text-ink">Reach us directly</h2>
            <ul className="mt-6 space-y-4 text-sm text-ink-soft">
              <li className="flex items-start gap-3"><Mail className="mt-0.5 h-4 w-4 text-[color:var(--brand)]" /> hello@clearwork.co</li>
              <li className="flex items-start gap-3"><Phone className="mt-0.5 h-4 w-4 text-[color:var(--brand)]" /> +971 4 000 0000</li>
              <li className="flex items-start gap-3"><MapPin className="mt-0.5 h-4 w-4 text-[color:var(--brand)]" /> Dubai · Riyadh · Remote</li>
            </ul>
            <p className="mt-8 text-sm text-ink-soft">
              We reply within one business day. For faster scheduling, use the demo booking page.
            </p>
          </div>
          <div className="md:col-span-8">
            <DemoForm />
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
