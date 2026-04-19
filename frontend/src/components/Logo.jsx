import { LOGO_URL } from "../data/i18n";
import { cn } from "../lib/utils";

export default function Logo({ className = "", size = "md" }) {
  const sizes = {
    sm: "h-10 w-10",
    md: "h-14 w-14",
    lg: "h-20 w-20",
    xl: "h-28 w-28 sm:h-32 sm:w-32",
    hero: "h-28 w-28 sm:h-36 sm:w-36 md:h-44 md:w-44 lg:h-52 lg:w-52",
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
