import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "../lib/utils";

/**
 * AccordionSection — collapsible section with chevron animation.
 * Auto-opens when URL hash matches its id (e.g. clicking a category link).
 */
export default function AccordionSection({
  id,
  index,
  title,
  subtitle,
  description,
  children,
  defaultOpen = false,
  testId,
  imageSrc,
}) {
  const [open, setOpen] = useState(defaultOpen);

  // Open this section when URL hash matches its id (e.g. nav-link click)
  useEffect(() => {
    if (!id) return undefined;
    const checkHash = () => {
      if (typeof window === "undefined") return;
      const hash = window.location.hash.replace(/^#/, "");
      if (hash === id) {
        setOpen(true);
        // Smoothly scroll into view after expand animation begins
        requestAnimationFrame(() => {
          const el = document.getElementById(id);
          if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
        });
      }
    };
    checkHash();
    window.addEventListener("hashchange", checkHash);
    return () => window.removeEventListener("hashchange", checkHash);
  }, [id]);

  return (
    <section
      id={id}
      data-testid={testId || `accordion-${id}`}
      className="border-b border-stone-800/70"
    >
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        data-testid={`${testId || id}-toggle`}
        className={cn(
          "group flex w-full items-center gap-4 px-6 py-6 text-left transition-colors lg:px-12 lg:py-8",
          "hover:bg-stone-900/40"
        )}
      >
        {typeof index === "number" && (
          <span className="hidden shrink-0 font-display text-3xl font-black text-amber-500/40 md:block md:text-4xl">
            {String(index + 1).padStart(2, "0")}
          </span>
        )}
        <div className="min-w-0 flex-1">
          <h2 className="font-display text-2xl font-black leading-[1] tracking-tight text-stone-50 md:text-4xl">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-1 font-hand text-lg text-amber-500/90 md:text-xl">
              {subtitle}
            </p>
          )}
        </div>
        <ChevronDown
          className={cn(
            "h-6 w-6 shrink-0 text-amber-500 transition-transform duration-300 md:h-7 md:w-7",
            open && "rotate-180"
          )}
        />
      </button>

      <div
        className={cn(
          "grid transition-all duration-500 ease-in-out",
          open
            ? "grid-rows-[1fr] opacity-100"
            : "grid-rows-[0fr] opacity-0"
        )}
      >
        <div className="overflow-hidden">
          <div className="px-6 pb-10 lg:px-12">
            {description && (
              <p className="mb-6 max-w-3xl text-sm leading-relaxed text-stone-400">
                {description}
              </p>
            )}
            {imageSrc && (
              <div className="mb-6 overflow-hidden rounded-sm border border-stone-800">
                <img
                  src={imageSrc}
                  alt={title}
                  className="h-48 w-full object-cover grayscale-[0.2] transition-all duration-700 hover:grayscale-0 hover:scale-105 md:h-56 lg:h-64"
                />
              </div>
            )}
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}
