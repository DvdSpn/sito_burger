import { useEffect } from "react";
import { X, MapPin, Wine as WineIcon, Grape } from "lucide-react";

/**
 * WineModal — full-screen detail view for a single bottle.
 * Shows the bottle photo on the left, and name / appellation / producer /
 * grape / description / price on the right. Closes on ESC, click outside, X.
 */
export default function WineModal({ wine, lang = "it", onClose }) {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  if (!wine) return null;

  const desc = lang === "en" && wine.descriptionEn ? wine.descriptionEn : wine.description;
  const hasPricing =
    (wine.formats && wine.formats.length > 0) || (wine.price && wine.price !== "—");

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={wine.name}
      data-testid="wine-modal"
      onClick={onClose}
      className="fixed inset-0 z-[60] flex items-center justify-center bg-stone-950/95 px-4 py-6 backdrop-blur-md md:px-12 md:py-10"
    >
      <button
        type="button"
        onClick={onClose}
        aria-label={lang === "en" ? "Close" : "Chiudi"}
        data-testid="wine-modal-close"
        className="absolute right-4 top-4 z-10 grid h-11 w-11 place-items-center rounded-full border border-stone-700 bg-stone-900/80 text-stone-200 transition-colors hover:border-amber-600 hover:text-amber-500 md:right-8 md:top-8"
      >
        <X className="h-5 w-5" />
      </button>

      <div
        onClick={(e) => e.stopPropagation()}
        className="relative flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-sm border border-stone-800 bg-stone-950 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.9)] md:flex-row"
      >
        {/* Bottle photo */}
        <div className="relative flex shrink-0 items-center justify-center overflow-hidden bg-gradient-to-b from-stone-900/40 via-stone-950 to-stone-950 px-8 py-10 md:w-[42%] md:px-12 md:py-14">
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-600/15 blur-[80px]" />
          <img
            src={wine.image}
            alt={wine.name}
            className="relative max-h-[45vh] w-auto object-contain drop-shadow-[0_25px_30px_rgba(0,0,0,0.7)] md:max-h-[55vh]"
          />
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 py-8 md:px-10 md:py-12">
          <p className="text-[10px] font-bold uppercase tracking-mega text-amber-500">
            · {wine.region} ·
          </p>
          <h2 className="mt-2 font-display text-3xl font-black leading-[1] tracking-tight text-stone-50 md:text-4xl">
            {wine.name}
          </h2>
          <p className="mt-2 text-[11px] font-bold uppercase tracking-mega text-amber-500/90">
            {wine.appellation}
          </p>

          <div className="mt-6 flex flex-col gap-3 text-sm">
            {wine.producer && (
              <div className="flex items-start gap-3">
                <WineIcon className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-mega text-stone-500">
                    {lang === "en" ? "Producer" : "Produttore"}
                  </p>
                  <p className="text-stone-200">{wine.producer}</p>
                </div>
              </div>
            )}
            {wine.grape && (
              <div className="flex items-start gap-3">
                <Grape className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-mega text-stone-500">
                    {lang === "en" ? "Grape variety" : "Vitigno"}
                  </p>
                  <p className="text-stone-200">{wine.grape}</p>
                </div>
              </div>
            )}
            {wine.region && (
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-mega text-stone-500">
                    {lang === "en" ? "Region" : "Regione"}
                  </p>
                  <p className="text-stone-200">{wine.region}</p>
                </div>
              </div>
            )}
          </div>

          {desc && (
            <>
              <div className="mt-8 h-px w-16 bg-amber-600/60" />
              <p className="mt-4 text-sm leading-relaxed text-stone-300 md:text-[15px]">
                {desc}
              </p>
            </>
          )}

          {/* Price / formats — only shown if defined */}
          {hasPricing && (
            <div className="mt-8 border-t border-stone-800 pt-6">
              {wine.formats && wine.formats.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {wine.formats.map((f) => (
                    <span
                      key={f.size}
                      className="inline-flex items-center gap-2 rounded-sm border border-amber-700/40 bg-stone-950/50 px-3 py-1.5 text-xs"
                    >
                      <span className="font-bold uppercase tracking-mega text-stone-300">
                        {f.size}
                      </span>
                      <span className="font-display text-base font-semibold text-amber-500">
                        € {f.price}
                      </span>
                    </span>
                  ))}
                </div>
              ) : (
                <p className="font-display text-2xl font-semibold text-amber-500">
                  € {wine.price}
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
