import { Camera } from "lucide-react";

export default function Gallery({ t }) {
  // 6 placeholder slots (different sizes for visual interest)
  const slots = [
    { span: "md:col-span-2 md:row-span-2 aspect-square md:aspect-auto" },
    { span: "aspect-[4/5]" },
    { span: "aspect-[4/5]" },
    { span: "md:col-span-2 aspect-[16/10]" },
    { span: "aspect-square" },
    { span: "aspect-square" },
  ];

  return (
    <section
      id="galleria"
      data-testid="section-galleria"
      className="relative border-t border-stone-800/70 py-20 md:py-28"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="mb-12 grid gap-8 md:grid-cols-12 md:items-end">
          <div className="md:col-span-8">
            <p className="text-[11px] font-bold uppercase tracking-mega text-amber-500">
              {t("gallery.kicker")}
            </p>
            <h2 className="mt-3 font-display text-4xl font-black leading-[0.95] tracking-tight text-stone-50 md:text-6xl">
              {t("gallery.title")}{" "}
              <span className="italic font-medium text-amber-500">
                {t("gallery.subtitle")}
              </span>
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-stone-400 md:col-span-4">
            {t("gallery.description")}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          {slots.map((s, i) => (
            <div
              key={i}
              data-testid={`gallery-slot-${i + 1}`}
              className={`group relative overflow-hidden rounded-sm border border-dashed border-stone-700/60 bg-stone-900/40 transition-colors hover:border-amber-700/60 hover:bg-stone-900/70 ${s.span}`}
            >
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-4 text-center">
                <Camera className="h-6 w-6 text-stone-600 transition-colors group-hover:text-amber-600" />
                <span className="text-[10px] font-bold uppercase tracking-mega text-stone-500 transition-colors group-hover:text-amber-500">
                  {t("gallery.placeholder")}
                </span>
                <span className="font-display text-lg text-stone-700">
                  0{i + 1}
                </span>
              </div>
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(217,119,6,0.06),transparent_60%)] opacity-0 transition-opacity group-hover:opacity-100" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
