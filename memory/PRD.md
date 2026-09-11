# PRD — Burger & Grill (Camucia)

## Problem Statement
Sito web + sistema di ordinazione da asporto per il ristorante "Burger & Grill" a Camucia.
Full-stack: React (CRA + Tailwind) + FastAPI (proxy Google Places).

## Requisiti principali (implementati)
- Design dark theme mobile-first, responsive
- Toggle lingua IT / EN (i18n via dizionario JS)
- Widget Aperto/Chiuso basato su orari
- Carrello asporto con note ingredienti (max 2 modifiche per item)
- Ordinazione via WhatsApp (messaggio precompilato)
- Recensioni Google (proxy API `/api/reviews`) + CTA "Lascia recensione"
- Sezione Birre artigianali San Girolamo + Vini in bottiglia con foto reali
- Layout swipe orizzontale per tutte le categorie cibo/bevande

## Stato attuale
- Progetto completo e funzionante
- **Sessione 11-Sep-2026**: creato archivio ZIP di export per l'utente che migra fuori da Emergent
  - File: `/app/frontend/public/burger-grill-source.zip` (~2.0 MB, 135 file)
  - URL pubblico: `https://chianina-burger-bar.preview.emergentagent.com/burger-grill-source.zip`
  - Include: `backend/`, `frontend/` (senza `node_modules`, `__pycache__`, `.git`, `.emergent`), `.env` con chiavi reali, `README.md` con istruzioni in italiano

## Integrazioni
- Google Places API (chiave in `backend/.env`)
- WhatsApp (URL generation, no API key)

## Backlog
- N/A — l'utente sta migrando fuori dalla piattaforma
