import { useEffect, useRef, useState } from "react";
import { ArrowRight, ShoppingBag } from "lucide-react";
import { cn } from "../lib/utils";
import { useCart, formatPrice } from "../context/CartContext";

export default function CartFab({ onClick, t }) {
  const { count, total } = useCart();
  const filled = count > 0;
  const prevCountRef = useRef(count);
  const [pulse, setPulse] = useState(false);

  // Pulse once (~1.5 s) only when the item count increases.
  useEffect(() => {
    if (count > prevCountRef.current) {
      setPulse(true);
      const id = setTimeout(() => setPulse(false), 1500);
      prevCountRef.current = count;
      return () => clearTimeout(id);
    }
    prevCountRef.current = count;
  }, [count]);

  // Mobile-first: an empty cart is a small round icon in the corner, so it
  // never covers the menu; once something is added it becomes a full-width
  // order bar with the running total. From md it is the labelled pill.
  return (
    <button
      type="button"
      onClick={onClick}
      data-testid="cart-fab"
      aria-label={t("cart.fab", count)}
      className={cn(
        "fixed z-fab inline-flex min-h-[44px] items-center shadow-2xl backdrop-blur transition-transform hover:-translate-y-0.5",
        "bottom-[calc(0.75rem+env(safe-area-inset-bottom,0px))] md:bottom-8 md:right-8 md:left-auto md:w-auto md:gap-2.5 md:rounded-full md:border md:border-amber-500/60 md:bg-stone-900/95 md:px-5 md:py-3 md:text-stone-50 md:hover:border-amber-500",
        filled
          ? "left-3 right-3 justify-between gap-3 rounded-none bg-amber-500 px-4 py-3 text-stone-950"
          : "right-4 h-14 w-14 justify-center rounded-full border border-amber-500/60 bg-stone-900/95 md:h-auto",
        pulse ? "pulse-ring" : ""
      )}
    >
      <span className="flex items-center gap-2.5">
        <span className={cn("relative grid h-5 w-5 place-items-center", filled ? "md:mr-2" : "")}>
          <ShoppingBag
            className={cn("h-5 w-5 md:text-amber-500", filled ? "text-stone-950" : "text-amber-500")}
            aria-hidden="true"
          />
          {filled && (
            <span
              data-testid="cart-fab-badge"
              aria-hidden="true"
              className="absolute -right-2.5 -top-2.5 hidden h-5 w-5 place-items-center rounded-full bg-amber-500 font-display text-xs font-black text-stone-950 md:grid"
            >
              {count}
            </span>
          )}
        </span>
        <span
          className={cn(
            "flex-col items-start leading-tight md:flex",
            filled ? "flex" : "hidden"
          )}
        >
          <span className="whitespace-nowrap text-xs font-bold uppercase tracking-mega md:text-stone-50">
            {t("cart.fab", count)}
          </span>
          <span className="hidden whitespace-nowrap text-xs font-bold uppercase tracking-widest text-amber-400/80 md:block">
            {t("cart.takeawayOnly")}
          </span>
        </span>
      </span>
      {filled && (
        <span className="flex items-center gap-2 font-display text-base font-bold tabular-nums md:hidden">
          {total > 0 ? `€ ${formatPrice(total)}` : null}
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </span>
      )}
    </button>
  );
}
