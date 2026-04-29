import MenuItem from "./MenuItem";
import AccordionSection from "./AccordionSection";

const SECTION_IMAGES = {
  hamburger:
    "https://static.prod-images.emergentagent.com/jobs/c6339d23-1435-4b4c-bea3-59cbda5562c5/images/c92f0f3deb1438cdc80044cd4ceee5570438a7888b3d3f8b5ce4181e0fb2f506.png",
  ciabatte:
    "https://static.prod-images.emergentagent.com/jobs/c6339d23-1435-4b4c-bea3-59cbda5562c5/images/9aa68f56ad2ffb2fb974a11366b607c9497a01596cee3d8d0373a20bf5ec7eb8.png",
  griglia:
    "https://static.prod-images.emergentagent.com/jobs/c6339d23-1435-4b4c-bea3-59cbda5562c5/images/40d1c5a5123d54b18dd143864cfe29ce510d7b40da621c021641d0226cf315cc.png",
  piadine:
    "https://images.unsplash.com/photo-1626323107890-cce0b8c2c641?crop=entropy&cs=srgb&fm=jpg&q=80&w=1600",
  contorni: null,
};

export default function MenuSection({ section, index, filter, t, lang }) {
  const img = SECTION_IMAGES[section.id];
  const title = lang === "en" && section.titleEn ? section.titleEn : section.title;
  const subtitle =
    lang === "en" && section.subtitleEn ? section.subtitleEn : section.subtitle;
  const accent = lang === "en" && section.accentEn ? section.accentEn : section.accent;

  const matchesFilter = (item) =>
    filter === "all" ? true : item.tags.includes(filter);

  return (
    <AccordionSection
      id={section.id}
      index={index}
      title={title}
      subtitle={subtitle}
      description={accent}
      imageSrc={img}
      testId={`section-${section.id}`}
      defaultOpen={index === 0}
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
      <p className="mt-4 px-2 text-[11px] uppercase tracking-mega text-stone-600">
        {t("menu.disclaimer")}
      </p>
    </AccordionSection>
  );
}
