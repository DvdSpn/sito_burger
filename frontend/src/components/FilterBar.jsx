import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, Wine } from "lucide-react";
import { menuData } from "../data/menu";
import { cn } from "../lib/utils";
import Logo from "./Logo";

const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

export default function FilterBar({ activeFilter, setActiveFilter, t, lang }) {
  const [stuck, setStuck] = useState(false);
  const [activeSection, setActiveSection] = useState("hamburger");
  const [showRightFade, setShowRightFade] = useState(true);
  const [showLeftFade, setShowLeftFade] = useState(false);
  const [hintVisible, setHintVisible] = useState(true);
  const sentinelRef = useRef(null);
  const scrollerRef = useRef(null);

  const sectionLinks = menuData.map((s) => ({
    id: s.id,
    label: lang === "en" && s.titleEn ? s.titleEn : s.title,
  }));

  const filters = [
    { id: "all", label: t("filter.all") },
    { id: "beef", label: t("filter.beef") },
    { id: "chicken", label: t("filter.chicken") },
    { id: "pork", label: t("filter.pork") },
    { id: "veg", label: t("filter.veg") },
    { id: "spicy", label: t("filter.spicy") },
  ];

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return undefined;
    const io = new IntersectionObserver(
      ([entry]) => setStuck(!entry.isIntersecting),
      { threshold: 0, rootMargin: "-1px 0px 0px 0px" }
    );
    io.observe(sentinel);
    return () => io.disconnect();
  }, []);

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

  const updateFades = () => {
    const el = scrollerRef.current;
    if (!el) return;
    setShowLeftFade(el.scrollLeft > 4);
    setShowRightFade(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  };

  useEffect(() => {
    updateFades();
    const el = scrollerRef.current;
    if (!el) return undefined;
    el.addEventListener("scroll", updateFades, { passive: true });
    window.addEventListener("resize", updateFades);
    return () => {
      el.removeEventListener("scroll", updateFades);
      window.removeEventListener("resize", updateFades);
    };
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setHintVisible(false), 5000);
    const el = scrollerRef.current;
    if (!el) return () => clearTimeout(timer);
    const onScroll = () => setHintVisible(false);
    el.addEventListener("scroll", onScroll, { once: true, passive: true });
    return () => {
      clearTimeout(timer);
      el.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <>
      <div ref={sentinelRef} aria-hidden className="h-px w-full" />
      <div
        data-testid="filter-bar"
        className={cn(
          "sticky top-0 z-30 border-b border-stone-800/70 backdrop-blur-xl transition-colors",
          stuck ? "bg-stone-950/95" : "bg-stone-950/60"
        )}
      >
        <div className="mx-auto flex max-w-7xl items-stretch gap-3 py-2 lg:items-center lg:px-12 lg:py-3">
          <button
            type="button"
            onClick={scrollToTop}
            data-testid="sticky-logo-btn"
            aria-label="Torna in cima"
            className="flex shrink-0 items-center pl-3 transition-transform hover:-translate-y-0.5 lg:pl-0"
          >
            <Logo size="md" className="h-12 w-12 md:h-14 md:w-14" />
          </button>

          <div className="flex min-w-0 flex-1 flex-col gap-2 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center justify-between pr-4 lg:hidden">
              <span className="text-[10px] uppercase tracking-mega text-amber-500/80">
                {t("filter.scrollHint")}
              </span>
              <ChevronRight
                className={cn(
                  "h-3 w-3 text-amber-500 transition-opacity",
                  hintVisible ? "animate-pulse opacity-100" : "opacity-0"
                )}
              />
            </div>

            <div className="relative">
              <div
                aria-hidden
                className={cn(
                  "pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-stone-950 to-transparent transition-opacity lg:hidden",
                  showLeftFade ? "opacity-100" : "opacity-0"
                )}
              />
              <div
                aria-hidden
                className={cn(
                  "pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-stone-950 to-transparent transition-opacity lg:hidden",
                  showRightFade ? "opacity-100" : "opacity-0"
                )}
              />
              <div
                ref={scrollerRef}
                data-testid="section-scroller"
                className="scrollbar-none flex gap-1 overflow-x-auto pr-4 lg:overflow-visible lg:pr-0"
                style={{ scrollbarWidth: "none" }}
              >
                {sectionLinks.map((s) => (
                  <a
                    key={s.id}
                    href={`#${s.id}`}
                    data-testid={`section-link-${s.id}`}
                    className={cn(
                      "whitespace-nowrap rounded-sm border px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-mega transition-colors",
                      activeSection === s.id
                        ? "border-amber-600 bg-amber-600/10 text-amber-500"
                        : "border-transparent text-stone-400 hover:border-stone-700 hover:text-stone-200"
                    )}
                  >
                    {s.label}
                  </a>
                ))}
                <Link
                  to="/bevande"
                  data-testid="section-link-bevande"
                  className="inline-flex shrink-0 items-center gap-1 whitespace-nowrap rounded-sm border border-amber-700/60 bg-amber-600/10 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-mega text-amber-500 transition-colors hover:bg-amber-600 hover:text-stone-950"
                >
                  <Wine className="h-3 w-3" /> {t("nav.drinks")}
                </Link>
              </div>
            </div>

            <div className="scrollbar-none flex items-center gap-1.5 overflow-x-auto pr-4 pb-1 lg:overflow-visible lg:pr-0 lg:pb-0">
              <span className="hidden whitespace-nowrap text-[10px] uppercase tracking-mega text-stone-500 lg:inline">
                {t("filter.label")}
              </span>
              {filters.map((f) => (
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
      </div>
    </>
  );
}
