import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Wine } from "lucide-react";
import { drinksData, pairings } from "../data/drinks";
import Logo from "../components/Logo";
import LanguageToggle from "../components/LanguageToggle";
import AccordionSection from "../components/AccordionSection";
import DrinkItem from "../components/DrinkItem";
import FeaturedWinesCarousel from "../components/FeaturedWinesCarousel";

const tx = (item, key, lang) => {
  if (lang === "en") {
    const enKey = key + "En";
    if (item[enKey]) return item[enKey];
  }
  return item[key];
};

export default function Drinks({ t, lang, setLang }) {
  // Multi-open accordion state — first section open by default
  const [openIds, setOpenIds] = useState(() => new Set([drinksData[0].id]));

  useEffect(() => {
    document.title = t("page.title.drinks");
  }, [t]);

  const handleToggle = (nextId) => {
    setOpenIds((prev) => {
      const copy = new Set(prev);
      if (copy.has(nextId)) copy.delete(nextId);
      else copy.add(nextId);
      return copy;
    });
    if (typeof window !== "undefined") {
      window.history.replaceState(null, "", `#${nextId}`);
    }
    window.setTimeout(() => {
      const el = document.getElementById(nextId);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 480);
  };

  useEffect(() => {
    const ids = drinksData.map((s) => s.id);
    const handleHash = () => {
      const hash = window.location.hash.replace(/^#/, "");
      if (!ids.includes(hash)) return;
      setOpenIds((prev) => new Set([...prev, hash]));
    };
    if (typeof window !== "undefined" && window.location.hash) handleHash();
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen bg-stone-950 text-stone-50">
      <main id="contenuto">
      {/* top bar */}
      <header className="sticky top-0 z-30 border-b border-stone-800/70 bg-stone-950/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-12">
          <Link to="/#menu" data-testid="drinks-back-home" className="flex min-h-[44px] items-center gap-3">
            <Logo size="compact" />
            <span className="hidden text-xs tracking-mega uppercase text-stone-300 md:inline">
              ← {t("drinks.backToMenu")}
            </span>
          </Link>
          <div className="flex items-center gap-3">
            <LanguageToggle lang={lang} setLang={setLang} />
          </div>
        </div>
      </header>

      {/* Hero (lower) */}
      <section className="relative overflow-hidden border-b border-stone-800/70 py-12 md:py-20">
        <div className="absolute inset-0 opacity-20">
          <div className="h-full w-full bg-[radial-gradient(ellipse_at_top,rgba(217,119,6,0.3),transparent_60%)]" />
        </div>
        <div className="relative mx-auto max-w-7xl px-6 lg:px-12">
          <p className="text-xs font-bold uppercase tracking-mega text-amber-500">
            {t("drinks.kicker")}
          </p>
          <h1 className="mt-3 font-display text-5xl font-black leading-[0.95] tracking-tight text-stone-50 md:text-7xl lg:text-[7rem]">
            {t("drinks.title")}{" "}
            <span className="italic font-medium text-amber-500">
              {t("drinks.titleAccent")}
            </span>
          </h1>
        </div>
      </section>

      {/* Drink sections — multi-open, first open on arrival */}
      <div className="mx-auto max-w-5xl">
        {drinksData.map((section, idx) => (
          <AccordionSection
            key={section.id}
            id={section.id}
            index={idx}
            title={tx(section, "title", lang)}
            subtitle={tx(section, "subtitle", lang)}
            testId={`drinks-section-${section.id}`}
            isOpen={openIds.has(section.id)}
            onToggle={handleToggle}
          >
            {section.render === "featuredWines" ? (
              <FeaturedWinesCarousel lang={lang} />
            ) : section.layout === "swipe" ? (
              <div
                className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 md:-mx-8 md:px-8"
                style={{ scrollbarWidth: "thin" }}
              >
                {section.items.map((item) => (
                  <DrinkItem
                    key={item.name}
                    item={item}
                    lang={lang}
                    variant="card"
                  />
                ))}
              </div>
            ) : (
              <div className="rounded-none border border-stone-800/70 bg-stone-900/30 p-4 md:p-8">
                {section.items.map((item) => (
                  <DrinkItem key={item.name} item={item} lang={lang} />
                ))}
              </div>
            )}
          </AccordionSection>
        ))}
      </div>

      {/* Pairings highlight — moved to bottom */}
      <section className="border-t border-stone-800/70 bg-stone-900/30 py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="mb-8 flex items-center gap-3">
            <Wine className="h-4 w-4 text-amber-500" />
            <p className="text-[11px] font-bold uppercase tracking-mega text-amber-500">
              {t("drinks.pairings")}
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {pairings.map((p, i) => (
              <div
                key={i}
                data-testid={`pairing-${i}`}
                className="rounded-none border border-stone-800 bg-stone-950/50 p-5 transition-colors hover:border-amber-700/40"
              >
                <p className="font-hand text-lg text-amber-500">
                  {tx(p, "wine", lang)}
                </p>
                <p className="mt-2 font-display text-base font-semibold text-stone-50">
                  {tx(p, "dish", lang)}
                </p>
                <p className="mt-2 text-xs leading-relaxed text-stone-400">
                  {tx(p, "note", lang)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="py-12 text-center">
      </footer>
      </main>
    </div>
  );
}
