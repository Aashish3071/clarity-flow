import { createFileRoute } from "@tanstack/react-router";
import { ProductPage } from "@/components/site/ProductPage";
import {
  ShoppingBag, Tag, Truck, CreditCard, Users, Package,
  Store, Globe,
} from "lucide-react";

export const Route = createFileRoute("/products/ecommerce")({
  head: () => ({
    meta: [
      { title: "E-commerce — Sell online with inventory connected | Clearwork" },
      { name: "description", content: "Manage products, customers, online orders and inventory from one connected platform." },
      { property: "og:title", content: "E-commerce — Online store with inventory connected" },
      { property: "og:description", content: "Products, customers, orders and inventory on one connected platform." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => (
    <ProductPage
      eyebrow="E-commerce"
      title="Sell online with orders and inventory always in sync."
      intro="An online store that shares the same catalog, stock and customer records as the rest of the business — so online sales don't create parallel work."
      overview="The E-commerce platform manages your product catalog, customers, online orders and inventory on the same system as CRM and ERP. Stock levels update automatically as orders come in, customer records grow with each purchase, and finance sees the same numbers the store shows."
      problems={[
        { icon: Package, t: "Online and in-store out of sync", d: "One shared inventory keeps stock accurate across every sales channel." },
        { icon: Users, t: "Split customer records", d: "Online buyers appear in the same CRM as offline customers — one profile, one history." },
        { icon: CreditCard, t: "Manual order handling", d: "Orders flow from checkout to fulfilment and invoicing without re-keying." },
      ]}
      capabilities={[
        { title: "Storefront", items: ["Product catalog", "Categories and search", "Promotions and discounts", "Multi-currency pricing"] },
        { title: "Orders & fulfilment", items: ["Order management", "Shipping options", "Returns and refunds", "Order status updates"] },
        { title: "Customers & payments", items: ["Customer accounts", "Address book", "Payment processing", "Guest checkout"] },
      ]}
      benefits={[
        { icon: ShoppingBag, t: "One catalog, every channel", d: "Product information is authored once and used everywhere it's needed." },
        { icon: Truck, t: "Faster order-to-delivery", d: "Fulfilment and invoicing happen on the same system as the sale." },
        { icon: Tag, t: "Cleaner reporting", d: "Online and offline revenue land in the same reports, without merging spreadsheets." },
      ]}
      industries={["Retail", "Trading", "Manufacturing (D2C)", "Professional Services (bookings)", "Healthcare (parapharmacy)"]}
      faqs={[
        { q: "Can we run online sales alongside physical stores?", a: "Yes. Store and online orders share inventory and customer records, so operations stay coordinated." },
        { q: "Does it connect to shipping and payments?", a: "Common shipping and payment providers are supported through the platform." },
        { q: "Can we start with only E-commerce?", a: "Yes. E-commerce can run on its own and later share records with CRM and ERP as those modules are adopted." },
        { q: "Can we manage promotions and discounts?", a: "Yes. Time-based promotions, discount codes and pricing rules are supported." },
      ]}
    />
  ),
});

void Store; void Globe;
