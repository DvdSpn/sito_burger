// Simple i18n dictionary for IT/EN
export const LOGO_URL =
  "https://customer-assets.emergentagent.com/job_chianina-burger-bar/artifacts/fa2imzti_LOGO_BURGER-NO%20SFONDO.png";

export const MAPS_QUERY = "Via+Lauretana+19%2F21,+52044+Camucia+Cortona+AR";
export const MAPS_EMBED_SRC = `https://www.google.com/maps?q=${MAPS_QUERY}&z=16&output=embed`;
export const MAPS_LINK = `https://www.google.com/maps?q=${MAPS_QUERY}`;

const dict = {
  it: {
    "nav.hamburger": "Hamburger",
    "nav.ciabatte": "Ciabatte",
    "nav.piadine": "Piadine",
    "nav.griglia": "Griglia",
    "nav.galleria": "Galleria",
    "nav.recensioni": "Recensioni",
    "nav.contatti": "Contatti",
    "nav.menu": "Vai al menu",
    "nav.drinks": "Bevande",
    "nav.about": "Chi siamo",

    "hero.kicker": "Dal 2016 · Chianina · Fuoco vivo",
    "hero.title1": "Burger",
    "hero.title2": "Grill",
    "hero.description":
      "Dal 2016 serviamo la vera Chianina sulla griglia. Pane artigianale, carne a km 0, fuoco vivo. Panini artigianali, tagliate alla brace e la nostra griglia sempre accesa, nel cuore di Camucia.",
    "hero.ctaMenu": "Scopri il menu",
    "hero.ctaDrinks": "Carta bevande",
    "hero.ctaLocation": "Via Lauretana 21",
    "hero.highlight1": "★ Chianina 200gr",
    "hero.highlight2": "Pane a lievitazione lenta",
    "hero.highlight3": "Porcini · Tartufo",
    "hero.highlight4": "Km 0 · Toscana",
    "hero.highlight5": "★ Fuoco vivo",

    "values.1.label": "Chianina Toscana",
    "values.1.sub": "200gr certificata",
    "values.2.label": "Pane artigianale",
    "values.2.sub": "Lievitazione 24h",
    "values.3.label": "Senza glutine",
    "values.3.sub": "Pane su richiesta",
    "values.4.label": "Km 0",
    "values.4.sub": "Prodotti del territorio",

    "filter.all": "Tutto",
    "filter.beef": "Manzo",
    "filter.chicken": "Pollo",
    "filter.pork": "Maiale",
    "filter.veg": "Vegetariano",
    "filter.spicy": "Piccante",
    "filter.label": "Filtra →",

    "tag.veg": "Veg",
    "tag.spicy": "Piccante",
    "tag.beef": "Manzo",
    "tag.chicken": "Pollo",
    "tag.pork": "Maiale",
    "tag.signature": "Signature",
    "tag.new": "Novità",
    "tag.popular": "Popular Choice",

    "menu.orderItem": "+ Ordina via WhatsApp",
    "menu.add": "Aggiungi",
    "menu.contains": "Contiene:",
    "menu.disclaimer":
      "Prezzi in € · Coperto non incluso · Disponibile pane senza glutine su richiesta",

    "section.hamburger.subtitle": "Dalla Chianina al Classic",
    "section.hamburger.accent":
      "Carne selezionata, pane artigianale, cottura alla griglia",
    "section.ciabatte.subtitle": "Panini croccanti dal forno",
    "section.ciabatte.accent": "Pane toscano a lievitazione lenta",
    "section.piadine.subtitle": "Morbide e farcite",
    "section.piadine.accent": "Street food italiano",
    "section.griglia.title": "Griglia & Barbeque",
    "section.griglia.subtitle": "Carne alla brace",
    "section.griglia.accent": "Il cuore della tradizione toscana",
    "section.contorni.title": "Contorni",
    "section.contorni.subtitle": "Side",
    "section.contorni.accent": "Per accompagnare al meglio",

    "gallery.kicker": "Dentro il locale",
    "gallery.title": "Atmosfera",
    "gallery.subtitle": "Toscana",
    "gallery.description":
      "Un angolo di Camucia dove la tradizione della Chianina incontra il fuoco della griglia. Presto qui le foto del locale e dei piatti.",
    "gallery.placeholder": "Foto in arrivo",

    "reviews.kicker": "Dicono di noi",
    "reviews.title": "4.7",
    "reviews.subtitle": "su 5",
    "reviews.count": "Basato su oltre 400 recensioni",
    "reviews.basedOn": (n) => `Basato su ${n}+ recensioni`,
    "reviews.prev": "Recensione precedente",
    "reviews.next": "Recensione successiva",
    "reviews.leaveReview": "Lascia una recensione Google",

    "status.openNow": "Aperto · stiamo servendo",
    "status.closedNow": "Chiuso ora",
    "status.reopensToday": (hhmm) => `Riapre oggi alle ${hhmm}`,
    "status.reopensTomorrow": (hhmm) => `Riapre domani alle ${hhmm}`,
    "status.opensAt": (hhmm) => `Chiuso · apriamo alle ${hhmm}`,
    "status.opensTomorrow": (hhmm) => `Chiuso · domani alle ${hhmm}`,
    "status.until": (hhmm) => `fino alle ${hhmm}`,
    "status.closed": "Chiuso",

    "filter.scrollHint": "Scorri per tutte le categorie →",

    "contact.kicker": "Vieni a trovarci",
    "contact.title1": "La griglia è",
    "contact.title2": "sempre accesa",
    "contact.description":
      "Nel cuore di Camucia, a pochi passi dai colli di Cortona. Ti aspettiamo a pranzo e a cena, tutti i giorni.",
    "contact.whatsapp": "Ordina via WhatsApp",
    "contact.address": "Indirizzo",
    "contact.phone": "Telefono",
    "contact.phoneExtra": "Cellulare",
    "contact.hours": "Orari",
    "contact.hoursLunch": "Pranzo",
    "contact.hoursDinner": "Cena",
    "contact.social": "Seguici",
    "contact.map.title": "Dove siamo",
    "contact.map.open": "Apri in Google Maps",

    "footer.rights": "Tutti i diritti riservati.",
    "wa.floating": "Ordina · WhatsApp",
    "wa.message.generic":
      "Ciao Burger & Grill! Vorrei fare un ordine da Camucia.",
    "wa.message.item": (name, price) =>
      `Ciao Burger & Grill! Vorrei ordinare: ${name} (€ ${price}).`,

    "mobile.open": "Apri menu",
    "mobile.close": "Chiudi menu",

    "cart.kicker": "Il tuo ordine",
    "cart.title": "Carrello",
    "cart.fab": "Carrello",
    "cart.fabWith": "Vedi carrello",
    "cart.open": "Apri carrello",
    "cart.close": "Chiudi carrello",
    "cart.empty.title": "Il carrello è vuoto",
    "cart.empty.subtitle":
      "Sfoglia il menu e aggiungi i tuoi piatti preferiti. L'ordine parte direttamente via WhatsApp.",
    "cart.total": "Totale",
    "cart.sendOrder": "Invia ordine WhatsApp",
    "cart.clear": "Svuota carrello",
    "cart.remove": "Rimuovi",
    "cart.increase": "Aumenta quantità",
    "cart.decrease": "Diminuisci quantità",
    "cart.itemSingular": "piatto",
    "cart.itemPlural": "piatti",
    "cart.perKg": "al kg",
    "cart.kgNote":
      "⚠ Alcuni articoli sono al kg: il totale finale sarà calcolato alla pesata.",
    "cart.disclaimer":
      "L'ordine verrà inviato via WhatsApp al locale. Ti risponderemo per conferma, tempi di attesa e modalità di ritiro/consumo.",

    "confirm.kicker": "Conferma ordine",
    "confirm.title": "Sicuro di voler inviare l'ordine?",
    "confirm.body":
      "Riepilogo dei piatti selezionati. Premendo «Invia» si aprirà WhatsApp con il messaggio pronto: controlla prima di premere invio nella chat. Il ristorante ti risponderà per confermare disponibilità e orario.",
    "confirm.cancel": "Annulla",
    "confirm.send": "Invia su WhatsApp",

    "cart.meta.mode": "Modalità",
    "cart.meta.takeaway": "Solo asporto",
    "cart.meta.pickup": "Orario di ritiro",
    "cart.meta.closed": "Al momento non ci sono orari disponibili. Scrivici su WhatsApp: ti risponderemo appena possibile.",
    "cart.takeawayOnly": "Ordine solo asporto",
    "cart.takeawayOnlyNote":
      "Per consumare al tavolo l'ordine viene preso direttamente dal personale al tuo arrivo.",
    "cart.slot.asap": "Prima possibile",
    "cart.slot.lunch": "Pranzo",
    "cart.slot.dinner": "Cena",
    "cart.slot.today": "oggi",
    "cart.slot.tomorrow": "domani",
    "cart.slot.pending": "Da concordare",

    "cart.sent.kicker": "Ordine inviato",
    "cart.sent.title": "Invio completato",
    "cart.sent.heading": "Ordine inviato su WhatsApp!",
    "cart.sent.body":
      "Abbiamo aperto WhatsApp con il messaggio pronto. Se non l'hai già fatto, premi «Invia» nella chat per completare l'invio al ristorante.",
    "cart.sent.step1.title": "Attendi la conferma",
    "cart.sent.step1.body":
      "Il ristoratore leggerà il tuo ordine e ti risponderà su WhatsApp per confermare la presa in carico.",
    "cart.sent.step2.title": "Accordatevi sull'orario",
    "cart.sent.step2.body":
      "Nel messaggio abbiamo già indicato l'orario scelto. Il ristoratore ti confermerà l'orario preciso di ritiro in base ai tempi di preparazione.",
    "cart.sent.alert.title": "Attenzione",
    "cart.sent.alert.body":
      "Se non ricevi risposta entro pochi minuti, il messaggio potrebbe non essere stato visto: ti consigliamo di chiamare direttamente il locale per essere sicuro che l'ordine venga preso in carico.",
    "cart.sent.callBtn": "Chiama ora",
    "cart.sent.reviewBtn": "Lascia una recensione Google",
    "cart.sent.closeBtn": "Ho capito, chiudi",

    "drinks.kicker": "Carta",
    "drinks.title": "Bevande &",
    "drinks.titleAccent": "Vini",
    "drinks.description":
      "Vini toscani, birre alla spina e artigianali, caffè e distillati. Selezione a km 0 per accompagnare al meglio la tua griglia.",
    "drinks.pairings": "Abbinamenti consigliati",
    "drinks.backToMenu": "Torna al menu",

    "about.kicker": "Chi siamo",
    "about.title": "La nostra",
    "about.titleAccent": "storia",
    "about.backToMenu": "Torna al menu",
    "about.story.kicker": "Dal 2016",
    "about.story.title": "Tradizione toscana, fuoco americano.",
    "about.story.p1":
      "Nasciamo a Camucia nel 2016 con un'idea semplice: portare in tavola la carne della nostra Toscana, lavorata con la passione per gli hamburger d'oltreoceano. La Chianina viene selezionata e macinata fresca ogni giorno.",
    "about.story.p2":
      "Siamo una gestione familiare. In cucina un padre e un figlio, in sala una famiglia allargata. Chi entra mangia come a casa, ma con la griglia sempre accesa e un bicchiere di Syrah pronto sul bancone.",
    "about.story.p3":
      "Il nostro pane arriva da un forno locale con una lievitazione di 24 ore. Gli ortaggi, i formaggi e il tartufo sono toscani. Perché il miglior burger parte dalla qualità, non dai fuochi d'artificio.",
    "about.values.kicker": "I nostri valori",
    "about.values.title": "Quello in cui crediamo.",
    "about.values.v1.title": "Fuoco vivo, cottura giusta",
    "about.values.v1.body":
      "Ogni taglio ha il suo tempo. La Chianina la cuociamo al sangue, il pollo ben cotto, la salsiccia croccante fuori e morbida dentro.",
    "about.values.v2.title": "Gestione familiare",
    "about.values.v2.body":
      "Non siamo una catena. Il proprietario è dietro il bancone, ti saluta per nome se torni. E se hai un'esigenza particolare, basta chiedere.",
    "about.values.v3.title": "Km 0 dove possibile",
    "about.values.v3.body":
      "Chianina certificata, ortaggi toscani, vino locale. Piccole scelte quotidiane che fanno grande la qualità.",
    "about.photos.kicker": "La nostra galleria",
    "about.photos.title": "Lo staff, la Chianina, il locale.",
    "about.photos.description":
      "Presto qui le foto dei momenti migliori del locale. Se sei passato e hai scattato qualcosa, taggaci su Instagram!",
    "about.cta.title": "Vieni a trovarci.",
    "about.cta.body":
      "Prenota un tavolo o passa per un asporto. La griglia è sempre accesa.",
    "about.cta.btn": "Vai al menu",
  },
  en: {
    "nav.hamburger": "Burgers",
    "nav.ciabatte": "Sandwiches",
    "nav.piadine": "Wraps",
    "nav.griglia": "Grill",
    "nav.galleria": "Gallery",
    "nav.recensioni": "Reviews",
    "nav.contatti": "Contact",
    "nav.menu": "Browse menu",
    "nav.drinks": "Drinks",
    "nav.about": "About",

    "hero.kicker": "Since 2016 · Chianina · Live fire",
    "hero.title1": "Burger",
    "hero.title2": "Grill",
    "hero.description":
      "Since 2016 we serve authentic Chianina beef on the grill. Artisan bread, km-0 meat, live fire. Gourmet sandwiches, sliced steaks and an ever-burning grill in the heart of Camucia.",
    "hero.ctaMenu": "Explore menu",
    "hero.ctaDrinks": "Drinks list",
    "hero.ctaLocation": "Via Lauretana 21",
    "hero.highlight1": "★ Chianina 200g",
    "hero.highlight2": "Slow-risen bread",
    "hero.highlight3": "Porcini · Truffle",
    "hero.highlight4": "Km-0 · Tuscany",
    "hero.highlight5": "★ Live fire",

    "values.1.label": "Tuscan Chianina",
    "values.1.sub": "200g certified",
    "values.2.label": "Artisan bread",
    "values.2.sub": "24h rising",
    "values.3.label": "Gluten-free",
    "values.3.sub": "Bread on request",
    "values.4.label": "Km-0",
    "values.4.sub": "Local produce",

    "filter.all": "All",
    "filter.beef": "Beef",
    "filter.chicken": "Chicken",
    "filter.pork": "Pork",
    "filter.veg": "Vegetarian",
    "filter.spicy": "Spicy",
    "filter.label": "Filter →",

    "tag.veg": "Veg",
    "tag.spicy": "Spicy",
    "tag.beef": "Beef",
    "tag.chicken": "Chicken",
    "tag.pork": "Pork",
    "tag.signature": "Signature",
    "tag.new": "New",
    "tag.popular": "Popular Choice",

    "menu.orderItem": "+ Order via WhatsApp",
    "menu.add": "Add",
    "menu.contains": "Contains:",
    "menu.disclaimer":
      "Prices in € · Cover not included · Gluten-free bread available on request",

    "section.hamburger.subtitle": "From Chianina to Classic",
    "section.hamburger.accent":
      "Selected meat, artisan bread, grilled to perfection",
    "section.ciabatte.subtitle": "Crunchy sandwiches from the oven",
    "section.ciabatte.accent": "Tuscan slow-risen bread",
    "section.piadine.subtitle": "Soft wraps, packed with flavour",
    "section.piadine.accent": "Italian street food",
    "section.griglia.title": "Grill & BBQ",
    "section.griglia.subtitle": "Meat on embers",
    "section.griglia.accent": "The heart of Tuscan tradition",
    "section.contorni.title": "Sides",
    "section.contorni.subtitle": "Side",
    "section.contorni.accent": "The perfect pairing",

    "gallery.kicker": "Inside the place",
    "gallery.title": "Tuscan",
    "gallery.subtitle": "vibes",
    "gallery.description":
      "A corner of Camucia where Chianina tradition meets the fire of the grill. Photos of the venue and dishes coming soon.",
    "gallery.placeholder": "Photo coming soon",

    "reviews.kicker": "People say",
    "reviews.title": "4.7",
    "reviews.subtitle": "out of 5",
    "reviews.count": "Based on 400+ reviews",
    "reviews.basedOn": (n) => `Based on ${n}+ reviews`,
    "reviews.prev": "Previous review",
    "reviews.next": "Next review",
    "reviews.leaveReview": "Write a Google review",

    "status.openNow": "Open · now serving",
    "status.closedNow": "Closed now",
    "status.reopensToday": (hhmm) => `Reopens today at ${hhmm}`,
    "status.reopensTomorrow": (hhmm) => `Reopens tomorrow at ${hhmm}`,
    "status.opensAt": (hhmm) => `Closed · opens at ${hhmm}`,
    "status.opensTomorrow": (hhmm) => `Closed · tomorrow at ${hhmm}`,
    "status.until": (hhmm) => `until ${hhmm}`,
    "status.closed": "Closed",

    "filter.scrollHint": "Swipe for all categories →",

    "contact.kicker": "Come visit us",
    "contact.title1": "The grill is",
    "contact.title2": "always on",
    "contact.description":
      "In the heart of Camucia, a few steps from the hills of Cortona. We're here for lunch and dinner, every day.",
    "contact.whatsapp": "Order via WhatsApp",
    "contact.address": "Address",
    "contact.phone": "Phone",
    "contact.phoneExtra": "Mobile",
    "contact.hours": "Hours",
    "contact.hoursLunch": "Lunch",
    "contact.hoursDinner": "Dinner",
    "contact.social": "Follow us",
    "contact.map.title": "Where we are",
    "contact.map.open": "Open in Google Maps",

    "footer.rights": "All rights reserved.",
    "wa.floating": "Order · WhatsApp",
    "wa.message.generic": "Hi Burger & Grill! I'd like to place an order from Camucia.",
    "wa.message.item": (name, price) =>
      `Hi Burger & Grill! I'd like to order: ${name} (€ ${price}).`,

    "mobile.open": "Open menu",
    "mobile.close": "Close menu",

    "cart.kicker": "Your order",
    "cart.title": "Cart",
    "cart.fab": "Cart",
    "cart.fabWith": "View cart",
    "cart.open": "Open cart",
    "cart.close": "Close cart",
    "cart.empty.title": "Your cart is empty",
    "cart.empty.subtitle":
      "Browse the menu and add your favourite dishes. Orders are sent directly via WhatsApp.",
    "cart.total": "Total",
    "cart.sendOrder": "Send WhatsApp order",
    "cart.clear": "Clear cart",
    "cart.remove": "Remove",
    "cart.increase": "Increase quantity",
    "cart.decrease": "Decrease quantity",
    "cart.itemSingular": "item",
    "cart.itemPlural": "items",
    "cart.perKg": "per kg",
    "cart.kgNote":
      "⚠ Some items are priced per kg: final total is calculated on weigh-in.",
    "cart.disclaimer":
      "The order will be sent via WhatsApp to the restaurant. We'll reply with confirmation, waiting time and pickup / dine-in details.",

    "confirm.kicker": "Order confirmation",
    "confirm.title": "Ready to send your order?",
    "confirm.body":
      "Here's a summary of your selection. Tapping «Send» opens WhatsApp with a ready-made message: check it before hitting send in the chat. The restaurant will reply to confirm availability and timing.",
    "confirm.cancel": "Cancel",
    "confirm.send": "Send to WhatsApp",

    "cart.meta.mode": "Service",
    "cart.meta.takeaway": "Takeaway only",
    "cart.meta.pickup": "Pickup time",
    "cart.meta.closed": "No time slots available right now. Send us a WhatsApp — we'll reply as soon as possible.",
    "cart.takeawayOnly": "Takeaway order only",
    "cart.takeawayOnlyNote":
      "For dine-in, your order is taken by the staff when you arrive.",
    "cart.slot.asap": "As soon as possible",
    "cart.slot.lunch": "Lunch",
    "cart.slot.dinner": "Dinner",
    "cart.slot.today": "today",
    "cart.slot.tomorrow": "tomorrow",
    "cart.slot.pending": "To be agreed",

    "cart.sent.kicker": "Order sent",
    "cart.sent.title": "Done",
    "cart.sent.heading": "Order sent on WhatsApp!",
    "cart.sent.body":
      "We opened WhatsApp with the message ready. If you haven't already, tap «Send» in the chat to complete the delivery to the restaurant.",
    "cart.sent.step1.title": "Wait for confirmation",
    "cart.sent.step1.body":
      "The restaurant will read your order and reply on WhatsApp to confirm it.",
    "cart.sent.step2.title": "Agree on the timing",
    "cart.sent.step2.body":
      "Your chosen time is already in the message. The restaurant will confirm the precise pickup time based on preparation.",
    "cart.sent.alert.title": "Heads up",
    "cart.sent.alert.body":
      "If you don't get a reply within a few minutes, the message might not have been seen: we recommend calling the restaurant directly to make sure your order is taken in.",
    "cart.sent.callBtn": "Call now",
    "cart.sent.reviewBtn": "Write a Google review",
    "cart.sent.closeBtn": "Got it, close",

    "drinks.kicker": "List",
    "drinks.title": "Drinks &",
    "drinks.titleAccent": "Wines",
    "drinks.description":
      "Tuscan wines, draught and craft beers, coffee and spirits. A km-0 selection to pair perfectly with your grill.",
    "drinks.pairings": "Suggested pairings",
    "drinks.backToMenu": "Back to menu",

    "about.kicker": "About us",
    "about.title": "Our",
    "about.titleAccent": "story",
    "about.backToMenu": "Back to menu",
    "about.story.kicker": "Since 2016",
    "about.story.title": "Tuscan tradition, American fire.",
    "about.story.p1":
      "We were born in Camucia in 2016 with one idea: bring the beef of our Tuscany to the table, crafted with the passion of American-style burgers. Chianina beef is hand-selected and ground fresh every day.",
    "about.story.p2":
      "We're a family-run business. Father and son at the grill, a wide family in the dining room. You eat like at home, but with the grill always on and a glass of Syrah on the counter.",
    "about.story.p3":
      "Our bread comes from a local bakery with 24-hour rising. Vegetables, cheese and truffle are Tuscan. Because the best burger starts with quality, not fireworks.",
    "about.values.kicker": "Our values",
    "about.values.title": "What we believe in.",
    "about.values.v1.title": "Live fire, right cook",
    "about.values.v1.body":
      "Every cut has its time. We cook Chianina rare, chicken through, sausage crispy outside and soft inside.",
    "about.values.v2.title": "Family-run",
    "about.values.v2.body":
      "We're not a chain. The owner is behind the counter and greets you by name if you come back. Special request? Just ask.",
    "about.values.v3.title": "Km-0 where possible",
    "about.values.v3.body":
      "Certified Chianina, Tuscan vegetables, local wine. Small everyday choices that make great quality.",
    "about.photos.kicker": "Our gallery",
    "about.photos.title": "The staff, the beef, the place.",
    "about.photos.description":
      "Photos of the best moments coming soon. If you've been here and snapped something, tag us on Instagram!",
    "about.cta.title": "Come and visit.",
    "about.cta.body":
      "Book a table or drop by for takeaway. The grill is always on.",
    "about.cta.btn": "Browse the menu",
  },
};

