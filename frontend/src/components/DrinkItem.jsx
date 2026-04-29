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

export default function DrinkItem({ item, lang = "it" }) {
  const name = pick(item, "name", lang);
  const desc = pick(item, "desc", lang);
  const style = pick(item, "style", lang);

  const testId = `drink-item-${item.name
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")}`;

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
                className="inline-flex items-center gap-2 rounded-sm border border-amber-700/40 bg-stone-950/50 px-3 py-1.5 text-xs"
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
