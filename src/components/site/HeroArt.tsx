import {
  Users, Package, ShoppingCart, TrendingUp, Boxes, ClipboardList,
  Wallet, FileText, Calendar, Workflow, CheckCircle2, Sparkles,
  Bell, ArrowUpRight,
} from "lucide-react";

/**
 * Enterprise software hero illustration.
 * A composed dashboard of small, connected modules — pipeline, records,
 * inventory, orders, projects, finance, calendar, workflow, approvals —
 * with a small Smart CRM assistance panel on the side.
 */
export function HeroArt() {
  return (
    <div className="relative">
      <div className="pointer-events-none absolute -inset-6 -z-10 rounded-[2rem] bg-gradient-to-br from-[color:var(--brand)]/10 via-transparent to-transparent blur-2xl" />
      <div className="rounded-2xl border border-border bg-card p-3 shadow-card md:p-4">
        {/* Window chrome */}
        <div className="flex items-center gap-1.5 border-b border-border pb-3">
          <span className="h-2.5 w-2.5 rounded-full bg-destructive/40" />
          <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/60" />
          <span className="h-2.5 w-2.5 rounded-full bg-green-500/50" />
          <span className="ml-3 truncate text-[11px] text-muted-foreground">app.clearwork.co / workspace</span>
        </div>

        {/* Body grid */}
        <div className="grid grid-cols-6 gap-3 pt-3">
          {/* Sidebar */}
          <div className="col-span-1 hidden rounded-lg bg-secondary p-2 md:block">
            {[Users, Package, ShoppingCart, Wallet, ClipboardList, Calendar].map((Icon, i) => (
              <div
                key={i}
                className={`mb-1.5 grid h-8 w-8 place-items-center rounded-md ${
                  i === 0 ? "bg-[color:var(--brand)] text-white" : "text-ink-soft"
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
              </div>
            ))}
          </div>

          {/* Main */}
          <div className="col-span-6 md:col-span-5">
            {/* KPI row */}
            <div className="grid grid-cols-3 gap-2">
              {[
                { icon: TrendingUp, l: "Pipeline", v: "$482K", c: "+12%" },
                { icon: ShoppingCart, l: "Orders", v: "1,284", c: "+4%" },
                { icon: Boxes, l: "In stock", v: "9,412", c: "98%" },
              ].map((k, i) => (
                <div key={i} className="rounded-md border border-border bg-background p-2.5">
                  <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-muted-foreground">
                    <k.icon className="h-3 w-3" /> {k.l}
                  </div>
                  <div className="mt-1 text-sm font-semibold text-ink">{k.v}</div>
                  <div className="text-[10px] font-medium text-[color:var(--brand)]">{k.c}</div>
                </div>
              ))}
            </div>

            {/* Sales pipeline kanban */}
            <div className="mt-3 rounded-md border border-border bg-background p-3">
              <div className="flex items-center justify-between">
                <div className="text-xs font-semibold text-ink">Sales Pipeline</div>
                <div className="text-[10px] text-muted-foreground">Q4</div>
              </div>
              <div className="mt-2.5 grid grid-cols-4 gap-1.5">
                {["Lead", "Qualified", "Proposal", "Won"].map((s, i) => (
                  <div key={s} className="rounded bg-secondary p-1.5">
                    <div className="text-[9px] font-medium uppercase tracking-wider text-ink-soft">{s}</div>
                    <div className="mt-1 space-y-1">
                      {Array.from({ length: 3 - (i % 3 === 2 ? 1 : 0) }).map((_, j) => (
                        <div key={j} className="rounded bg-background p-1.5">
                          <div className="h-1 w-3/4 rounded bg-ink/15" />
                          <div className="mt-1 h-1 w-1/2 rounded bg-ink/10" />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom row: modules */}
            <div className="mt-3 grid grid-cols-3 gap-2">
              <MiniTile icon={FileText} label="Invoices" val="42 open" />
              <MiniTile icon={Workflow} label="Workflows" val="18 active" />
              <MiniTile icon={CheckCircle2} label="Approvals" val="6 pending" />
            </div>
          </div>
        </div>
      </div>

      {/* Smart CRM assistance panel */}
      <div className="absolute -bottom-6 -left-3 hidden w-64 rounded-xl border border-border bg-card p-3.5 shadow-card md:block lg:-left-8 lg:w-72">
        <div className="flex items-center gap-2">
          <span className="grid h-6 w-6 place-items-center rounded-md bg-[color:var(--brand)]/10 text-[color:var(--brand)]">
            <Sparkles className="h-3.5 w-3.5" />
          </span>
          <span className="text-xs font-semibold text-ink">Smart CRM</span>
          <span className="ml-auto text-[10px] text-muted-foreground">Suggestions</span>
        </div>
        <ul className="mt-3 space-y-2">
          {[
            { icon: Users, t: "Follow up with ABC Company" },
            { icon: FileText, t: "Invoice #7821 awaiting approval" },
            { icon: Bell, t: "Low inventory — SKU M-204" },
            { icon: Calendar, t: "Meeting with Vertex tomorrow" },
            { icon: ArrowUpRight, t: "Quotation #Q-411 awaiting response" },
          ].map((s, i) => (
            <li key={i} className="flex items-start gap-2 rounded-md bg-secondary p-2">
              <s.icon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[color:var(--brand)]" />
              <span className="text-[11px] leading-snug text-ink">{s.t}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function MiniTile({ icon: Icon, label, val }: { icon: typeof Users; label: string; val: string }) {
  return (
    <div className="rounded-md border border-border bg-background p-2.5">
      <div className="flex items-center gap-1.5">
        <Icon className="h-3.5 w-3.5 text-[color:var(--brand)]" />
        <span className="text-[11px] font-medium text-ink">{label}</span>
      </div>
      <div className="mt-1 text-[10px] text-ink-soft">{val}</div>
    </div>
  );
}
