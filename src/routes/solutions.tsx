import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { PageHero, SectionHeader, IconCard } from "@/components/site/Section";
import { FinalCTA } from "@/components/site/FinalCTA";
import {
  HardHat, Factory, Store, Truck, Stethoscope, Briefcase,
} from "lucide-react";

export const Route = createFileRoute("/solutions")({
  head: () => ({
    meta: [
      { title: "Solutions by industry | Clearwork" },
      { name: "description", content: "How CRM, ERP and E-commerce come together for construction, manufacturing, retail, trading, healthcare and professional services." },
      { property: "og:title", content: "Solutions by industry" },
      { property: "og:description", content: "Tailored CRM, ERP and E-commerce for the industries we serve." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SolutionsPage,
});

function SolutionsPage() {
  const list = [
    { icon: HardHat, t: "Construction", d: "Coordinate projects, subcontractors, procurement and site operations from one place." },
    { icon: Factory, t: "Manufacturing", d: "Align production, purchasing and inventory to real customer demand." },
    { icon: Store, t: "Retail", d: "Unify stores, online orders and stock so customers get a consistent experience." },
    { icon: Truck, t: "Trading", d: "Manage suppliers, purchasing and distribution across branches and warehouses." },
    { icon: Stethoscope, t: "Healthcare", d: "Organise patients, appointments and clinic operations on a single record." },
    { icon: Briefcase, t: "Professional Services", d: "Deliver client work, timesheets and billing without spreadsheets in between." },
  ];
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <PageHero
        eyebrow="Solutions"
        title="Configured for the way each industry runs."
        intro="The same three products — CRM, ERP and E-commerce — arranged differently for each industry so the system matches how the business already operates."
        secondaryLabel="Explore products"
        secondaryTo="/products"
      />
      <section className="py-16 md:py-24">
        <div className="container-page">
          <SectionHeader eyebrow="By industry" title="Where we're most useful." />
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {list.map((i) => (
              <IconCard key={i.t} icon={i.icon} title={i.t} text={i.d} />
            ))}
          </div>
        </div>
      </section>
      <FinalCTA />
      <Footer />
    </div>
  );
}
