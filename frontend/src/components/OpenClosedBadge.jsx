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

  let mainLabel = t("status.closed");
  let subLabel = null;

  if (isOpen) {
    mainLabel = t("status.openNow");
    if (status.closesAt) subLabel = t("status.until", status.closesAt);
  } else if (status.nextOpen) {
    if (status.sameDay) {
      mainLabel = t("status.closedNow");
      subLabel = t("status.reopensToday", status.nextOpen);
    } else {
      mainLabel = t("status.closedNow");
      subLabel = t("status.reopensTomorrow", status.nextOpen);
    }
  }

  return (
    <div data-testid="open-status" data-open={isOpen} className="inline-flex flex-col items-start gap-1 sm:flex-row sm:items-center sm:gap-2">
      <div
        className={`inline-flex items-center gap-2 rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-mega backdrop-blur md:px-3 md:py-1.5 ${
          variant === "light"
            ? "border-stone-300 bg-white/80 text-stone-900"
            : isOpen
              ? "border-emerald-500/40 bg-emerald-500/5 text-emerald-300"
              : "border-red-700/40 bg-red-950/30 text-red-300"
        }`}
      >
        <span className="relative flex h-2 w-2 shrink-0">
          {isOpen && (
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
          )}
          <span className={`relative inline-flex h-2 w-2 rounded-full ${dotClass}`} />
        </span>
        <span className="whitespace-nowrap">{mainLabel}</span>
      </div>
      {subLabel && (
        <span className="text-[10px] font-bold uppercase tracking-mega text-amber-500/90">
          {subLabel}
        </span>
      )}
    </div>
  );
}
