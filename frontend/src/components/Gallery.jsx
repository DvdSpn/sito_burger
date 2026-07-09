import { useState } from "react";
import { Camera, Maximize2 } from "lucide-react";
import Lightbox from "./Lightbox";

// Real photos provided by the restaurant. Each slot can be `{ src, alt, caption }` or null (placeholder)
const SLOTS = [
  {
    span: "md:col-span-2 md:row-span-2 aspect-square md:aspect-auto",
  },
  { span: "aspect-[4/5]" },
  { span: "aspect-[4/5]" },
  { span: "md:col-span-2 aspect-[16/10]" },
  { span: "aspect-square" },
  { span: "aspect-square" },
];

export default function Gallery({ t }) {
  const [active, setActive] = useState(null);

  return (
    <section
      id="galleria"
      data-testid="section-galleria"
      className="relative border-t border-stone-800/70 py-20 md:py-28"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="mb-12 grid gap-8 md:grid-cols-12 md:items-end">
          <div className="md:col-span-8">
            <p className="text-[11px] font-bold uppercase tracking-mega text-amber-500">
              {t("gallery.kicker")}
            </p>
            <h2 className="mt-3 font-display text-4xl font-black leading-[0.95] tracking-tight text-stone-50 md:text-6xl">
              {t("gallery.title")}{" "}
              <span className="italic font-medium text-amber-500">
                {t("gallery.subtitle")}
              </span>
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-stone-400 md:col-span-4">
            {t("gallery.description")}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          {SLOTS.map((s, i) => (
            <div
              key={i}
              data-testid={`gallery-slot-${i + 1}`}
              className={`group relative overflow-hidden rounded-sm transition-colors ${
                s.src
                  ? "cursor-zoom-in border border-stone-800/70 bg-stone-900"
                  : "border border-dashed border-stone-700/60 bg-stone-900/40 hover:border-amber-700/60 hover:bg-stone-900/70"
              } ${s.span}`}
              {...(s.src
                ? {
                    role: "button",
                    tabIndex: 0,
                    onClick: () => setActive(s),
                    onKeyDown: (e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setActive(s);
                      }
                    },
                  }
                : {})}
            >
              {s.src ? (
                <>
                  <img
                    src={s.src}
                    alt={s.alt}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Subtle caption — only visible enough to be readable, never invasive */}
                  {s.caption && (
                    <span className="pointer-events-none absolute bottom-2 left-2 inline-flex items-center gap-1.5 rounded-sm bg-stone-950/55 px-2 py-1 text-[9px] font-bold uppercase tracking-mega text-stone-100/90 backdrop-blur-sm">
                      {s.caption}
                    </span>
                  )}
                  {/* Zoom hint on hover */}
                  <span className="pointer-events-none absolute right-2 top-2 grid h-8 w-8 place-items-center rounded-sm bg-stone-950/60 opacity-0 transition-opacity group-hover:opacity-100">
                    <Maximize2 className="h-3.5 w-3.5 text-amber-400" />
                  </span>
                </>
              ) : (
                <>
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-4 text-center">
                    <Camera className="h-6 w-6 text-stone-600 transition-colors group-hover:text-amber-600" />
                    <span className="text-[10px] font-bold uppercase tracking-mega text-stone-500 transition-colors group-hover:text-amber-500">
                      {t("gallery.placeholder")}
                    </span>
                    <span className="font-display text-lg text-stone-700">
                      0{i + 1}
                    </span>
                  </div>
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(217,119,6,0.06),transparent_60%)] opacity-0 transition-opacity group-hover:opacity-100" />
                </>
              )}
            </div>
          ))}
        </div>
      </div>

      {active && (
        <Lightbox
          src={active.src}
          alt={active.alt}
          caption={active.caption}
          onClose={() => setActive(null)}
        />
      )}
    </section>
  );
}
