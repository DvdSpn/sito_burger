import { cn } from "../lib/utils";

export default function LanguageToggle({ lang, setLang, variant = "dark" }) {
  const base =
    "flex items-center gap-1 rounded-sm border px-1 py-1 text-[10px] font-bold uppercase tracking-mega transition-colors";
  const wrap =
    variant === "light"
      ? "border-stone-700 bg-stone-900/60 backdrop-blur"
      : "border-stone-700 bg-stone-950/70 backdrop-blur";

  return (
    <div
      data-testid="language-toggle"
      className={cn(base, wrap)}
      role="group"
      aria-label="Language"
    >
      {["it", "en"].map((code) => (
        <button
          key={code}
          type="button"
          data-testid={`lang-${code}`}
          onClick={() => setLang(code)}
          className={cn(
            "rounded-[2px] px-2 py-1 transition-colors",
            lang === code
              ? "bg-amber-600 text-stone-950"
              : "text-stone-400 hover:text-amber-500"
          )}
        >
          {code.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
