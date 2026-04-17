import { LOGO_URL } from "../data/i18n";
import { cn } from "../lib/utils";

export default function Logo({ className = "", size = "md", withText = false }) {
  const sizes = {
    sm: "h-8 w-8",
    md: "h-12 w-12",
    lg: "h-20 w-20",
    xl: "h-32 w-32",
  };
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <img
        src={LOGO_URL}
        alt="Burger & Grill logo"
        data-testid="brand-logo"
        className={cn("object-contain", sizes[size] || sizes.md)}
        loading="eager"
      />
      {withText && (
        <span className="hidden text-[10px] tracking-mega uppercase text-amber-500/80 md:inline">
          Camucia · Cortona
        </span>
      )}
    </div>
  );
}
