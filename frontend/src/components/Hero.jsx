import { Flame, MapPin } from "lucide-react";
import { RESTAURANT } from "../data/menu";

const HERO_IMG =
  "https://static.prod-images.emergentagent.com/jobs/c6339d23-1435-4b4c-bea3-59cbda5562c5/images/c92f0f3deb1438cdc80044cd4ceee5570438a7888b3d3f8b5ce4181e0fb2f506.png";

export default function Hero() {
  return (
    <section
      data-testid="hero-section"
      className="relative min-h-[92vh] w-full overflow-hidden grain"
    >
      {/* background image */}
      <div className="absolute inset-0">
        <img
          src={HERO_IMG}
          alt="Chianina burger alla griglia"
          className="h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/80 to-stone-950/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-stone-950/90 via-stone-950/40 to-transparent" />
      </div>

      {/* top bar */}
      <div className="relative z-20 flex items-center justify-between px-6 py-6 lg:px-12">
        <div className="flex items-center gap-3" data-testid="brand-mark">
          <div className="grid h-10 w-10 place-items-center rounded-sm border border-amber-700/60 bg-stone-950/70 backdrop-blur">
            <Flame className="h-5 w-5 text-amber-500 flicker" />
          </div>
          <div className="leading-none">
            <p className="font-display text-lg font-bold text-stone-50">B&amp;G</p>
            <p className="text-[10px] tracking-mega uppercase text-amber-500/80">
              Camucia
            </p>
          </div>
        </div>

        <nav className="hidden gap-8 md:flex">
          {[
            { id: "hamburger", label: "Hamburger" },
            { id: "ciabatte", label: "Ciabatte" },
            { id: "piadine", label: "Piadine" },
            { id: "griglia", label: "Griglia" },
            { id: "contatti", label: "Contatti" },
          ].map((n) => (
            <a
              key={n.id}
              href={`#${n.id}`}
              data-testid={`nav-${n.id}`}
              className="text-xs tracking-mega uppercase text-stone-300 transition-colors hover:text-amber-500"
            >
              {n.label}
            </a>
          ))}
        </nav>

        <a
          href="#menu"
          data-testid="nav-cta"
          className="hidden rounded-sm border border-amber-600 bg-amber-600/90 px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-stone-950 transition-colors hover:bg-amber-500 md:inline-block"
        >
          Vai al menu
        </a>
      </div>

      {/* main hero content */}
      <div className="relative z-10 mx-auto flex min-h-[75vh] max-w-7xl flex-col justify-end px-6 pb-16 lg:px-12 lg:pb-24">
        <div className="rise max-w-4xl">
          <div className="mb-5 flex items-center gap-3">
            <span className="h-px w-10 bg-amber-500" />
            <span
              data-testid="hero-kicker"
              className="text-[11px] font-bold uppercase tracking-mega text-amber-500"
            >
              Dal 2010 · Chianina · Fuoco vivo
            </span>
          </div>

          <h1
            data-testid="hero-title"
            className="font-display text-5xl font-black leading-[0.92] tracking-tight text-stone-50 sm:text-6xl md:text-7xl lg:text-[8rem]"
          >
            Burger
            <span className="italic font-medium text-amber-500"> &amp; </span>
            <br className="sm:hidden" />
            Grill
          </h1>

          <p
            data-testid="hero-sub"
            className="mt-8 max-w-xl text-base leading-relaxed text-stone-300 md:text-lg"
          >
            {RESTAURANT.description} Panini artigianali, tagliate alla brace e
            la nostra griglia sempre accesa, nel cuore di Camucia.
          </p>

          <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <a
              href="#menu"
              data-testid="hero-menu-btn"
              className="group inline-flex items-center gap-3 rounded-sm bg-amber-600 px-8 py-4 text-xs font-bold uppercase tracking-mega text-stone-950 transition-all hover:bg-amber-500 hover:tracking-widest"
            >
              Scopri il menu
              <span className="h-px w-6 bg-stone-950 transition-all group-hover:w-10" />
            </a>
            <a
              href="#contatti"
              data-testid="hero-location-btn"
              className="inline-flex items-center gap-2 rounded-sm border border-stone-700 bg-stone-950/50 px-6 py-4 text-xs font-bold uppercase tracking-mega text-stone-200 backdrop-blur transition-colors hover:border-amber-600 hover:text-amber-500"
            >
              <MapPin className="h-4 w-4" /> Via Lauretana 19/21
            </a>
          </div>
        </div>

        {/* marquee of highlights */}
        <div className="relative mt-16 hidden border-y border-stone-800/70 py-5 md:block">
          <div className="flex justify-between gap-10 text-xs tracking-mega uppercase text-stone-500">
            <span className="text-amber-500">★ Chianina 200gr</span>
            <span>Pane a lievitazione lenta</span>
            <span>Porcini · Tartufo</span>
            <span>Km 0 · Toscana</span>
            <span className="text-amber-500">★ Fuoco vivo</span>
          </div>
        </div>
      </div>

      {/* side badge */}
      <div
        data-testid="hero-badge"
        className="absolute right-6 top-1/2 z-10 hidden -translate-y-1/2 rotate-90 lg:block"
      >
        <p className="text-[10px] tracking-mega uppercase text-stone-500">
          Camucia · Cortona · AR
        </p>
      </div>
    </section>
  );
}
