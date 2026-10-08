import { useState } from "react";
import { Menu, Info } from "lucide-react";
import { Link } from "react-router-dom";
import Logo from "./Logo";
import LanguageToggle from "./LanguageToggle";
import OpenClosedBadge from "./OpenClosedBadge";
import MobileMenu from "./MobileMenu";
import Button from "./brand/Button";

// Self-hosted (was on the Emergent CDN, which disappears with the account).
const HERO_IMG = "/images/hero-burger.jpg";

export default function Hero({ t, lang, setLang }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header
      data-testid="hero-section"
      className="relative w-full overflow-hidden grain md:min-h-[92vh]"
    >
      <div className="absolute inset-0">
        <img
          src={HERO_IMG}
          alt=""
          width="1280"
          height="896"
          fetchPriority="high"
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

        <div className="flex items-center gap-2">
          <Button
            as={Link}
            to="/chi-siamo"
            variant="secondary"
            icon={Info}
            data-testid="nav-about"
            className="hidden backdrop-blur lg:inline-flex"
          >
            {t("nav.about")}
          </Button>
          <LanguageToggle lang={lang} setLang={setLang} />
          <Link
            to="/chi-siamo"
            data-testid="nav-about-mobile"
            aria-label={t("nav.about")}
            className="grid h-11 w-11 min-h-[44px] min-w-[44px] place-items-center rounded-none border border-stone-500 bg-stone-950/60 text-amber-400 backdrop-blur transition-colors hover:border-amber-500 hover:text-amber-300 lg:hidden"
          >
            <Info className="h-4 w-4" aria-hidden="true" />
          </Link>
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            data-testid="mobile-menu-open"
            aria-label={t("mobile.open")}
            className="grid h-11 w-11 min-h-[44px] min-w-[44px] place-items-center rounded-none border border-stone-500 bg-stone-950/60 text-stone-200 backdrop-blur transition-colors hover:border-amber-600 hover:text-amber-500 lg:hidden"
          >
            <Menu className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Hero content */}
      <div className="relative z-10 mx-auto flex max-w-7xl flex-col justify-end px-4 pb-8 pt-10 sm:px-6 sm:pb-16 md:min-h-[70vh] md:pt-0 lg:px-12 lg:pb-24">
        <div className="rise max-w-4xl">
          <div className="mb-4 flex flex-wrap items-center gap-x-3 gap-y-2">
            <OpenClosedBadge t={t} />
            <span aria-hidden="true" className="hidden h-px w-10 bg-amber-500 md:inline-block" />
            <span
              data-testid="hero-kicker"
              className="text-xs font-bold uppercase tracking-mega text-amber-500"
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
            className="mt-4 max-w-xl text-sm leading-relaxed text-stone-300 sm:text-base md:mt-8 md:text-lg"
          >
            {t("hero.description")}
          </p>

        </div>

        {/* Highlights marquee — hidden on mobile */}
        <div className="relative mt-16 hidden border-y border-stone-800/70 py-5 md:block">
          <div className="flex justify-between gap-10 text-xs uppercase tracking-mega text-stone-400">
            <span className="text-amber-500">{t("hero.highlight1")}</span>
            <span>{t("hero.highlight2")}</span>
            <span>{t("hero.highlight3")}</span>
            <span>{t("hero.highlight4")}</span>
            <span className="text-amber-500">{t("hero.highlight5")}</span>
          </div>
        </div>
      </div>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} t={t} lang={lang} setLang={setLang} />
    </header>
  );
}
