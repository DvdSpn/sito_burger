// Drinks menu (separate page /bevande)
export const drinksData = [
  {
    id: "alla-spina",
    title: "Bevande alla spina",
    subtitle: "Dal rubinetto",
    items: [
      {
        name: "Birra alla spina",
        desc: "Raffo · Peroni",
        formats: [
          { size: "20 cl", price: "3,00" },
          { size: "40 cl", price: "5,00" },
        ],
      },
      {
        name: "Coca Cola alla spina",
        desc: "Coca Cola classica.",
        formats: [
          { size: "20 cl", price: "2,50" },
          { size: "40 cl", price: "4,50" },
        ],
      },
      {
        name: "Vino bianco frizzantino",
        desc: "Vino bianco frizzante alla spina.",
        formats: [
          { size: "25 cl", price: "3,00" },
          { size: "50 cl", price: "5,00" },
        ],
      },
    ],
  },
  {
    id: "birre-bottiglia",
    title: "Birre in bottiglia",
    subtitle: "Selezione classica",
    items: [
      {
        name: "Birre 33 cl",
        desc: "Peroni · Beck's · Moretti",
        price: "3,00",
      },
      {
        name: "Birre Premium 33 cl",
        desc: "Ceres · Tennent's · Corona · Bjorne",
        price: "5,00",
      },
      {
        name: "Birre 66 cl",
        desc: "Moretti · Peroni · Heineken",
        price: "5,00",
      },
      {
        name: "Ichnusa non filtrata 50 cl",
        desc: "Birra sarda non filtrata.",
        price: "5,00",
      },
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
          { size: "33 cl", price: "6,50" },
          { size: "75 cl", price: "12,00" },
        ],
        desc: "Birra chiara e rinfrescante, aromatizzata con scorza d'arancia, coriandolo e spezie leggere. Leggera, fresca e leggermente velata.",
      },
      {
        name: "Rovina",
        style: "Golden Ale · 4.8% vol.",
        image: "/beers/rovina.png",
        formats: [
          { size: "33 cl", price: "6,50" },
          { size: "75 cl", price: "12,00" },
        ],
        desc: "Birra dorata e equilibrata, con aromi maltati dolci, note floreali e un tocco erbaceo dai luppoli nobili. Pulita e beverina.",
      },
      {
        name: "Sassaia",
        style: "Brown Ale · 7.0% vol.",
        image: "/beers/sassaia.png",
        formats: [
          { size: "33 cl", price: "6,50" },
          { size: "75 cl", price: "12,00" },
        ],
        desc: "Birra ambrata corposa, profumata di resina, caramello tostato, frutta matura e malti speciali. Strutturata e resinosa.",
      },
      {
        name: "Cavadenti",
        style: "Strong Belgian Ale · 7.5% vol.",
        image: "/beers/cavadenti.png",
        formats: [
          { size: "33 cl", price: "6,50" },
          { size: "75 cl", price: "12,00" },
        ],
        desc: "Birra forte e complessa, con aromi caldi di frutta candita, spezie, malti caramellati e lieviti belgici. Avvolgente e persistente.",
      },
    ],
  },
  {
    id: "bevande-varie",
    title: "Bevande analcoliche",
    subtitle: "Bibite, acqua, energy",
    items: [
      {
        name: "Lattine 33 cl",
        desc: "Coca Cola · Coca Cola Zero · Fanta · Sprite · Lemon Soda",
        price: "2,50",
      },
      {
        name: "Bibite in bottiglia 45 cl",
        desc: "Coca Cola · Coca Cola Zero · Fanta · Estathè",
        price: "3,00",
      },
      {
        name: "Coca Cola 1 L",
        desc: "Bottiglia da 1 litro.",
        price: "4,00",
      },
      {
        name: "Red Bull 25 cl",
        desc: "Energy drink.",
        price: "3,50",
      },
      {
        name: "Acqua",
        desc: "Naturale o frizzante.",
        formats: [
          { size: "50 cl", price: "1,00" },
          { size: "1 L", price: "1,50" },
        ],
      },
    ],
  },
  {
    id: "vini",
    title: "Vini",
    subtitle: "Della casa e del territorio",
    items: [
      {
        name: "Syrah di Cortona",
        desc: "Vino rosso strutturato del territorio.",
        formats: [
          { size: "25 cl", price: "3,50" },
          { size: "50 cl", price: "6,50" },
          { size: "1 L", price: "11,00" },
        ],
      },
      {
        name: "Sangiovese",
        desc: "Sangiovese toscano, fresco e tannico.",
        formats: [
          { size: "25 cl", price: "3,00" },
          { size: "50 cl", price: "5,50" },
          { size: "1 L", price: "10,00" },
        ],
      },
      {
        name: "Bianco della casa",
        desc: "Vino bianco selezionato dal territorio.",
        formats: [
          { size: "25 cl", price: "3,00" },
          { size: "50 cl", price: "5,00" },
          { size: "1 L", price: "9,00" },
        ],
      },
      {
        name: "Bottiglia di vino",
        desc: "Selezione in bottiglia — chiedi al personale.",
        price: "—",
      },
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
