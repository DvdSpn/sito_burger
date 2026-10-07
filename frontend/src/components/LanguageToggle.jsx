import { cn } from "../lib/utils";

export default function LanguageToggle({ lang, setLang }) {
  return (
    <div
      role="group"
      aria-label="Language"
      data-testid="lang-toggle"
      className="inline-flex items-center overflow-hidden rounded-none border border-stone-500 bg-stone-950/60 backdrop-blur"
    >
      <button
        type="button"
        onClick={() => setLang("it")}
        data-testid="lang-it"
        aria-pressed={lang === "it" ? "true" : "false"}
        aria-label="Italiano"
        className={cn(
          "min-h-[44px] px-3 py-2 text-xs font-bold uppercase tracking-widest transition-colors",
          lang === "it"
            ? "bg-amber-600 text-stone-950"
            : "text-stone-300 hover:text-amber-400"
        )}
      >
        IT
      </button>
      <button
        type="button"
        onClick={() => setLang("en")}
        data-testid="lang-en"
        aria-pressed={lang === "en" ? "true" : "false"}
        aria-label="English"
        className={cn(
          "min-h-[44px] px-3 py-2 text-xs font-bold uppercase tracking-widest transition-colors",
          lang === "en"
            ? "bg-amber-600 text-stone-950"
            : "text-stone-300 hover:text-amber-400"
        )}
      >
        EN
      </button>
    </div>
  );
}
