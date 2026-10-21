// Featured wine bottles — shown as a premium showcase at the top of /bevande.
// Prices will be added later by the owner. Descriptions are producer-referenced
// tasting notes gathered from the winery / official sources.
export const featuredWines = [
  {
    id: "assiolo-bolgheri",
    name: "Assiolo",
    appellation: "Bolgheri Rosso DOC",
    region: "Toscana",
    grape: "Cabernet Sauvignon, Merlot, Cabernet Franc",
    image: "/wines/assiolo-bolgheri.webp",
    producer: "Azienda Agricola Campo al Noce",
    price: "24,00",
    description:
      "Bolgheri Rosso DOC dell'Azienda Agricola Campo al Noce, che prende il nome dall'assiolo, il piccolo gufo disegnato in etichetta. Taglio di Cabernet Sauvignon, Merlot e Cabernet Franc vinificato solo in acciaio per conservare tutta la fragranza delle uve. Rosso rubino brillante, al naso è intenso ed elegante, con lampone e frutti rossi maturi; in bocca è elegante, con tannini morbidi ben bilanciati dalla freschezza.",
    descriptionEn:
      "Bolgheri Rosso DOC by Azienda Agricola Campo al Noce, named after the assiolo, the little scops owl drawn on the label. A blend of Cabernet Sauvignon, Merlot and Cabernet Franc fermented in steel only, to keep all the fragrance of the grapes. Bright ruby red, with an intense yet elegant nose of raspberry and ripe red berries; elegant on the palate, with soft tannins well balanced by freshness.",
  },
  {
    id: "rosso-montalcino",
    name: "Rosso di Montalcino",
    appellation: "Montalcino DOC",
    region: "Toscana",
    grape: "Sangiovese Grosso 100%",
    image: "/wines/rosso-montalcino.webp",
    producer: "Famiglia Falorni",
    price: "23,50",
    description:
      "Rosso di Montalcino DOC della Famiglia Falorni, da uve Sangiovese Grosso coltivate sulle colline di Montalcino: il “fratello minore” del Brunello, pronto da bere. Di colore rosso vigoroso, ha un profumo intenso con sentori di frutta rossa e spezie; al palato è armonioso, con tannini piacevoli. Perfetto con carni rosse e selvaggina in umido.",
    descriptionEn:
      "Rosso di Montalcino DOC by the Falorni family, made from Sangiovese Grosso grown on the hills of Montalcino — the little brother of Brunello, ready to drink now. A vigorous red colour and an intense nose of red fruit and spice; harmonious on the palate, with pleasant tannins. Perfect with red meat and stewed game.",
  },
  {
    id: "governo-toscano",
    name: "Governo",
    appellation: "all'uso Toscano · IGT",
    region: "Toscana",
    grape: "Sangiovese, Merlot",
    image: "/wines/governo-toscano.webp",
    producer: "Barbanera",
    price: "10,00",
    description:
      "Toscana IGT di Barbanera prodotto con l'antico metodo del “Governo all'uso Toscano”: dopo la fermentazione si aggiungono uve appassite che riavviano una seconda fermentazione, donando morbidezza e complessità. Rosso intenso, quasi impenetrabile, profuma di ciliegia, amarena, frutti rossi molto maturi e spezie; il sorso è pieno ma morbido, in equilibrio tra rotondità e freschezza.",
    descriptionEn:
      "Toscana IGT by Barbanera made with the ancient “Governo all'uso Toscano” method: after fermentation dried grapes are added to trigger a second fermentation, adding softness and complexity. Deep, almost impenetrable red, with cherry, sour cherry, very ripe red fruit and spice; full yet soft on the palate, balancing roundness and freshness.",
  },
  {
    id: "santa-cristina",
    name: "Santa Cristina",
    appellation: "Toscana IGT",
    region: "Toscana",
    grape: "Sangiovese, Merlot, Syrah",
    image: "/wines/santa-cristina.webp",
    producer: "Marchesi Antinori",
    price: "15,00",
    description:
      "Il rosso di casa Antinori: un Sangiovese in blend con Merlot e Syrah, affinato per pochi mesi in botte. Rosso rubino vivace, al naso ciliegia, prugna e delicate note speziate; al palato è fresco, morbido, immediato, con tannini equilibrati. Il classico rosso quotidiano toscano, facile e piacevole.",
    descriptionEn:
      "The Antinori family's everyday red: Sangiovese blended with Merlot and Syrah, briefly aged in wood. Bright ruby, with cherry, plum and delicate spice notes; fresh, soft and immediate on the palate with balanced tannins. A classic Tuscan daily red, easy and enjoyable.",
  },
  {
    id: "achelo",
    name: "Achelo",
    appellation: "Cortona DOC",
    region: "Toscana",
    grape: "Syrah 100%",
    image: "/wines/achelo.webp",
    producer: "La Braccesca · Marchesi Antinori",
    price: "21,50",
    description:
      "Syrah in purezza di Cortona, dalla tenuta La Braccesca dei Marchesi Antinori; affina in parte in barrique di secondo e terzo passaggio e in parte in acciaio. Rosso rubino intenso con riflessi violacei; al naso mora, prugna e ciliegia matura, con viola, liquirizia e pepe nero. In bocca è morbido e fresco, con tannini setosi e un finale lungo e sapido.",
    descriptionEn:
      "Pure Syrah from Cortona, made at the La Braccesca estate of Marchesi Antinori; aged partly in second- and third-use barriques and partly in steel. Deep ruby with violet highlights; blackberry, plum and ripe cherry on the nose, with violet, liquorice and black pepper. Soft and fresh on the palate, with silky tannins and a long, savoury finish.",
  },
  {
    id: "canapone-maremma",
    name: "Canapone",
    appellation: "Selezione · Maremma Toscana DOC",
    region: "Toscana",
    grape: "Ciliegiolo 100%",
    image: "/wines/canapone-maremma.webp",
    producer: "Santa Lucia",
    price: "17,50",
    description:
      "Ciliegiolo in purezza selezione “Canapone” della Maremma Toscana. Rubino brillante, esalta al naso ciliegia matura, ribes, spezie dolci e un tocco floreale. Al palato è morbido, fruttato, con acidità viva e tannini fini; un vino toscano dalla beva golosa, perfetto compagno delle carni alla brace.",
    descriptionEn:
      "Pure Ciliegiolo, the “Canapone” selection from Maremma Toscana. Bright ruby, with aromas of ripe cherry, currant, sweet spices and a floral touch. Soft and fruity on the palate, with lively acidity and fine tannins — a moreish Tuscan red, the perfect match for grilled meats.",
  },
  {
    id: "chianti-corte-bigio",
    name: "Chianti",
    appellation: "Corte al Bigio · DOCG",
    region: "Toscana",
    grape: "Sangiovese, Canaiolo",
    image: "/wines/chianti-corte-bigio.webp",
    producer: "Corte al Bigio",
    price: "9,50",
    description:
      "Chianti DOCG di Corte al Bigio a base Sangiovese con piccolo saldo di Canaiolo. Rosso rubino luminoso, sprigiona sentori di ciliegia, viola mammola, iris e una lieve speziatura. In bocca è asciutto, sapido, con tannini incisivi ma equilibrati; il volto autentico del Chianti tradizionale.",
    descriptionEn:
      "Chianti DOCG by Corte al Bigio, Sangiovese-based with a small share of Canaiolo. Luminous ruby red, with cherry, sweet violet, iris and a light spice touch. Dry and savoury on the palate, with incisive but balanced tannins — the authentic face of traditional Chianti.",
  },
  {
    id: "dievole-chianti-classico",
    name: "Dievole",
    appellation: "Chianti Classico DOCG",
    region: "Toscana",
    grape: "Sangiovese 90%, altri vitigni autoctoni 10%",
    image: "/wines/dievole-chianti-classico.webp",
    producer: "Dievole",
    price: "21,00",
    description:
      "Chianti Classico DOCG di Dievole, un Sangiovese in prevalenza dalla storica tenuta di Vagliagli. Rosso rubino profondo, al naso mostra amarena, prugna, tabacco e una nota terrosa; al palato è pieno, con tannini fini e sapido finale minerale. Sintesi elegante di frutto e terroir chiantigiano.",
    descriptionEn:
      "Chianti Classico DOCG by Dievole, mostly Sangiovese from the historic Vagliagli estate. Deep ruby, with sour cherry, plum, tobacco and earthy notes; full on the palate with fine tannins and a savoury, mineral finish. An elegant balance of fruit and Chianti terroir.",
  },
  {
    id: "falorni-sangiovese",
    name: "Falorni",
    appellation: "Sangiovese · Toscana IGT",
    region: "Toscana",
    grape: "Sangiovese 100%",
    image: "/wines/falorni-sangiovese.webp",
    producer: "Cantine Falorni · Antica Macelleria Falorni",
    price: "12,50",
    description:
      "Sangiovese Toscana IGT firmato dall'Antica Macelleria Falorni di Greve in Chianti. Rosso rubino intenso, sprigiona note di ciliegia, prugna, viola e leggere spezie dolci. Al palato è morbido e piacevolmente fruttato, con tannini vellutati e finale asciutto: il compagno ideale delle carni alla griglia e dei salumi toscani.",
    descriptionEn:
      "Sangiovese Toscana IGT by Antica Macelleria Falorni of Greve in Chianti. Deep ruby, with aromas of cherry, plum, violet and mild sweet spices. Smooth and pleasantly fruity on the palate, with velvety tannins and a dry finish — the ideal companion to grilled meats and Tuscan cold cuts.",
  },
  {
    id: "negroamaro-puglia",
    name: "Negroamaro",
    appellation: "Puglia IGT",
    region: "Puglia",
    grape: "Negroamaro 100%",
    image: "/wines/negroamaro-puglia.webp",
    producer: "Paolo Leo · Varietali",
    price: "11,50",
    description:
      "Negroamaro in purezza della linea Varietali di Paolo Leo. Colore rosso rubino intenso con riflessi violacei; al naso è ricco di mora, prugna matura, tabacco e una nota mediterranea di macchia. In bocca è caldo, morbido, avvolgente, con tannini rotondi e finale leggermente amaricante tipico del vitigno.",
    descriptionEn:
      "Pure Negroamaro from the Varietali range by Paolo Leo. Deep ruby with violet reflections; the nose is rich in blackberry, ripe plum, tobacco and a Mediterranean touch of maquis. Warm, soft and enveloping on the palate, with round tannins and the characteristic slightly bitter finish of the varietal.",
  },
  {
    id: "primitivo-puglia",
    name: "Primitivo",
    appellation: "Puglia IGT",
    region: "Puglia",
    grape: "Primitivo 100%",
    image: "/wines/primitivo-puglia.webp",
    producer: "Paolo Leo · Varietali",
    price: "12,00",
    description:
      "Primitivo in purezza della linea Varietali di Paolo Leo. Rubino profondo, quasi impenetrabile; il naso è generoso di confettura di prugne, ciliegia sotto spirito, cacao e spezie dolci. Al palato è pieno, morbido, caldo e alcolico, con tannini rotondi e un finale lungo e goloso.",
    descriptionEn:
      "Pure Primitivo from the Varietali range by Paolo Leo. Deep, almost impenetrable ruby; a generous nose of plum jam, cherry in spirit, cocoa and sweet spices. Full, soft, warm and rich on the palate, with round tannins and a long, moreish finish.",
  },
];
