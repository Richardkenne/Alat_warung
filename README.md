# Alat Warung

Alat gratis untuk pemilik warung & UMKM di Indonesia. Catat utang, stok, dan keuangan langsung di browser HP.

**Live:** [alatwarung.id](https://alatwarung.id)

## Alat
- **Catat Utang** (`utang/`) — simpan nama & jumlah utang, kirim tagihan via WhatsApp
- **Catat Stok** (`stok/`) — tandai barang habis/ada
- **Hitung Keuangan** (`keuangan/`) — masuk - keluar = untung/rugi

## Tech
- Vanilla HTML/CSS/JS — no build step
- Tailwind CSS (CDN) for homepage
- localStorage (offline-first)
- Supabase backend (optional, for Pro sync) — schema in `supabase/`

## Cara dev
Buka `index.html` di browser. Tidak perlu server.

## Struktur
```
index.html           — Homepage (ID)
index-en.html        — Homepage (EN)
shared.js            — AI WhatsApp message generator
utang/               — Debt tracker
stok/                — Stock tracker
keuangan/            — Finance calculator
supabase/            — Backend schema + client
cara-mencatat-*.html — SEO articles
.claude/CLAUDE.md    — AI project instructions
```
