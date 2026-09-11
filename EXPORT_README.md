# Burger & Grill - Camucia 🍔🔥

Sito web e sistema di ordinazione da asporto per **Burger & Grill** (Camucia).
App full-stack composta da un frontend **React** (CRA + Tailwind) e un backend **FastAPI** (Python) che fa da proxy alle recensioni di Google Places.

---

## 📁 Struttura del Progetto

```
burger-grill/
├── backend/
│   ├── server.py            # API FastAPI (proxy recensioni Google + endpoints)
│   ├── requirements.txt     # Dipendenze Python
│   └── .env                 # Variabili d'ambiente (Google API Key, Mongo URL)
├── frontend/
│   ├── src/
│   │   ├── App.js           # Layout principale del menu
│   │   ├── components/      # CartDrawer, MenuItem, FeaturedWines, ecc.
│   │   ├── context/         # CartContext (state carrello)
│   │   ├── data/            # menu.js, drinks.js, i18n.js, hours.js, featuredWines.js
│   │   └── pages/           # About, Drinks
│   ├── public/              # Logo, immagini bottiglie, favicon
│   ├── package.json
│   └── .env                 # URL del backend
└── README.md
```

---

## ⚙️ Requisiti

- **Node.js** ≥ 18 e **Yarn** (consigliato) o npm
- **Python** ≥ 3.10
- **MongoDB** (opzionale — attualmente non usato attivamente per i dati del menu, che sono statici in `frontend/src/data/`)

---

## 🚀 Avvio in Locale

### 1) Backend (FastAPI)

```bash
cd backend

# Crea e attiva un virtual environment
python3 -m venv venv
source venv/bin/activate     # su Windows: venv\Scripts\activate

# Installa le dipendenze
pip install -r requirements.txt

# Avvia il server (porta 8001)
uvicorn server:app --host 0.0.0.0 --port 8001 --reload
```

Il file `backend/.env` contiene già:
- `GOOGLE_PLACES_API_KEY` — la tua chiave API di Google Places
- `GOOGLE_PLACE_ID` — l'ID del locale su Google Maps
- `MONGO_URL`, `DB_NAME` — puoi cambiarli se usi un altro database

### 2) Frontend (React)

```bash
cd frontend

# Installa le dipendenze
yarn install
# oppure: npm install

# Modifica frontend/.env impostando l'URL del backend
# Per uso locale:
# REACT_APP_BACKEND_URL=http://localhost:8001

# Avvia il frontend (porta 3000)
yarn start
# oppure: npm start
```

Apri il browser su **http://localhost:3000** 🎉

---

## 🌐 Deploy in Produzione

### Frontend (build statica)

```bash
cd frontend
yarn build
```

Il contenuto della cartella `frontend/build/` può essere caricato su qualsiasi hosting statico (Netlify, Vercel, Cloudflare Pages, un normale hosting con Apache/Nginx, ecc.).

### Backend

Puoi deployare il backend su qualunque servizio che supporti Python (Render, Railway, Fly.io, un VPS con Nginx + Gunicorn, ecc.).

Esempio comando produzione con `gunicorn`:

```bash
pip install gunicorn
gunicorn server:app -k uvicorn.workers.UvicornWorker -w 2 -b 0.0.0.0:8001
```

⚠️ **Importante**: dopo il deploy del backend, aggiorna `frontend/.env` con l'URL pubblico del backend prima di fare `yarn build`.

---

## 🔑 Chiavi API Incluse

- **Google Places API Key** (in `backend/.env`) — usata per recuperare le recensioni Google del locale. Se la chiave viene revocata, generane una nuova dalla Google Cloud Console → APIs & Services → Credentials, e abilita l'API **Places API (New)**.

---

## 🧩 Funzionalità Principali

- 🌗 Design **dark theme** responsive (mobile-first)
- 🇮🇹 🇬🇧 **Toggle lingua** IT / EN
- 🕒 Widget **Aperto / Chiuso** basato su orari (`frontend/src/data/hours.js`)
- 🛒 **Carrello asporto** con note ingredienti (max 2 modifiche per articolo)
- 📱 **Ordini via WhatsApp** — genera automaticamente il messaggio precompilato
- ⭐ **Recensioni Google** integrate + CTA "Lascia una recensione"
- 🍺 Sezione **Birre artigianali San Girolamo** e **Vini in bottiglia** con foto reali
- 👉 Layout **swipe orizzontale** per tutte le categorie di cibo e bevande

---

## ✏️ Personalizzazione Rapida

- **Menu / prezzi / ingredienti** → `frontend/src/data/menu.js`
- **Bevande e birre** → `frontend/src/data/drinks.js`
- **Vini in bottiglia** → `frontend/src/data/featuredWines.js`
- **Traduzioni IT/EN** → `frontend/src/data/i18n.js`
- **Orari apertura** → `frontend/src/data/hours.js`
- **Numero WhatsApp** → cerca la costante nel `CartDrawer.jsx` (`components/CartDrawer.jsx`)

---

## 💡 Note Finali

- Il progetto è stato originariamente sviluppato sulla piattaforma **Emergent** ma è completamente **standalone** e può essere eseguito ovunque.
- I dati del menu sono **statici** (file JS), quindi **non serve** un database attivo per la parte del menu — MongoDB è configurato ma non richiesto.
- Il backend serve **solo** come proxy sicuro per la Google Places API (per non esporre la chiave nel frontend).

Buon lavoro! 🚀🍔
