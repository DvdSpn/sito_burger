# CLAUDE.md

Sito del ristorante Burger & Grill (Camucia). Testi, commit e messaggi all'utente in italiano.

## Comandi

- Frontend: `cd frontend && yarn install && yarn build` (oppure `yarn start` per lo sviluppo, porta 3000).
- `CI=true yarn build` tratta gli avvisi ESLint come errori: deve passare prima di ogni push.
- Backend (solo recensioni Google): `cd backend && pip install -r requirements.txt && uvicorn server:app --port 8001`. Serve `MONGO_URL` e `DB_NAME` nell'ambiente anche se il menu non usa il database.

## Struttura

- Dati statici in `frontend/src/data/`: `menu.js` (piatti + `RESTAURANT` con contatti e WhatsApp), `drinks.js`, `featuredWines.js`, `hours.js`, `i18n.js` (testi IT/EN, chiavi `t("...")`).
- Pagine: home in `src/App.js`, `/bevande` in `src/pages/Drinks.jsx`, `/chi-siamo` in `src/pages/About.jsx`.
- Il dominio pubblico sta solo in `frontend/site.config.js` (per ora vuoto: il sito non ha ancora un dominio). `public/index.html` lo legge come `%REACT_APP_SITE_URL%`; `scripts/seo-files.js` genera a ogni build `public/robots.txt` e, solo se c'è un dominio, `public/sitemap.xml` (file generati, non versionati).

## Convenzioni di design

- Mobile first: le classi senza prefisso sono per il telefono, `md:` e oltre per tablet e desktop.
- Su telefono i piatti di ogni categoria sono una riga orizzontale da scorrere (scroll-snap); da `md` una griglia.
- Carta bevande: tendine (`AccordionSection`) con una sola sezione aperta alla volta.
- Tema scuro unico (stone + amber), font Playfair Display / Manrope / Caveat.
- Tap target di almeno 44px; verificare a 375px che la pagina non scorra di lato.
