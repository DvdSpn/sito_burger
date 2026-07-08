import { useState } from "react";
import { Wine } from "lucide-react";
import { featuredWines } from "../data/featuredWines";
import WineModal from "./WineModal";

/**
 * FeaturedWines — horizontally scrollable showcase of bottle photos.
 * Displayed as an "in primo piano" strip at the top of the drinks page.
 * Clicking a card opens the WineModal with full description + price.
 */
export default function FeaturedWines({ lang }) {
  const [selected, setSelected] = useState(null);

  return (
    <section
      id="vini-primo-piano"
      data-testid="featured-wines"
      className="relative overflow-hidden border-b border-stone-800/70 bg-gradient-to-b from-stone-950 via-stone-900/30 to-stone-950 py-16 md:py-20"
    >
      {/* Backdrop glow */}
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <div className="absolute left-1/2 top-0 h-72 w-[80%] -translate-x-1/2 rounded-full bg-amber-700/10 blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-12">
        <div className="mb-10 flex items-end justify-between gap-6">
          <div>
            <div className="mb-3 flex items-center gap-2">
              <Wine className="h-4 w-4 text-amber-500" />
              <p className="text-[11px] font-bold uppercase tracking-mega text-amber-500">
                {lang === "en" ? "Featured wines" : "In primo piano"}
              </p>
            </div>
            <h2 className="font-display text-3xl font-black leading-[0.95] tracking-tight text-stone-50 md:text-5xl">
              {lang === "en" ? "Bottled" : "Vini"}{" "}
              <span className="italic font-medium text-amber-500">
                {lang === "en" ? "wine selection" : "in bottiglia"}
              </span>
            </h2>
            <p className="mt-3 text-[11px] font-bold uppercase tracking-mega text-stone-500">
              {lang === "en"
                ? "Tap a bottle to view details"
                : "Tocca una bottiglia per i dettagli"}
            </p>
          </div>
        </div>

        {/* Horizontal scroll — perfect for mobile touch and desktop wheel */}
        <div
          className="-mx-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-4 lg:-mx-12 lg:gap-6 lg:px-12"
          style={{ scrollbarWidth: "thin" }}
        >
          {featuredWines.map((w) => (
            <button
              type="button"
              key={w.id}
              data-testid={`featured-wine-${w.id}`}
              onClick={() => setSelected(w)}
              className="group relative flex w-[220px] shrink-0 snap-start flex-col items-center rounded-sm border border-stone-800/60 bg-stone-950/60 p-5 pt-8 text-left transition-all hover:-translate-y-1 hover:border-amber-700/60 hover:shadow-[0_20px_50px_-15px_rgba(217,119,6,0.35)] focus:outline-none focus:ring-2 focus:ring-amber-600/60 md:w-[260px] md:p-6 md:pt-10"
            >
              <div className="relative flex h-56 w-full items-end justify-center md:h-72">
                <img
                  src={w.image}
                  alt={w.name}
                  loading="lazy"
                  className="max-h-full w-auto object-contain drop-shadow-[0_18px_20px_rgba(0,0,0,0.6)] transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="mt-5 w-full border-t border-stone-800/70 pt-4 text-center">
                <h3 className="font-display text-lg font-bold text-stone-50 md:text-xl">
                  {w.name}
                </h3>
                <p className="mt-1 text-[10px] font-bold uppercase tracking-mega text-amber-500/80">
                  {w.appellation}
                </p>
                <p className="mt-1 text-[10px] uppercase tracking-mega text-stone-500">
                  {w.region}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {selected && (
        <WineModal wine={selected} lang={lang} onClose={() => setSelected(null)} />
      )}
    </section>
  );
}
