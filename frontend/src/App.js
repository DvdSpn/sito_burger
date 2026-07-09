import { useEffect, useMemo, useState } from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Wine, Star } from "lucide-react";
import Hero from "./components/Hero";
import ValuesStrip from "./components/ValuesStrip";
import FilterBar from "./components/FilterBar";
import MenuSection from "./components/MenuSection";
import HomeFooter from "./components/HomeFooter";
import CartFab from "./components/CartFab";
import CartDrawer from "./components/CartDrawer";
import About from "./pages/About";
import Drinks from "./pages/Drinks";
import { CartProvider } from "./context/CartContext";
import { menuData, RESTAURANT } from "./data/menu";
import { makeT } from "./data/i18n";

const Home = ({ t, lang, setLang }) => {
  const [filter, setFilter] = useState("all");
  const [cartOpen, setCartOpen] = useState(false);

  // FilterBar nav / hash → scroll to the section header (no accordion anymore)
  const scrollToSection = (id) => {
    if (!menuData.some((s) => s.id === id)) return;
    if (typeof window !== "undefined") {
      window.history.replaceState(null, "", `#${id}`);
    }
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  useEffect(() => {
    const ids = menuData.map((s) => s.id);
    const handleHash = () => {
      const hash = window.location.hash.replace(/^#/, "");
      if (!ids.includes(hash)) return;
      scrollToSection(hash);
    };
    if (window.location.hash) handleHash();
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  return (
    <div
      id="top"
      data-testid="home-page"
      lang={lang}
      className="min-h-screen bg-stone-950 text-stone-50"
    >
      <Hero t={t} lang={lang} setLang={setLang} />
      <FilterBar
        activeFilter={filter}
        setActiveFilter={setFilter}
        t={t}
        lang={lang}
        onSectionClick={scrollToSection}
      />

      <div id="menu" data-testid="menu-anchor">
        {menuData.map((section, i) => (
          <MenuSection
            key={section.id}
            section={section}
            index={i}
            filter={filter}
            t={t}
            lang={lang}
          />
        ))}
      </div>

      {/* Coperto & servizio notice */}
      <div className="border-t border-stone-800/70 bg-stone-950 px-6 py-6 text-center lg:px-12">
        <p
          data-testid="cover-charge-notice"
          className="mx-auto inline-block rounded-sm border border-stone-700 bg-stone-900/60 px-4 py-2 text-[11px] font-bold uppercase tracking-mega text-stone-300"
        >
          {t("menu.coverCharge")}
        </p>
      </div>

      {/* CTA → Google review */}
      <section className="border-t border-stone-800/70 bg-stone-950 py-14 md:py-16">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 px-6 text-center lg:px-12">
          <div className="flex gap-1">
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
          <a
            href={RESTAURANT.googleReviewUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-testid="home-google-review-cta"
            className="mt-2 inline-flex items-center gap-2 rounded-sm border border-stone-600 bg-stone-900 px-6 py-3 text-xs font-bold uppercase tracking-mega text-stone-100 transition-all hover:border-amber-500 hover:bg-amber-600 hover:text-stone-950"
          >
            <Star className="h-4 w-4" />
            {t("home.reviewCta.btn")}
          </a>
        </div>
      </section>

      {/* CTA → Carta bevande, after the menu sections (after Dessert) */}
      <section className="border-t border-stone-800/70 bg-gradient-to-b from-stone-950 via-stone-900/40 to-stone-950 py-16 md:py-20">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-5 px-6 text-center lg:px-12">
          <p className="text-[11px] font-bold uppercase tracking-mega text-amber-500">
            {t("home.drinksCta.kicker")}
          </p>
          <h2 className="font-display text-3xl font-black leading-[1] tracking-tight text-stone-50 md:text-5xl">
            {t("home.drinksCta.title")}
          </h2>
          <p className="max-w-xl text-sm leading-relaxed text-stone-400 md:text-base">
            {t("home.drinksCta.body")}
          </p>
          <Link
            to="/bevande"
            data-testid="home-drinks-cta"
            className="mt-2 inline-flex items-center gap-2 rounded-sm border border-amber-600 bg-amber-600 px-7 py-3.5 text-xs font-bold uppercase tracking-mega text-stone-950 transition-all hover:bg-amber-500 hover:shadow-[0_0_36px_-6px_rgba(217,119,6,0.6)]"
          >
            <Wine className="h-4 w-4" />
            {t("home.drinksCta.btn")}
          </Link>
        </div>
      </section>

      <ValuesStrip t={t} />

      <HomeFooter t={t} />

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
  const [lang, setLang] = useState("it");
  const t = useMemo(() => makeT(lang), [lang]);

  return (
    <div className="App">
      <CartProvider>
        <BrowserRouter>
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
