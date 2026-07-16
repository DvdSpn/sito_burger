import MenuItem from "./MenuItem";

// Sub-text shown UNDER the items, per category. Empty = nothing displayed.
const SECTION_DISCLAIMER = {
  hamburger: {
    it: "Tutti gli hamburger vengono serviti con patatine. Panino senza glutine disponibile su richiesta.",
    en: "All burgers are served with fries. Gluten-free bun available on request.",
  },
  ciabatte: {
    it: "Tutte le ciabatte vengono servite con patatine. Pane senza glutine disponibile su richiesta.",
    en: "All ciabatta sandwiches are served with fries. Gluten-free bread available on request.",
  },
  piadine: {
    it: "Tutti i wrap vengono serviti con patatine.",
    en: "All wraps are served with fries.",
  },
  // griglia / contorni / dessert: no disclaimer
};

/**
 * MenuSection — food category on the home page.
 * ALWAYS visible (no accordion) — just title + horizontal swipe of item cards.
 */
export default function MenuSection({ section, index, filter, t, lang }) {
  const title = lang === "en" && section.titleEn ? section.titleEn : section.title;
  const subtitle =
    lang === "en" && section.subtitleEn ? section.subtitleEn : section.subtitle;

  const matchesFilter = (item) =>
    filter === "all" ? true : item.tags.includes(filter);

  const disclaimer = SECTION_DISCLAIMER[section.id];
  const disclaimerText = disclaimer ? disclaimer[lang] || disclaimer.it : null;

  return (
    <section
      id={section.id}
      data-testid={`section-${section.id}`}
      className="scroll-mt-24 border-b border-stone-800/70 px-6 py-10 lg:px-12 lg:py-14 md:scroll-mt-28"
    >
      {/* Header — always visible, no toggle */}
      <div className="mb-6 flex items-center gap-4">
        {typeof index === "number" && (
          <span className="hidden shrink-0 font-display text-3xl font-black text-amber-500/40 md:block md:text-4xl">
            {String(index + 1).padStart(2, "0")}
          </span>
        )}
        <div className="min-w-0 flex-1">
          <h2 className="font-display text-2xl font-black leading-[1] tracking-tight text-stone-50 md:text-4xl">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-1 font-hand text-lg text-amber-500/90 md:text-xl">
              {subtitle}
            </p>
          )}
        </div>
      </div>

      {/* Swipe cards */}
      <div
        className="-mx-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-4 lg:-mx-12 lg:px-12"
        style={{ scrollbarWidth: "thin" }}
      >
        {section.items.map((item) => (
          <MenuItem
            key={item.name}
            item={item}
            dim={!matchesFilter(item)}
            t={t}
            lang={lang}
            variant="card"
          />
        ))}
      </div>

      {disclaimerText && (
        <p className="mt-4 rounded-sm border border-amber-600/40 bg-amber-500/5 px-4 py-2.5 text-[11px] font-bold uppercase tracking-mega text-amber-400">
          {disclaimerText}
        </p>
      )}
    </section>
  );
}
