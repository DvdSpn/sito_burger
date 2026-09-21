import { LOGO_URL } from "../data/i18n";
import { cn } from "../lib/utils";

// Hero / Footer / MobileMenu: huge and highly visible
const SIZE_DEFAULT =
  "h-32 w-32 sm:h-40 sm:w-40 md:h-48 md:w-48 lg:h-56 lg:w-56 xl:h-64 xl:w-64";

// Sticky nav / compact headers: still prominent but doesn't eat the viewport
const SIZE_COMPACT = "h-14 w-14 sm:h-16 sm:w-16 md:h-20 md:w-20";

// Sticky nav on scroll-down: minimal footprint on mobile, keeps the
// desktop size untouched (matches compact from md and up).
const SIZE_TINY = "h-9 w-9 sm:h-10 sm:w-10 md:h-20 md:w-20";

export default function Logo({ className = "", size = "default" }) {
  const sizeClass =
    size === "tiny"
      ? SIZE_TINY
      : size === "compact"
      ? SIZE_COMPACT
      : SIZE_DEFAULT;
  return (
    <img
      src={LOGO_URL}
      alt="Burger & Grill logo"
      data-testid="brand-logo"
      className={cn(
        "object-contain drop-shadow-[0_0_32px_rgba(217,119,6,0.75)] transition-all duration-300",
        sizeClass,
        className
      )}
      loading="eager"
    />
  );
}
