# Alat Warung — Roadmap

## Status: MVP Live ✓
Homepage, 3 tool, privacy, terms, blog articles, sitemap — tutto online.

---

## FASE 1: Go Live Basics
> Cose che servono PRIMA di mandare traffico al sito.

- [ ] **Comprare dominio alatwarung.id** — configurare DNS + GitHub Pages CNAME
- [ ] **Numero WhatsApp reale** — sostituire placeholder (6281234567890) nel floating button e nel CTA
- [ ] **Google Analytics / Plausible** — aggiungere tracking per capire traffico e conversioni
- [ ] **Google Search Console** — submit sitemap.xml, verificare indicizzazione
- [ ] **Favicon + Open Graph** — manca favicon.ico, og:image, og:title per social sharing
- [ ] **PWA manifest** — manifest.json + service worker per "Aggiungi a Home Screen" (warung owners usano come app)

---

## FASE 2: Supabase Backend
> Già creato schema + client. Manca attivare il progetto.

- [ ] **Creare progetto Supabase** — ottenere URL + anon key reali
- [ ] **Sostituire placeholder** in `supabase/client.js` (SUPABASE_URL, SUPABASE_ANON_KEY)
- [ ] **Eseguire schema.sql** nel SQL editor di Supabase
- [ ] **Aggiungere `<script>` tag** nelle 3 tool pages per caricare supabase CDN + client.js
- [ ] **Configurare SMS OTP** — Twilio/MessageBird via Supabase Auth per login con HP
- [ ] **Testare sync** — verificare che localStorage + Supabase funzionino in parallelo
- [ ] **Testare offline → online** — verificare che i dati scritti offline si sync quando torna la connessione

---

## FASE 3: Monetizzazione (Pro Plan)
> Rp 29.000/bulan — sync cloud, export PDF, multi-device.

- [ ] **Payment gateway** — Midtrans o Xendit (gateway indonesiani, supportano GoPay/OVO/Dana)
- [ ] **Paywall funzionante** — attualmente il paywall è solo UI, deve bloccare davvero le feature Pro
- [ ] **Export PDF** — generare laporan (report) utang/keuangan in PDF scaricabile
- [ ] **Multi-device sync** — già coperto da Supabase, serve solo login flow
- [ ] **Stripe/Xendit webhook** — attivare/disattivare Pro plan automaticamente

---

## FASE 4: SEO + Content
> Portare traffico organico da Google Indonesia.

- [ ] **Aggiornare copy blog articles** — 3 articoli (cara-mencatat-*) devono avere tono umano come il resto del sito
- [ ] **Schema markup** — aggiungere JSON-LD (SoftwareApplication, FAQPage) per rich snippets
- [ ] **Hreflang tags** — collegare index.html ↔ index-en.html per Google
- [ ] **5+ nuovi articoli SEO** — keyword research per "catat utang warung", "aplikasi warung gratis", etc.
- [ ] **Backlink strategy** — submit a directory indonesiani, forum warung, komunitas UMKM

---

## FASE 5: Growth + Retention
> Dopo i primi 100 utenti.

- [ ] **Notifiche WhatsApp** — reminder automatico per utang scaduti (via WhatsApp Business API)
- [ ] **Laporan mingguan** — summary settimanale via WhatsApp: "Minggu ini untung Rp X, utang belum bayar Y"
- [ ] **Referral program** — "Ajak teman, dapat 1 bulan Pro gratis"
- [ ] **Video promo Remotion** — embed sulla homepage (video già pronto, serve solo `<video>` tag)
- [ ] **Testimoni reali** — sostituire testimoni finti con screenshot/video da utenti veri
- [ ] **Multi-language** — Javanese, Sundanese (le lingue locali dei warung owners)

---

## FASE 6: Product Expansion
> Dopo product-market fit confermato.

- [ ] **Catat Penjualan** — tool per registrare vendite giornaliere (POS semplificato)
- [ ] **Supplier management** — catat ordini a supplier, reminder riordino
- [ ] **Dashboard analytics** — grafici trend: untung/rugi per settimana/mese
- [ ] **Barcode scanner** — scan prodotto con camera HP per aggiungere a stok
- [ ] **Multi-warung** — gestire più warung da un account (per chi ha 2-3 warung)

---

## Priorità
1. **FASE 1** — 1 giorno, blocca tutto il resto
2. **FASE 4** (SEO) — gratis, porta traffico organico
3. **FASE 2** (Supabase) — necessario per Pro plan
4. **FASE 3** (Monetizzazione) — primo revenue
5. **FASE 5** (Growth) — dopo primi utenti
6. **FASE 6** (Expansion) — dopo PMF
