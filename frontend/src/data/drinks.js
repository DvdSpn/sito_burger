// Drinks menu (separate page /bevande)
export const drinksData = [
  {
    id: "alla-spina",
    title: "Bevande alla spina",
    subtitle: "Dal rubinetto",
    items: [
      { name: "Birra Raffo / Peroni 20cl", price: "3,00", desc: "Birra alla spina, piccola." },
      { name: "Birra Raffo / Peroni 40cl", price: "5,00", desc: "Birra alla spina, media." },
      { name: "Coca Cola 20cl", price: "2,50", desc: "Piccola." },
      { name: "Coca Cola 40cl", price: "4,50", desc: "Media." },
      { name: "Vino bianco frizzantino 25cl", price: "3,00", desc: "Vino bianco frizzante alla spina." },
      { name: "Vino bianco frizzantino 50cl", price: "5,00", desc: "Vino bianco frizzante alla spina." },
    ],
  },
  {
    id: "birre-bottiglia",
    title: "Birre in bottiglia",
    subtitle: "Selezione classica",
    items: [
      { name: "Peroni / Beck's / Moretti 33cl", price: "3,00", desc: "Lager classica 33cl." },
      { name: "Ceres / Tennents / Corona / Bjorne 33cl", price: "5,00", desc: "Premium 33cl." },
      { name: "Moretti 66cl", price: "4,50", desc: "Bottiglia grande 66cl." },
      { name: "Heineken / Peroni 66cl", price: "5,00", desc: "Bottiglia grande 66cl." },
      { name: "Ichnusa non filtrata 50cl", price: "5,00", desc: "Birra sarda non filtrata." },
    ],
  },
  {
    id: "birre-artigianali-san-girolamo",
    title: "Birre Artigianali San Girolamo",
    subtitle: "Birrificio toscano · Selezione del mastro birraio",
    items: [
      {
        name: "Traccia",
        style: "Blanche · 4.5% vol.",
        image: "/beers/traccia.png",
        formats: [
          { size: "0,33 cl", price: "6,50" },
          { size: "0,75 cl", price: "12,00" },
        ],
        desc: "Birra chiara e rinfrescante, aromatizzata con scorza d'arancia, coriandolo e spezie leggere. Leggera, fresca e leggermente velata.",
      },
      {
        name: "Rovina",
        style: "Golden Ale · 4.8% vol.",
        image: "/beers/rovina.png",
        formats: [
          { size: "0,33 cl", price: "6,50" },
          { size: "0,75 cl", price: "12,00" },
        ],
        desc: "Birra dorata e equilibrata, con aromi maltati dolci, note floreali e un tocco erbaceo dai luppoli nobili. Pulita e beverina.",
      },
      {
        name: "Sassaia",
        style: "Brown Ale · 7.0% vol.",
        image: "/beers/sassaia.png",
        formats: [
          { size: "0,33 cl", price: "6,50" },
          { size: "0,75 cl", price: "12,00" },
        ],
        desc: "Birra ambrata corposa, profumata di resina, caramello tostato, frutta matura e malti speciali. Strutturata e resinosa.",
      },
      {
        name: "Cavadenti",
        style: "Strong Belgian Ale · 7.5% vol.",
        image: "/beers/cavadenti.png",
        formats: [
          { size: "0,33 cl", price: "6,50" },
          { size: "0,75 cl", price: "12,00" },
        ],
        desc: "Birra forte e complessa, con aromi caldi di frutta candita, spezie, malti caramellati e lieviti belgici. Avvolgente e persistente.",
      },
    ],
  },
  {
    id: "bevande-varie",
    title: "Bevande",
    subtitle: "Analcoliche",
    items: [
      { name: "Lattine 33cl", price: "2,50", desc: "Assortimento lattine 33cl." },
      { name: "Bibite in bottiglia 45cl", price: "3,00", desc: "Bibite in bottiglia 45cl." },
      { name: "Red Bull 25cl", price: "3,50", desc: "Energy drink." },
      { name: "Acqua 50cl", price: "1,00", desc: "Naturale o frizzante." },
      { name: "Acqua 1 lt", price: "1,50", desc: "Naturale o frizzante." },
      { name: "Estathé brick", price: "1,20", desc: "Tè freddo in brick." },
    ],
  },
  {
    id: "vini",
    title: "Vini",
    subtitle: "Della casa e del territorio",
    items: [
      { name: "Syrah 25cl", price: "3,50", desc: "Syrah di Cortona, calice." },
      { name: "Syrah 50cl", price: "6,50", desc: "Syrah di Cortona, mezzo litro." },
      { name: "Syrah 1 L", price: "11,00", desc: "Syrah di Cortona, litro." },
      { name: "Sangiovese 25cl", price: "3,00", desc: "Sangiovese, calice." },
      { name: "Sangiovese 50cl", price: "5,50", desc: "Sangiovese, mezzo litro." },
      { name: "Sangiovese 1 L", price: "10,00", desc: "Sangiovese, litro." },
      { name: "Bianco 25cl", price: "3,00", desc: "Vino bianco della casa." },
      { name: "Bianco 50cl", price: "5,00", desc: "Vino bianco della casa, mezzo litro." },
      { name: "Bianco 1 L", price: "9,00", desc: "Vino bianco della casa, litro." },
      { name: "Bottiglia di vino", price: "—", desc: "Selezione in bottiglia — chiedi al personale." },
    ],
  },
  {
    id: "bar",
    title: "Bar",
    subtitle: "Caffetteria, amari e distillati",
    items: [
      { name: "Espresso", price: "1,00", desc: "Caffè espresso." },
      { name: "Cappuccino", price: "2,00", desc: "Cappuccino." },
      { name: "Amari", price: "3,00", desc: "Selezione di amari." },
      { name: "Grappa bianca", price: "3,50", desc: "Grappa bianca." },
      { name: "Grappa barricata", price: "4,00", desc: "Grappa invecchiata in barrique." },
      { name: "Alcolici vari", price: "3,00", desc: "Selezione di alcolici." },
      { name: "Superalcolici", price: "5,00", desc: "Selezione di superalcolici." },
    ],
  },
];

// Pairing suggestions for hero callout
export const pairings = [
  {
    dish: "Tartufo / Tagliata ai porcini",
    wine: "Syrah di Cortona",
    note: "Rosso strutturato, perfetto con tartufo e porcini.",
  },
  {
    dish: "Burger di Chianina (Americano, Bismark)",
    wine: "Sangiovese",
    note: "Fresco e tannico, taglia la grassezza del formaggio.",
  },
  {
    dish: "Chicken Cheese / Piadine",
    wine: "Bianco frizzantino",
    note: "Bollicine fresche per pietanze leggere.",
  },
  {
    dish: "Grigliata di maiale / Costata",
    wine: "Sassaia · Brown Ale",
    note: "Birra artigianale corposa San Girolamo per carni alla brace.",
  },
];
