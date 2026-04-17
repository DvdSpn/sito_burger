import { useState } from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Hero from "./components/Hero";
import ValuesStrip from "./components/ValuesStrip";
import FilterBar from "./components/FilterBar";
import MenuSection from "./components/MenuSection";
import Contact from "./components/Contact";
import WhatsAppButton from "./components/WhatsAppButton";
import { menuData, RESTAURANT } from "./data/menu";

const Home = () => {
  const [filter, setFilter] = useState("all");

  const buildMessage = (item) => {
    if (item && item.name) {
      return `Ciao Burger & Grill! Vorrei ordinare: ${item.name} (€ ${item.price}).`;
    }
    return `Ciao Burger & Grill! Vorrei fare un ordine da Camucia.`;
  };

  const handleOrder = (item) => {
    const url = `https://wa.me/${RESTAURANT.whatsappNumber}?text=${encodeURIComponent(
      buildMessage(item)
    )}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div data-testid="home-page" className="min-h-screen bg-stone-950 text-stone-50">
      <Hero />
      <ValuesStrip />

      <div id="menu" data-testid="menu-anchor">
        <FilterBar activeFilter={filter} setActiveFilter={setFilter} />

        {menuData.map((section, i) => (
          <MenuSection
            key={section.id}
            section={section}
            index={i}
            filter={filter}
            onOrder={handleOrder}
          />
        ))}
      </div>

      <Contact onOrder={() => handleOrder()} />

      <WhatsAppButton
        message={buildMessage()}
        number={RESTAURANT.whatsappNumber}
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
