import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Wine, Info, X, MessageCircle, Phone } from "lucide-react";
import Logo from "./Logo";
import OpenClosedBadge from "./OpenClosedBadge";
import LanguageToggle from "./LanguageToggle";
import { RESTAURANT, menuData } from "../data/menu";

export default function MobileMenu({ open, onClose, t, lang, setLang }) {
  useEffect(() => {
    if (!open) return undefined;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return undefined;
    const h = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [open, onClose]);

  // Build category labels from menuData so the IT/EN wording is managed in one place.
  const categories = menuData.map((s) => ({
    id: s.id,
    label: lang === "en" && s.titleEn ? s.titleEn : s.title,
  }));

  const goToId = (id) => {
    onClose();
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 250);
  };

  return (
    <div
      aria-hidden={!open}
      data-testid="mobile-menu"
      className={`fixed inset-0 z-50 lg:hidden ${
        open ? "pointer-events-auto" : "pointer-events-none"
      }`}
    >
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-stone-950/85 backdrop-blur-md transition-opacity duration-300 ${
          open ? "opacity-100" : "opacity-0"
        }`}
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-labelledby="mobile-menu-title"
        inert={open ? undefined : ""}
        className={`absolute right-0 top-0 flex h-full w-full max-w-sm flex-col border-l border-stone-800 bg-stone-950 shadow-2xl transition-transform duration-500 ease-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-stone-800 px-5 py-4">
          <div className="flex items-center gap-3">
            <Logo size="compact" />
            <span id="mobile-menu-title" className="sr-only">
              {t("cart.title")}
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            data-testid="mobile-menu-close"
            aria-label={t("mobile.close")}
            className="grid h-11 w-11 place-items-center rounded-none border border-stone-500 text-stone-300 transition-colors hover:border-amber-600 hover:text-amber-500"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        <div className="flex items-center justify-between gap-3 px-5 py-4">
          <OpenClosedBadge t={t} />
          {setLang && <LanguageToggle lang={lang} setLang={setLang} />}
        </div>

        <nav className="flex-1 overflow-y-auto px-5 pb-5" aria-label="Menu">
          <ul className="divide-y divide-stone-800/60">
            {categories.map((c) => (
              <li key={c.id}>
                <button
                  type="button"
                  onClick={() => goToId(c.id)}
                  data-testid={`mobile-nav-${c.id}`}
                  className="flex min-h-[44px] w-full items-center justify-between py-3 text-left font-display text-xl text-stone-100 transition-colors hover:text-amber-400"
                >
                  <span>{c.label}</span>
                  <span aria-hidden="true" className="font-hand text-sm text-amber-500/80">→</span>
                </button>
              </li>
            ))}
            <li>
              <Link
                to="/bevande"
                onClick={onClose}
                data-testid="mobile-nav-drinks"
                className="flex min-h-[44px] items-center justify-between py-4 font-display text-2xl font-bold text-amber-500 transition-colors hover:text-amber-400"
              >
                <span className="flex items-center gap-3">
                  <Wine className="h-5 w-5" aria-hidden="true" /> {t("nav.drinks")}
                </span>
                <span aria-hidden="true" className="font-hand text-sm text-amber-500">→</span>
              </Link>
            </li>
            <li>
              <Link
                to="/chi-siamo"
                onClick={onClose}
                data-testid="mobile-nav-about"
                className="flex min-h-[44px] items-center justify-between py-4 font-display text-2xl font-bold text-stone-100 transition-colors hover:text-amber-400"
              >
                <span className="flex items-center gap-3">
                  <Info className="h-5 w-5" aria-hidden="true" /> {t("nav.about")}
                </span>
                <span aria-hidden="true" className="font-hand text-sm text-amber-500">→</span>
              </Link>
            </li>
          </ul>
        </nav>

        <div className="space-y-2 border-t border-stone-800 px-5 py-4">
          <a
            href={`tel:${RESTAURANT.phoneMobile.replace(/\s/g, "")}`}
            data-testid="mobile-call-btn"
            className="flex min-h-[44px] items-center justify-center gap-2 rounded-none border border-stone-500 bg-stone-900/70 px-4 py-3 text-xs font-bold uppercase tracking-mega text-stone-200"
          >
            <Phone className="h-3.5 w-3.5" aria-hidden="true" /> {RESTAURANT.phoneMobile}
          </a>
          <a
            href={`https://wa.me/${RESTAURANT.whatsappNumber}?text=${encodeURIComponent(t("wa.message.generic"))}`}
            target="_blank"
            rel="noopener noreferrer"
            data-testid="mobile-wa-btn"
            className="flex min-h-[44px] items-center justify-center gap-2 rounded-none bg-[#25D366] px-4 py-3 text-xs font-bold uppercase tracking-mega text-stone-950"
          >
            <MessageCircle className="h-3.5 w-3.5" aria-hidden="true" /> WhatsApp
          </a>
        </div>
      </aside>
    </div>
  );
}
