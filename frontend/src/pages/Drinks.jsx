import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { drinksData } from "../data/drinks";
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
  // One section open at a time — opening another closes the previous one.
  // First section open on arrival.
  const [openId, setOpenId] = useState(drinksData[0].id);

  useEffect(() => {
    document.title = t("page.title.drinks");
  }, [t]);

  const handleToggle = (id) => {
    const opening = openId !== id;
    setOpenId(opening ? id : null);
    if (!opening) return;
    if (typeof window !== "undefined") {
      window.history.replaceState(null, "", `#${id}`);
    }
    // Wait for the previous section to collapse, then bring this one to the top
    window.setTimeout(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 480);
  };

  useEffect(() => {
    const ids = drinksData.map((s) => s.id);
    const handleHash = () => {
      const hash = window.location.hash.replace(/^#/, "");
      if (!ids.includes(hash)) return;
      setOpenId(hash);
    };
    if (typeof window !== "undefined" && window.location.hash) handleHash();
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen bg-stone-950 text-stone-50">
      {/* top bar */}
      <header className="sticky top-0 z-bar border-b border-stone-800/70 bg-stone-950/90 backdrop-blur">
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

      <main id="contenuto">
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

      {/* Drink sections — one open at a time, first open on arrival */}
      <div className="mx-auto max-w-5xl">
        {drinksData.map((section, idx) => (
          <AccordionSection
            key={section.id}
            id={section.id}
            index={idx}
            title={tx(section, "title", lang)}
            subtitle={tx(section, "subtitle", lang)}
            testId={`drinks-section-${section.id}`}
            isOpen={openId === section.id}
            onToggle={handleToggle}
          >
            {section.render === "featuredWines" ? (
              <FeaturedWinesCarousel lang={lang} />
            ) : section.layout === "swipe" ? (
              <div
                tabIndex={0}
                role="group"
                aria-label={tx(section, "title", lang)}
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

      {/* breathing room so the last section is not covered */}
      <div aria-hidden="true" className="h-12" />
      </main>
    </div>
  );
}
