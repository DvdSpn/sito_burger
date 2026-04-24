import MenuItem from "./MenuItem";

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
  const isFlipped = index % 2 === 1;
  const title = lang === "en" && section.titleEn ? section.titleEn : section.title;
  const subtitle =
    lang === "en" && section.subtitleEn ? section.subtitleEn : section.subtitle;
  const accent = lang === "en" && section.accentEn ? section.accentEn : section.accent;

  const matchesFilter = (item) =>
    filter === "all" ? true : item.tags.includes(filter);

  return (
    <section
      id={section.id}
      data-testid={`section-${section.id}`}
      className="relative border-t border-stone-800/70 py-20 md:py-28"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div
          className={`grid gap-12 lg:grid-cols-12 lg:gap-16 ${
            isFlipped ? "lg:[&>*:first-child]:order-2" : ""
          }`}
        >
          <header className="lg:col-span-4 lg:sticky lg:top-28 lg:self-start">
            <p className="text-[11px] font-bold uppercase tracking-mega text-amber-500">
              · {String(index + 1).padStart(2, "0")} ·
            </p>
            <h2 className="mt-3 font-display text-4xl font-black leading-[0.95] tracking-tight text-stone-50 md:text-5xl lg:text-6xl">
              {title}
            </h2>
            <p className="mt-3 font-hand text-2xl text-amber-500/90">
              {subtitle}
            </p>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-stone-400">
              {accent}
            </p>

            {img && (
              <div className="mt-6 overflow-hidden rounded-sm border border-stone-800 lg:mt-8">
                <img
                  src={img}
                  alt={title}
                  className="h-48 w-full object-cover grayscale-[0.2] transition-all duration-700 hover:grayscale-0 hover:scale-105 md:h-56 lg:h-64"
                />
              </div>
            )}
          </header>

          <div className="lg:col-span-8">
            <div className="rounded-sm border border-stone-800/70 bg-stone-900/30 p-6 backdrop-blur-sm md:p-10">
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
          </div>
        </div>
      </div>
    </section>
  );
}
