import { useState } from "react";
import { Maximize2 } from "lucide-react";
import Lightbox from "./Lightbox";

// Real photos go here. Empty array = section hidden until the owner adds
// at least 3 real photos. No "coming soon" placeholders.
const PHOTOS = [];

export default function Gallery({ t }) {
  const [active, setActive] = useState(null);

  // Hide entire section while fewer than 3 real photos are available
  if (PHOTOS.length < 3) return null;

  return (
    <section
      id="galleria"
      data-testid="section-galleria"
      className="relative border-t border-stone-800/70 py-20 md:py-28"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          {PHOTOS.map((p, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActive(p)}
              data-testid={`gallery-slot-${i + 1}`}
              className="group relative aspect-square overflow-hidden rounded-none border border-stone-800/70 bg-stone-900"
            >
              <img
                src={p.src}
                alt={p.alt}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <span
                aria-hidden="true"
                className="pointer-events-none absolute right-2 top-2 grid h-8 w-8 place-items-center rounded-none bg-stone-950/60 opacity-0 transition-opacity group-hover:opacity-100"
              >
                <Maximize2 className="h-3.5 w-3.5 text-amber-400" />
              </span>
            </button>
          ))}
        </div>
      </div>

      {active && (
        <Lightbox
          src={active.src}
          alt={active.alt}
          caption={active.caption}
          onClose={() => setActive(null)}
          t={t}
        />
      )}
    </section>
  );
}
