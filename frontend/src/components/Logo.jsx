import { LOGO_URL } from "../data/i18n";
import { cn } from "../lib/utils";

// Unified BIG logo size — always prominent and highly visible across all sections
const UNIFIED =
  "h-32 w-32 sm:h-40 sm:w-40 md:h-48 md:w-48 lg:h-56 lg:w-56 xl:h-64 xl:w-64";

export default function Logo({ className = "" }) {
  return (
    <img
      src={LOGO_URL}
      alt="Burger & Grill logo"
      data-testid="brand-logo"
      className={cn(
        "object-contain drop-shadow-[0_0_32px_rgba(217,119,6,0.75)]",
        UNIFIED,
        className
      )}
      loading="eager"
    />
  );
}
