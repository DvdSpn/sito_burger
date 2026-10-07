import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Wine } from "lucide-react";
import { menuData } from "../data/menu";
import { cn } from "../lib/utils";
import Logo from "./Logo";
import Chip from "./brand/Chip";

const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

export default function FilterBar({ activeFilter, setActiveFilter, t, lang, onSectionClick }) {
  const [stuck, setStuck] = useState(false);
  const [activeSection, setActiveSection] = useState("hamburger");
  const [showRightFade, setShowRightFade] = useState(true);
  const [showLeftFade, setShowLeftFade] = useState(false);
  const [collapsed, setCollapsed] = useState(false); // mobile: hide filters row on scroll down
  const sentinelRef = useRef(null);
  const scrollerRef = useRef(null);

  const sectionLinks = menuData.map((s) => ({
    id: s.id,
    label: lang === "en" && s.titleEn ? s.titleEn : s.title,
  }));

  const handleSectionClick = (e, id) => {
    if (onSectionClick) {
      e.preventDefault();
      onSectionClick(id);
    }
  };

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

  // Scroll direction detection → collapse the filter chip row on mobile
  // when the user scrolls down, expand again when scrolling up / at top.
  useEffect(() => {
    let lastY = typeof window !== "undefined" ? window.scrollY : 0;
    let ticking = false;
    const handler = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        const y = window.scrollY;
        if (y < 80) {
          setCollapsed(false);
        } else if (y > lastY + 6) {
          setCollapsed(true);
        } else if (y < lastY - 6) {
          setCollapsed(false);
        }
        lastY = y;
        ticking = false;
      });
    };
    window.addEventListener("scroll", handler, { passive: true });
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

  return (
    <>
      <div ref={sentinelRef} aria-hidden className="h-px w-full" />
      <div
        data-testid="filter-bar"
        data-collapsed={collapsed ? "true" : "false"}
        className={cn(
          "sticky top-0 z-bar border-b border-stone-800/70 backdrop-blur-xl transition-colors",
          stuck ? "bg-stone-950/95" : "bg-stone-950/60"
        )}
      >
        <div
          className={cn(
            "mx-auto flex max-w-7xl flex-col items-stretch gap-2 transition-[padding] duration-300 lg:items-stretch lg:px-12 lg:py-3",
            collapsed ? "py-1" : "py-2"
          )}
        >
          <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={scrollToTop}
            data-testid="sticky-logo-btn"
            aria-label={t("nav.backToTop")}
            className="flex min-h-[44px] min-w-[44px] shrink-0 items-center pl-2 transition-transform hover:-translate-y-0.5 lg:pl-0"
          >
            <Logo size={collapsed ? "tiny" : "compact"} />
          </button>

          <div className="flex min-w-0 flex-1 flex-col gap-2">
            <nav aria-label={t("nav.categories")} className="relative">
              <div
                aria-hidden
                className={cn(
                  "pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-stone-950 to-transparent transition-opacity",
                  showLeftFade ? "opacity-100" : "opacity-0"
                )}
              />
              <div
                aria-hidden
                className={cn(
                  "pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-stone-950 to-transparent transition-opacity",
                  showRightFade ? "opacity-100" : "opacity-0"
                )}
              />
              <div
                ref={scrollerRef}
                data-testid="section-scroller"
                className="scrollbar-none flex gap-1 overflow-x-auto pr-4 lg:pr-0"
                style={{ scrollbarWidth: "none" }}
              >
                {sectionLinks.map((s) => (
                  <a
                    key={s.id}
                    href={`#${s.id}`}
                    onClick={(e) => handleSectionClick(e, s.id)}
                    data-testid={`section-link-${s.id}`}
                    aria-current={activeSection === s.id ? "true" : undefined}
                    className={cn(
                      "min-h-[44px] whitespace-nowrap rounded-none border px-3.5 py-2 text-xs font-bold uppercase tracking-mega transition-colors",
                      activeSection === s.id
                        ? "border-amber-600 bg-amber-600/10 text-amber-500"
                        : "border-transparent text-stone-400 hover:border-stone-500 hover:text-stone-200"
                    )}
                  >
                    {s.label}
                  </a>
                ))}
                <Link
                  to="/bevande"
                  data-testid="section-link-bevande"
                  className="inline-flex min-h-[44px] shrink-0 items-center gap-1 whitespace-nowrap rounded-none border border-amber-700/60 bg-amber-600/10 px-3.5 py-2 text-xs font-bold uppercase tracking-mega text-amber-500 transition-colors hover:bg-amber-600 hover:text-stone-950"
                >
                  <Wine className="h-3 w-3" aria-hidden="true" /> {t("nav.drinks")}
                </Link>
              </div>
            </nav>

            <div
              className={cn(
                "scrollbar-none flex items-center gap-1.5 overflow-x-auto pr-4 pb-1 transition-all duration-300 ease-out lg:overflow-x-auto",
                collapsed
                  ? "pointer-events-none max-h-0 -translate-y-1 opacity-0"
                  : "max-h-16 translate-y-0 opacity-100"
              )}
              role="group"
              aria-label={t("filter.groupLabel")}
              onFocus={() => setCollapsed(false)}
            >
              <span aria-hidden="true" className="hidden whitespace-nowrap text-xs uppercase tracking-mega text-stone-400 lg:inline">
                {t("filter.label")}
              </span>
              {filters.map((f) => (
                <Chip
                  key={f.id}
                  data-testid={`filter-${f.id}`}
                  selected={activeFilter === f.id}
                  onClick={() => setActiveFilter(f.id)}
                  className="px-3"
                >
                  {f.label}
                </Chip>
              ))}
            </div>
          </div>
          </div>
        </div>
      </div>
    </>
  );
}
