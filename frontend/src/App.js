import { useEffect, useMemo, useState } from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route, Link, useLocation } from "react-router-dom";
import { Wine, Star } from "lucide-react";
import Hero from "./components/Hero";
import ValuesStrip from "./components/ValuesStrip";
import MenuSection from "./components/MenuSection";
import HomeFooter from "./components/HomeFooter";
import CartFab from "./components/CartFab";
import CartDrawer from "./components/CartDrawer";
import Button from "./components/brand/Button";
import About from "./pages/About";
import Drinks from "./pages/Drinks";
import { CartProvider } from "./context/CartContext";
import { menuData, RESTAURANT } from "./data/menu";
import { makeT } from "./data/i18n";

const LANG_STORAGE_KEY = "bg-lang";

// A new page opens at its top, not at the scroll position of the page you
// came from. Links that carry a #section (e.g. back to /#menu) are left to
// the page's own hash handling.
const ScrollToTop = () => {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (!hash) window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
};

const Home = ({ t, lang, setLang }) => {
  const [cartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    document.title = t("page.title.home");
  }, [t]);

  useEffect(() => {
    const ids = [...menuData.map((s) => s.id), "menu"];
    const handleHash = () => {
      const hash = window.location.hash.replace(/^#/, "");
      if (!ids.includes(hash)) return;
      const el = document.getElementById(hash);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    };
    if (window.location.hash) handleHash();
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  return (
    <div
      id="top"
      data-testid="home-page"
      className="min-h-screen bg-stone-950 text-stone-50"
    >
      <a
        href="#menu"
        data-testid="skip-to-menu"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-skip focus:rounded-none focus:bg-amber-500 focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-stone-950"
      >
        {t("nav.skipToMenu")}
      </a>
      <Hero t={t} lang={lang} setLang={setLang} />
      <main id="contenuto">
        <div id="menu" data-testid="menu-anchor">
          {menuData.map((section, index) => (
            <MenuSection
              key={section.id}
              section={section}
              index={index}
              t={t}
              lang={lang}
            />
          ))}
        </div>

        {/* Allergy notice (replaces per-icon tooltips) */}
        <div className="border-t border-stone-800/70 bg-stone-950 px-6 py-6 text-center lg:px-12">
          <p
            data-testid="allergy-notice"
            className="mx-auto inline-block max-w-xl rounded-none border border-stone-500 bg-stone-900/60 px-4 py-2 text-sm text-stone-200"
          >
            {t("menu.allergyNotice")}
          </p>
        </div>

        {/* Coperto & servizio notice */}
        <div className="border-t border-stone-800/70 bg-stone-950 px-6 py-6 text-center lg:px-12">
          <p
            data-testid="cover-charge-notice"
            className="mx-auto inline-block rounded-none border border-stone-500 bg-stone-900/60 px-4 py-2 text-xs font-bold uppercase tracking-mega text-stone-200"
          >
            {t("menu.coverCharge")}
          </p>
        </div>

        {/* CTA → Carta bevande */}
        <section className="border-t border-stone-800/70 bg-gradient-to-b from-stone-950 via-stone-900/40 to-stone-950 py-16 md:py-20">
          <div className="mx-auto flex max-w-5xl flex-col items-center gap-5 px-6 text-center lg:px-12">
            <p className="text-xs font-bold uppercase tracking-mega text-amber-500">
              {t("home.drinksCta.kicker")}
            </p>
            <h2 className="font-display text-3xl font-black leading-[1] tracking-tight text-stone-50 md:text-5xl">
              {t("home.drinksCta.title")}
            </h2>
            <p className="max-w-xl text-sm leading-relaxed text-stone-400 md:text-base">
              {t("home.drinksCta.body")}
            </p>
            <Button
              as={Link}
              to="/bevande"
              size="lg"
              icon={Wine}
              data-testid="home-drinks-cta"
              className="mt-2"
            >
              {t("home.drinksCta.btn")}
            </Button>
          </div>
        </section>

        {/* CTA → Google review */}
        <section className="border-t border-stone-800/70 bg-stone-950 py-14 md:py-16">
          <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 px-6 text-center lg:px-12">
            <div className="flex gap-1" aria-hidden="true">
              {[0, 1, 2, 3, 4].map((i) => (
                <Star key={i} className="h-5 w-5 fill-amber-500 text-amber-500" />
              ))}
            </div>
            <h2 className="font-display text-2xl font-black leading-[1] tracking-tight text-stone-50 md:text-4xl">
              {t("home.reviewCta.title")}
            </h2>
            <p className="max-w-md text-sm leading-relaxed text-stone-400">
              {t("home.reviewCta.body")}
            </p>
            <Button
              as="a"
              href={RESTAURANT.googleReviewUrl}
              target="_blank"
              rel="noopener noreferrer"
              variant="secondary"
              icon={Star}
              data-testid="home-google-review-cta"
              className="mt-2 text-balance"
            >
              {t("home.reviewCta.btn")}
            </Button>
          </div>
        </section>

        <ValuesStrip t={t} />

        <HomeFooter t={t} />

        {/* FAB breathing room */}
        <div aria-hidden="true" className="h-20 md:h-24" />
      </main>

      <CartFab onClick={() => setCartOpen(true)} t={t} />
      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        t={t}
        lang={lang}
      />
    </div>
  );
};

function App() {
  const [lang, setLang] = useState(() => {
    try {
      const stored = localStorage.getItem(LANG_STORAGE_KEY);
      if (stored === "it" || stored === "en") return stored;
    } catch (e) {
      // ignore
    }
    return "it";
  });

  useEffect(() => {
    try {
      localStorage.setItem(LANG_STORAGE_KEY, lang);
    } catch (e) {
      // ignore
    }
    if (typeof document !== "undefined") {
      document.documentElement.lang = lang;
    }
  }, [lang]);

  const t = useMemo(() => makeT(lang), [lang]);

  return (
    <div className="App">
      <CartProvider>
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route
              path="/"
              element={<Home t={t} lang={lang} setLang={setLang} />}
            />
            <Route
              path="/chi-siamo"
              element={<About t={t} lang={lang} setLang={setLang} />}
            />
            <Route
              path="/bevande"
              element={<Drinks t={t} lang={lang} setLang={setLang} />}
            />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </div>
  );
}

export default App;
