import { useEffect, useMemo, useRef, useState } from "react";
import {
  AlertTriangle,
  CheckCircle2,
  MessageCircle,
  Minus,
  Phone,
  Plus,
  ShoppingBag,
  Star,
  Trash2,
  X,
} from "lucide-react";
import { useCart, formatPrice } from "../context/CartContext";
import { RESTAURANT } from "../data/menu";
import { getPickupPlan, weekdayForOffset } from "../data/hours";
import useDialogFocus from "../hooks/useDialogFocus";
import Logo from "./Logo";
import Button from "./brand/Button";
import Chip from "./brand/Chip";

export default function CartDrawer({ open, onClose, t, lang }) {
  const { items, inc, dec, remove, setNote, clear, total, hasKgItems } = useCart();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const [slotId, setSlotId] = useState(null);
  const [planTick, setPlanTick] = useState(0);

  const rootRef = useRef(null);
  const closeBtnRef = useRef(null);
  const reviewBtnRef = useRef(null);
  const confirmSendRef = useRef(null);
  const sentHeadingRef = useRef(null);
  const slotsRef = useRef(null);
  const confirmWasOpen = useRef(false);

  // Keyboard focus stays inside the drawer while it is open and goes back to
  // the cart button when it closes. The confirm dialog lives in the same
  // container: whichever of the two is not active is `inert`.
  useDialogFocus(open, rootRef, closeBtnRef);

  // Recompute pickup plan every minute while the cart is open
  useEffect(() => {
    if (!open) return undefined;
    const id = setInterval(() => setPlanTick((v) => v + 1), 60000);
    return () => clearInterval(id);
  }, [open]);

  // On open: reset slot so we re-select the earliest valid one
  useEffect(() => {
    if (open) setSlotId(null);
  }, [open]);

  // planTick and open are the triggers for a fresh "now"
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const plan = useMemo(() => getPickupPlan(new Date()), [open, planTick]);

  // auto-select first available slot if none selected, or if current is gone
  useEffect(() => {
    const allIds = plan.groups.flatMap((g) => g.slots.map((s) => s.id));
    if (slotId && allIds.includes(slotId)) return;
    for (const g of plan.groups) {
      if (g.slots.length > 0) {
        setSlotId(g.slots[0].id);
        return;
      }
    }
    setSlotId(null);
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

  // Confirm dialog: focus its main button on open, back to "Rivedi l'ordine"
  // on cancel. After sending, focus moves to the final screen's heading.
  useEffect(() => {
    if (confirmOpen) {
      confirmWasOpen.current = true;
      const id = window.requestAnimationFrame(() => confirmSendRef.current?.focus());
      return () => window.cancelAnimationFrame(id);
    }
    if (confirmWasOpen.current) {
      confirmWasOpen.current = false;
      if (!sent) reviewBtnRef.current?.focus();
    }
    return undefined;
  }, [confirmOpen, sent]);

  useEffect(() => {
    if (!sent) return undefined;
    const id = window.requestAnimationFrame(() => sentHeadingRef.current?.focus());
    return () => window.cancelAnimationFrame(id);
  }, [sent]);

  const mealLabel = (meal) => (meal === "lunch" ? t("cart.slot.lunch") : t("cart.slot.dinner"));
  const dayLabel = (offset) => {
    if (offset === 0) return t("cart.slot.today");
    if (offset === 1) return t("cart.slot.tomorrow");
    return t(`day.${weekdayForOffset(offset)}`);
  };

  const slotSummaryLabel = () => {
    if (!selectedSlot) return t("cart.slot.pending");
    return `${mealLabel(selectedSlot.meal)} · ${dayLabel(selectedSlot.dayOffset)} · ${selectedSlot.label}`;
  };

  const buildOrderMessage = () => {
    if (items.length === 0) return "";
    const isEn = lang === "en";

    const header = isEn
      ? "*TAKEAWAY ORDER — Burger & Grill*"
      : "*ORDINE ASPORTO — Burger & Grill*";

    const lines = items.map((i) => {
      const lineTotal =
        i.priceNum !== null
          ? ` — € ${formatPrice(i.priceNum * i.qty)}`
          : ` — ${isEn ? "by weight" : "al kg"}`;
      const main = `• ${i.qty}× ${i.name}${lineTotal}`;
      const noteLine = i.note && i.note.trim()
        ? `\n   ↳ ${i.note.trim()}`
        : "";
      return `${main}${noteLine}`;
    });

    const pickupLine = selectedSlot
      ? isEn
        ? `🕒 Pickup: ${mealLabel(selectedSlot.meal)} ${dayLabel(selectedSlot.dayOffset)} · ${selectedSlot.label}`
        : `🕒 Ritiro: ${mealLabel(selectedSlot.meal)} ${dayLabel(selectedSlot.dayOffset)} · ${selectedSlot.label}`
      : isEn
        ? "🕒 Pickup: to be agreed"
        : "🕒 Ritiro: da concordare";

    const totalLine = isEn
      ? `💰 Total: € ${formatPrice(total)}`
      : `💰 Totale: € ${formatPrice(total)}`;

    const kgNote = hasKgItems
      ? isEn
        ? "\n_(some items priced per kg — final amount on weigh-in)_"
        : "\n_(alcuni articoli al kg — importo finale a pesata)_"
      : "";

    const closing = isEn
      ? "Please confirm — thanks! 🙏"
      : "Confermate per favore — grazie! 🙏";

    return `${header}\n\n${lines.join("\n")}\n\n${pickupLine}\n${totalLine}${kgNote}\n\n${closing}`;
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

  const backToCart = () => {
    setSent(false);
    window.requestAnimationFrame(() => reviewBtnRef.current?.focus());
  };

  const askConfirm = () => {
    if (items.length === 0) return;
    setConfirmOpen(true);
  };

  // "Cambia": bring the slot picker into view and put focus on the chosen slot
  const changeSlot = () => {
    const el = slotsRef.current;
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "center" });
    const btn = el.querySelector('[aria-pressed="true"]') || el.querySelector("button");
    if (btn) btn.focus({ preventScroll: true });
  };

  return (
    <div
      ref={rootRef}
      inert={open ? undefined : true}
      className={`fixed inset-0 z-panel transition-all ${open ? "pointer-events-auto" : "pointer-events-none"}`}
      data-testid="cart-drawer"
    >
      <div
        className={`absolute inset-0 bg-stone-950/80 backdrop-blur-sm transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0"}`}
        onClick={onClose}
        data-testid="cart-backdrop"
        aria-hidden="true"
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-drawer-title"
        inert={confirmOpen ? true : undefined}
        className={`absolute right-0 top-0 flex h-full w-full max-w-md flex-col border-l border-stone-800 bg-stone-950 shadow-2xl transition-transform duration-500 ease-out ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* header */}
        <div className="flex items-center justify-between border-b border-stone-800 px-5 py-4">
          <div className="flex items-center gap-3">
            <Logo size="compact" />
            <div>
              <p className="text-xs font-bold uppercase tracking-mega text-amber-500">
                {sent ? t("cart.sent.kicker") : t("cart.kicker")}
              </p>
              <h2 className="font-display text-xl text-stone-50" id="cart-drawer-title">
                {sent ? t("cart.sent.title") : t("cart.title")}
              </h2>
            </div>
          </div>
          <button
            ref={closeBtnRef}
            type="button"
            onClick={onClose}
            data-testid="cart-close-btn"
            aria-label={t("cart.close")}
            className="grid h-11 w-11 place-items-center rounded-none border border-stone-500 text-stone-300 transition-colors hover:border-amber-600 hover:text-amber-500"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        {sent ? (
          <div className="flex flex-1 flex-col overflow-y-auto" data-testid="cart-sent-screen">
            <div className="flex flex-col items-center justify-center gap-5 px-5 py-10 text-center">
              <div className="grid h-16 w-16 place-items-center rounded-full border border-amber-500/40 bg-amber-500/10">
                <MessageCircle className="h-8 w-8 text-amber-400" aria-hidden="true" />
              </div>
              <h3
                ref={sentHeadingRef}
                tabIndex={-1}
                className="font-display text-2xl font-black leading-tight text-stone-50 sm:text-3xl"
              >
                {t("cart.sent.heading")}
              </h3>
              <p className="max-w-sm text-sm leading-relaxed text-stone-300">
                {t("cart.sent.body")}
              </p>
            </div>

            <div className="mx-5 mb-5 rounded-none border border-red-900/50 bg-red-950/20 p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-red-400" aria-hidden="true" />
                <div>
                  <p className="text-xs font-bold uppercase tracking-mega text-red-300">
                    {t("cart.sent.alert.title")}
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-stone-300">
                    {t("cart.sent.alert.body")}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-auto space-y-3 border-t border-stone-800 p-5">
              <Button
                onClick={closeAndReset}
                data-testid="cart-sent-confirm-btn"
                block
                size="lg"
              >
                {t("cart.sent.confirmBtn")}
              </Button>
              <Button
                variant="secondary"
                onClick={backToCart}
                data-testid="cart-sent-back-btn"
                block
              >
                {t("cart.sent.backBtn")}
              </Button>
              <Button
                as="a"
                variant="secondary"
                icon={Phone}
                href={`tel:${RESTAURANT.phoneMobile.replace(/\s/g, "")}`}
                data-testid="cart-sent-call-btn"
                block
              >
                {t("cart.sent.callBtn")} · {RESTAURANT.phoneMobile}
              </Button>
              <Button
                as="a"
                variant="ghost"
                icon={Star}
                href={RESTAURANT.googleReviewUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="cart-sent-review-btn"
                block
              >
                {t("cart.sent.reviewBtn")}
              </Button>
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
                  <ShoppingBag className="h-12 w-12 text-stone-500" aria-hidden="true" />
                  <p className="font-display text-2xl text-stone-50">
                    {t("cart.empty.title")}
                  </p>
                  <p className="max-w-xs text-sm text-stone-300">
                    {t("cart.empty.subtitle")}
                  </p>
                  <Button
                    className="mt-2"
                    onClick={() => {
                      onClose();
                      setTimeout(() => {
                        const el = document.getElementById("menu");
                        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
                      }, 320);
                    }}
                    data-testid="cart-empty-browse-btn"
                  >
                    {t("cart.empty.cta")}
                  </Button>
                </div>
              ) : (
                <>
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
                            <p className="text-xs text-stone-400">€ {i.price}</p>
                          </div>
                          <button
                            type="button"
                            onClick={() => remove(i.name)}
                            aria-label={`${t("cart.remove")} ${i.name}`}
                            data-testid={`cart-remove-${i.name}`}
                            className="-mr-2 -mt-2 grid h-11 w-11 shrink-0 place-items-center text-stone-400 transition-colors hover:text-red-400"
                          >
                            <Trash2 className="h-4 w-4" aria-hidden="true" />
                          </button>
                        </div>
                        <div className="mt-2.5 flex items-center justify-between">
                          <div className="inline-flex items-center rounded-none border border-stone-500 bg-stone-900/60">
                            <button
                              type="button"
                              onClick={() => dec(i.name)}
                              aria-label={`${t("cart.decrease")}: ${i.name}`}
                              data-testid={`cart-dec-${i.name}`}
                              className="grid h-11 w-11 place-items-center text-stone-300 transition-colors hover:bg-stone-800 hover:text-amber-500"
                            >
                              <Minus className="h-3.5 w-3.5" aria-hidden="true" />
                            </button>
                            <span className="min-w-[2.25rem] px-1 text-center font-display text-base text-stone-50">
                              {i.qty}
                            </span>
                            <button
                              type="button"
                              onClick={() => inc(i.name)}
                              aria-label={`${t("cart.increase")}: ${i.name}`}
                              data-testid={`cart-inc-${i.name}`}
                              className="grid h-11 w-11 place-items-center text-stone-300 transition-colors hover:bg-stone-800 hover:text-amber-500"
                            >
                              <Plus className="h-3.5 w-3.5" aria-hidden="true" />
                            </button>
                          </div>
                          <p className="font-display text-base font-semibold text-amber-500 sm:text-lg">
                            {i.priceNum !== null
                              ? `€ ${formatPrice(i.priceNum * i.qty)}`
                              : t("cart.perKg")}
                          </p>
                        </div>

                        {/* Per-item modifications input */}
                        <div className="mt-3">
                          <label
                            htmlFor={`note-${i.name}`}
                            className="block text-xs font-bold uppercase tracking-mega text-amber-500"
                          >
                            {t("cart.note.label")}
                          </label>
                          <input
                            id={`note-${i.name}`}
                            type="text"
                            value={i.note || ""}
                            onChange={(e) => setNote(i.name, e.target.value.slice(0, 80))}
                            maxLength={80}
                            placeholder={t("cart.note.placeholder")}
                            data-testid={`cart-note-${i.name}`}
                            aria-describedby={`note-help-${i.name}`}
                            className="mt-1 block min-h-[44px] w-full rounded-none border border-stone-500 bg-stone-900/60 px-3 py-2 text-sm text-stone-100 placeholder:text-stone-400 focus:border-amber-500 focus:outline-none focus:ring-0"
                          />
                          <p
                            id={`note-help-${i.name}`}
                            className="mt-1 flex items-center justify-between gap-3 text-xs leading-relaxed text-stone-400"
                          >
                            <span>{t("cart.note.helper")}</span>
                            <span data-testid={`cart-note-counter-${i.name}`} className="shrink-0 tabular-nums">
                              {t("cart.note.counter", (i.note || "").length, 80)}
                            </span>
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>

                  {/* Pickup time groups */}
                  <div className="mt-6" ref={slotsRef} id="cart-pickup-slots">
                    <h3 className="mb-2 text-xs font-bold uppercase tracking-mega text-amber-500">
                      {t("cart.meta.pickup")}
                    </h3>
                    {plan.groups.length === 0 ? (
                      <div className="rounded-none border border-amber-700/30 bg-amber-500/5 p-3 text-sm leading-relaxed text-amber-200">
                        {t("cart.meta.closed")}
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {plan.groups.map((g, gi) => (
                          <div
                            key={`${g.meal}-${g.dayOffset}`}
                            data-testid={`slot-group-${g.meal}-${g.dayOffset}`}
                            role="group"
                            aria-label={`${mealLabel(g.meal)} · ${dayLabel(g.dayOffset)}`}
                          >
                            <p className="mb-1.5 text-xs font-bold uppercase tracking-mega text-stone-400" aria-hidden="true">
                              {mealLabel(g.meal)} · {dayLabel(g.dayOffset)}
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {g.slots.map((s) => (
                                <Chip
                                  key={s.id}
                                  selected={slotId === s.id}
                                  onClick={() => setSlotId(s.id)}
                                  data-testid={`cart-slot-${s.id}`}
                                >
                                  {s.label}
                                </Chip>
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
                  <span className="text-xs font-bold uppercase tracking-mega text-stone-300">
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
                  <p className="mb-2 text-sm text-amber-200">
                    {t("cart.kgNote")}
                  </p>
                )}
                {selectedSlot && (
                  <div
                    className="mb-3 flex items-center justify-between gap-3 rounded-none border border-stone-500 bg-stone-900/60 py-1 pl-3 pr-1 text-sm text-stone-200"
                    data-testid="cart-pickup-line"
                  >
                    <span className="min-w-0 truncate">
                      {t("cart.pickup.line",
                        mealLabel(selectedSlot.meal),
                        dayLabel(selectedSlot.dayOffset),
                        selectedSlot.label)}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={changeSlot}
                      aria-controls="cart-pickup-slots"
                      data-testid="cart-pickup-change-btn"
                      className="min-h-[44px] shrink-0"
                    >
                      {t("cart.pickup.change")}
                    </Button>
                  </div>
                )}
                <Button
                  ref={reviewBtnRef}
                  variant="whatsapp"
                  size="lg"
                  block
                  onClick={askConfirm}
                  data-testid="cart-send-order-btn"
                >
                  {t("cart.reviewOrder", formatPrice(total))}
                </Button>
                <Button
                  variant="danger"
                  block
                  className="mt-2.5"
                  onClick={clear}
                  data-testid="cart-clear-btn"
                >
                  {t("cart.clear")}
                </Button>
                <p className="mt-3 text-xs leading-relaxed text-stone-300">
                  {t("cart.disclaimer")}
                </p>
              </div>
            )}
          </>
        )}
      </div>

      {/* Confirm modal */}
      <div
        inert={confirmOpen ? undefined : true}
        className={`absolute inset-0 z-modal flex items-center justify-center p-4 transition-all ${
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
          aria-hidden="true"
        />
        <div
          role="alertdialog"
          aria-modal="true"
          aria-labelledby="confirm-title"
          aria-describedby="confirm-body"
          className={`relative w-full max-w-md overflow-hidden rounded-none border border-amber-700/40 bg-stone-900 shadow-[0_0_80px_-10px_rgba(217,119,6,0.25)] transition-all duration-300 ${
            confirmOpen
              ? "translate-y-0 opacity-100 scale-100"
              : "translate-y-4 opacity-0 scale-95"
          }`}
        >
          <div className="flex items-start gap-4 border-b border-stone-800 p-5">
            <div className="grid h-11 w-11 shrink-0 place-items-center rounded-none border border-amber-700/40 bg-amber-600/10">
              <CheckCircle2 className="h-6 w-6 text-amber-500" aria-hidden="true" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-mega text-amber-500">
                {t("confirm.kicker")}
              </p>
              <h2 id="confirm-title" className="mt-1 font-display text-xl leading-tight text-stone-50 sm:text-2xl">
                {t("confirm.title")}
              </h2>
            </div>
          </div>

          <div className="max-h-[50vh] overflow-y-auto px-5 py-4">
            <ul className="space-y-2">
              {items.map((i) => (
                <li
                  key={i.name}
                  className="text-sm"
                >
                  <div className="flex items-baseline justify-between gap-3">
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
                  </div>
                  {i.note && i.note.trim() && (
                    <p className="mt-0.5 pl-1 text-xs italic text-amber-300">
                      ↳ {i.note.trim()}
                    </p>
                  )}
                </li>
              ))}
            </ul>

            <div className="mt-4 space-y-1 border-t border-stone-800 pt-3 text-xs">
              <div className="flex justify-between gap-2">
                <span className="uppercase tracking-mega text-stone-400">
                  {t("cart.meta.mode")}
                </span>
                <span className="font-display text-stone-50">
                  {t("cart.meta.takeaway")}
                </span>
              </div>
              <div className="flex justify-between gap-2">
                <span className="uppercase tracking-mega text-stone-400">
                  {t("cart.meta.pickup")}
                </span>
                <span className="text-right font-display text-stone-50">
                  {slotSummaryLabel()}
                </span>
              </div>
            </div>

            <div className="mt-4 flex items-baseline justify-between border-t border-stone-800 pt-3">
              <span className="text-xs font-bold uppercase tracking-mega text-stone-400">
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
              <p className="mt-2 text-sm text-amber-200">
                {t("cart.kgNote")}
              </p>
            )}
            <p id="confirm-body" className="mt-4 text-sm leading-relaxed text-stone-300">
              {t("confirm.body")}
            </p>
          </div>

          <div className="flex gap-3 border-t border-stone-800 bg-stone-950/40 p-4">
            <Button
              variant="secondary"
              className="flex-1"
              onClick={() => setConfirmOpen(false)}
              data-testid="confirm-cancel-btn"
            >
              {t("confirm.cancel")}
            </Button>
            <Button
              ref={confirmSendRef}
              variant="whatsapp"
              className="flex-[1.4]"
              onClick={sendOrder}
              data-testid="confirm-send-btn"
            >
              {t("confirm.send")}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
