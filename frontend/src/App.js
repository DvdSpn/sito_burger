import { useMemo, useState } from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Hero from "./components/Hero";
import ValuesStrip from "./components/ValuesStrip";
import FilterBar from "./components/FilterBar";
import MenuSection from "./components/MenuSection";
import Gallery from "./components/Gallery";
import Reviews from "./components/Reviews";
import Contact from "./components/Contact";
import WhatsAppButton from "./components/WhatsAppButton";
import CartFab from "./components/CartFab";
import CartDrawer from "./components/CartDrawer";
import { CartProvider } from "./context/CartContext";
import { menuData, RESTAURANT } from "./data/menu";
import { makeT } from "./data/i18n";

const Home = () => {
  const [filter, setFilter] = useState("all");
  const [lang, setLang] = useState("it");
  const [cartOpen, setCartOpen] = useState(false);
  const t = useMemo(() => makeT(lang), [lang]);

  return (
    <CartProvider>
      <div
        id="top"
        data-testid="home-page"
        lang={lang}
        className="min-h-screen bg-stone-950 text-stone-50"
      >
        <Hero t={t} lang={lang} setLang={setLang} />
        <ValuesStrip t={t} />

        <div id="menu" data-testid="menu-anchor">
          <FilterBar activeFilter={filter} setActiveFilter={setFilter} t={t} />
          {menuData.map((section, i) => (
            <MenuSection
              key={section.id}
              section={section}
              index={i}
              filter={filter}
              t={t}
            />
          ))}
        </div>

        <Gallery t={t} />
        <Reviews t={t} lang={lang} />
        <Contact t={t} onOrder={() => setCartOpen(true)} />

        <CartFab onClick={() => setCartOpen(true)} t={t} />
        <WhatsAppButton
          message={t("wa.message.generic")}
          number={RESTAURANT.whatsappNumber}
          label={t("wa.floating")}
        />
        <CartDrawer
          open={cartOpen}
          onClose={() => setCartOpen(false)}
          t={t}
          lang={lang}
        />
      </div>
    </CartProvider>
  );
};

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
