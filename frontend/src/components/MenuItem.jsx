import { Flame, Leaf, Sparkles } from "lucide-react";
import { cn } from "../lib/utils";

const TAG_STYLES = {
  veg: {
    label: "Veg",
    className: "border-green-900 bg-green-950/40 text-green-400",
    Icon: Leaf,
  },
  spicy: {
    label: "Piccante",
    className: "border-red-900 bg-red-950/40 text-red-400",
    Icon: Flame,
  },
  beef: {
    label: "Manzo",
    className: "border-amber-900 bg-amber-950/40 text-amber-400",
    Icon: null,
  },
  chicken: {
    label: "Pollo",
    className: "border-stone-700 bg-stone-900 text-stone-300",
    Icon: null,
  },
  pork: {
    label: "Maiale",
    className: "border-orange-900 bg-orange-950/40 text-orange-400",
    Icon: null,
  },
};

function Tag({ type }) {
  const meta = TAG_STYLES[type];
  if (!meta) return null;
  const { Icon } = meta;
  return (
    <span
      data-testid={`tag-${type}`}
      className={cn(
        "inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest",
        meta.className
      )}
    >
      {Icon ? <Icon className="h-2.5 w-2.5" /> : null}
      {meta.label}
    </span>
  );
}

export default function MenuItem({ item, dim, onOrder }) {
  return (
    <article
      data-testid={`menu-item-${item.name.toLowerCase().replace(/\s+/g, "-")}`}
      className={cn(
        "group relative border-b border-stone-800/80 py-6 transition-all",
        dim ? "opacity-30" : "opacity-100"
      )}
    >
      {item.signature && (
        <span
          data-testid={`signature-${item.name}`}
          className="absolute -left-2 top-6 hidden items-center gap-1 rounded-r-sm bg-amber-600 px-2 py-0.5 text-[9px] font-bold uppercase tracking-mega text-stone-950 md:inline-flex"
        >
          <Sparkles className="h-2.5 w-2.5" /> Signature
        </span>
      )}

      <div className="flex items-start md:items-baseline">
        <h3 className="font-display text-xl font-bold leading-tight text-stone-50 transition-colors group-hover:text-amber-400 md:text-2xl">
          {item.name}
        </h3>
        <span className="leader hidden md:block" />
        <span
          className={cn(
            "ml-auto shrink-0 font-display text-xl font-semibold md:ml-0 md:text-2xl",
            "text-amber-500"
          )}
        >
          € {item.price}
        </span>
      </div>

      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-stone-400">
        {item.desc}
      </p>

      <div className="mt-3 flex flex-wrap items-center gap-2">
        {item.tags.map((t) => (
          <Tag type={t} key={t} />
        ))}
        <button
          type="button"
          onClick={() => onOrder(item)}
          data-testid={`order-item-${item.name.toLowerCase().replace(/\s+/g, "-")}`}
          className="ml-auto text-[10px] font-bold uppercase tracking-mega text-stone-500 transition-colors hover:text-amber-500"
        >
          + Ordina via WhatsApp
        </button>
      </div>
    </article>
  );
}
