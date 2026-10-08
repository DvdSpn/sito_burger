import { useEffect, useRef, useState } from "react";
import { Flame, Leaf, Minus, Plus, Sparkles } from "lucide-react";
import { cn } from "../lib/utils";
import { useCart } from "../context/CartContext";
import AllergenIcons from "./AllergenIcons";
import Badge from "./brand/Badge";

const TAG_META = {
  veg: {
    className: "border-green-900 bg-green-950/40 text-green-300",
    Icon: Leaf,
  },
  spicy: {
    className: "border-red-900 bg-red-950/40 text-red-300",
    Icon: Flame,
  },
  beef: {
    className: "border-amber-900 bg-amber-950/40 text-amber-300",
    Icon: null,
  },
  chicken: {
    className: "border-stone-500 bg-stone-900 text-stone-200",
    Icon: null,
  },
  pork: {
    className: "border-orange-900 bg-orange-950/40 text-orange-300",
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
        "inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-bold uppercase tracking-widest",
        meta.className
      )}
    >
      {Icon ? <Icon className="h-2.5 w-2.5" aria-hidden="true" /> : null}
      {t(`tag.${type}`)}
    </span>
  );
}

export default function MenuItem({ item, t, lang, variant = "row", className = "" }) {
  const { add, inc, dec, getQty, count: totalCount } = useCart();
  const qty = getQty(item.name);
  const incBtnRef = useRef(null);
  const [justAdded, setJustAdded] = useState(false);
  const prevQtyRef = useRef(qty);

  // When qty goes from 0 to 1 move focus to the "+" button that just appeared
  useEffect(() => {
    if (prevQtyRef.current === 0 && qty === 1 && incBtnRef.current) {
      incBtnRef.current.focus();
      setJustAdded(true);
      const id = setTimeout(() => setJustAdded(false), 2500);
      prevQtyRef.current = qty;
      return () => clearTimeout(id);
    }
    prevQtyRef.current = qty;
  }, [qty]);

  const itemId = item.name
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");

  const displayName = lang === "en" && item.nameEn ? item.nameEn : item.name;

  // The badge slot is always reserved so titles line up across the cards
  // of a row (swipe row on mobile, grid from md).
  const badges = (
    <div className="mb-2 flex min-h-[1.5rem] flex-wrap gap-1.5">
      {item.isNew && (
        <Badge variant="new" icon={Sparkles} data-testid={`new-${itemId}`}>
          {t("tag.new")}
        </Badge>
      )}
      {item.popular && (
        <Badge variant="popular" icon={Sparkles} data-testid={`popular-${itemId}`}>
          {t("tag.popular")}
        </Badge>
      )}
      {item.signature && (
        <Badge variant="signature" icon={Sparkles} data-testid={`signature-${itemId}`}>
          {t("tag.signature")}
        </Badge>
      )}
    </div>
  );

  const priceEl = (
    <span className="shrink-0 whitespace-nowrap font-display text-xl font-semibold tabular-nums text-amber-500 md:text-2xl">
      € {item.price}
    </span>
  );

  const descriptionEl = (
    <p className="mt-1.5 text-sm leading-relaxed text-stone-300 md:mt-2">
      {lang === "en" && item.descEn ? item.descEn : item.desc}
    </p>
  );

  const allergensEl = item.allergens && item.allergens.length > 0 && (
    <p className="mt-2 text-xs text-stone-300 md:mt-3">
      <span className="font-bold text-stone-200">{t("menu.contains")}</span>{" "}
      <AllergenIcons allergens={item.allergens} lang={lang} />
    </p>
  );

  const cartButton =
    qty === 0 ? (
      <button
        type="button"
        onClick={() => add(item)}
        data-testid={`add-to-cart-${itemId}`}
        aria-label={`${t("menu.add")}: ${displayName}`}
        className="inline-flex min-h-[44px] items-center gap-2 rounded-none border border-amber-700/40 bg-amber-600/10 px-3 py-2 text-xs font-bold uppercase tracking-mega text-amber-400 transition-colors hover:border-amber-500 hover:bg-amber-600 hover:text-stone-950"
      >
        <Plus className="h-3 w-3" aria-hidden="true" /> {t("menu.add")}
      </button>
    ) : (
      <div
        data-testid={`qty-controls-${itemId}`}
        className="inline-flex items-center rounded-none border border-amber-600 bg-amber-600 text-stone-950"
      >
        <button
          type="button"
          onClick={() => dec(item.name)}
          aria-label={`${t("cart.decrease")}: ${displayName}`}
          data-testid={`dec-${itemId}`}
          className="grid h-11 w-11 min-h-[44px] min-w-[44px] place-items-center transition-colors hover:bg-amber-500"
        >
          <Minus className="h-3 w-3" aria-hidden="true" />
        </button>
        <span className="min-w-[1.75rem] text-center font-display text-sm font-bold tabular-nums">
          {qty}
        </span>
        <button
          type="button"
          ref={incBtnRef}
          onClick={() => inc(item.name)}
          aria-label={`${t("cart.increase")}: ${displayName}`}
          data-testid={`inc-${itemId}`}
          className="grid h-11 w-11 min-h-[44px] min-w-[44px] place-items-center transition-colors hover:bg-amber-500"
        >
          <Plus className="h-3 w-3" aria-hidden="true" />
        </button>
      </div>
    );

  const live = (
    <span aria-live="polite" className="sr-only">
      {justAdded ? t("menu.added", displayName, totalCount) : ""}
    </span>
  );

  if (variant === "card") {
    return (
      <article
        data-testid={`menu-item-${itemId}`}
        className={cn(
          "relative flex flex-col rounded-none border border-stone-800/70 bg-stone-950/60 p-5 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.9)] transition-all md:p-6 md:hover:-translate-y-1 md:hover:border-amber-700/60",
          className
        )}
      >
        {badges}
        <h3 className="font-display text-xl font-bold leading-tight text-stone-50 md:text-2xl">
          {displayName}
        </h3>
        <div className="mt-1">{priceEl}</div>
        {descriptionEl}
        {allergensEl}
        <div className="mt-auto flex flex-wrap items-center gap-2 pt-3 md:pt-4">
          {item.tags && item.tags.map((ty) => (
            <Tag type={ty} key={ty} t={t} />
          ))}
          <div className="ml-auto">{cartButton}</div>
        </div>
        {live}
      </article>
    );
  }

  // Default row variant
  return (
    <article
      data-testid={`menu-item-${itemId}`}
      className="group relative border-b border-stone-800/80 py-6 transition-all"
    >
      {badges}

      <div className="flex items-start md:items-baseline">
        <h3 className="font-display text-xl font-bold leading-tight text-stone-50 transition-colors group-hover:text-amber-400 md:text-2xl">
          {displayName}
        </h3>
        <span className="leader hidden md:block" aria-hidden="true" />
        <span className="ml-auto md:ml-0">{priceEl}</span>
      </div>

      {descriptionEl}
      {allergensEl}

      <div className="mt-3 flex flex-wrap items-center gap-2">
        {item.tags && item.tags.map((ty) => (
          <Tag type={ty} key={ty} t={t} />
        ))}
        <div className="ml-auto">{cartButton}</div>
      </div>
      {live}
    </article>
  );
}
