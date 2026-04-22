import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Logo from "../components/Logo";
import LanguageToggle from "../components/LanguageToggle";
import Gallery from "../components/Gallery";
import Reviews from "../components/Reviews";
import Contact from "../components/Contact";

export default function About({ t, lang, setLang }) {
  return (
    <div className="min-h-screen bg-stone-950 text-stone-50">
      <header className="sticky top-0 z-30 border-b border-stone-800/70 bg-stone-950/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-12">
          <Link to="/" data-testid="about-back-home" className="flex items-center gap-3">
            <Logo />
            <span className="hidden text-[10px] tracking-mega uppercase text-stone-400 md:inline">
              ← {t("about.backToMenu")}
            </span>
          </Link>
          <LanguageToggle lang={lang} setLang={setLang} />
        </div>
      </header>

      <section className="relative overflow-hidden border-b border-stone-800/70 py-20 md:py-32">
        <div className="absolute inset-0 opacity-25">
          <div className="h-full w-full bg-[radial-gradient(ellipse_at_bottom_left,rgba(194,65,12,0.35),transparent_60%)]" />
        </div>
        <div className="relative mx-auto max-w-5xl px-6 lg:px-12">
          <Link
            to="/"
            data-testid="about-back-link"
            className="mb-8 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-mega text-amber-500 transition-colors hover:text-amber-400"
          >
            <ArrowLeft className="h-3 w-3" /> {t("about.backToMenu")}
          </Link>
          <p className="text-[11px] font-bold uppercase tracking-mega text-amber-500">
            {t("about.kicker")}
          </p>
          <h1 className="mt-3 font-display text-5xl font-black leading-[0.92] tracking-tight text-stone-50 md:text-7xl lg:text-[7rem]">
            {t("about.title")}
            <br />
            <span className="italic font-medium text-amber-500">
              {t("about.titleAccent")}
            </span>
          </h1>
        </div>
      </section>

      <section className="border-b border-stone-800/70 py-16 md:py-24">
        <div className="mx-auto grid max-w-5xl gap-12 px-6 lg:grid-cols-12 lg:gap-16 lg:px-12">
          <div className="lg:col-span-5 lg:sticky lg:top-28 lg:self-start">
            <p className="text-[11px] font-bold uppercase tracking-mega text-amber-500">
              {t("about.story.kicker")}
            </p>
            <h2 className="mt-3 font-display text-4xl font-black leading-[0.95] tracking-tight text-stone-50 md:text-5xl">
              {t("about.story.title")}
            </h2>
          </div>
          <div className="space-y-6 text-base leading-relaxed text-stone-300 lg:col-span-7">
            <p>{t("about.story.p1")}</p>
            <p>{t("about.story.p2")}</p>
            <p>{t("about.story.p3")}</p>
          </div>
        </div>
      </section>

      {/* Values + Gallery + Reviews + Contact moved here */}
      <Gallery t={t} />
      <Reviews t={t} lang={lang} />
      <Contact t={t} onOrder={() => {}} />
    </div>
  );
}
