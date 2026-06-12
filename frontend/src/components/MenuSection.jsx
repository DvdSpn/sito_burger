import MenuItem from "./MenuItem";
import AccordionSection from "./AccordionSection";

// Sub-text shown UNDER the items, per category. Empty = nothing displayed.
const SECTION_DISCLAIMER = {
  hamburger: {
    it: "Tutti gli hamburger vengono serviti con patatine. Disponibile senza glutine su richiesta.",
    en: "All burgers are served with fries. Gluten-free option available on request.",
  },
  ciabatte: {
    it: "Tutte le ciabatte vengono servite con patatine. Disponibile senza glutine su richiesta.",
    en: "All ciabatta sandwiches are served with fries. Gluten-free option available on request.",
  },
  piadine: {
    it: "Tutti i wrap vengono serviti con patatine.",
    en: "All wraps are served with fries.",
  },
  // griglia / contorni / dessert: no disclaimer
};

export default function MenuSection({ section, index, filter, t, lang, isOpen, onToggle }) {
  const title = lang === "en" && section.titleEn ? section.titleEn : section.title;
  const subtitle =
    lang === "en" && section.subtitleEn ? section.subtitleEn : section.subtitle;

  const matchesFilter = (item) =>
    filter === "all" ? true : item.tags.includes(filter);

  const disclaimer = SECTION_DISCLAIMER[section.id];
  const disclaimerText = disclaimer ? disclaimer[lang] || disclaimer.it : null;

  return (
    <AccordionSection
      id={section.id}
      index={index}
      title={title}
      subtitle={subtitle}
      testId={`section-${section.id}`}
      isOpen={isOpen}
      onToggle={onToggle}
    >
      <div className="rounded-sm border border-stone-800/70 bg-stone-900/30 p-4 backdrop-blur-sm md:p-8">
        {section.items.map((item) => (
          <MenuItem
            key={item.name}
            item={item}
            dim={!matchesFilter(item)}
            t={t}
            lang={lang}
          />
        ))}
      </div>
      {disclaimerText && (
        <p className="mt-4 rounded-sm border border-amber-600/40 bg-amber-500/5 px-4 py-2.5 text-[11px] font-bold uppercase tracking-mega text-amber-400">
          {disclaimerText}
        </p>
      )}
    </AccordionSection>
  );
}
