import { createFileRoute } from "@tanstack/react-router";
import { ProductPage } from "@/components/site/ProductPage";
import {
  MessageSquare, ClipboardCheck, Users, Clock, Eye, TrendingUp,
  Sparkles, FileText, Phone,
} from "lucide-react";

export const Route = createFileRoute("/products/crm")({
  head: () => ({
    meta: [
      { title: "CRM — Manage leads, customers and sales in one place | Clearwork" },
      { name: "description", content: "A CRM for leads, customers, quotations and sales activities — with Smart CRM assistance built in." },
      { property: "og:title", content: "CRM — Leads, customers and sales in one place" },
      { property: "og:description", content: "Manage leads, customers, quotations and sales activities with Smart CRM assistance." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => (
    <ProductPage
      eyebrow="CRM"
      title="Manage leads, customers and sales in one calm workspace."
      intro="A CRM that keeps customer relationships organised and gently prompts the next right action — without adding steps to your team's day."
      overview="The CRM brings leads, contacts, quotations and sales activity into one shared record. Every conversation, quote and follow-up sits on the customer's timeline, so nobody has to piece the story together. Smart CRM adds a quiet layer of assistance — suggested follow-ups, useful context and reminders — without changing the way your team works."
      problems={[
        { icon: MessageSquare, t: "Missed follow-ups", d: "Leads and existing customers stop slipping through when the next step is already visible." },
        { icon: FileText, t: "Scattered quotations", d: "Quotes, revisions and approvals live with the customer record — not in someone's inbox." },
        { icon: Eye, t: "No shared picture", d: "Sales, service and management see the same live pipeline instead of separate versions." },
      ]}
      capabilities={[
        { title: "Leads & contacts", items: ["Lead capture and assignment", "Contact and company records", "Activity timeline", "Segmentation and lists"] },
        { title: "Sales pipeline", items: ["Custom pipeline stages", "Quotations and revisions", "Deal forecasting", "Won / lost tracking"] },
        { title: "Smart CRM", items: ["Suggested follow-ups", "Contextual customer insights", "Automated reminders", "Faster information lookup"] },
      ]}
      benefits={[
        { icon: Clock, t: "Less admin time", d: "Repetitive updates and lookups stop consuming the sales team's day." },
        { icon: TrendingUp, t: "Steadier pipeline", d: "Fewer stalled deals and a clearer view of what's actually moving forward." },
        { icon: Users, t: "Better customer experience", d: "Customers get timely, informed responses because context stays with the record." },
      ]}
      industries={["Professional Services", "Manufacturing", "Trading", "Construction", "Healthcare", "Retail"]}
      faqs={[
        { q: "Can we keep our existing sales stages?", a: "Yes. Pipelines, stages and terminology are configured to match how your team already sells." },
        { q: "Is Smart CRM an AI chatbot?", a: "No. Smart CRM is an assistance layer inside the CRM. It suggests next steps and surfaces useful information, but the work stays with the person." },
        { q: "Can it connect to email and calls?", a: "Yes, common email and calendar tools connect so conversations are captured alongside the customer record." },
        { q: "Can we import existing customer data?", a: "Yes. Migration from spreadsheets or your current CRM is part of the implementation." },
      ]}
    />
  ),
});

// unused imports guard
void Sparkles; void Phone; void ClipboardCheck;
