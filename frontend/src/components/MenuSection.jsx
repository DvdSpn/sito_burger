import MenuItem from "./MenuItem";

const DISCLAIMER_KEY = {
  hamburger: "menu.notice.burger",
  ciabatte: "menu.notice.ciabatte",
  piadine: "menu.notice.wraps",
};

/**
 * MenuSection — food category on the home page.
 * On mobile (< md) renders a vertical list of rows; from md and up a 2-col grid,
 * from xl a 3-col grid, keeping the swipe style of card variant.
 * Dishes that don't match the active filter are hidden (not dimmed).
 */
export default function MenuSection({ section, index, filter, t, lang }) {
  const title = lang === "en" && section.titleEn ? section.titleEn : section.title;
  const subtitle =
    lang === "en" && section.subtitleEn ? section.subtitleEn : section.subtitle;

  const matchesFilter = (item) =>
    filter === "all" ? true : item.tags && item.tags.includes(filter);

  const visibleItems = section.items.filter(matchesFilter);
  if (visibleItems.length === 0) return null;

  const disclaimerKey = DISCLAIMER_KEY[section.id];

  return (
    <section
      id={section.id}
      data-testid={`section-${section.id}`}
      className="scroll-mt-24 border-b border-stone-800/70 px-6 py-10 lg:px-12 lg:py-14 md:scroll-mt-28"
    >
      <div className="mb-6 flex items-center gap-4">
        {typeof index === "number" && (
          <span
            aria-hidden="true"
            className="hidden shrink-0 font-display text-3xl font-black text-amber-500/40 md:block md:text-4xl"
          >
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

      {/* Mobile: vertical compact rows · ≥md: 2 cols · ≥xl: 3 cols */}
      <div className="flex flex-col gap-4 md:grid md:grid-cols-2 xl:grid-cols-3">
        {visibleItems.map((item) => (
          <MenuItem
            key={item.name}
            item={item}
            t={t}
            lang={lang}
            variant="card"
          />
        ))}
      </div>

      {disclaimerKey && (
        <p className="mt-4 rounded-none border border-amber-600/40 bg-amber-500/5 px-4 py-2.5 text-sm text-amber-200">
          {t(disclaimerKey)}
        </p>
      )}
    </section>
  );
}
