import { forwardRef } from "react";
import { cn } from "../../lib/utils";

/**
 * Chip — a toggle used for menu filters and pickup time slots.
 * Always 44 px tall; exposes its state with aria-pressed.
 */
const Chip = forwardRef(function Chip(
  { selected = false, className, children, ...props },
  ref
) {
  return (
    <button
      ref={ref}
      type="button"
      aria-pressed={selected ? "true" : "false"}
      className={cn(
        "inline-flex min-h-[44px] shrink-0 items-center justify-center whitespace-nowrap rounded-full border px-4 py-2 text-xs font-bold uppercase tracking-widest transition-colors",
        selected
          ? "border-brand-accent-strong bg-brand-accent text-brand-bg"
          : "border-brand-line-strong bg-brand-surface/60 text-stone-300 hover:border-brand-accent-strong hover:text-amber-400",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
});

export default Chip;
