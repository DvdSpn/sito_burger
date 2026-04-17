import { useEffect } from "react";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { useCart, formatPrice } from "../context/CartContext";
import { RESTAURANT } from "../data/menu";
import Logo from "./Logo";

export default function CartDrawer({ open, onClose, t, lang }) {
  const { items, inc, dec, remove, clear, count, total, hasKgItems } = useCart();

  // lock body scroll
  useEffect(() => {
    if (!open) return undefined;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // close on ESC
  useEffect(() => {
    if (!open) return undefined;
    const handler = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  const buildOrderMessage = () => {
    if (items.length === 0) return "";
    const intro =
      lang === "en"
        ? "Hi Burger & Grill! I'd like to place this order:"
        : "Ciao Burger & Grill! Vorrei ordinare:";
    const lines = items.map((i) => {
      const lineTotal =
        i.priceNum !== null ? ` → € ${formatPrice(i.priceNum * i.qty)}` : "";
      return `• ${i.qty}x ${i.name} (€ ${i.price})${lineTotal}`;
    });
    const totalLine =
      lang === "en"
        ? `Total: € ${formatPrice(total)}`
        : `Totale: € ${formatPrice(total)}`;
    const note = hasKgItems
      ? lang === "en"
        ? "\n(some items priced per kg — final amount on weigh-in)"
        : "\n(alcuni articoli al kg — importo finale a pesata)"
      : "";
    return `${intro}\n\n${lines.join("\n")}\n\n${totalLine}${note}`;
  };

  const sendOrder = () => {
    const msg = buildOrderMessage();
    if (!msg) return;
    const url = `https://wa.me/${RESTAURANT.whatsappNumber}?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div
      aria-hidden={!open}
      className={`fixed inset-0 z-50 transition-all ${open ? "pointer-events-auto" : "pointer-events-none"}`}
      data-testid="cart-drawer"
    >
      {/* backdrop */}
      <div
        className={`absolute inset-0 bg-stone-950/80 backdrop-blur-sm transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0"}`}
        onClick={onClose}
        data-testid="cart-backdrop"
      />

      {/* panel */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label={t("cart.title")}
        className={`absolute right-0 top-0 flex h-full w-full max-w-md flex-col border-l border-stone-800 bg-stone-950 shadow-2xl transition-transform duration-500 ease-out ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* header */}
        <div className="flex items-center justify-between border-b border-stone-800 px-6 py-5">
          <div className="flex items-center gap-3">
            <Logo size="sm" />
            <div>
              <p className="text-[10px] font-bold uppercase tracking-mega text-amber-500">
                {t("cart.kicker")}
              </p>
              <p className="font-display text-xl text-stone-50">
                {t("cart.title")}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            data-testid="cart-close-btn"
            aria-label={t("cart.close")}
            className="grid h-10 w-10 place-items-center rounded-sm border border-stone-700 text-stone-300 transition-colors hover:border-amber-600 hover:text-amber-500"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* items */}
        <div
          data-testid="cart-items"
          className="flex-1 overflow-y-auto px-6 py-5"
        >
          {items.length === 0 ? (
            <div
              data-testid="cart-empty"
              className="flex h-full flex-col items-center justify-center gap-4 py-16 text-center"
            >
              <ShoppingBag className="h-12 w-12 text-stone-700" />
              <p className="font-display text-2xl text-stone-50">
                {t("cart.empty.title")}
              </p>
              <p className="max-w-xs text-sm text-stone-400">
                {t("cart.empty.subtitle")}
              </p>
            </div>
          ) : (
            <ul className="space-y-5">
              {items.map((i) => (
                <li
                  key={i.name}
                  data-testid={`cart-row-${i.name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "")}`}
                  className="border-b border-stone-800/60 pb-5"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <p className="font-display text-lg font-semibold leading-tight text-stone-50">
                        {i.name}
                      </p>
                      <p className="text-xs text-stone-500">€ {i.price}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => remove(i.name)}
                      aria-label={t("cart.remove")}
                      data-testid={`cart-remove-${i.name}`}
                      className="shrink-0 text-stone-600 transition-colors hover:text-red-500"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <div className="inline-flex items-center rounded-sm border border-stone-700 bg-stone-900/60">
                      <button
                        type="button"
                        onClick={() => dec(i.name)}
                        aria-label={t("cart.decrease")}
                        data-testid={`cart-dec-${i.name}`}
                        className="grid h-9 w-9 place-items-center text-stone-300 transition-colors hover:bg-stone-800 hover:text-amber-500"
                      >
                        <Minus className="h-3.5 w-3.5" />
                      </button>
                      <span className="min-w-[2.25rem] px-1 text-center font-display text-base text-stone-50">
                        {i.qty}
                      </span>
                      <button
                        type="button"
                        onClick={() => inc(i.name)}
                        aria-label={t("cart.increase")}
                        data-testid={`cart-inc-${i.name}`}
                        className="grid h-9 w-9 place-items-center text-stone-300 transition-colors hover:bg-stone-800 hover:text-amber-500"
                      >
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                    </div>
                    <p className="font-display text-lg font-semibold text-amber-500">
                      {i.priceNum !== null
                        ? `€ ${formatPrice(i.priceNum * i.qty)}`
                        : t("cart.perKg")}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* footer / totals */}
        {items.length > 0 && (
          <div className="border-t border-stone-800 px-6 py-5">
            <div className="mb-4 flex items-baseline justify-between">
              <span className="text-[11px] font-bold uppercase tracking-mega text-stone-500">
                {t("cart.total")}
              </span>
              <span
                data-testid="cart-total"
                className="font-display text-3xl font-bold text-stone-50"
              >
                € {formatPrice(total)}
              </span>
            </div>
            {hasKgItems && (
              <p className="mb-3 text-[11px] uppercase tracking-mega text-amber-500/80">
                {t("cart.kgNote")}
              </p>
            )}
            <button
              type="button"
              onClick={sendOrder}
              data-testid="cart-send-order-btn"
              className="w-full rounded-sm bg-[#25D366] px-5 py-4 text-xs font-bold uppercase tracking-mega text-stone-950 transition-colors hover:bg-emerald-400"
            >
              {t("cart.sendOrder")} · {count}{" "}
              {count === 1 ? t("cart.itemSingular") : t("cart.itemPlural")}
            </button>
            <button
              type="button"
              onClick={clear}
              data-testid="cart-clear-btn"
              className="mt-3 w-full rounded-sm border border-stone-700 px-5 py-3 text-[10px] font-bold uppercase tracking-mega text-stone-500 transition-colors hover:border-red-800 hover:text-red-400"
            >
              {t("cart.clear")}
            </button>
            <p className="mt-4 text-[10px] leading-relaxed text-stone-600">
              {t("cart.disclaimer")}
            </p>
          </div>
        )}
      </aside>
    </div>
  );
}
