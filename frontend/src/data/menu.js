// Menu data for Burger & Grill Camucia
// tags: veg (vegetariano), spicy (piccante), beef (manzo), chicken (pollo), pork (maiale)

export const menuData = [
  {
    id: "hamburger",
    title: "Hamburger",
    subtitle: "Dalla Chianina al Classic",
    accent: "Carne selezionata, pane artigianale, cottura alla griglia",
    items: [
      {
        name: "Boscaiolo",
        price: "11,00",
        desc: "Chianina 200gr, porcini, insalata, pomodoro, salsa boscaiola.",
        tags: ["beef"],
      },
      {
        name: "Tartufo",
        price: "13,00",
        desc: "Chianina 200gr, lamelle di tartufo, fonduta di pecorino, insalata, pomodoro, salsa maionese.",
        tags: ["beef"],
        signature: true,
      },
      {
        name: "Americano",
        price: "11,00",
        desc: "Chianina 200gr, cheddar, uovo al tegamino, bacon croccante, salsa burger.",
        tags: ["beef"],
      },
      {
        name: "Bismark",
        price: "14,00",
        desc: "Chianina 200gr, spinaci saltati, lamelle di tartufo, uovo al tegamino, Philadelphia.",
        tags: ["beef"],
        signature: true,
      },
      {
        name: "New Mexico",
        price: "9,00",
        desc: "Hamburger 170gr, bacon croccante, provola affumicata, cipolla di Tropea, insalata, pomodoro, salsa piccante.",
        tags: ["beef", "spicy"],
      },
      {
        name: "Texas",
        price: "9,00",
        desc: "Hamburger 170gr, fonduta di gorgonzola, zucchine grigliate, cipolla croccante.",
        tags: ["beef"],
      },
      {
        name: "Nevada",
        price: "8,50",
        desc: "Hamburger 170gr, cheddar, cipolla di Tropea, cetrioli marinati, insalata, pomodoro, salsa BBQ.",
        tags: ["beef"],
      },
      {
        name: "Hawaii",
        price: "9,00",
        desc: "Hamburger 170gr, mozzarella di Bufala, melanzane grigliate, pesto di pomodori secchi, maionese.",
        tags: ["beef"],
      },
      {
        name: "Colorado",
        price: "8,50",
        desc: "Hamburger 170gr, verdure grigliate, Philadelphia, insalata, pomodoro.",
        tags: ["beef"],
      },
      {
        name: "Cheeseburger",
        price: "6,50",
        desc: "Hamburger 140gr, fontina, insalata, pomodoro, ketchup, maionese.",
        tags: ["beef"],
      },
      {
        name: "Classic Burger",
        price: "5,50",
        desc: "Hamburger 140gr, insalata, pomodoro, maionese, ketchup.",
        tags: ["beef"],
      },
      {
        name: "Chicken Cheese",
        price: "8,50",
        desc: "Burger di pollo 150gr, cheddar, bacon, insalata, pomodoro, salsa burger.",
        tags: ["chicken"],
      },
      {
        name: "Chicken",
        price: "7,00",
        desc: "Burger di pollo 150gr, insalata, pomodoro, maionese, ketchup.",
        tags: ["chicken"],
      },
      {
        name: "Hot Dog",
        price: "4,00",
        desc: "Wurstel, ketchup, maionese.",
        tags: ["pork"],
      },
    ],
  },
  {
    id: "ciabatte",
    title: "Ciabatte",
    subtitle: "Panini croccanti dal forno",
    accent: "Pane toscano a lievitazione lenta",
    items: [
      {
        name: "Toscana",
        price: "11,00",
        desc: "Tagliata di manzo, porcini, fonduta di pecorino, lamelle di tartufo.",
        tags: ["beef"],
        signature: true,
      },
      {
        name: "Gustosa",
        price: "10,00",
        desc: "Tagliata di manzo, rucola, salsa di grana e salsa tartara.",
        tags: ["beef"],
      },
      {
        name: "Sfiziosa",
        price: "9,00",
        desc: "Tagliata di pollo, verdurine grigliate, Philadelphia, glassa al balsamico di Modena.",
        tags: ["chicken"],
      },
      {
        name: "Rustica",
        price: "8,50",
        desc: "Salsiccia, fagioli all'uccelletto, cipolla croccante.",
        tags: ["pork"],
      },
      {
        name: "Vegetariana",
        price: "8,50",
        desc: "Verdure grigliate, mozzarella, pomodoro, frittatina, salsa rosa.",
        tags: ["veg"],
      },
      {
        name: "Saporita",
        price: "7,50",
        desc: "Prosciutto cotto, mozzarella, pomodoro, pesto di basilico.",
        tags: ["pork"],
      },
    ],
  },
  {
    id: "piadine",
    title: "Piadine",
    subtitle: "Morbide e farcite",
    accent: "Street food italiano",
    items: [
      {
        name: "Chicken Wrap",
        price: "8,00",
        desc: "Tagliata di pollo, cheddar, bacon, ketchup.",
        tags: ["chicken"],
      },
      {
        name: "Stick Chicken Wrap",
        price: "9,00",
        desc: "Stick di pollo fritti, insalata, pomodoro, salsa ranch.",
        tags: ["chicken"],
      },
      {
        name: "Kebab di Pollo",
        price: "9,00",
        desc: "Pollo, insalata, pomodoro, cipolla di Tropea, patatine, salsa piccante, salsa ranch, ketchup, maionese.",
        tags: ["chicken", "spicy"],
      },
      {
        name: "Classica",
        price: "8,50",
        desc: "Prosciutto crudo, stracchino, rucola, pomodoro.",
        tags: ["pork"],
      },
      {
        name: "Parma",
        price: "7,50",
        desc: "Prosciutto cotto, mozzarella, pomodoro.",
        tags: ["pork"],
      },
    ],
  },
  {
    id: "griglia",
    title: "Griglia & Barbeque",
    subtitle: "Carne alla brace",
    accent: "Il cuore della tradizione toscana",
    items: [
      {
        name: "Tagliata ai porcini",
        price: "20,00",
        desc: "Tagliata di manzo ai porcini. — Sliced beef with porcini.",
        tags: ["beef"],
        signature: true,
      },
      {
        name: "Tagliata rosmarino e pepe",
        price: "15,00",
        desc: "Tagliata di manzo rosmarino e pepe. — Sliced beef, rosemary and pepper.",
        tags: ["beef"],
      },
      {
        name: "Tagliata rucola, pomodoro e grana",
        price: "16,50",
        desc: "Tagliata di manzo con rucola, pomodoro e grana. — Sliced beef, rocket, tomato, parmesan.",
        tags: ["beef"],
      },
      {
        name: "Costata di manzo",
        price: "35,00 / kg",
        desc: "Costata di manzo alla brace. — Beef steak.",
        tags: ["beef"],
        signature: true,
      },
      {
        name: "Tagliata di pollo",
        price: "13,50",
        desc: "Petto di pollo alla griglia. — Sliced chicken breast.",
        tags: ["chicken"],
      },
      {
        name: "Grigliata mista",
        price: "17,00",
        desc: "Grigliata mista di carni. — Mixed grilled meats.",
        tags: ["beef", "pork", "chicken"],
      },
      {
        name: "Grigliata di maiale",
        price: "14,00",
        desc: "Grigliata mista di maiale. — Mixed pork meats.",
        tags: ["pork"],
      },
    ],
  },
  {
    id: "contorni",
    title: "Contorni",
    subtitle: "Side",
    accent: "Per accompagnare al meglio",
    items: [
      {
        name: "Patatine rustiche",
        price: "3,50",
        desc: "Patatine rustiche fritte. — Rustic fried potatoes.",
        tags: ["veg"],
      },
      {
        name: "Patatine classiche",
        price: "3,00",
        desc: "Patatine fritte classiche. — French fries.",
        tags: ["veg"],
      },
      {
        name: "1/2 Porzione patatine",
        price: "2,00",
        desc: "Mezza porzione di patatine. — 1/2 French fries.",
        tags: ["veg"],
      },
      {
        name: "Insalata mista",
        price: "5,00",
        desc: "Insalata mista fresca. — Mixed salad.",
        tags: ["veg"],
      },
      {
        name: "Verdure grigliate",
        price: "6,00",
        desc: "Selezione di verdure grigliate. — Grilled vegetables.",
        tags: ["veg"],
      },
    ],
  },
];

export const FILTERS = [
  { id: "all", label: "Tutto" },
  { id: "beef", label: "Manzo" },
  { id: "chicken", label: "Pollo" },
  { id: "pork", label: "Maiale" },
  { id: "veg", label: "Vegetariano" },
  { id: "spicy", label: "Piccante" },
];

export const RESTAURANT = {
  name: "Burger & Grill",
  tagline: "Camucia · Cortona",
  description:
    "Dal 2010 serviamo la vera Chianina sulla griglia. Pane artigianale, carne a km 0, fuoco vivo.",
  address: "Via Lauretana 19/21, 52044 Camucia – Cortona (AR)",
  phonePrimary: "+39 0575 613880",
  phoneMobile: "+39 366 3706361",
  whatsappNumber: "393663706361",
  hours: [
    { day: "Pranzo", time: "12:00 – 14:00" },
    { day: "Cena", time: "18:00 – 23:00" },
  ],
};
