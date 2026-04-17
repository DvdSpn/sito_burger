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
  const label = isOpen
    ? t("status.openNow")
    : status.nextOpen
      ? status.sameDay
        ? t("status.opensAt", status.nextOpen)
        : t("status.opensTomorrow", status.nextOpen)
      : t("status.closed");
  const sub = isOpen && status.closesAt ? t("status.until", status.closesAt) : null;

  return (
    <div
      data-testid="open-status"
      data-open={isOpen}
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[10px] font-bold uppercase tracking-mega backdrop-blur ${
        variant === "light"
          ? "border-stone-300 bg-white/80 text-stone-900"
          : "border-stone-700 bg-stone-950/60 text-stone-100"
      }`}
    >
      <span className="relative flex h-2 w-2">
        {isOpen && (
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
        )}
        <span className={`relative inline-flex h-2 w-2 rounded-full ${dotClass}`} />
      </span>
      <span>{label}</span>
      {sub && <span className="text-amber-500 normal-case">· {sub}</span>}
    </div>
  );
}
