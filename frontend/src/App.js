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
import { menuData, RESTAURANT } from "./data/menu";
import { makeT } from "./data/i18n";

const Home = () => {
  const [filter, setFilter] = useState("all");
  const [lang, setLang] = useState("it");
  const t = useMemo(() => makeT(lang), [lang]);

  const buildMessage = (item) => {
    if (item && item.name) {
      return t("wa.message.item", item.name, item.price);
    }
    return t("wa.message.generic");
  };

  const handleOrder = (item) => {
    const url = `https://wa.me/${RESTAURANT.whatsappNumber}?text=${encodeURIComponent(
      buildMessage(item)
    )}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
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
            onOrder={handleOrder}
            t={t}
          />
        ))}
      </div>

      <Gallery t={t} />
      <Reviews t={t} lang={lang} />
      <Contact t={t} onOrder={() => handleOrder()} />

      <WhatsAppButton
        message={buildMessage()}
        number={RESTAURANT.whatsappNumber}
        label={t("wa.floating")}
      />
    </div>
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
