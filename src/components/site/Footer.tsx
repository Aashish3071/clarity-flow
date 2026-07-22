import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="container-page grid gap-10 py-14 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2 text-sm font-semibold text-ink">
            <span className="grid h-7 w-7 place-items-center rounded-md bg-[color:var(--brand)] text-white text-xs font-bold">C</span>
            Clearwork
          </div>
          <p className="mt-3 text-sm leading-relaxed text-ink-soft">
            Business software built around the way your business works.
          </p>
        </div>
        <FooterCol title="Products" links={[
          { to: "/products/crm", label: "CRM" },
          { to: "/products/erp", label: "ERP" },
          { to: "/products/ecommerce", label: "E-commerce" },
        ]} />
        <FooterCol title="Company" links={[
          { to: "/solutions", label: "Solutions" },
          { to: "/about", label: "About" },
          { to: "/contact", label: "Contact" },
        ]} />
        <FooterCol title="Get started" links={[
          { to: "/demo", label: "Schedule a Demo" },
          { to: "/contact", label: "Talk to us" },
        ]} />
      </div>
      <div className="border-t border-border">
        <div className="container-page flex flex-col items-start justify-between gap-2 py-5 text-xs text-muted-foreground md:flex-row md:items-center">
          <span>© {new Date().getFullYear()} Clearwork. All rights reserved.</span>
          <span>hello@clearwork.co</span>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: { to: string; label: string }[] }) {
  return (
    <div>
      <div className="text-xs font-semibold uppercase tracking-wider text-ink">{title}</div>
      <ul className="mt-4 space-y-2.5 text-sm text-ink-soft">
        {links.map((l) => (
          <li key={l.to}>
            <Link to={l.to} className="hover:text-ink">{l.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
