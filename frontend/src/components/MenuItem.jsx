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

export default function MenuItem({ item, dim, t, lang, variant = "row" }) {
  const { add, inc, dec, getQty } = useCart();
  const qty = getQty(item.name);
  const itemId = item.name
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");

  const hasBadges = item.signature || item.isNew || item.popular;

  // Always render the badge row so cards with/without a Signature/New/Popular
  // pill line up their title, price and description at the same baseline
  // inside the swipe carousel.
  const badges = (
    <div
      aria-hidden={!hasBadges}
      className="mb-2 flex min-h-[1.25rem] flex-wrap gap-1.5"
    >
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
  );

  const priceEl = (
    <span className="shrink-0 font-display text-xl font-semibold text-amber-500 md:text-2xl">
      € {item.price}
    </span>
  );

  const descriptionEl = (
    <p className="mt-2 text-sm leading-relaxed text-stone-400">
      {lang === "en" && item.descEn ? item.descEn : item.desc}
    </p>
  );

  const allergensEl = item.allergens && item.allergens.length > 0 && (
    <div className="mt-3 flex flex-wrap items-center gap-2">
      <span className="text-[9px] font-bold uppercase tracking-mega text-stone-600">
        {t("menu.contains")}
      </span>
      <AllergenIcons allergens={item.allergens} lang={lang} />
    </div>
  );

  const cartButton =
    qty === 0 ? (
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
    );

  // Card variant — self-contained, used inside swipe carousels
  if (variant === "card") {
    return (
      <article
        data-testid={`menu-item-${itemId}`}
        className={cn(
          "flex w-[260px] shrink-0 snap-start flex-col rounded-sm border border-stone-800/70 bg-stone-950/60 p-5 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.9)] transition-all hover:-translate-y-1 hover:border-amber-700/60 md:w-[300px] md:p-6",
          dim && "opacity-30"
        )}
      >
        {badges}
        <h3 className="font-display text-xl font-bold leading-tight text-stone-50 md:text-2xl">
          {item.name}
        </h3>
        <div className="mt-1">{priceEl}</div>
        {descriptionEl}
        {allergensEl}
        <div className="mt-auto flex flex-wrap items-center gap-2 pt-4">
          {item.tags.map((ty) => (
            <Tag type={ty} key={ty} t={t} />
          ))}
          <div className="ml-auto">{cartButton}</div>
        </div>
      </article>
    );
  }

  // Default row variant
  return (
    <article
      data-testid={`menu-item-${itemId}`}
      className={cn(
        "group relative border-b border-stone-800/80 py-6 transition-all",
        dim ? "opacity-30" : "opacity-100"
      )}
    >
      {badges}

      <div className="flex items-start md:items-baseline">
        <h3 className="font-display text-xl font-bold leading-tight text-stone-50 transition-colors group-hover:text-amber-400 md:text-2xl">
          {item.name}
        </h3>
        <span className="leader hidden md:block" />
        <span className="ml-auto md:ml-0">{priceEl}</span>
      </div>

      {descriptionEl}
      {allergensEl}

      <div className="mt-3 flex flex-wrap items-center gap-2">
        {item.tags.map((ty) => (
          <Tag type={ty} key={ty} t={t} />
        ))}
        <div className="ml-auto">{cartButton}</div>
      </div>
    </article>
  );
}
