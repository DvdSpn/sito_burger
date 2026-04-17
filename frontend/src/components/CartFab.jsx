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
      className="fixed bottom-6 left-6 z-40 inline-flex items-center gap-3 rounded-full border border-amber-500/60 bg-stone-900/95 px-5 py-3 shadow-2xl backdrop-blur transition-transform hover:-translate-y-0.5 hover:border-amber-500 md:bottom-10 md:left-10"
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
      <span className="text-xs font-bold uppercase tracking-mega text-stone-50">
        {t("cart.fab")}
      </span>
    </button>
  );
}
