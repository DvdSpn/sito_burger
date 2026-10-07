import { cn } from "../../lib/utils";

/**
 * Badge — highlights on a dish card. Three variants, all in the amber palette:
 * signature (Specialità) · popular (Più scelto) · new (Novità).
 */
const VARIANTS = {
  signature: "border border-brand-accent bg-brand-accent text-brand-bg",
  popular: "border border-brand-accent-strong text-amber-400",
  new: "border border-stone-200 bg-stone-200 text-brand-bg",
};

export default function Badge({ variant = "signature", icon: Icon, className, children, ...props }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-none px-2 py-0.5 text-xs font-bold uppercase tracking-mega",
        VARIANTS[variant],
        className
      )}
      {...props}
    >
      {Icon ? <Icon className="h-3 w-3" aria-hidden="true" /> : null}
      {children}
    </span>
  );
}
