import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";

const products = [
  { to: "/products/crm", label: "CRM", desc: "Sales, customers, pipeline" },
  { to: "/products/erp", label: "ERP", desc: "Operations, inventory, finance" },
  { to: "/products/ecommerce", label: "E-commerce", desc: "Online orders & catalog" },
] as const;

const links = [
  { to: "/solutions", label: "Solutions" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function Nav() {
  const [open, setOpen] = useState(false);
  const [prodOpen, setProdOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur">
      <div className="container-page flex h-14 items-center justify-between md:h-16">
        <Link to="/" className="flex items-center gap-2 text-[15px] font-semibold tracking-tight text-ink">
          <span className="grid h-7 w-7 place-items-center rounded-md bg-[color:var(--brand)] text-white text-xs font-bold">C</span>
          Clearwork
        </Link>

        {/* Desktop */}
        <nav className="hidden items-center gap-1 text-sm text-ink-soft md:flex">
          <div className="relative" onMouseEnter={() => setProdOpen(true)} onMouseLeave={() => setProdOpen(false)}>
            <button className="flex items-center gap-1 rounded-md px-3 py-2 hover:text-ink">
              Products <ChevronDown className="h-3.5 w-3.5" />
            </button>
            {prodOpen && (
              <div className="absolute left-0 top-full w-72 rounded-xl border border-border bg-card p-2 shadow-card">
                {products.map((p) => (
                  <Link key={p.to} to={p.to} className="block rounded-lg px-3 py-2.5 hover:bg-secondary">
                    <div className="text-sm font-medium text-ink">{p.label}</div>
                    <div className="text-xs text-ink-soft">{p.desc}</div>
                  </Link>
                ))}
              </div>
            )}
          </div>
          {links.map((l) => (
            <Link key={l.to} to={l.to} className="rounded-md px-3 py-2 hover:text-ink" activeProps={{ className: "text-ink" }}>
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            to="/demo"
            className="hidden rounded-md bg-[color:var(--brand)] px-3.5 py-2 text-sm font-medium text-white transition hover:opacity-90 md:inline-flex"
          >
            Schedule a Demo
          </Link>
          <button
            onClick={() => setOpen(!open)}
            aria-label="Menu"
            className="grid h-9 w-9 place-items-center rounded-md border border-border text-ink md:hidden"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-border bg-background md:hidden">
          <div className="container-page flex flex-col gap-1 py-3">
            <div className="px-1 pb-1 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Products</div>
            {products.map((p) => (
              <Link key={p.to} to={p.to} onClick={() => setOpen(false)} className="rounded-md px-3 py-2.5 text-sm text-ink hover:bg-secondary">
                {p.label} <span className="text-ink-soft">— {p.desc}</span>
              </Link>
            ))}
            <div className="mt-2 border-t border-border pt-2" />
            {links.map((l) => (
              <Link key={l.to} to={l.to} onClick={() => setOpen(false)} className="rounded-md px-3 py-2.5 text-sm text-ink hover:bg-secondary">
                {l.label}
              </Link>
            ))}
            <Link
              to="/demo"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-md bg-[color:var(--brand)] px-3 py-2.5 text-center text-sm font-medium text-white"
            >
              Schedule a Demo
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

export function MinimalNav() {
  return (
    <header className="border-b border-border bg-background">
      <div className="container-page flex h-14 items-center justify-between md:h-16">
        <Link to="/" className="flex items-center gap-2 text-[15px] font-semibold tracking-tight text-ink">
          <span className="grid h-7 w-7 place-items-center rounded-md bg-[color:var(--brand)] text-white text-xs font-bold">C</span>
          Clearwork
        </Link>
        <Link to="/" className="text-sm text-ink-soft hover:text-ink">Back to site</Link>
      </div>
    </header>
  );
}
