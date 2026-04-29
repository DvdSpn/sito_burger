import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Wine } from "lucide-react";
import { drinksData, pairings } from "../data/drinks";
import Logo from "../components/Logo";
import LanguageToggle from "../components/LanguageToggle";
import AccordionSection from "../components/AccordionSection";
import DrinkItem from "../components/DrinkItem";

const tx = (item, key, lang) => {
  if (lang === "en") {
    const enKey = key + "En";
    if (item[enKey]) return item[enKey];
  }
  return item[key];
};

export default function Drinks({ t, lang, setLang }) {
  // single-active accordion state — null means all closed
  const [openId, setOpenId] = useState(null);

  return (
    <div className="min-h-screen bg-stone-950 text-stone-50">
      {/* top bar */}
      <header className="sticky top-0 z-30 border-b border-stone-800/70 bg-stone-950/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-12">
          <Link to="/" data-testid="drinks-back-home" className="flex items-center gap-3">
            <Logo size="compact" />
            <span className="hidden text-[10px] tracking-mega uppercase text-stone-400 md:inline">
              ← {t("drinks.backToMenu")}
            </span>
          </Link>
          <div className="flex items-center gap-3">
            <LanguageToggle lang={lang} setLang={setLang} />
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-stone-800/70 py-20 md:py-28">
        <div className="absolute inset-0 opacity-20">
          <div className="h-full w-full bg-[radial-gradient(ellipse_at_top,rgba(217,119,6,0.3),transparent_60%)]" />
        </div>
        <div className="relative mx-auto max-w-7xl px-6 lg:px-12">
          <Link
            to="/"
            data-testid="drinks-back-link"
            className="mb-8 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-mega text-amber-500 transition-colors hover:text-amber-400"
          >
            <ArrowLeft className="h-3 w-3" /> {t("drinks.backToMenu")}
          </Link>
          <p className="text-[11px] font-bold uppercase tracking-mega text-amber-500">
            {t("drinks.kicker")}
          </p>
          <h1 className="mt-3 font-display text-5xl font-black leading-[0.95] tracking-tight text-stone-50 md:text-7xl lg:text-[7rem]">
            {t("drinks.title")}{" "}
            <span className="italic font-medium text-amber-500">
              {t("drinks.titleAccent")}
            </span>
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-stone-400 md:text-lg">
            {t("drinks.description")}
          </p>
        </div>
      </section>

      {/* Pairings highlight */}
      <section className="border-b border-stone-800/70 bg-stone-900/30 py-16 md:py-20">
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
                className="rounded-sm border border-stone-800 bg-stone-950/50 p-5 transition-colors hover:border-amber-700/40"
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

      {/* Drink sections — single-active accordions, all closed by default */}
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
            onToggle={(nextId) => setOpenId(nextId)}
          >
            <div className="rounded-sm border border-stone-800/70 bg-stone-900/30 p-4 md:p-8">
              {section.items.map((item) => (
                <DrinkItem key={item.name} item={item} lang={lang} />
              ))}
            </div>
          </AccordionSection>
        ))}
      </div>

      <footer className="py-12 text-center">
        <Link
          to="/"
          data-testid="drinks-footer-back"
          className="inline-flex items-center gap-2 rounded-sm border border-stone-700 px-6 py-3 text-[11px] font-bold uppercase tracking-mega text-stone-300 transition-colors hover:border-amber-600 hover:text-amber-500"
        >
          <ArrowLeft className="h-3 w-3" /> {t("drinks.backToMenu")}
        </Link>
      </footer>
    </div>
  );
}
