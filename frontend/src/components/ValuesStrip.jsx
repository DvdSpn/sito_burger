import { Beef, UtensilsCrossed, Wheat, Wine } from "lucide-react";

const ITEMS = [
  { Icon: Beef, label: "Chianina Toscana", sub: "200gr certificata" },
  { Icon: UtensilsCrossed, label: "Pane artigianale", sub: "Lievitazione 24h" },
  { Icon: Wheat, label: "Senza glutine", sub: "Pane su richiesta" },
  { Icon: Wine, label: "Km 0", sub: "Prodotti del territorio" },
];

export default function ValuesStrip() {
  return (
    <section
      data-testid="values-strip"
      className="relative border-y border-stone-800/60 bg-gradient-to-b from-stone-950 to-stone-900/60"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-2 md:grid-cols-4">
        {ITEMS.map(({ Icon, label, sub }, i) => (
          <div
            key={label}
            className={`flex items-center gap-4 border-stone-800/60 p-6 md:p-8 ${
              i !== 0 ? "md:border-l" : ""
            } ${i % 2 === 1 ? "border-l md:border-l" : ""} ${
              i < 2 ? "border-b md:border-b-0" : ""
            }`}
          >
            <div className="grid h-11 w-11 shrink-0 place-items-center rounded-sm border border-amber-700/40 bg-stone-950">
              <Icon className="h-5 w-5 text-amber-500" />
            </div>
            <div>
              <p className="font-display text-base font-bold text-stone-50 md:text-lg">
                {label}
              </p>
              <p className="text-[11px] uppercase tracking-mega text-stone-500">
                {sub}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
