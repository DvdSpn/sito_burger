import { Link } from "react-router-dom";
import { ArrowLeft, Wine } from "lucide-react";
import { drinksData, pairings } from "../data/drinks";
import Logo from "../components/Logo";
import LanguageToggle from "../components/LanguageToggle";

export default function Drinks({ t, lang, setLang }) {
  return (
    <div className="min-h-screen bg-stone-950 text-stone-50">
      {/* top bar */}
      <header className="sticky top-0 z-30 border-b border-stone-800/70 bg-stone-950/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-12">
          <Link to="/" data-testid="drinks-back-home" className="flex items-center gap-3">
            <Logo />
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
                <p className="font-hand text-lg text-amber-500">{p.wine}</p>
                <p className="mt-2 font-display text-base font-semibold text-stone-50">
                  {p.dish}
                </p>
                <p className="mt-2 text-xs leading-relaxed text-stone-400">
                  {p.note}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Drink sections */}
      {drinksData.map((section, idx) => (
        <section
          key={section.id}
          id={section.id}
          data-testid={`drinks-section-${section.id}`}
          className="relative border-b border-stone-800/70 py-16 md:py-24"
        >
          <div className="mx-auto max-w-5xl px-6 lg:px-12">
            <div className="mb-10 flex items-baseline justify-between gap-6">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-mega text-amber-500">
                  · {String(idx + 1).padStart(2, "0")} ·
                </p>
                <h2 className="mt-2 font-display text-3xl font-black leading-[0.95] tracking-tight text-stone-50 md:text-5xl">
                  {section.title}
                </h2>
                <p className="mt-2 font-hand text-xl text-amber-500/90">
                  {section.subtitle}
                </p>
              </div>
            </div>

            <div className="rounded-sm border border-stone-800/70 bg-stone-900/30 p-6 md:p-10">
              {section.items.map((item) => (
                <article
                  key={item.name}
                  data-testid={`drink-item-${item.name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "")}`}
                  className="border-b border-stone-800/80 py-5 last:border-b-0"
                >
                  <div className="flex items-baseline">
                    <h3 className="font-display text-lg font-bold text-stone-50 md:text-xl">
                      {item.name}
                    </h3>
                    <span className="leader hidden md:block" />
                    <span className="ml-auto shrink-0 font-display text-lg font-semibold text-amber-500 md:ml-0 md:text-xl">
                      {item.price === "—" ? "—" : `€ ${item.price}`}
                    </span>
                  </div>
                  {item.desc && (
                    <p className="mt-1 text-sm text-stone-400">{item.desc}</p>
                  )}
                </article>
              ))}
            </div>
          </div>
        </section>
      ))}

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
