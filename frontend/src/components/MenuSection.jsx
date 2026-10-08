import { WheatOff } from "lucide-react";
import MenuItem from "./MenuItem";

// Dishes in these sections come with fries: each card says so.
const WITH_FRIES = new Set(["hamburger", "ciabatte", "piadine"]);

// Gluten-free note shown under the section title.
const GLUTEN_FREE_SECTIONS = new Set(["hamburger", "ciabatte"]);

/**
 * MenuSection — food category on the home page.
 * On mobile (< md) the dishes are one horizontal swipe row of cards; from md
 * and up a 2-col grid, from xl a 3-col grid.
 */
export default function MenuSection({ section, index, t, lang }) {
  const title = lang === "en" && section.titleEn ? section.titleEn : section.title;
  const subtitle =
    lang === "en" && section.subtitleEn ? section.subtitleEn : section.subtitle;

  const visibleItems = section.items;
  if (visibleItems.length === 0) return null;


  return (
    <section
      id={section.id}
      data-testid={`section-${section.id}`}
      className="scroll-mt-24 border-b border-stone-800/70 px-4 py-8 sm:px-6 md:scroll-mt-28 md:py-10 lg:px-12 lg:py-14"
    >
      <div className="mb-4 flex items-center gap-4 md:mb-6">
        {typeof index === "number" && (
          <span
            aria-hidden="true"
            className="hidden shrink-0 font-display text-3xl font-black text-amber-500/60 md:block md:text-4xl"
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
        {visibleItems.length > 1 && (
          <span
            aria-hidden="true"
            className="shrink-0 self-end text-xs font-bold uppercase tracking-widest text-stone-400 md:hidden"
          >
            {t("menu.swipe", visibleItems.length)}
          </span>
        )}
      </div>

      {GLUTEN_FREE_SECTIONS.has(section.id) && (
        <p
          data-testid={`notice-${section.id}`}
          className="mb-4 flex items-center gap-2 rounded-none border border-amber-600/40 bg-amber-500/5 px-4 py-2.5 text-sm text-amber-200"
        >
          <WheatOff className="h-4 w-4 shrink-0 text-amber-500" aria-hidden="true" />
          {t("menu.notice.glutenFree")}
        </p>
      )}

      {/* Mobile: one swipeable row of cards per category, the next card
          peeking in from the right · ≥md: 2-col grid · ≥xl: 3 cols */}
      <div
        data-testid={`section-row-${section.id}`}
        className="scrollbar-none -mx-4 flex snap-x snap-mandatory scroll-px-4 gap-3 overflow-x-auto px-4 pb-2 sm:-mx-6 sm:scroll-px-6 sm:px-6 md:mx-0 md:grid md:grid-cols-2 md:gap-4 md:overflow-visible md:px-0 md:pb-0 xl:grid-cols-3"
      >
        {visibleItems.map((item) => (
          <MenuItem
            key={item.name}
            item={item}
            t={t}
            lang={lang}
            variant="card"
            withFries={WITH_FRIES.has(section.id)}
            className="w-[82%] max-w-[22rem] shrink-0 snap-start md:w-auto md:max-w-none"
          />
        ))}
      </div>

    </section>
  );
}
