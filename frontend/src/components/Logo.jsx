import { LOGO_URL } from "../data/i18n";
import { cn } from "../lib/utils";

export default function Logo({ className = "", size = "md" }) {
  const sizes = {
    sm: "h-10 w-10",
    md: "h-14 w-14",
    lg: "h-20 w-20",
    xl: "h-28 w-28 sm:h-32 sm:w-32",
    hero: "h-36 w-36 sm:h-44 sm:w-44 md:h-56 md:w-56 lg:h-64 lg:w-64",
  };
  return (
    <img
      src={LOGO_URL}
      alt="Burger & Grill logo"
      data-testid="brand-logo"
      className={cn(
        "object-contain drop-shadow-[0_0_20px_rgba(217,119,6,0.35)]",
        sizes[size] || sizes.md,
        className
      )}
      loading="eager"
    />
  );
}
