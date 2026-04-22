import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Wine, Info, X, MessageCircle, Phone } from "lucide-react";
import Logo from "./Logo";
import OpenClosedBadge from "./OpenClosedBadge";
import { RESTAURANT } from "../data/menu";

export default function MobileMenu({ open, onClose, t, lang }) {
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

  const items = [
    { id: "menu", label: lang === "en" ? "Menu" : "Menu" },
    { id: "hamburger", label: t("nav.hamburger") },
    { id: "ciabatte", label: t("nav.ciabatte") },
    { id: "piadine", label: lang === "en" ? "Wraps" : "Wrap" },
    { id: "griglia", label: t("nav.griglia") },
    { id: "contorni", label: lang === "en" ? "Sides" : "Contorni" },
    { id: "dessert", label: "Dessert" },
  ];

  const go = (id) => {
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
      className={`fixed inset-0 z-50 lg:hidden ${open ? "pointer-events-auto" : "pointer-events-none"}`}
    >
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-stone-950/85 backdrop-blur-md transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0"}`}
      />
      <aside
        className={`absolute right-0 top-0 flex h-full w-full max-w-sm flex-col border-l border-stone-800 bg-stone-950 shadow-2xl transition-transform duration-500 ease-out ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex items-center justify-between border-b border-stone-800 px-5 py-4">
          <Logo size="sm" />
          <button
            type="button"
            onClick={onClose}
            data-testid="mobile-menu-close"
            aria-label={t("mobile.close")}
            className="grid h-10 w-10 place-items-center rounded-sm border border-stone-700 text-stone-300 transition-colors hover:border-amber-600 hover:text-amber-500"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="px-5 py-4">
          <OpenClosedBadge t={t} />
        </div>

        <nav className="flex-1 overflow-y-auto px-5 pb-5">
          <ul className="divide-y divide-stone-800/60">
            {items.map((it) => (
              <li key={it.id}>
                <button
                  type="button"
                  onClick={() => go(it.id)}
                  data-testid={`mobile-nav-${it.id}`}
                  className="flex w-full items-center justify-between py-4 text-left font-display text-2xl font-bold text-stone-100 transition-colors hover:text-amber-400"
                >
                  <span>{it.label}</span>
                  <span className="font-hand text-sm text-amber-500">→</span>
                </button>
              </li>
            ))}
            <li>
              <Link
                to="/bevande"
                onClick={onClose}
                data-testid="mobile-nav-drinks"
                className="flex items-center justify-between py-4 font-display text-2xl font-bold text-amber-500 transition-colors hover:text-amber-400"
              >
                <span className="flex items-center gap-3">
                  <Wine className="h-5 w-5" /> {t("nav.drinks")}
                </span>
                <span className="font-hand text-sm text-amber-500">→</span>
              </Link>
            </li>
            <li>
              <Link
                to="/chi-siamo"
                onClick={onClose}
                data-testid="mobile-nav-about"
                className="flex items-center justify-between py-4 font-display text-2xl font-bold text-stone-100 transition-colors hover:text-amber-400"
              >
                <span className="flex items-center gap-3">
                  <Info className="h-5 w-5" /> {t("nav.about")}
                </span>
                <span className="font-hand text-sm text-amber-500">→</span>
              </Link>
            </li>
          </ul>
        </nav>

        <div className="border-t border-stone-800 px-5 py-4 space-y-2">
          <a
            href={`tel:${RESTAURANT.phoneMobile.replace(/\s/g, "")}`}
            data-testid="mobile-call-btn"
            className="flex items-center justify-center gap-2 rounded-sm border border-stone-700 bg-stone-900/70 px-4 py-3 text-[11px] font-bold uppercase tracking-mega text-stone-200"
          >
            <Phone className="h-3.5 w-3.5" /> {RESTAURANT.phoneMobile}
          </a>
          <a
            href={`https://wa.me/${RESTAURANT.whatsappNumber}?text=${encodeURIComponent(t("wa.message.generic"))}`}
            target="_blank"
            rel="noopener noreferrer"
            data-testid="mobile-wa-btn"
            className="flex items-center justify-center gap-2 rounded-sm bg-[#25D366] px-4 py-3 text-[11px] font-bold uppercase tracking-mega text-stone-950"
          >
            <MessageCircle className="h-3.5 w-3.5" /> WhatsApp
          </a>
        </div>
      </aside>
    </div>
  );
}
