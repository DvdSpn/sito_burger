import { useState } from "react";
import { featuredWines } from "../data/featuredWines";
import WineModal from "./WineModal";

/**
 * FeaturedWinesCarousel — horizontal swipe carousel used INSIDE the
 * "Vini in bottiglia" accordion. Clicking a card opens the WineModal.
 */
export default function FeaturedWinesCarousel({ lang }) {
  const [selected, setSelected] = useState(null);

  return (
    <>
      <div
        data-testid="featured-wines-carousel"
        className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 md:-mx-8 md:gap-6 md:px-8"
        style={{ scrollbarWidth: "thin" }}
      >
        {featuredWines.map((w) => (
          <button
            type="button"
            key={w.id}
            data-testid={`featured-wine-${w.id}`}
            onClick={() => setSelected(w)}
            className="group relative flex w-[200px] shrink-0 snap-start flex-col items-center rounded-none border border-stone-800/60 bg-stone-950/60 p-4 pt-6 text-left transition-all hover:-translate-y-1 hover:border-amber-700/60 hover:shadow-[0_20px_50px_-15px_rgba(217,119,6,0.35)] focus:outline-none focus:ring-2 focus:ring-amber-600/60 md:w-[240px] md:p-5 md:pt-8"
          >
            <div className="relative flex h-52 w-full items-end justify-center md:h-64">
              <img
                src={w.image}
                alt={w.name}
                loading="lazy"
                className="max-h-full w-auto object-contain drop-shadow-[0_18px_20px_rgba(0,0,0,0.6)] transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="mt-4 w-full border-t border-stone-800/70 pt-3 text-center">
              <h3 className="font-display text-base font-bold text-stone-50 md:text-lg">
                {w.name}
              </h3>
              <p className="mt-1 text-[10px] font-bold uppercase tracking-mega text-amber-500/80">
                {w.appellation}
              </p>
              <p className="mt-1 text-[10px] uppercase tracking-mega text-stone-500">
                {w.region}
              </p>
              {w.price && (
                <p className="mt-3 font-display text-lg font-semibold text-amber-500">
                  € {w.price}
                </p>
              )}
            </div>
          </button>
        ))}
      </div>

      {selected && (
        <WineModal wine={selected} lang={lang} onClose={() => setSelected(null)} />
      )}
    </>
  );
}
