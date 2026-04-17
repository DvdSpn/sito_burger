# Burger & Grill Camucia — Menu Site

## Original Problem Statement
User requested a non-white restaurant menu website for "Burger & Grill" in Camucia (Cortona, Tuscany). Design mix: Dark steakhouse (deep blacks, amber/gold accents) + Rustic Tuscan (warm browns, terracotta). Includes menu filters + WhatsApp ordering.

## Contact info (confirmed by user)
- Indirizzo: Via Lauretana 19/21, 52044 Camucia – Cortona (AR)
- Tel: +39 0575 613880 / +39 366 3706361
- Orari: Pranzo 12:00–14:00 · Cena 18:00–23:00

## Architecture
- Static single-page React site (no backend, no database).
- Playfair Display (display) + Manrope (body) + Caveat (accent) from Google Fonts.
- Tailwind CSS, stone palette + amber accent + terracotta highlights.
- Menu data in `/app/frontend/src/data/menu.js`.

## Implemented (Dec 2025)
- Hero full-bleed with Chianina burger background, cinematic typography, dual CTA.
- Values strip (Chianina, pane artigianale, senza glutine, Km 0).
- Sticky filter bar with section anchors + dietary filters (Tutto, Manzo, Pollo, Maiale, Veg, Piccante).
- 5 menu sections (Hamburger, Ciabatte, Piadine, Griglia & Barbeque, Contorni) with all 35 items, prices, descriptions, signature badges, dashed leader line prices.
- Dietary tags (veg, spicy, beef, chicken, pork) on every item.
- Per-item "+ Ordina via WhatsApp" deep links with prefilled message.
- Floating WhatsApp CTA with pulse animation.
- Contact section with address (maps link), phone (tel: link), hours, socials.
- All interactive elements have data-testid.

## Iteration 2 (Dec 2025)
- Added official logo (`LOGO_BURGER-NO SFONDO.png`) in header + footer (Logo.jsx).
- Added Google Maps embedded iframe in Contact (Via Lauretana 19/21) with "Open in Google Maps" link.
- Added full IT/EN language toggle (i18n.js + LanguageToggle.jsx) covering all UI copy, nav, filters, section titles, reviews, contacts, WhatsApp messages.
- Added empty Gallery section with 6 placeholder slots (user will fill later).
- Added Reviews carousel with auto-play + prev/next buttons + pagination dots + hover-to-pause. 5 mock reviews (bilingual IT/EN).

## Iteration 3 — Cart (Dec 2025)
- Added full shopping cart: `CartContext` (useReducer + localStorage persistence) with add/inc/dec/remove/clear.
- `CartFab` floating button (bottom-left) with live badge showing item count.
- `CartDrawer` slide-in panel with per-item +/- controls, per-line subtotal, global total, WhatsApp send (formatted multi-line message), clear cart, ESC + backdrop close, body-scroll lock.
- Menu items show "Aggiungi" button, replaced by inline +/- stepper when qty > 0.
- Handles "al kg" pricing (Costata di manzo) gracefully — excluded from sum, shown as "al kg" with disclaimer.
- All cart UI translated IT/EN.

## Backlog / Next Tasks
- P1: Real photos in Gallery.
- P1: Daily specials banner.
- P2: Print/PDF menu export.
- P2: Reservation form (TheFork / Google Form).
- P2: "Aperto / Chiuso ora" live status widget based on hours.
- P2: QR-code generator page for tavoli.
