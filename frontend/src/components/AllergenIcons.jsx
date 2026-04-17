import { useState } from "react";
import { ALLERGENS } from "../data/allergens";

export default function AllergenIcons({ allergens, lang = "it" }) {
  const [active, setActive] = useState(null);
  if (!allergens || allergens.length === 0) return null;

  return (
    <div className="inline-flex flex-wrap items-center gap-1.5" data-testid="allergen-icons">
      {allergens.map((id) => {
        const meta = ALLERGENS[id];
        if (!meta) return null;
        const label = meta[lang] || meta.it;
        const showing = active === id;
        return (
          <button
            key={id}
            type="button"
            onMouseEnter={() => setActive(id)}
            onMouseLeave={() => setActive(null)}
            onFocus={() => setActive(id)}
            onBlur={() => setActive(null)}
            onClick={() => setActive(showing ? null : id)}
            data-testid={`allergen-${id}`}
            className="group relative inline-flex h-5 w-5 items-center justify-center rounded-full border border-stone-700 bg-stone-900 text-[9px] font-bold text-stone-400 transition-colors hover:border-amber-600 hover:text-amber-500"
            aria-label={label}
          >
            <span>{meta.symbol}</span>
            {showing && (
              <span
                role="tooltip"
                className="pointer-events-none absolute bottom-full left-1/2 z-20 mb-1 -translate-x-1/2 whitespace-nowrap rounded-sm border border-amber-700/40 bg-stone-950 px-2 py-1 text-[9px] font-bold uppercase tracking-mega text-amber-500 shadow-xl"
              >
                {label}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
