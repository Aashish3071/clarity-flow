import { useState } from "react";

export function FAQ({
  items,
  title = "Frequently asked questions",
}: {
  items: { q: string; a: string }[];
  title?: string;
}) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="border-y border-border bg-surface py-16 md:py-24">
      <div className="container-page grid gap-10 md:grid-cols-12">
        <div className="md:col-span-4">
          <p className="eyebrow">FAQ</p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-ink md:text-3xl">{title}</h2>
        </div>
        <div className="md:col-span-8">
          <div className="divide-y divide-border overflow-hidden rounded-xl border border-border bg-card">
            {items.map((f, i) => {
              const isOpen = open === i;
              return (
                <button
                  key={i}
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="block w-full px-5 py-5 text-left transition hover:bg-secondary md:px-6"
                >
                  <div className="flex items-start justify-between gap-6">
                    <span className="text-sm font-semibold text-ink md:text-base">{f.q}</span>
                    <span className="mt-0.5 text-lg text-[color:var(--brand)]">{isOpen ? "−" : "+"}</span>
                  </div>
                  <div className="grid transition-all duration-300" style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}>
                    <div className="overflow-hidden">
                      <p className="pt-3 pr-6 text-sm leading-relaxed text-ink-soft">{f.a}</p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
