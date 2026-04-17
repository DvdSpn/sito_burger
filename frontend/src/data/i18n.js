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

    "hero.kicker": "Dal 2010 · Chianina · Fuoco vivo",
    "hero.title1": "Burger",
    "hero.title2": "Grill",
    "hero.description":
      "Dal 2010 serviamo la vera Chianina sulla griglia. Pane artigianale, carne a km 0, fuoco vivo. Panini artigianali, tagliate alla brace e la nostra griglia sempre accesa, nel cuore di Camucia.",
    "hero.ctaMenu": "Scopri il menu",
    "hero.ctaLocation": "Via Lauretana 19/21",
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

    "menu.orderItem": "+ Ordina via WhatsApp",
    "menu.add": "Aggiungi",
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
    "reviews.prev": "Recensione precedente",
    "reviews.next": "Recensione successiva",

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

    "cart.kicker": "Il tuo ordine",
    "cart.title": "Carrello",
    "cart.fab": "Carrello",
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
      "Riepilogo dei piatti selezionati. Premendo «Invia» si aprirà WhatsApp con il messaggio pronto: controlla prima di premere invio nella chat. Il carrello verrà svuotato.",
    "confirm.cancel": "Annulla",
    "confirm.send": "Invia su WhatsApp",
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

    "hero.kicker": "Since 2010 · Chianina · Live fire",
    "hero.title1": "Burger",
    "hero.title2": "Grill",
    "hero.description":
      "Since 2010 we serve authentic Chianina beef on the grill. Artisan bread, km-0 meat, live fire. Gourmet sandwiches, sliced steaks and an ever-burning grill in the heart of Camucia.",
    "hero.ctaMenu": "Explore menu",
    "hero.ctaLocation": "Via Lauretana 19/21",
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

    "menu.orderItem": "+ Order via WhatsApp",
    "menu.add": "Add",
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
    "reviews.prev": "Previous review",
    "reviews.next": "Next review",

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

    "cart.kicker": "Your order",
    "cart.title": "Cart",
    "cart.fab": "Cart",
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
      "Here's a summary of your selection. Tapping «Send» opens WhatsApp with a ready-made message: check it before hitting send in the chat. Your cart will be cleared.",
    "confirm.cancel": "Cancel",
    "confirm.send": "Send to WhatsApp",
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