export function makeT(lang) {
  return (key, ...args) => {
    const d = dict[lang] || dict.it;
    const v = d[key];
    if (typeof v === "function") return v(...args);
    return v ?? key;
  };
}

// Mock reviews (data, not translated item-by-item — reviews feel more authentic raw)
export const REVIEWS = [
  {
    name: "Marco B.",
    from: "Cortona",
    rating: 5,
    it: "Hamburger di Chianina eccezionale, porzioni generose e personale gentilissimo. Il Tartufo è una poesia, ci torneremo di sicuro.",
    en: "Outstanding Chianina burger, generous portions and super-friendly staff. The Tartufo burger is poetry — we'll be back for sure.",
    platform: "Google",
  },
  {
    name: "Giulia R.",
    from: "Firenze",
    rating: 5,
    it: "Rapporto qualità/prezzo imbattibile. La tagliata ai porcini è da urlo e il pane artigianale fa davvero la differenza.",
    en: "Unbeatable value. The porcini sliced steak is incredible and the artisan bread really makes a difference.",
    platform: "TripAdvisor",
  },
  {
    name: "Luca M.",
    from: "Arezzo",
    rating: 5,
    it: "Siamo celiaci e abbiamo trovato un panino senza glutine davvero buono. Gestione familiare, atmosfera informale e carne top.",
    en: "We're gluten-intolerant and found a really good GF bun here. Family-run, casual vibe and top-quality meat.",
    platform: "Google",
  },
  {
    name: "Sofia T.",
    from: "Perugia",
    rating: 4,
    it: "Locale piccolo ma accogliente. Il Bismark è una bomba! Consiglio di prenotare nei weekend.",
    en: "Small but welcoming place. The Bismark burger is a bomb! Book ahead on weekends.",
    platform: "RestaurantGuru",
  },
  {
    name: "Andrea P.",
    from: "Camucia",
    rating: 5,
    it: "La mia hamburgeria di fiducia da anni. Carne fresca ogni giorno e staff che ti fa sentire a casa.",
    en: "My go-to burger spot for years. Fresh meat every day and staff that makes you feel at home.",
    platform: "Google",
  },
];
