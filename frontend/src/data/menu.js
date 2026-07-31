// Menu data for Burger & Grill Camucia
// tags: veg, spicy, beef, chicken, pork
// allergens: gluten, lactose, eggs, soy, mustard, sesame, sulphites, nuts, celery

export const menuData = [
  {
    id: "hamburger",
    title: "Hamburger",
    titleEn: "Burgers",
    subtitle: "Dalla Chianina al Classic",
    subtitleEn: "From Chianina to Classic",
    accent: "Carne selezionata, pane artigianale, cottura alla griglia",
    accentEn: "Selected meat, artisan bread, grilled to perfection",
    layout: "swipe",
    items: [
      { name: "Tartufato", price: "15,00", desc: "Chianina 200gr, lamelle di tartufo, fonduta di pecorino, insalata, pomodoro, salsa maionese.", descEn: "Chianina beef 200g, shaved truffle, pecorino cheese fondue, lettuce, tomato, mayonnaise.", tags: ["beef"], allergens: ["gluten", "sesame", "lactose", "eggs"], signature: true },
      { name: "Boscaiolo", price: "13,50", desc: "Chianina 200gr, porcini, insalata, pomodoro, salsa boscaiola.", descEn: "Chianina beef 200g, porcini mushrooms, lettuce, tomato, boscaiola mushroom sauce.", tags: ["beef"], allergens: ["gluten", "sesame", "eggs"] },
      { name: "Americano", price: "12,00", desc: "Hamburger 170gr, cheddar, cipolla croccante, bacon croccante, salsa burger.", descEn: "Burger 170g, cheddar, crispy onion, crispy bacon, burger sauce.", tags: ["beef"], allergens: ["gluten", "sesame", "lactose", "eggs", "mustard"] },
      { name: "New Mexico", price: "11,50", desc: "Hamburger 170gr, bacon croccante, provola affumicata, cipolla di Tropea, insalata, pomodoro, salsa piccante.", descEn: "Burger 170g, crispy bacon, smoked provola, Tropea red onion, lettuce, tomato, spicy sauce.", tags: ["beef", "spicy"], allergens: ["gluten", "sesame", "lactose"], popular: true },
      { name: "Nevada", price: "11,00", desc: "Hamburger 170gr, cheddar, cipolla di Tropea, cetrioli marinati, insalata, pomodoro, salsa BBQ.", descEn: "Burger 170g, cheddar, Tropea red onion, pickled cucumbers, lettuce, tomato, BBQ sauce.", tags: ["beef"], allergens: ["gluten", "sesame", "lactose", "mustard"] },
      { name: "Cheeseburger", price: "8,00", desc: "Hamburger 140gr, fontina, insalata, pomodoro, ketchup, maionese.", descEn: "Burger 140g, fontina cheese, lettuce, tomato, ketchup, mayonnaise.", tags: ["beef"], allergens: ["gluten", "sesame", "lactose", "eggs", "mustard"] },
      { name: "Classic Burger", price: "7,50", desc: "Hamburger 140gr, insalata, pomodoro, maionese, ketchup.", descEn: "Burger 140g, lettuce, tomato, mayonnaise, ketchup.", tags: ["beef"], allergens: ["gluten", "sesame", "eggs", "mustard"] },
      { name: "Veggye Burger", price: "11,00", desc: "Hamburger vegetariano, maionese al basilico, crema di pomodori secchi, insalata, stracciatella.", descEn: "Vegetarian burger, basil mayonnaise, sun-dried tomato cream, lettuce, stracciatella cheese.", tags: ["veg"], allergens: ["gluten", "sesame", "lactose", "eggs"], isNew: true },
      { name: "Chicken Cheese", price: "10,00", desc: "Burger di pollo 150gr, cheddar, bacon, insalata, pomodoro, salsa burger.", descEn: "Chicken burger 150g, cheddar, bacon, lettuce, tomato, burger sauce.", tags: ["chicken"], allergens: ["gluten", "sesame", "lactose", "eggs", "mustard"] },
      { name: "Chicken", price: "8,50", desc: "Burger di pollo 150gr, insalata, pomodoro, maionese, ketchup.", descEn: "Chicken burger 150g, lettuce, tomato, mayonnaise, ketchup.", tags: ["chicken"], allergens: ["gluten", "sesame", "eggs", "mustard"] },
      { name: "Hot Dog", price: "6,00", desc: "Wurstel + 2 salse a scelta tra: ketchup, maionese, BBQ, salsa piccante.", descEn: "Frankfurter + 2 sauces of your choice from: ketchup, mayo, BBQ, spicy sauce.", tags: ["pork"], allergens: ["gluten", "sesame", "eggs", "mustard"] },
    ],
  },
  {
    id: "ciabatte",
    title: "Ciabatte",
    titleEn: "Ciabatta Sandwiches",
    subtitle: "Panini croccanti dal forno",
    subtitleEn: "Crunchy sandwiches from the oven",
    accent: "Pane toscano a lievitazione lenta",
    accentEn: "Tuscan slow-risen bread",
    layout: "swipe",
    items: [
      { name: "Toscana", price: "13,00", desc: "Tagliata di manzo, porcini, fonduta di pecorino, lamelle di tartufo.", descEn: "Sliced beef, porcini mushrooms, pecorino fondue, shaved truffle.", tags: ["beef"], allergens: ["gluten", "lactose"], signature: true },
      { name: "Gustosa", price: "12,00", desc: "Tagliata di manzo, rucola, salsa di grana e salsa tartara.", descEn: "Sliced beef, rocket, parmesan sauce and tartar sauce.", tags: ["beef"], allergens: ["gluten", "lactose", "eggs", "mustard"], popular: true },
      { name: "Pulled Pork", price: "12,50", desc: "Pulled pork, rosti di patate, cipolla croccante, salsa chipotle.", descEn: "Pulled pork, potato rosti, crispy onion, chipotle sauce.", tags: ["pork", "spicy"], allergens: ["gluten", "mustard"], isNew: true },
      { name: "Sfiziosa", price: "11,50", desc: "Tagliata di pollo, verdurine grigliate, Philadelphia, glassa al balsamico di Modena.", descEn: "Sliced chicken, grilled baby vegetables, Philadelphia, Modena balsamic glaze.", tags: ["chicken"], allergens: ["gluten", "lactose", "sulphites"] },
      { name: "Vegetariana", price: "12,00", desc: "Verdure grigliate, mozzarella, pomodoro, frittatina, salsa rosa.", descEn: "Grilled vegetables, mozzarella, tomato, omelette, cocktail sauce.", tags: ["veg"], allergens: ["gluten", "lactose", "eggs"] },
    ],
  },
  {
    id: "piadine",
    title: "Wrap",
    titleEn: "Wraps",
    subtitle: "Morbide e farcite",
    subtitleEn: "Soft wraps, packed with flavour",
    accent: "Piadine arrotolate, street food italiano",
    accentEn: "Rolled piadine, Italian street food",
    layout: "swipe",
    items: [
      { name: "Chicken Wrap", price: "10,00", desc: "Piadina arrotolata con tagliata di pollo, cheddar, bacon, ketchup.", descEn: "Rolled piadina with sliced chicken, cheddar, bacon, ketchup.", tags: ["chicken"], allergens: ["gluten", "lactose"], popular: true },
      { name: "Kebab di Pollo", price: "11,00", desc: "Piadina arrotolata con pollo, insalata, pomodoro, cipolla di Tropea, patatine, salsa piccante, salsa yogurt, ketchup, maionese.", descEn: "Rolled piadina with chicken, lettuce, tomato, Tropea onion, fries, spicy sauce, yogurt sauce, ketchup, mayonnaise.", tags: ["chicken", "spicy"], allergens: ["gluten", "lactose", "eggs", "mustard"] },
      { name: "Crunchy Chicken", price: "11,00", desc: "Piadina arrotolata con stick di pollo fritti, insalata, pomodoro, salsa yogurt.", descEn: "Rolled piadina with crispy chicken sticks, lettuce, tomato, yogurt sauce.", tags: ["chicken"], allergens: ["gluten", "lactose", "eggs"], isNew: true },
    ],
  },
  {
    id: "griglia",
    title: "Griglia",
    titleEn: "Grill",
    subtitle: "Carne alla brace",
    subtitleEn: "Meat on the embers",
    accent: "Il cuore della tradizione toscana",
    accentEn: "The heart of Tuscan tradition",
    layout: "swipe",
    items: [
      { name: "Tagliata rosmarino e pepe", price: "17,00", desc: "Tagliata di manzo rosmarino e pepe.", descEn: "Sliced beef with rosemary and pepper.", tags: ["beef"], allergens: [], popular: true },
      { name: "Tagliata rucola, pomodorini e grana", price: "18,00", desc: "Tagliata di manzo con rucola, pomodorini e grana.", descEn: "Sliced beef with rocket, cherry tomatoes and parmesan.", tags: ["beef"], allergens: ["lactose"] },
      { name: "Bistecca", price: "38,00 / kg", desc: "Bistecca di manzo alla brace.", descEn: "Grilled beef steak.", tags: ["beef"], allergens: [], signature: true },
      { name: "Tagliata di pollo", price: "15,00", desc: "Petto di pollo alla griglia con ingredienti di stagione.", descEn: "Grilled chicken breast with seasonal ingredients.", tags: ["chicken"], allergens: [] },
      { name: "Agnello Scottadito", price: "18,00", desc: "Costine di agnello alla griglia, accompagnate con rosti di patate e salsa.", descEn: "Grilled lamb ribs, served with potato rosti and sauce.", tags: ["beef"], allergens: [], isNew: true },
    ],
  },
  {
    id: "contorni",
    title: "Contorni",
    titleEn: "Sides",
    subtitle: "Side",
    subtitleEn: "Sides",
    accent: "Per accompagnare al meglio",
    accentEn: "The perfect pairing",
    layout: "swipe",
    items: [
      { name: "Patatine rustiche", price: "4,00", desc: "Patatine rustiche con la buccia.", descEn: "Rustic potato wedges with skin.", tags: ["veg"], allergens: [] },
      { name: "Patatine classiche", price: "3,50", desc: "Patatine fritte classiche.", descEn: "Classic French fries.", tags: ["veg"], allergens: [] },
      { name: "Verdure grigliate", price: "5,00", desc: "Selezione di verdure grigliate.", descEn: "Selection of grilled vegetables.", tags: ["veg"], allergens: [] },
    ],
  },
  {
    id: "dessert",
    title: "Dessert",
    titleEn: "Dessert",
    subtitle: "La dolcezza finale",
    subtitleEn: "The sweet finale",
    accent: "Per chiudere in bellezza",
    accentEn: "To end on a high note",
    layout: "swipe",
    items: [
      { name: "Tiramisù", price: "5,00", desc: "Il tiramisù artigianale della casa: crema al mascarpone, caffè e cacao.", descEn: "House artisan tiramisù: mascarpone cream, coffee and cocoa.", tags: ["veg"], allergens: ["gluten", "lactose", "eggs"], popular: true },
      { name: "Cheesecake ai frutti di bosco", price: "5,00", desc: "Cheesecake con base di biscotto e coulis di frutti di bosco.", descEn: "Cheesecake with biscuit base and wild-berry coulis.", tags: ["veg"], allergens: ["gluten", "lactose", "eggs"] },
      { name: "Tortino al cioccolato cuore caldo", price: "5,00", desc: "Tortino al cioccolato fondente con cuore caldo che cola.", descEn: "Dark chocolate lava cake with warm molten heart.", tags: ["veg"], allergens: ["gluten", "lactose", "eggs"] },
      { name: "Tartufo · Bianco, Nero o Pistacchio", price: "5,00", desc: "Tartufo gelato nelle tre varianti: bianco, nero o pistacchio. Variante affogato: + € 1,00 con caffè, + € 2,00 con liquore.", descEn: "Ice-cream truffle in three flavours: white, dark or pistachio. Affogato variant: + € 1.00 with coffee, + € 2.00 with liqueur.", tags: ["veg"], allergens: ["lactose", "eggs", "nuts"] },
      { name: "Cantucci e vin santo", price: "6,50", desc: "I classici cantucci toscani serviti con vin santo.", descEn: "Classic Tuscan cantucci biscuits served with vin santo dessert wine.", tags: ["veg"], allergens: ["gluten", "eggs", "nuts", "sulphites"], signature: true },
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
    "Dal 2016 serviamo la vera Chianina sulla griglia. Pane artigianale, carne a km 0, fuoco vivo.",
  address: "Via Lauretana 21, 52044 Camucia – Cortona (AR)",
  phonePrimary: "+39 0575 613880",
  phoneMobile: "+39 366 3706361",
  whatsappNumber: "393663706361",
  googlePlaceId: "ChIJqVxkvt77KxMR52z7K_J8NNU",
  googleReviewUrl:
    "https://search.google.com/local/writereview?placeid=ChIJqVxkvt77KxMR52z7K_J8NNU",
  hours: [
    { day: "Pranzo", time: "12:00 – 14:00" },
    { day: "Cena", time: "18:00 – 23:00" },
  ],
};
