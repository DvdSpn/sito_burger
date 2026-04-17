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

  return (
    <div
      id="top"
      data-testid="home-page"
      lang={lang}
      className="min-h-screen bg-stone-950 text-stone-50"
    >
      <Hero t={t} lang={lang} setLang={setLang} />
      <ValuesStrip t={t} />
      <FilterBar activeFilter={filter} setActiveFilter={setFilter} t={t} />

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

      <Gallery t={t} />
      <Reviews t={t} lang={lang} />
      <Contact t={t} onOrder={() => setCartOpen(true)} />

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
