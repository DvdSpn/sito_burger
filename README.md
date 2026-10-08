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
  site.config.js      dominio pubblico del sito (canonical, Open Graph, sitemap)
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

`frontend/build/` è un sito statico: si carica su qualsiasi hosting (Netlify, Vercel, Cloudflare Pages, GitHub Pages, Apache/Nginx). Il sito usa percorsi come `/bevande`, quindi l'hosting deve rimandare a `index.html` ogni percorso che non è un file (su Netlify: `/* /index.html 200` in `_redirects`).

Variabili d'ambiente (file `frontend/.env`, non versionato):

- `REACT_APP_BACKEND_URL` — indirizzo del backend per le recensioni Google. Senza, la sezione recensioni mostra solo il pulsante per leggerle su Google.
- `REACT_APP_SITE_URL` — facoltativo, sovrascrive il dominio di `site.config.js`.

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
| Dominio del sito | `frontend/site.config.js` |
