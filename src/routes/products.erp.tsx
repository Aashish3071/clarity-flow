import { createFileRoute } from "@tanstack/react-router";
import { ProductPage } from "@/components/site/ProductPage";
import {
  Boxes, ClipboardList, Wallet, Truck, FileText, BarChart3,
  Layers, RefreshCw, ShieldCheck,
} from "lucide-react";

export const Route = createFileRoute("/products/erp")({
  head: () => ({
    meta: [
      { title: "ERP — Run inventory, finance and operations on one system | Clearwork" },
      { name: "description", content: "Manage inventory, purchasing, finance, operations and projects through one connected ERP." },
      { property: "og:title", content: "ERP — Inventory, finance and operations on one system" },
      { property: "og:description", content: "One connected ERP for inventory, purchasing, finance, operations and projects." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => (
    <ProductPage
      eyebrow="ERP"
      title="Run operations, inventory and finance on one connected system."
      intro="One ERP that ties the moving parts of the business together — so purchasing, stock, projects and finance stop working from different numbers."
      overview="The ERP connects inventory, purchasing, projects, operations and finance into a single system of record. Instead of stitching updates across teams and spreadsheets, one action flows through to every module that needs it — from a purchase order arriving in the warehouse to the matching invoice reaching finance."
      problems={[
        { icon: RefreshCw, t: "Duplicate data entry", d: "Numbers stop being retyped between operations, purchasing and finance." },
        { icon: BarChart3, t: "Reports arrive too late", d: "Real figures are ready when decisions need to be made, not after the fact." },
        { icon: Layers, t: "Disconnected modules", d: "One connected system replaces separate tools that don't share information cleanly." },
      ]}
      capabilities={[
        { title: "Inventory & warehouse", items: ["Stock levels across locations", "Batch and serial tracking", "Stock transfers", "Low-stock alerts"] },
        { title: "Purchasing & suppliers", items: ["Purchase orders", "Supplier records", "Goods receipt", "Landed cost tracking"] },
        { title: "Finance & invoicing", items: ["Sales and purchase invoices", "Payments and reconciliation", "Chart of accounts", "Tax handling"] },
        { title: "Projects & operations", items: ["Project planning and tasks", "Timesheets and budgets", "Job costing", "Service tickets"] },
        { title: "Reporting", items: ["Real-time dashboards", "Financial statements", "Operational KPIs", "Scheduled reports"] },
        { title: "Controls", items: ["Approval workflows", "Role-based access", "Audit trail", "Document attachments"] },
      ]}
      benefits={[
        { icon: Wallet, t: "Cleaner financial picture", d: "Fewer reconciliations, fewer surprises, closing periods on time." },
        { icon: Boxes, t: "Right stock, right place", d: "Inventory and purchasing move on real demand — not on hope." },
        { icon: ShieldCheck, t: "Stronger controls", d: "Approvals, audit trails and permissions live inside the same system." },
      ]}
      industries={["Manufacturing", "Trading", "Distribution", "Construction", "Retail", "Professional Services"]}
      faqs={[
        { q: "Do we have to replace every existing tool on day one?", a: "No. Most companies start with the modules that hurt the most and add others as the team is ready." },
        { q: "Can it handle multiple branches or warehouses?", a: "Yes. Multi-location inventory, multi-company and multi-currency are supported." },
        { q: "How does it handle finance and tax?", a: "The finance module covers invoicing, payments, reconciliation and standard tax handling for your region." },
        { q: "Can it connect to our existing accounting?", a: "For most transitions, migrating fully into the ERP is simpler. Where an interim connection is needed, it can be arranged during implementation." },
      ]}
    />
  ),
});

void ClipboardList; void Truck; void FileText;
