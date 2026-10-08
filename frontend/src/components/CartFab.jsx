import { useEffect, useRef, useState } from "react";
import { ShoppingBag } from "lucide-react";
import { useCart } from "../context/CartContext";

export default function CartFab({ onClick, t }) {
  const { count } = useCart();
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

  return (
    <button
      type="button"
      onClick={onClick}
      data-testid="cart-fab"
      className={`fixed bottom-4 right-4 z-fab inline-flex min-h-[44px] items-center gap-2.5 rounded-full border border-amber-500/60 bg-stone-900/95 px-4 py-2.5 shadow-2xl backdrop-blur transition-transform hover:-translate-y-0.5 hover:border-amber-500 md:bottom-8 md:right-8 md:px-5 md:py-3 ${
        pulse ? "pulse-ring" : ""
      }`}
    >
      <span className={`relative grid h-5 w-5 place-items-center ${count > 0 ? "mr-2" : ""}`}>
        <ShoppingBag className="h-5 w-5 text-amber-500" aria-hidden="true" />
        {count > 0 && (
          <span
            data-testid="cart-fab-badge"
            aria-hidden="true"
            className="absolute -right-2.5 -top-2.5 grid h-5 w-5 place-items-center rounded-full bg-amber-500 font-display text-xs font-black text-stone-950"
          >
            {count}
          </span>
        )}
      </span>
      <span className="flex flex-col items-start leading-tight">
        <span className="whitespace-nowrap text-xs font-bold uppercase tracking-mega text-stone-50">
          {t("cart.fab", count)}
        </span>
        <span className="whitespace-nowrap text-xs font-bold uppercase tracking-widest text-amber-400/80">
          {t("cart.takeawayOnly")}
        </span>
      </span>
    </button>
  );
}
