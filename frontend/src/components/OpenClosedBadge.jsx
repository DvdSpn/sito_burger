import { useEffect, useState } from "react";
import { computeOpenStatus } from "../data/hours";

export default function OpenClosedBadge({ t, variant = "dark" }) {
  const [status, setStatus] = useState(() => computeOpenStatus());

  useEffect(() => {
    const tick = () => setStatus(computeOpenStatus());
    tick();
    const id = setInterval(tick, 60000);
    return () => clearInterval(id);
  }, []);

  const isOpen = status.open;
  const dotClass = isOpen ? "bg-emerald-400" : "bg-red-500";

  let label = t("status.closed");
  if (isOpen && status.closesAt) {
    label = t("status.openNow", status.closesAt);
  } else if (!isOpen && status.nextOpen) {
    if (status.sameDay) {
      label = t("status.closedToday", status.nextOpen);
    } else if (status.dayOffset === 1) {
      label = t("status.closedTomorrow", status.nextOpen);
    } else {
      label = t("status.closedOn", t(`day.${status.nextDay}`), status.nextOpen);
    }
  }

  return (
    <div
      data-testid="open-status"
      data-open={isOpen}
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-bold uppercase tracking-mega backdrop-blur ${
        variant === "light"
          ? "border-stone-300 bg-white/80 text-stone-900"
          : isOpen
            ? "border-emerald-500/40 bg-emerald-500/5 text-emerald-300"
            : "border-red-700/40 bg-red-950/30 text-red-300"
      }`}
    >
      <span
        aria-hidden="true"
        className={`inline-flex h-2 w-2 shrink-0 rounded-full ${dotClass}`}
      />
      <span className="whitespace-nowrap">{label}</span>
    </div>
  );
}
