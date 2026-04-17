import { Link } from "react-router-dom";
import { ArrowLeft, Camera, Flame, Heart } from "lucide-react";
import Logo from "../components/Logo";
import LanguageToggle from "../components/LanguageToggle";

export default function About({ t, lang, setLang }) {
  return (
    <div className="min-h-screen bg-stone-950 text-stone-50">
      <header className="sticky top-0 z-30 border-b border-stone-800/70 bg-stone-950/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-12">
          <Link to="/" data-testid="about-back-home" className="flex items-center gap-3">
            <Logo size="sm" />
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

      <section className="border-b border-stone-800/70 bg-stone-900/30 py-16 md:py-24">
        <div className="mx-auto max-w-5xl px-6 lg:px-12">
          <p className="text-[11px] font-bold uppercase tracking-mega text-amber-500">
            {t("about.values.kicker")}
          </p>
          <h2 className="mt-3 font-display text-4xl font-black leading-[0.95] tracking-tight text-stone-50 md:text-5xl">
            {t("about.values.title")}
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              { Icon: Flame, k: "v1" },
              { Icon: Heart, k: "v2" },
              { Icon: Camera, k: "v3" },
            ].map(({ Icon, k }) => (
              <div
                key={k}
                data-testid={`about-value-${k}`}
                className="rounded-sm border border-stone-800 bg-stone-950/60 p-6"
              >
                <Icon className="h-5 w-5 text-amber-500" />
                <h3 className="mt-4 font-display text-xl font-bold text-stone-50">
                  {t(`about.values.${k}.title`)}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-stone-400">
                  {t(`about.values.${k}.body`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Photo gallery placeholders */}
      <section className="border-b border-stone-800/70 py-16 md:py-24">
        <div className="mx-auto max-w-5xl px-6 lg:px-12">
          <p className="text-[11px] font-bold uppercase tracking-mega text-amber-500">
            {t("about.photos.kicker")}
          </p>
          <h2 className="mt-3 font-display text-4xl font-black leading-[0.95] tracking-tight text-stone-50 md:text-5xl">
            {t("about.photos.title")}
          </h2>
          <p className="mt-4 max-w-xl text-sm text-stone-400">
            {t("about.photos.description")}
          </p>
          <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                data-testid={`about-photo-slot-${i}`}
                className={`group relative aspect-[4/5] overflow-hidden rounded-sm border border-dashed border-stone-700/60 bg-stone-900/40 transition-colors hover:border-amber-700/60 ${
                  i === 1 ? "md:col-span-2 md:row-span-2 md:aspect-square" : ""
                }`}
              >
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-4 text-center">
                  <Camera className="h-6 w-6 text-stone-600 group-hover:text-amber-600" />
                  <span className="text-[10px] font-bold uppercase tracking-mega text-stone-500 group-hover:text-amber-500">
                    {t("gallery.placeholder")}
                  </span>
                  <span className="font-display text-lg text-stone-700">
                    0{i}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-24">
        <div className="mx-auto max-w-3xl px-6 text-center lg:px-12">
          <h2 className="font-display text-4xl font-black leading-[0.95] tracking-tight text-stone-50 md:text-6xl">
            {t("about.cta.title")}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-stone-400">
            {t("about.cta.body")}
          </p>
          <Link
            to="/"
            data-testid="about-cta-menu"
            className="mt-8 inline-flex items-center gap-3 rounded-sm bg-amber-600 px-8 py-4 text-xs font-bold uppercase tracking-mega text-stone-950 transition-colors hover:bg-amber-500"
          >
            {t("about.cta.btn")} <span>→</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
