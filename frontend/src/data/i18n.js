// Simple i18n dictionary for IT/EN
export const LOGO_URL = "/logo-bg.png";

export const MAPS_QUERY = "Via+Lauretana+19%2F21,+52044+Camucia+Cortona+AR";
export const MAPS_EMBED_SRC = `https://www.google.com/maps?q=${MAPS_QUERY}&z=16&output=embed`;
export const MAPS_LINK = `https://www.google.com/maps?q=${MAPS_QUERY}`;

const dict = {
  it: {
    "nav.drinks": "Bevande",
    "nav.about": "Chi siamo",
    "nav.skipToMenu": "Salta al menu",
    "nav.backToTop": "Torna in cima",
    "nav.categories": "Categorie del menu",
    "filter.groupLabel": "Filtra i piatti",
    "hero.ctaDirectionsLabel": "Indicazioni per Via Lauretana 21",
    "mobile.title": "Menu",
    "wine.producer": "Produttore",
    "wine.grape": "Vitigno",
    "wine.region": "Regione",
    "wine.close": "Chiudi",
    "reviews.title": "Cosa dicono di noi",
    "reviews.fallbackBody": "Le nostre recensioni sono su Google Maps: leggile con un tocco.",
    "reviews.dot": (n) => `Recensione ${n}`,

    "hero.kicker": "Camucia · Cortona · dal 2016",
    "hero.title1": "Burger",
    "hero.title2": "Grill",
    "hero.description":
      "Hamburger di Chianina, tagliate alla brace e ciabatte croccanti. Ordina da asporto su WhatsApp o vieni a trovarci in Via Lauretana.",
    "hero.ctaMenu": "Scopri il menu",
    "hero.ctaDrinks": "Carta bevande",
    "hero.ctaDirections": "Indicazioni",
    "hero.highlight1": "★ Chianina 200 g",
    "hero.highlight2": "Pane a lievitazione lenta",
    "hero.highlight3": "Porcini · Tartufo",
    "hero.highlight4": "Km 0 · Toscana",
    "hero.highlight5": "★ Fuoco vivo",

    "values.1.label": "Chianina Toscana",
    "values.1.sub": "200 g certificata",
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
    "filter.label": "Filtra:",
    "filter.empty": "Nessun piatto con questo filtro",
    "filter.resetAll": "Mostra tutti",

    "tag.veg": "Veg",
    "tag.spicy": "Piccante",
    "tag.beef": "Manzo",
    "tag.chicken": "Pollo",
    "tag.pork": "Maiale",
    "tag.signature": "Specialità",
    "tag.new": "Novità",
    "tag.popular": "Più scelto",

    "menu.add": "Aggiungi",
    "menu.added": (name, n) =>
      `${name} aggiunto. ${n} ${n === 1 ? "piatto" : "piatti"} nell'ordine.`,
    "menu.contains": "Allergeni:",
    "menu.swipe": (n) => `Scorri · ${n} piatti →`,
    "menu.allergyNotice":
      "Allergie o intolleranze? Chiedi al personale prima di ordinare.",
    "menu.coverCharge": "Coperto e servizio · € 1,00 a persona",
    "menu.notice.burger": "Tutti gli hamburger sono serviti con patatine. Pane senza glutine su richiesta.",
    "menu.notice.ciabatte": "Tutte le ciabatte sono servite con patatine. Pane senza glutine su richiesta.",
    "menu.notice.wraps": "Tutti i wrap sono serviti con patatine.",

    "reviews.kicker": "Dicono di noi",
    "reviews.subtitle": "su 5",
    "reviews.basedOn": (n) => `Basato su ${n}+ recensioni`,
    "reviews.prev": "Recensione precedente",
    "reviews.next": "Recensione successiva",
    "reviews.leaveReview": "Scrivi una recensione",
    "reviews.readOnGoogle": "Leggi le recensioni su Google",
    "reviews.fromGoogle": "Da Google",

    "status.openNow": (hhmm) => `Aperto · chiude alle ${hhmm}`,
    "status.closedToday": (hhmm) => `Chiuso · riapre alle ${hhmm}`,
    "status.closedTomorrow": (hhmm) => `Chiuso · riapre domani alle ${hhmm}`,
    "status.closedOn": (day, hhmm) => `Chiuso · riapre ${day} alle ${hhmm}`,
    "status.closed": "Chiuso",
    "day.0": "domenica",
    "day.1": "lunedì",
    "day.2": "martedì",
    "day.3": "mercoledì",
    "day.4": "giovedì",
    "day.5": "venerdì",
    "day.6": "sabato",
    "hours.tueSat": "Mar–Sab",
    "hours.sun": "Dom",
    "hours.mon": "Lun",
    "hours.closed": "Chiuso",

    "contact.kicker": "Vieni a trovarci",
    "contact.title1": "La griglia è",
    "contact.title2": "sempre accesa",
    "contact.description":
      "Nel cuore di Camucia, a pochi passi dai colli di Cortona. Ti aspettiamo a pranzo e a cena, da martedì a sabato, e la domenica sera. Il lunedì siamo chiusi.",
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
    "wa.message.generic": "Ciao Burger & Grill! Vorrei fare un ordine da Camucia.",

    "mobile.open": "Apri menu",
    "mobile.close": "Chiudi menu",

    "cart.kicker": "Il tuo ordine",
    "cart.title": "Carrello",
    "cart.fab": (n) => (n > 0 ? `Il tuo ordine (${n})` : "Il tuo ordine"),
    "cart.close": "Chiudi carrello",
    "cart.empty.title": "Il tuo ordine è vuoto",
    "cart.empty.subtitle":
      "Aggiungi i piatti dal menu, poi invia l'ordine su WhatsApp.",
    "cart.empty.cta": "Vai al menu",
    "cart.total": "Totale",
    "cart.reviewOrder": (total) => `Rivedi l'ordine · € ${total}`,
    "cart.clear": "Svuota carrello",
    "cart.remove": "Rimuovi",
    "cart.increase": "Aumenta quantità",
    "cart.decrease": "Diminuisci quantità",
    "cart.perKg": "al kg",
    "cart.kgNote":
      "Gli articoli a peso non sono nel totale: te lo confermiamo su WhatsApp.",
    "cart.disclaimer":
      "Ti rispondiamo su WhatsApp per confermare ordine e orario di ritiro.",

    "cart.pickup.line": (meal, day, time) =>
      `Ritiro: ${meal}, ${day}, ${time}`,
    "cart.pickup.change": "Cambia",

    "confirm.kicker": "Conferma ordine",
    "confirm.title": "Controlla il tuo ordine",
    "confirm.body":
      "Si apre WhatsApp con il messaggio già scritto. Premi Invia nella chat e ti rispondiamo per confermare.",
    "confirm.cancel": "Modifica",
    "confirm.send": "Apri WhatsApp",

    "cart.meta.mode": "Modalità",
    "cart.meta.takeaway": "Solo asporto",
    "cart.meta.pickup": "Orario di ritiro",
    "cart.meta.closed":
      "Al momento non ci sono orari disponibili. Scrivici su WhatsApp: ti risponderemo appena possibile.",
    "cart.takeawayOnly": "Solo asporto",
    "cart.slot.lunch": "Pranzo",
    "cart.slot.dinner": "Cena",
    "cart.slot.today": "oggi",
    "cart.slot.tomorrow": "domani",
    "cart.slot.pending": "Da concordare",

    "cart.sent.kicker": "Ultimo passo",
    "cart.sent.title": "Completa su WhatsApp",
    "cart.sent.heading": "Hai premuto Invia?",
    "cart.sent.body":
      "L'ordine è pronto nella chat. Se non l'hai ancora inviato, torna su WhatsApp e premi Invia.",
    "cart.sent.alert.title": "Nessuna risposta?",
    "cart.sent.alert.body":
      "Se non ti rispondiamo entro qualche minuto, chiamaci: così siamo sicuri di aver ricevuto l'ordine.",
    "cart.sent.callBtn": "Chiama",
    "cart.sent.reviewBtn": "Scrivi una recensione",
    "cart.sent.confirmBtn": "Ho inviato l'ordine",
    "cart.sent.backBtn": "Torna al carrello",

    "cart.note.label": "Note per la cucina (facoltative)",
    "cart.note.placeholder": "es. senza maionese, +bacon",
    "cart.note.helper": "Fino a 2 modifiche, massimo 80 caratteri.",
    "cart.note.counter": (used, max) => `${used}/${max}`,

    "drinks.kicker": "La carta",
    "drinks.title": "Bevande &",
    "drinks.titleAccent": "Vini",
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

    "home.drinksCta.kicker": "Da bere",
    "home.drinksCta.title": "Sfoglia la carta bevande",
    "home.drinksCta.body":
      "Vini toscani, birre artigianali San Girolamo, bibite, caffè e distillati. Tutta la nostra selezione per accompagnare al meglio il tuo ordine.",
    "home.drinksCta.btn": "Vedi le bevande",

    "home.reviewCta.title": "Sei già stato da noi?",
    "home.reviewCta.body":
      "Una recensione su Google ci aiuta a farci conoscere.",
    "home.reviewCta.btn": "Scrivi una recensione",

    "lightbox.close": "Chiudi",

    "page.title.home": "Burger & Grill Camucia · Hamburger di Chianina e griglia a Cortona",
    "page.title.drinks": "Bevande e vini · Burger & Grill Camucia",
    "page.title.about": "Chi siamo · Burger & Grill Camucia",
  },
  en: {
    "nav.drinks": "Drinks",
    "nav.about": "About",
    "nav.skipToMenu": "Skip to menu",
    "nav.backToTop": "Back to top",
    "nav.categories": "Menu categories",
    "filter.groupLabel": "Filter dishes",
    "hero.ctaDirectionsLabel": "Directions to Via Lauretana 21",
    "mobile.title": "Menu",
    "wine.producer": "Producer",
    "wine.grape": "Grape variety",
    "wine.region": "Region",
    "wine.close": "Close",
    "reviews.title": "What people say about us",
    "reviews.fallbackBody": "Our reviews are on Google Maps: read them with one tap.",
    "reviews.dot": (n) => `Review ${n}`,

    "hero.kicker": "Camucia · Cortona · since 2016",
    "hero.title1": "Burger",
    "hero.title2": "Grill",
    "hero.description":
      "Chianina burgers, flame-grilled steaks and crispy ciabatta sandwiches. Order takeaway on WhatsApp or visit us on Via Lauretana.",
    "hero.ctaMenu": "Explore menu",
    "hero.ctaDrinks": "Drinks list",
    "hero.ctaDirections": "Directions",
    "hero.highlight1": "★ Chianina 200 g",
    "hero.highlight2": "Slow-risen bread",
    "hero.highlight3": "Porcini · Truffle",
    "hero.highlight4": "Km-0 · Tuscany",
    "hero.highlight5": "★ Live fire",

    "values.1.label": "Tuscan Chianina",
    "values.1.sub": "200 g certified",
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
    "filter.label": "Filter:",
    "filter.empty": "No dishes match this filter",
    "filter.resetAll": "Show all",

    "tag.veg": "Veg",
    "tag.spicy": "Spicy",
    "tag.beef": "Beef",
    "tag.chicken": "Chicken",
    "tag.pork": "Pork",
    "tag.signature": "Signature",
    "tag.new": "New",
    "tag.popular": "Popular",

    "menu.add": "Add",
    "menu.added": (name, n) =>
      `${name} added. ${n} ${n === 1 ? "item" : "items"} in your order.`,
    "menu.contains": "Allergens:",
    "menu.swipe": (n) => `Swipe · ${n} dishes →`,
    "menu.allergyNotice":
      "Allergies or intolerances? Please ask our staff before ordering.",
    "menu.coverCharge": "Cover & service · €1.00 per person",
    "menu.notice.burger": "All burgers come with fries. Gluten-free bun on request.",
    "menu.notice.ciabatte": "All ciabatta sandwiches come with fries. Gluten-free bread on request.",
    "menu.notice.wraps": "All wraps come with fries.",

    "reviews.kicker": "People say",
    "reviews.subtitle": "out of 5",
    "reviews.basedOn": (n) => `Based on ${n}+ reviews`,
    "reviews.prev": "Previous review",
    "reviews.next": "Next review",
    "reviews.leaveReview": "Write a review",
    "reviews.readOnGoogle": "Read our Google reviews",
    "reviews.fromGoogle": "From Google",

    "status.openNow": (hhmm) => `Open · closes at ${hhmm}`,
    "status.closedToday": (hhmm) => `Closed · opens at ${hhmm}`,
    "status.closedTomorrow": (hhmm) => `Closed · opens tomorrow at ${hhmm}`,
    "status.closedOn": (day, hhmm) => `Closed · opens ${day} at ${hhmm}`,
    "status.closed": "Closed",
    "day.0": "Sunday",
    "day.1": "Monday",
    "day.2": "Tuesday",
    "day.3": "Wednesday",
    "day.4": "Thursday",
    "day.5": "Friday",
    "day.6": "Saturday",
    "hours.tueSat": "Tue–Sat",
    "hours.sun": "Sun",
    "hours.mon": "Mon",
    "hours.closed": "Closed",

    "contact.kicker": "Come visit us",
    "contact.title1": "The grill is",
    "contact.title2": "always on",
    "contact.description":
      "In the heart of Camucia, a few steps from the hills of Cortona. We're open for lunch and dinner Tuesday to Saturday, and Sunday evening. Closed on Mondays.",
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
    "wa.message.generic":
      "Hi Burger & Grill! I'd like to place an order from Camucia.",

    "mobile.open": "Open menu",
    "mobile.close": "Close menu",

    "cart.kicker": "Your order",
    "cart.title": "Cart",
    "cart.fab": (n) => (n > 0 ? `Your order (${n})` : "Your order"),
    "cart.close": "Close cart",
    "cart.empty.title": "Your order is empty",
    "cart.empty.subtitle":
      "Add dishes from the menu, then send your order on WhatsApp.",
    "cart.empty.cta": "Browse menu",
    "cart.total": "Total",
    "cart.reviewOrder": (total) => `Review order · €${total}`,
    "cart.clear": "Clear cart",
    "cart.remove": "Remove",
    "cart.increase": "Increase quantity",
    "cart.decrease": "Decrease quantity",
    "cart.perKg": "per kg",
    "cart.kgNote":
      "Items priced by weight aren't in the total: we'll confirm it on WhatsApp.",
    "cart.disclaimer":
      "We'll reply on WhatsApp to confirm your order and pickup time.",

    "cart.pickup.line": (meal, day, time) =>
      `Pickup: ${meal}, ${day}, ${time}`,
    "cart.pickup.change": "Change",

    "confirm.kicker": "Order confirmation",
    "confirm.title": "Check your order",
    "confirm.body":
      "WhatsApp opens with your message ready. Tap Send in the chat and we'll reply to confirm.",
    "confirm.cancel": "Edit",
    "confirm.send": "Open WhatsApp",

    "cart.meta.mode": "Service",
    "cart.meta.takeaway": "Takeaway only",
    "cart.meta.pickup": "Pickup time",
    "cart.meta.closed":
      "No time slots available right now. Send us a WhatsApp — we'll reply as soon as possible.",
    "cart.takeawayOnly": "Takeaway only",
    "cart.slot.lunch": "lunch",
    "cart.slot.dinner": "dinner",
    "cart.slot.today": "today",
    "cart.slot.tomorrow": "tomorrow",
    "cart.slot.pending": "To be agreed",

    "cart.sent.kicker": "Last step",
    "cart.sent.title": "Finish in WhatsApp",
    "cart.sent.heading": "Did you tap Send?",
    "cart.sent.body":
      "Your order is ready in the chat. If you haven't sent it yet, go back to WhatsApp and tap Send.",
    "cart.sent.alert.title": "No reply?",
    "cart.sent.alert.body":
      "If we don't reply within a few minutes, call us so we know your order arrived.",
    "cart.sent.callBtn": "Call",
    "cart.sent.reviewBtn": "Write a review",
    "cart.sent.confirmBtn": "I've sent it",
    "cart.sent.backBtn": "Back to my order",

    "cart.note.label": "Notes for the kitchen (optional)",
    "cart.note.placeholder": "e.g. no mayo, +bacon",
    "cart.note.helper": "Up to 2 changes, 80 characters max.",
    "cart.note.counter": (used, max) => `${used}/${max}`,

    "drinks.kicker": "Our list",
    "drinks.title": "Drinks &",
    "drinks.titleAccent": "Wines",
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

    "home.drinksCta.kicker": "Drinks",
    "home.drinksCta.title": "Browse the drinks list",
    "home.drinksCta.body":
      "Tuscan wines, San Girolamo craft beers, sodas, coffee and spirits. Our full selection to pair with your order.",
    "home.drinksCta.btn": "See drinks",

    "home.reviewCta.title": "Been here before?",
    "home.reviewCta.body":
      "A Google review helps other people find us.",
    "home.reviewCta.btn": "Write a review",

    "lightbox.close": "Close",

    "page.title.home": "Burger & Grill Camucia · Chianina burgers and grill in Cortona",
    "page.title.drinks": "Drinks and wines · Burger & Grill Camucia",
    "page.title.about": "About us · Burger & Grill Camucia",
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
