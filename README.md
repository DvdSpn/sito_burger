# Burger & Grill · Camucia

Sito web e ordini da asporto per **Burger & Grill** (Camucia, Cortona).
Frontend **React** (Create React App + CRACO + Tailwind) e un piccolo backend **FastAPI** che fa da proxy alle recensioni di Google Places.

Il menu, le bevande, gli orari e i testi sono file statici in `frontend/src/data/`: per il sito non serve un database.

## Struttura

```
backend/
  server.py           API FastAPI (proxy recensioni Google)
  requirements.txt
frontend/
  site.config.js      dominio pubblico del sito (vuoto finché non c'è un dominio)
  scripts/seo-files.js  genera sitemap.xml e robots.txt prima della build
  src/
    App.js            home, routing (/, /bevande, /chi-siamo)
    components/       Hero, MenuSection, MenuItem, CartDrawer, ...
    context/          CartContext (carrello)
    data/             menu.js, drinks.js, featuredWines.js, hours.js, i18n.js
    pages/            Drinks, About
  public/             immagini, logo, favicon, index.html
```

## Requisiti

- Node.js 18 o più recente e Yarn 1 (`corepack enable` lo attiva)
- Python 3.10 o più recente, solo per il backend delle recensioni

## Frontend

```bash
cd frontend
yarn install
yarn start        # http://localhost:3000
yarn build        # cartella frontend/build/ pronta da pubblicare
```

`frontend/build/` è un sito statico: si carica su qualsiasi hosting. Il sito usa percorsi come `/bevande`, quindi l'hosting deve rimandare a `index.html` ogni percorso che non è un file.

### Pubblicazione su Cloudflare (gratis)

Il file `wrangler.jsonc` nella radice del repo dice a Cloudflare come costruire e pubblicare il sito: esegue la build in `frontend/` e pubblica `frontend/build`, mandando a `index.html` i percorsi come `/bevande`.

1. Su [dash.cloudflare.com](https://dash.cloudflare.com) → **Workers & Pages** → **Create** → importa il repo `sito_burger` da GitHub.
2. Lascia **Root directory** vuota (`/`), **Build command** vuoto e **Deploy command** `npx wrangler deploy`.
3. Il campo `name` in `wrangler.jsonc` deve essere uguale al nome del Worker su Cloudflare (ora `sito-burger`). Se è diverso, Cloudflare apre da sé una pull request per correggerlo.
4. Il sito va online su `nome-worker.<account>.workers.dev` e si ripubblica da solo a ogni modifica su `main`. Scrivi quell'indirizzo in `frontend/site.config.js`.

## Backend (recensioni Google)

```bash
cd backend
python3 -m venv venv && source venv/bin/activate
pip install -r requirements.txt
uvicorn server:app --host 0.0.0.0 --port 8001 --reload
```

Variabili in `backend/.env` (non versionato): `GOOGLE_PLACES_API_KEY`, `GOOGLE_PLACE_ID`, `MONGO_URL`, `DB_NAME`, `CORS_ORIGINS`.

In produzione: `gunicorn server:app -k uvicorn.workers.UvicornWorker -w 2 -b 0.0.0.0:8001` su qualunque servizio Python (Render, Railway, Fly.io, VPS).

## Dove modificare

| Cosa | File |
| --- | --- |
| Piatti, prezzi, allergeni, contatti, numero WhatsApp | `frontend/src/data/menu.js` (`RESTAURANT`) |
| Bevande e birre | `frontend/src/data/drinks.js` |
| Vini in bottiglia | `frontend/src/data/featuredWines.js` |
| Orari | `frontend/src/data/hours.js` |
| Testi IT/EN | `frontend/src/data/i18n.js` |
| Dominio del sito (quando ci sarà) | `frontend/site.config.js` |
