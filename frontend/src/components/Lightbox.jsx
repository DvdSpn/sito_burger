import { useEffect } from "react";
import { X } from "lucide-react";

/**
 * Lightbox — full-screen image viewer. Closes on click outside, ESC, or X.
 */
export default function Lightbox({ src, alt, caption, onClose, t }) {
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

  const closeLabel = (t && t("lightbox.close")) || "Close";

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={alt}
      data-testid="lightbox"
      onClick={onClose}
      className="fixed inset-0 z-[60] flex items-center justify-center bg-stone-950/95 px-4 py-6 backdrop-blur-md md:px-12 md:py-10"
    >
      <button
        type="button"
        onClick={onClose}
        aria-label={closeLabel}
        data-testid="lightbox-close"
        className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full border border-stone-700 bg-stone-900/80 text-stone-200 transition-colors hover:border-amber-600 hover:text-amber-500 md:right-8 md:top-8"
      >
        <X className="h-5 w-5" />
      </button>

      <figure
        onClick={(e) => e.stopPropagation()}
        className="relative max-h-full max-w-full"
      >
        <img
          src={src}
          alt={alt}
          className="max-h-[88vh] w-auto max-w-full rounded-none object-contain shadow-[0_30px_80px_-20px_rgba(0,0,0,0.9)]"
        />
        {caption && (
          <figcaption className="absolute bottom-3 left-3 inline-flex items-center gap-2 rounded-none border border-amber-600/40 bg-stone-950/70 px-3 py-1.5 text-[10px] font-bold uppercase tracking-mega text-amber-400 backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
            {caption}
          </figcaption>
        )}
      </figure>
    </div>
  );
}
