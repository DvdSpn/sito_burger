import { Flame, Leaf, Minus, Plus, Sparkles } from "lucide-react";
import { cn } from "../lib/utils";
import { useCart } from "../context/CartContext";
import AllergenIcons from "./AllergenIcons";

const TAG_META = {
  veg: {
    className: "border-green-900 bg-green-950/40 text-green-400",
    Icon: Leaf,
  },
  spicy: {
    className: "border-red-900 bg-red-950/40 text-red-400",
    Icon: Flame,
  },
  beef: {
    className: "border-amber-900 bg-amber-950/40 text-amber-400",
    Icon: null,
  },
  chicken: {
    className: "border-stone-700 bg-stone-900 text-stone-300",
    Icon: null,
  },
  pork: {
    className: "border-orange-900 bg-orange-950/40 text-orange-400",
    Icon: null,
  },
};

function Tag({ type, t }) {
  const meta = TAG_META[type];
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
      {t(`tag.${type}`)}
    </span>
  );
}

export default function MenuItem({ item, dim, t, lang }) {
  const { add, inc, dec, getQty } = useCart();
  const qty = getQty(item.name);
  const itemId = item.name
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");

  return (
    <article
      data-testid={`menu-item-${itemId}`}
      className={cn(
        "group relative border-b border-stone-800/80 py-6 transition-all",
        dim ? "opacity-30" : "opacity-100"
      )}
    >
      {(item.signature || item.isNew || item.popular) && (
        <div className="mb-2 flex flex-wrap gap-1.5">
          {item.isNew && (
            <span
              data-testid={`new-${itemId}`}
              className="inline-flex items-center gap-1 rounded-sm bg-emerald-500 px-2 py-0.5 text-[9px] font-bold uppercase tracking-mega text-stone-950"
            >
              <Sparkles className="h-2.5 w-2.5" /> {t("tag.new")}
            </span>
          )}
          {item.popular && (
            <span
              data-testid={`popular-${itemId}`}
              className="inline-flex items-center gap-1 rounded-sm bg-rose-500 px-2 py-0.5 text-[9px] font-bold uppercase tracking-mega text-stone-950"
            >
              <Sparkles className="h-2.5 w-2.5" /> {t("tag.popular")}
            </span>
          )}
          {item.signature && (
            <span
              data-testid={`signature-${itemId}`}
              className="inline-flex items-center gap-1 rounded-sm bg-amber-600 px-2 py-0.5 text-[9px] font-bold uppercase tracking-mega text-stone-950"
            >
              <Sparkles className="h-2.5 w-2.5" /> {t("tag.signature")}
            </span>
          )}
        </div>
      )}

      <div className="flex items-start md:items-baseline">
        <h3 className="font-display text-xl font-bold leading-tight text-stone-50 transition-colors group-hover:text-amber-400 md:text-2xl">
          {item.name}
        </h3>
        <span className="leader hidden md:block" />
        <span className="ml-auto shrink-0 font-display text-xl font-semibold text-amber-500 md:ml-0 md:text-2xl">
          € {item.price}
        </span>
      </div>

      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-stone-400">
        {lang === "en" && item.descEn ? item.descEn : item.desc}
      </p>

      {item.allergens && item.allergens.length > 0 && (
        <div className="mt-3 flex items-center gap-2">
          <span className="text-[9px] font-bold uppercase tracking-mega text-stone-600">
            {t("menu.contains")}
          </span>
          <AllergenIcons allergens={item.allergens} lang={lang} />
        </div>
      )}

      <div className="mt-3 flex flex-wrap items-center gap-2">
        {item.tags.map((ty) => (
          <Tag type={ty} key={ty} t={t} />
        ))}

        <div className="ml-auto">
          {qty === 0 ? (
            <button
              type="button"
              onClick={() => add(item)}
              data-testid={`add-to-cart-${itemId}`}
              className="inline-flex items-center gap-2 rounded-sm border border-amber-700/40 bg-amber-600/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-mega text-amber-500 transition-colors hover:border-amber-500 hover:bg-amber-600 hover:text-stone-950"
            >
              <Plus className="h-3 w-3" /> {t("menu.add")}
            </button>
          ) : (
            <div
              data-testid={`qty-controls-${itemId}`}
              className="inline-flex items-center rounded-sm border border-amber-600 bg-amber-600 text-stone-950"
            >
              <button
                type="button"
                onClick={() => dec(item.name)}
                aria-label={t("cart.decrease")}
                data-testid={`dec-${itemId}`}
                className="grid h-8 w-8 place-items-center transition-colors hover:bg-amber-500"
              >
                <Minus className="h-3 w-3" />
              </button>
              <span className="min-w-[1.75rem] text-center font-display text-sm font-bold">
                {qty}
              </span>
              <button
                type="button"
                onClick={() => inc(item.name)}
                aria-label={t("cart.increase")}
                data-testid={`inc-${itemId}`}
                className="grid h-8 w-8 place-items-center transition-colors hover:bg-amber-500"
              >
                <Plus className="h-3 w-3" />
              </button>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
