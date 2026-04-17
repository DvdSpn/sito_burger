import { useEffect, useMemo, useState } from "react";
import {
  AlertTriangle,
  CheckCircle2,
  Clock,
  MessageCircle,
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
  X,
} from "lucide-react";
import { useCart, formatPrice } from "../context/CartContext";
import { RESTAURANT } from "../data/menu";
import { getPickupPlan } from "../data/hours";
import Logo from "./Logo";
import { cn } from "../lib/utils";

export default function CartDrawer({ open, onClose, t, lang }) {
  const { items, inc, dec, remove, clear, count, total, hasKgItems } = useCart();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const [slotId, setSlotId] = useState(null);

  const plan = useMemo(() => getPickupPlan(new Date()), [open]);

  // auto-select first available slot if none selected
  useEffect(() => {
    if (slotId !== null) return;
    for (const g of plan.groups) {
      if (g.slots.length > 0) {
        setSlotId(g.slots[0].id);
        return;
      }
    }
  }, [plan, slotId]);

  const selectedSlot = useMemo(() => {
    for (const g of plan.groups) {
      const s = g.slots.find((x) => x.id === slotId);
      if (s) return { ...s, group: g };
    }
    return null;
  }, [plan, slotId]);

  useEffect(() => {
    if (!open) {
      setConfirmOpen(false);
      setSent(false);
    }
  }, [open]);

  useEffect(() => {
    if (!open) return undefined;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return undefined;
    const handler = (e) => {
      if (e.key === "Escape") {
        if (confirmOpen) setConfirmOpen(false);
        else onClose();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose, confirmOpen]);

  const mealLabel = (meal) => (meal === "lunch" ? t("cart.slot.lunch") : t("cart.slot.dinner"));
  const dayLabel = (offset) => (offset === 0 ? t("cart.slot.today") : t("cart.slot.tomorrow"));

  const slotSummaryLabel = () => {
    if (!selectedSlot) return t("cart.slot.pending");
    return `${mealLabel(selectedSlot.meal)} · ${dayLabel(selectedSlot.dayOffset)} · ${selectedSlot.label}`;
  };

  const buildOrderMessage = () => {
    if (items.length === 0) return "";
    const intro =
      lang === "en"
        ? "Hi Burger & Grill! I'd like to place this TAKEAWAY order:"
        : "Ciao Burger & Grill! Vorrei ordinare (ASPORTO):";
    const lines = items.map((i) => {
      const lineTotal =
        i.priceNum !== null ? ` → € ${formatPrice(i.priceNum * i.qty)}` : "";
      return `• ${i.qty}x ${i.name} (€ ${i.price})${lineTotal}`;
    });
    const totalLine =
      lang === "en"
        ? `Total: € ${formatPrice(total)}`
        : `Totale: € ${formatPrice(total)}`;
    const pickupLine = selectedSlot
      ? lang === "en"
        ? `Pickup: ${mealLabel(selectedSlot.meal)} ${dayLabel(selectedSlot.dayOffset)} around ${selectedSlot.label}`
        : `Ritiro: ${mealLabel(selectedSlot.meal)} ${dayLabel(selectedSlot.dayOffset)} verso le ${selectedSlot.label}`
      : lang === "en"
        ? "Pickup: to be agreed"
        : "Ritiro: da concordare";
    const note = hasKgItems
      ? lang === "en"
        ? "\n(some items priced per kg — final amount on weigh-in)"
        : "\n(alcuni articoli al kg — importo finale a pesata)"
      : "";
    const footer =
      lang === "en"
        ? "\nPlease confirm the order and pickup time — thank you!"
        : "\nConfermatemi per favore ordine e orario di ritiro — grazie!";
    return `${intro}\n\n${lines.join("\n")}\n\n${pickupLine}\n\n${totalLine}${note}${footer}`;
  };

  const sendOrder = () => {
    const msg = buildOrderMessage();
    if (!msg) return;
    const url = `https://wa.me/${RESTAURANT.whatsappNumber}?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank", "noopener,noreferrer");
    setConfirmOpen(false);
    setSent(true);
  };

  const closeAndReset = () => {
    setSent(false);
    clear();
    onClose();
  };

  const askConfirm = () => {
    if (items.length === 0) return;
    setConfirmOpen(true);
  };

  return (
    <div
      aria-hidden={!open}
      className={`fixed inset-0 z-50 transition-all ${open ? "pointer-events-auto" : "pointer-events-none"}`}
      data-testid="cart-drawer"
    >
      <div
        className={`absolute inset-0 bg-stone-950/80 backdrop-blur-sm transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0"}`}
        onClick={onClose}
        data-testid="cart-backdrop"
      />

      <aside
        role="dialog"
        aria-modal="true"
        aria-label={t("cart.title")}
        className={`absolute right-0 top-0 flex h-full w-full max-w-md flex-col border-l border-stone-800 bg-stone-950 shadow-2xl transition-transform duration-500 ease-out ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* header */}
        <div className="flex items-center justify-between border-b border-stone-800 px-5 py-4">
          <div className="flex items-center gap-3">
            <Logo size="sm" />
            <div>
              <p className="text-[10px] font-bold uppercase tracking-mega text-amber-500">
                {sent ? t("cart.sent.kicker") : t("cart.kicker")}
              </p>
              <p className="font-display text-xl text-stone-50">
                {sent ? t("cart.sent.title") : t("cart.title")}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={sent ? closeAndReset : onClose}
            data-testid="cart-close-btn"
            aria-label={t("cart.close")}
            className="grid h-10 w-10 place-items-center rounded-sm border border-stone-700 text-stone-300 transition-colors hover:border-amber-600 hover:text-amber-500"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {sent ? (
          <div className="flex flex-1 flex-col overflow-y-auto" data-testid="cart-sent-screen">
            <div className="flex flex-col items-center justify-center gap-5 px-5 py-10 text-center">
              <div className="grid h-16 w-16 place-items-center rounded-full border border-emerald-400/40 bg-emerald-500/10">
                <CheckCircle2 className="h-8 w-8 text-emerald-400" />
              </div>
              <h3 className="font-display text-2xl font-black leading-tight text-stone-50 sm:text-3xl">
                {t("cart.sent.heading")}
              </h3>
              <p className="max-w-sm text-sm leading-relaxed text-stone-400">
                {t("cart.sent.body")}
              </p>
            </div>

            <div className="mx-5 mb-5 rounded-sm border border-amber-700/30 bg-amber-500/5 p-4">
              <div className="flex items-start gap-3">
                <MessageCircle className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-mega text-amber-500">
                    {t("cart.sent.step1.title")}
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-stone-300">
                    {t("cart.sent.step1.body")}
                  </p>
                </div>
              </div>
              <div className="mt-4 flex items-start gap-3">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-mega text-amber-500">
                    {t("cart.sent.step2.title")}
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-stone-300">
                    {t("cart.sent.step2.body")}
                  </p>
                </div>
              </div>
            </div>

            <div className="mx-5 mb-5 rounded-sm border border-red-900/50 bg-red-950/20 p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-red-400" />
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-mega text-red-400">
                    {t("cart.sent.alert.title")}
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-stone-300">
                    {t("cart.sent.alert.body")}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-auto border-t border-stone-800 p-5">
              <a
                href={`tel:${RESTAURANT.phoneMobile.replace(/\s/g, "")}`}
                data-testid="cart-sent-call-btn"
                className="mb-3 flex w-full items-center justify-center gap-2 rounded-sm border border-stone-700 px-4 py-3 text-[11px] font-bold uppercase tracking-mega text-stone-300 transition-colors hover:border-amber-600 hover:text-amber-500"
              >
                {t("cart.sent.callBtn")} · {RESTAURANT.phoneMobile}
              </a>
              <button
                type="button"
                onClick={closeAndReset}
                data-testid="cart-sent-close-btn"
                className="w-full rounded-sm bg-amber-600 px-5 py-3 text-xs font-bold uppercase tracking-mega text-stone-950 transition-colors hover:bg-amber-500"
              >
                {t("cart.sent.closeBtn")}
              </button>
            </div>
          </div>
        ) : (
          <>
            <div data-testid="cart-items" className="flex-1 overflow-y-auto px-5 py-4">
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
                <>
                  {/* Takeaway-only notice */}
                  <div className="mb-5 rounded-sm border border-amber-700/30 bg-amber-500/5 px-3 py-2">
                    <p className="text-[10px] uppercase tracking-mega text-amber-500">
                      {t("cart.takeawayOnly")}
                    </p>
                    <p className="mt-0.5 text-[11px] leading-relaxed text-stone-400">
                      {t("cart.takeawayOnlyNote")}
                    </p>
                  </div>

                  <ul className="space-y-4">
                    {items.map((i) => (
                      <li
                        key={i.name}
                        data-testid={`cart-row-${i.name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "")}`}
                        className="border-b border-stone-800/60 pb-4"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0 flex-1">
                            <p className="font-display text-base font-semibold leading-tight text-stone-50 sm:text-lg">
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
                        <div className="mt-2.5 flex items-center justify-between">
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
                          <p className="font-display text-base font-semibold text-amber-500 sm:text-lg">
                            {i.priceNum !== null
                              ? `€ ${formatPrice(i.priceNum * i.qty)}`
                              : t("cart.perKg")}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>

                  {/* Pickup time groups */}
                  <div className="mt-6">
                    <p className="mb-2 text-[11px] font-bold uppercase tracking-mega text-amber-500">
                      {t("cart.meta.pickup")}
                    </p>
                    {plan.groups.length === 0 ? (
                      <div className="rounded-sm border border-amber-700/30 bg-amber-500/5 p-3 text-[11px] leading-relaxed text-amber-400">
                        {t("cart.meta.closed")}
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {plan.groups.map((g, gi) => (
                          <div key={`${g.meal}-${g.dayOffset}`} data-testid={`slot-group-${g.meal}-${g.dayOffset}`}>
                            <p className="mb-1.5 text-[10px] font-bold uppercase tracking-mega text-stone-500">
                              {mealLabel(g.meal)} · {dayLabel(g.dayOffset)}
                            </p>
                            <div className="flex flex-wrap gap-1.5">
                              {g.slots.map((s) => (
                                <button
                                  key={s.id}
                                  type="button"
                                  onClick={() => setSlotId(s.id)}
                                  data-testid={`cart-slot-${s.id}`}
                                  className={cn(
                                    "rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-widest transition-colors",
                                    slotId === s.id
                                      ? "border-amber-500 bg-amber-600 text-stone-950"
                                      : "border-stone-700 bg-stone-900/60 text-stone-400 hover:border-amber-700 hover:text-amber-500"
                                  )}
                                >
                                  {s.label}
                                </button>
                              ))}
                            </div>
                            {gi < plan.groups.length - 1 && (
                              <div className="mt-3 border-t border-stone-800/60" />
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>

            {items.length > 0 && (
              <div className="border-t border-stone-800 px-5 py-4">
                <div className="mb-3 flex items-baseline justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-mega text-stone-500">
                    {t("cart.total")}
                  </span>
                  <span
                    data-testid="cart-total"
                    className="font-display text-2xl font-bold text-stone-50 sm:text-3xl"
                  >
                    € {formatPrice(total)}
                  </span>
                </div>
                {hasKgItems && (
                  <p className="mb-2 text-[11px] uppercase tracking-mega text-amber-500/80">
                    {t("cart.kgNote")}
                  </p>
                )}
                <button
                  type="button"
                  onClick={askConfirm}
                  data-testid="cart-send-order-btn"
                  className="w-full rounded-sm bg-[#25D366] px-4 py-3.5 text-xs font-bold uppercase tracking-mega text-stone-950 transition-colors hover:bg-emerald-400"
                >
                  {t("cart.sendOrder")} · {count}{" "}
                  {count === 1 ? t("cart.itemSingular") : t("cart.itemPlural")}
                </button>
                <button
                  type="button"
                  onClick={clear}
                  data-testid="cart-clear-btn"
                  className="mt-2.5 w-full rounded-sm border border-stone-700 px-5 py-2.5 text-[10px] font-bold uppercase tracking-mega text-stone-500 transition-colors hover:border-red-800 hover:text-red-400"
                >
                  {t("cart.clear")}
                </button>
                <p className="mt-3 text-[10px] leading-relaxed text-stone-600">
                  {t("cart.disclaimer")}
                </p>
              </div>
            )}
          </>
        )}
      </aside>

      {/* Confirm modal */}
      <div
        aria-hidden={!confirmOpen}
        className={`absolute inset-0 z-[60] flex items-center justify-center p-4 transition-all ${
          confirmOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
        data-testid="confirm-modal"
      >
        <div
          className={`absolute inset-0 bg-stone-950/85 backdrop-blur-md transition-opacity duration-300 ${
            confirmOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setConfirmOpen(false)}
          data-testid="confirm-backdrop"
        />
        <div
          role="alertdialog"
          aria-modal="true"
          className={`relative w-full max-w-md overflow-hidden rounded-sm border border-amber-700/40 bg-stone-900 shadow-[0_0_80px_-10px_rgba(217,119,6,0.25)] transition-all duration-300 ${
            confirmOpen
              ? "translate-y-0 opacity-100 scale-100"
              : "translate-y-4 opacity-0 scale-95"
          }`}
        >
          <div className="flex items-start gap-4 border-b border-stone-800 p-5">
            <div className="grid h-11 w-11 shrink-0 place-items-center rounded-sm border border-amber-700/40 bg-amber-600/10">
              <CheckCircle2 className="h-6 w-6 text-amber-500" />
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-mega text-amber-500">
                {t("confirm.kicker")}
              </p>
              <p className="mt-1 font-display text-xl leading-tight text-stone-50 sm:text-2xl">
                {t("confirm.title")}
              </p>
            </div>
          </div>

          <div className="max-h-[50vh] overflow-y-auto px-5 py-4">
            <ul className="space-y-2">
              {items.map((i) => (
                <li
                  key={i.name}
                  className="flex items-baseline justify-between gap-3 text-sm"
                >
                  <span className="text-stone-300">
                    <span className="font-display text-base font-bold text-amber-500">
                      {i.qty}x
                    </span>{" "}
                    {i.name}
                  </span>
                  <span className="font-display text-stone-50">
                    {i.priceNum !== null
                      ? `€ ${formatPrice(i.priceNum * i.qty)}`
                      : t("cart.perKg")}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-4 space-y-1 border-t border-stone-800 pt-3 text-xs">
              <div className="flex justify-between gap-2">
                <span className="uppercase tracking-mega text-stone-500">
                  {t("cart.meta.mode")}
                </span>
                <span className="font-display text-stone-50">
                  {t("cart.meta.takeaway")}
                </span>
              </div>
              <div className="flex justify-between gap-2">
                <span className="uppercase tracking-mega text-stone-500">
                  {t("cart.meta.pickup")}
                </span>
                <span className="text-right font-display text-stone-50">
                  {slotSummaryLabel()}
                </span>
              </div>
            </div>

            <div className="mt-4 flex items-baseline justify-between border-t border-stone-800 pt-3">
              <span className="text-[11px] font-bold uppercase tracking-mega text-stone-500">
                {t("cart.total")}
              </span>
              <span
                data-testid="confirm-total"
                className="font-display text-2xl font-bold text-stone-50"
              >
                € {formatPrice(total)}
              </span>
            </div>
            {hasKgItems && (
              <p className="mt-2 text-[10px] uppercase tracking-mega text-amber-500/80">
                {t("cart.kgNote")}
              </p>
            )}
            <p className="mt-4 text-xs leading-relaxed text-stone-400">
              {t("confirm.body")}
            </p>
          </div>

          <div className="flex gap-3 border-t border-stone-800 bg-stone-950/40 p-4">
            <button
              type="button"
              onClick={() => setConfirmOpen(false)}
              data-testid="confirm-cancel-btn"
              className="flex-1 rounded-sm border border-stone-700 px-4 py-3 text-[11px] font-bold uppercase tracking-mega text-stone-300 transition-colors hover:border-stone-500 hover:text-stone-50"
            >
              {t("confirm.cancel")}
            </button>
            <button
              type="button"
              onClick={sendOrder}
              data-testid="confirm-send-btn"
              className="flex-[1.4] rounded-sm bg-[#25D366] px-4 py-3 text-[11px] font-bold uppercase tracking-mega text-stone-950 transition-colors hover:bg-emerald-400"
            >
              {t("confirm.send")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
