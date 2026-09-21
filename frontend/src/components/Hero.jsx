import { useState } from "react";
import { MapPin, Menu, Info } from "lucide-react";
import { Link } from "react-router-dom";
import { RESTAURANT } from "../data/menu";
import Logo from "./Logo";
import LanguageToggle from "./LanguageToggle";
import OpenClosedBadge from "./OpenClosedBadge";
import MobileMenu from "./MobileMenu";

const HERO_IMG =
  "https://static.prod-images.emergentagent.com/jobs/c6339d23-1435-4b4c-bea3-59cbda5562c5/images/c92f0f3deb1438cdc80044cd4ceee5570438a7888b3d3f8b5ce4181e0fb2f506.png";

export default function Hero({ t, lang, setLang }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [];

  return (
    <section
      data-testid="hero-section"
      className="relative min-h-[88vh] w-full overflow-hidden grain md:min-h-[92vh]"
    >
      <div className="absolute inset-0">
        <img
          src={HERO_IMG}
          alt="Chianina burger alla griglia"
          className="h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/80 to-stone-950/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-stone-950/95 via-stone-950/50 to-transparent md:via-stone-950/40" />
      </div>

      {/* Top bar */}
      <div className="relative z-20 flex items-center justify-between gap-2 px-4 py-3 sm:gap-3 sm:px-6 sm:py-5 lg:px-12">
        <a href="#top" data-testid="brand-mark" aria-label="Burger & Grill" className="shrink-0">
          <Logo />
        </a>

        <nav className="hidden gap-4 lg:flex">
          <Link
            to="/chi-siamo"
            data-testid="nav-about"
            className="group inline-flex items-center gap-2 rounded-full border border-amber-500/60 bg-stone-950/60 px-5 py-2.5 text-xs font-bold uppercase tracking-mega text-amber-400 backdrop-blur transition-all hover:border-amber-500 hover:bg-amber-500 hover:text-stone-950 hover:shadow-[0_0_24px_-4px_rgba(217,119,6,0.6)]"
          >
            <Info className="h-3.5 w-3.5 transition-transform group-hover:rotate-12" />
            {t("nav.about")}
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <LanguageToggle lang={lang} setLang={setLang} />
          <Link
            to="/chi-siamo"
            data-testid="nav-about-mobile"
            aria-label={t("nav.about")}
            className="group grid h-11 w-11 place-items-center rounded-full border border-amber-500/60 bg-stone-950/60 text-amber-400 backdrop-blur transition-all hover:border-amber-500 hover:bg-amber-500 hover:text-stone-950 hover:shadow-[0_0_20px_-4px_rgba(217,119,6,0.6)] lg:hidden"
          >
            <Info className="h-4 w-4 transition-transform group-hover:rotate-12" />
          </Link>
          <a
            href="#menu"
            data-testid="nav-cta"
            className="hidden rounded-sm border border-amber-600 bg-amber-600/90 px-4 py-2.5 text-xs font-bold uppercase tracking-widest text-stone-950 transition-colors hover:bg-amber-500 lg:inline-block"
          >
            {t("nav.menu")}
          </a>
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            data-testid="mobile-menu-open"
            aria-label={t("mobile.open")}
            className="grid h-11 w-11 place-items-center rounded-sm border border-stone-700 bg-stone-950/60 text-stone-200 backdrop-blur transition-colors hover:border-amber-600 hover:text-amber-500 lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Hero content */}
      <div className="relative z-10 mx-auto flex min-h-[70vh] max-w-7xl flex-col justify-end px-4 pb-10 sm:px-6 sm:pb-16 lg:px-12 lg:pb-24">
        <div className="rise max-w-4xl">
          <div className="mb-4 flex flex-wrap items-center gap-x-3 gap-y-2">
            <OpenClosedBadge t={t} />
            <span className="hidden h-px w-10 bg-amber-500 md:inline-block" />
            <span
              data-testid="hero-kicker"
              className="text-[10px] font-bold uppercase tracking-mega text-amber-500 sm:text-[11px]"
            >
              {t("hero.kicker")}
            </span>
          </div>

          <h1
            data-testid="hero-title"
            className="font-display text-[3.5rem] font-black leading-[0.92] tracking-tight text-stone-50 sm:text-6xl md:text-7xl lg:text-[8rem]"
          >
            {t("hero.title1")}
            <span className="italic font-medium text-amber-500"> &amp; </span>
            <br className="sm:hidden" />
            {t("hero.title2")}
          </h1>

          <p
            data-testid="hero-sub"
            className="mt-6 max-w-xl text-sm leading-relaxed text-stone-300 sm:text-base md:mt-8 md:text-lg"
          >
            {t("hero.description")}
          </p>

          {/* CTA block — mobile full-width primary, secondaries side-by-side */}
          <div className="mt-8 space-y-2 md:mt-10 md:flex md:flex-wrap md:items-center md:gap-4 md:space-y-0">
            <a
              href="#menu"
              data-testid="hero-menu-btn"
              className="group flex w-full items-center justify-center gap-3 rounded-sm bg-amber-600 px-6 py-4 text-xs font-bold uppercase tracking-mega text-stone-950 transition-all hover:bg-amber-500 md:inline-flex md:w-auto md:px-8"
            >
              {t("hero.ctaMenu")}
              <span className="h-px w-6 bg-stone-950 transition-all group-hover:w-10" />
            </a>
            <div className="grid grid-cols-2 gap-2 md:flex md:gap-4">
              <Link
                to="/bevande"
                data-testid="hero-drinks-btn"
                className="inline-flex items-center justify-center gap-2 rounded-sm border border-stone-700 bg-stone-950/60 px-4 py-3.5 text-[11px] font-bold uppercase tracking-mega text-stone-200 backdrop-blur transition-colors hover:border-amber-600 hover:text-amber-500 md:px-6 md:py-4"
              >
                {t("hero.ctaDrinks")}
              </Link>
              <a
                href="#contatti"
                data-testid="hero-location-btn"
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-sm border border-stone-700 bg-stone-950/60 px-4 py-3.5 text-[11px] font-bold uppercase tracking-mega text-stone-200 backdrop-blur transition-colors hover:border-amber-600 hover:text-amber-500 md:px-6 md:py-4"
              >
                <MapPin className="h-3.5 w-3.5" /> {t("hero.ctaLocation")}
              </a>
            </div>
          </div>
        </div>

        {/* Highlights marquee — hidden on mobile */}
        <div className="relative mt-16 hidden border-y border-stone-800/70 py-5 md:block">
          <div className="flex justify-between gap-10 text-xs tracking-mega uppercase text-stone-500">
            <span className="text-amber-500">{t("hero.highlight1")}</span>
            <span>{t("hero.highlight2")}</span>
            <span>{t("hero.highlight3")}</span>
            <span>{t("hero.highlight4")}</span>
            <span className="text-amber-500">{t("hero.highlight5")}</span>
          </div>
        </div>
      </div>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} t={t} lang={lang} />
    </section>
  );
}
