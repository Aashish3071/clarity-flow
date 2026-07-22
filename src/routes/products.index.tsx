import { createFileRoute, Link } from "@tanstack/react-router";
import { Users, Package, ShoppingCart, ArrowRight } from "lucide-react";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { PageHero } from "@/components/site/Section";
import { FinalCTA } from "@/components/site/FinalCTA";

export const Route = createFileRoute("/products/")({
  head: () => ({
    meta: [
      { title: "Products — CRM, ERP & E-commerce | Clearwork" },
      { name: "description", content: "Three connected products that share one system of record: CRM, ERP and E-commerce." },
      { property: "og:title", content: "Products — CRM, ERP & E-commerce" },
      { property: "og:description", content: "Choose CRM, ERP or E-commerce — or run them together on one connected platform." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ProductsIndex,
});

function ProductsIndex() {
  const items = [
    { icon: Users, title: "CRM", to: "/products/crm", body: "Leads, customers, quotations and long-term customer relationships in one place." },
    { icon: Package, title: "ERP", to: "/products/erp", body: "Inventory, purchasing, finance, operations and projects through one connected system." },
    { icon: ShoppingCart, title: "E-commerce", to: "/products/ecommerce", body: "Products, online orders, customers and inventory managed from one platform." },
  ];
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <PageHero
        eyebrow="Products"
        title="Choose a product. Or run them together on one platform."
        intro="Each product works on its own and shares the same records with the others. Start where the pressure is greatest and extend as the business is ready."
        secondaryLabel="Talk to us"
        secondaryTo="/contact"
      />
      <section className="py-16 md:py-24">
        <div className="container-page grid gap-6 md:grid-cols-3">
          {items.map((p) => (
            <Link key={p.title} to={p.to} className="group rounded-2xl border border-border bg-card p-7 shadow-soft transition hover:-translate-y-0.5 hover:shadow-card">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-[color:var(--brand)]/10 text-[color:var(--brand)]">
                <p.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-5 text-xl font-semibold text-ink">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{p.body}</p>
              <div className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-[color:var(--brand)]">
                Learn more <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
              </div>
            </Link>
          ))}
        </div>
      </section>
      <FinalCTA />
      <Footer />
    </div>
  );
}
