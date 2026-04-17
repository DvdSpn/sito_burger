import { useEffect, useRef, useState } from "react";
import { FILTERS, menuData } from "../data/menu";
import { cn } from "../lib/utils";

export default function FilterBar({ activeFilter, setActiveFilter }) {
  const [stuck, setStuck] = useState(false);
  const [activeSection, setActiveSection] = useState("hamburger");
  const sentinelRef = useRef(null);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;
    const io = new IntersectionObserver(
      ([entry]) => setStuck(!entry.isIntersecting),
      { threshold: 0, rootMargin: "-1px 0px 0px 0px" }
    );
    io.observe(sentinel);
    return () => io.disconnect();
  }, []);

  // track active section
  useEffect(() => {
    const handler = () => {
      const ids = menuData.map((m) => m.id);
      const offsets = ids
        .map((id) => {
          const el = document.getElementById(id);
          if (!el) return null;
          return { id, top: el.getBoundingClientRect().top };
        })
        .filter(Boolean);
      const above = offsets.filter((o) => o.top < 140);
      const current = above.length ? above[above.length - 1].id : ids[0];
      setActiveSection(current);
    };
    window.addEventListener("scroll", handler, { passive: true });
    handler();
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <>
      <div ref={sentinelRef} aria-hidden className="h-px w-full" />
      <div
        data-testid="filter-bar"
        className={cn(
          "sticky top-0 z-30 border-b border-stone-800/70 backdrop-blur-xl transition-colors",
          stuck ? "bg-stone-950/90" : "bg-stone-950/40"
        )}
      >
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-3 lg:flex-row lg:items-center lg:justify-between lg:px-12">
          {/* section links */}
          <div className="-mx-6 flex gap-1 overflow-x-auto px-6 lg:mx-0 lg:px-0">
            {menuData.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                data-testid={`section-link-${s.id}`}
                className={cn(
                  "whitespace-nowrap rounded-sm border px-4 py-2 text-[11px] font-bold uppercase tracking-mega transition-colors",
                  activeSection === s.id
                    ? "border-amber-600 bg-amber-600/10 text-amber-500"
                    : "border-transparent text-stone-400 hover:border-stone-700 hover:text-stone-200"
                )}
              >
                {s.title}
              </a>
            ))}
          </div>

          {/* dietary filters */}
          <div className="-mx-6 flex items-center gap-2 overflow-x-auto px-6 lg:mx-0 lg:px-0">
            <span className="hidden whitespace-nowrap text-[10px] uppercase tracking-mega text-stone-500 md:inline">
              Filtra →
            </span>
            {FILTERS.map((f) => (
              <button
                key={f.id}
                type="button"
                data-testid={`filter-${f.id}`}
                onClick={() => setActiveFilter(f.id)}
                className={cn(
                  "whitespace-nowrap rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-widest transition-colors",
                  activeFilter === f.id
                    ? "border-amber-500 bg-amber-600 text-stone-950"
                    : "border-stone-700 bg-stone-900/60 text-stone-400 hover:border-amber-700 hover:text-amber-500"
                )}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
