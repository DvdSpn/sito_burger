import { ShoppingBag } from "lucide-react";
import { useCart } from "../context/CartContext";

export default function CartFab({ onClick, t }) {
  const { count } = useCart();
  return (
    <button
      type="button"
      onClick={onClick}
      data-testid="cart-fab"
      aria-label={t("cart.open")}
      className="wa-pulse fixed bottom-4 right-4 z-40 inline-flex items-center gap-2.5 rounded-full border border-amber-500/60 bg-stone-900/95 px-4 py-2.5 shadow-2xl backdrop-blur transition-transform hover:-translate-y-0.5 hover:border-amber-500 md:bottom-8 md:right-8 md:px-5 md:py-3"
    >
      <span className="relative grid h-5 w-5 place-items-center">
        <ShoppingBag className="h-5 w-5 text-amber-500" />
        {count > 0 && (
          <span
            data-testid="cart-fab-badge"
            className="absolute -right-2.5 -top-2.5 grid h-5 w-5 place-items-center rounded-full bg-amber-500 font-display text-[11px] font-black text-stone-950"
          >
            {count}
          </span>
        )}
      </span>
      <span className="flex flex-col items-start leading-tight">
        <span className="whitespace-nowrap text-[11px] font-bold uppercase tracking-mega text-stone-50">
          {count > 0 ? t("cart.fabWith") : t("cart.fab")}
        </span>
        <span className="whitespace-nowrap text-[8.5px] font-bold uppercase tracking-widest text-amber-400/80">
          {t("cart.takeawayOnly")}
        </span>
      </span>
    </button>
  );
}
