# Alat Warung — Project Instructions

## What This Is
Free browser-based tools for Indonesian warung owners: debt tracking (utang), stock tracking (stok), daily finance calculator (keuangan), and AI WhatsApp debt collection message generator.

## Tech Stack
- Pure HTML/CSS/JS — no build step, no framework
- Tailwind CSS via CDN (homepage)
- Custom `style.css` for the 3 tool pages (utang, stok, keuangan)
- Deployed as static site via GitHub Pages → alatwarung.id
- Supabase backend (optional, for Pro users) — schema in `supabase/`

## Design Standards — Homepage
The homepage MUST match the quality and UX patterns of Indonesian SaaS competitors:
- **BukuWarung** (bukuwarung.com) — product cards, social proof numbers, mobile-first
- **CrediBook** (credibook.com) — big counter stats (330K+), real testimonials, investor logos
- **Majoo** (majoo.id) — sticky header, free trial CTA, comparison table, WhatsApp floating widget, video testimonials
- **Moka POS** (mokapos.com) — dual CTAs (Demo + WhatsApp), metrics bar, pricing visible

Key patterns to follow:
1. Hero with phone mockup showing the actual tool UI
2. Stats bar with big numbers (warung count, tools, speed)
3. Feature cards linking directly to tools
4. Real testimonials with name + city + avatar
5. Pricing table (Gratis vs Pro)
6. WhatsApp floating button as secondary CTA
7. Sticky mobile bottom bar
8. FAQ with competitor comparison question
9. Trust badges (data aman, dibuat di Indonesia, offline, tanpa install)

## File Structure
```
index.html          — Landing page (Bahasa Indonesia)
index-en.html       — Landing page (English) — NEEDS UPDATE to match new ID version
shared.js           — AI message generator for homepage
shared-en.js        — English version of shared.js
style.css           — Styles for tool pages (utang/stok/keuangan)
utang/              — Debt tracking tool
stok/               — Stock tracking tool
keuangan/           — Finance calculator tool
supabase/           — Backend schema + client wrapper
cara-mencatat-*.html — SEO guide articles
```

## Copywriting Rules
- All copy MUST sound like it was written by a real human, not AI
- Use casual, conversational Indonesian (not formal/corporate)
- Short sentences. Real examples. No marketing fluff.
- Testimonials should sound like real people talking (slang OK: "gak", "banget", "aja")
- Avoid generic phrases like "solusi terbaik" or "platform inovatif"
- Write like you're explaining to a friend who owns a warung

## Rules
- Keep everything vanilla JS — no React, no bundler
- All text in Bahasa Indonesia (primary) + English (secondary)
- Mobile-first design — most warung owners use cheap Android phones
- Tool pages must work 100% offline (localStorage)
- Supabase integration is additive — tools must work without it
- Brand color: emerald (#10b981 primary, #059669 dark, #047857 darker)
- Font: Plus Jakarta Sans

## Competitor Spreadsheet
Full competitor analysis: https://docs.google.com/spreadsheets/d/1eCEPSWXISLySEPN99fjKibphMbsw7BaJCccCehBctUc/edit
Key direct competitors: BukuWarung, CrediBook, Majoo, Moka POS, Pawoon
