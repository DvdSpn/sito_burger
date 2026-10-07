import { forwardRef } from "react";
import { cn } from "../../lib/utils";

/**
 * Button — the site's one button.
 *
 * variant: primary (main action of a screen, one per screen) · secondary
 *          (supporting actions) · whatsapp (only what opens WhatsApp) ·
 *          ghost (text links) · danger (destructive, e.g. "Svuota carrello")
 * size:    sm 36 px · md 44 px (default, minimum on touch screens) · lg 56 px
 * as:      "button" (default), "a" for external links, react-router <Link>
 *          for internal pages. Extra props (href, to, target, data-testid…)
 *          are passed through.
 * icon:    optional lucide icon rendered before the label.
 *
 * Focus: the global :focus-visible outline in index.css.
 */
const VARIANTS = {
  primary:
    "border border-brand-accent bg-brand-accent text-brand-bg hover:border-brand-accent-strong hover:bg-brand-accent-strong",
  secondary:
    "border border-brand-line-strong bg-brand-bg/60 text-stone-100 hover:border-brand-accent-strong hover:text-amber-400",
  whatsapp:
    "border border-brand-whatsapp bg-brand-whatsapp text-brand-bg hover:border-emerald-400 hover:bg-emerald-400",
  ghost: "border border-transparent text-amber-500 hover:text-amber-400",
  danger:
    "border border-brand-line-strong text-stone-300 hover:border-red-400 hover:text-red-300",
};

const SIZES = {
  sm: "min-h-[36px] px-3 py-1.5",
  md: "min-h-[44px] px-5 py-2.5",
  lg: "min-h-[56px] px-8 py-4",
};

const Button = forwardRef(function Button(
  {
    variant = "primary",
    size = "md",
    as: Tag = "button",
    icon: Icon,
    block = false,
    className,
    children,
    type,
    ...props
  },
  ref
) {
  return (
    <Tag
      ref={ref}
      type={Tag === "button" ? type || "button" : undefined}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-none text-center text-xs font-bold uppercase tracking-mega transition-colors",
        "disabled:pointer-events-none disabled:opacity-50",
        VARIANTS[variant],
        SIZES[size],
        block && "w-full",
        className
      )}
      {...props}
    >
      {Icon ? <Icon className="h-4 w-4 shrink-0" aria-hidden="true" /> : null}
      {children}
    </Tag>
  );
});

export default Button;
