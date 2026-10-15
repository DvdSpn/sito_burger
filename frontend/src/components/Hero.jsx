import { useEffect, useRef, useState } from "react";
import { Menu, Info } from "lucide-react";
import { Link } from "react-router-dom";
import Logo from "./Logo";
import LanguageToggle from "./LanguageToggle";
import OpenClosedBadge from "./OpenClosedBadge";
import MobileMenu from "./MobileMenu";
import Button from "./brand/Button";
import useBurgerSequence, { frameSrc } from "../hooks/useBurgerSequence";

// Burger frames drawn on a canvas, driven by scroll (see useBurgerSequence)
const HERO_POSTER = frameSrc(0);

export default function Hero({ t, lang, setLang }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const trackRef = useRef(null);
  const canvasRef = useRef(null);
  useBurgerSequence(trackRef, canvasRef);

  return (
    <header
      ref={trackRef}
      data-testid="hero-section"
      className="relative h-[260svh] w-full bg-black motion-reduce:h-auto"
    >
      {/* Pinned full-screen stage */}
      <div className="sticky top-0 flex h-[100svh] w-full flex-col overflow-hidden grain motion-reduce:relative">
      <div className="absolute inset-0 md:left-[45%] xl:left-[40%]">
        {/* Square burger frames on a black ground, contained so the burger
            is never cropped: above the text on phones, on the right on desktop */}
        <canvas
          ref={canvasRef}
          data-testid="hero-canvas"
          aria-hidden="true"
          className="h-full w-full bg-contain bg-no-repeat [background-position:50%_28%] md:bg-center"
          style={{ backgroundImage: `url(${HERO_POSTER})` }}
        />
      </div>
      <div className="absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-stone-950 via-stone-950/70 to-transparent md:h-1/3" />
      <div className="absolute inset-y-0 left-0 hidden w-3/5 bg-gradient-to-r from-stone-950/90 via-stone-950/40 to-transparent md:block" />

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
      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-end px-4 pb-8 sm:px-6 sm:pb-16 lg:px-12 lg:pb-24">
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
            className="font-display text-[3.5rem] font-black leading-[0.92] tracking-tight text-stone-50 [text-shadow:0_2px_28px_rgba(0,0,0,0.85)] sm:text-6xl md:text-7xl lg:text-[8rem]"
          >
            {t("hero.title1")}
            <span className="italic font-medium text-amber-500"> &amp; </span>
            <br className="sm:hidden" />
            {t("hero.title2")}
          </h1>

          <p
            data-testid="hero-sub"
            className="mt-4 max-w-xl text-sm leading-relaxed text-stone-300 [text-shadow:0_1px_12px_rgba(0,0,0,0.9)] sm:text-base md:mt-8 md:text-lg"
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
      </div>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} t={t} lang={lang} setLang={setLang} />
    </header>
  );
}
