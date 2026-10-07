/**
 * DrinkItem — single drink row.
 * Supports IT/EN translation via `lang` prop using nameEn/descEn/styleEn fallbacks.
 */
function pick(item, key, lang) {
  if (lang === "en") {
    const enKey = key + "En";
    if (item[enKey]) return item[enKey];
  }
  return item[key];
}

export default function DrinkItem({ item, lang = "it", variant = "row" }) {
  const name = pick(item, "name", lang);
  const desc = pick(item, "desc", lang);
  const style = pick(item, "style", lang);

  const testId = `drink-item-${item.name
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")}`;

  // Card variant — self-contained, used inside swipe carousels
  if (variant === "card") {
    return (
      <article
        data-testid={testId}
        className="flex w-[240px] shrink-0 snap-start flex-col items-center rounded-none border border-stone-800/60 bg-stone-950/60 p-5 pt-6 text-center transition-all hover:-translate-y-1 hover:border-amber-700/60 hover:shadow-[0_20px_50px_-15px_rgba(217,119,6,0.35)] md:w-[280px] md:p-6 md:pt-8"
      >
        {item.image && (
          <div className="relative flex h-52 w-full items-end justify-center md:h-64">
            <img
              src={item.image}
              alt={name}
              loading="lazy"
              className="max-h-full w-auto object-contain drop-shadow-[0_18px_20px_rgba(0,0,0,0.55)] transition-transform duration-500 hover:scale-105"
            />
          </div>
        )}
        <div
          className={`w-full ${item.image ? "mt-4 border-t border-stone-800/70 pt-4" : ""}`}
        >
          <h3 className="font-display text-lg font-bold text-stone-50 md:text-xl">
            {name}
          </h3>
          {style && (
            <p className="mt-1 text-[10px] font-bold uppercase tracking-mega text-amber-500/80">
              {style}
            </p>
          )}
          {desc && (
            <p className="mt-2 text-xs leading-relaxed text-stone-400 md:text-sm">
              {desc}
            </p>
          )}
          {item.formats ? (
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              {item.formats.map((f) => (
                <span
                  key={f.size}
                  className="inline-flex items-center gap-2 rounded-none border border-amber-700/40 bg-stone-950/50 px-3 py-1.5 text-xs"
                >
                  <span className="font-bold uppercase tracking-mega text-stone-300">
                    {f.size}
                  </span>
                  <span className="font-display text-base font-semibold text-amber-500">
                    € {f.price}
                  </span>
                </span>
              ))}
            </div>
          ) : (
            <p className="mt-4 font-display text-xl font-semibold text-amber-500">
              {item.price === "—" ? "—" : `€ ${item.price}`}
            </p>
          )}
        </div>
      </article>
    );
  }

  return (
    <article
      data-testid={testId}
      className="flex items-start gap-4 border-b border-stone-800/80 py-5 last:border-b-0 md:gap-6"
    >
      {item.image && (
        <img
          src={item.image}
          alt={name}
          loading="lazy"
          className="h-28 w-auto shrink-0 self-start drop-shadow-[0_8px_18px_rgba(0,0,0,0.55)] md:h-36"
        />
      )}
      <div className="flex-1">
        <div className="flex items-baseline">
          <h3 className="font-display text-lg font-bold text-stone-50 md:text-xl">
            {name}
          </h3>
          {!item.formats && (
            <>
              <span className="leader hidden md:block" />
              <span className="ml-auto shrink-0 font-display text-lg font-semibold text-amber-500 md:ml-0 md:text-xl">
                {item.price === "—" ? "—" : `€ ${item.price}`}
              </span>
            </>
          )}
        </div>
        {style && (
          <p className="mt-0.5 text-[11px] font-bold uppercase tracking-mega text-amber-500/80">
            {style}
          </p>
        )}
        {desc && (
          <p className="mt-1 text-sm text-stone-400">{desc}</p>
        )}
        {item.formats && (
          <div className="mt-3 flex flex-wrap gap-2">
            {item.formats.map((f) => (
              <span
                key={f.size}
                className="inline-flex items-center gap-2 rounded-none border border-amber-700/40 bg-stone-950/50 px-3 py-1.5 text-xs"
              >
                <span className="font-bold uppercase tracking-mega text-stone-300">
                  {f.size}
                </span>
                <span className="font-display text-base font-semibold text-amber-500">
                  € {f.price}
                </span>
              </span>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
