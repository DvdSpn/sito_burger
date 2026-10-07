import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "../lib/utils";

/**
 * AccordionSection — collapsible section with chevron animation.
 * Two modes:
 *  - Controlled: parent passes `isOpen` + `onToggle` (single-active behavior).
 *  - Uncontrolled: manages its own state via `defaultOpen`.
 * Hash-based opening + scrolling is handled by the parent (so it can wait for
 * the close/open transition before scrolling to the right position).
 */
export default function AccordionSection({
  id,
  index,
  title,
  subtitle,
  description,
  children,
  defaultOpen = false,
  isOpen,
  onToggle,
  testId,
  imageSrc,
}) {
  const controlled = typeof isOpen === "boolean";
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const open = controlled ? isOpen : internalOpen;

  const toggle = () => {
    if (controlled) {
      onToggle?.(open ? null : id);
    } else {
      setInternalOpen((o) => !o);
    }
  };

  return (
    <section
      id={id}
      data-testid={testId || `accordion-${id}`}
      className="scroll-mt-24 border-b border-stone-800/70 md:scroll-mt-28"
    >
      <button
        type="button"
        onClick={toggle}
        aria-expanded={open}
        id={`${id}-toggle`}
        aria-controls={`${id}-panel`}
        data-testid={`${testId || id}-toggle`}
        className={cn(
          "group flex min-h-[44px] w-full items-center gap-4 px-6 py-6 text-left transition-colors lg:px-12 lg:py-8",
          "hover:bg-stone-900/40"
        )}
      >
        {typeof index === "number" && (
          <span aria-hidden="true" className="hidden shrink-0 font-display text-3xl font-black text-amber-500/60 md:block md:text-4xl">
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
          aria-hidden="true"
          className={cn(
            "h-6 w-6 shrink-0 text-amber-500 transition-transform duration-300 md:h-7 md:w-7",
            open && "rotate-180"
          )}
        />
      </button>

      <div
        id={`${id}-panel`}
        role="region"
        aria-labelledby={`${id}-toggle`}
        inert={open ? undefined : true}
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
              <div className="mb-6 overflow-hidden rounded-none border border-stone-800">
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
