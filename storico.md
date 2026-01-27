# Storico progetto – AlatWarung.id

## Contesto
- Dominio: alatwarung.id
- Hosting: GitHub Pages
- Repo: Richardkenne/Alat_warung

## Decisioni chiave (vincolanti)
- URL fissi, nessun refactor
- SEO semplice, statico
- Aggiornamenti batchizzati
- Stabilità > nuove feature

## Log modifiche
### 2026-01-27 12:04 WIB
- Fix kritis CTA: WhatsApp dibuat link wa.me statis
- Export PDF dihapus (tidak ada PDF nyata, lebih baik tidak tampil)
- Alasan: menghindari tombol palsu sebelum ads
### 2026-01-27 12:01 WIB
- Test manuale link e meta: OK (tutti relativi, meta tecnici presenti)
- Copy safety popup PRO (utang): aggiornato testo informativo
- Esito test CTA WhatsApp/PDF: FAIL (bottoni non aprono link reali) — richiesto via conferma prima di fix
### 2026-01-27
- Dominio collegato a GitHub Pages
- Homepage pubblicata
- Tool pubblicati: utang / keuangan / stok
- Create 3 pagine SEO:
  - cara-mencatat-utang-warung.html
  - cara-mencatat-keuangan-warung.html
  - cara-mencatat-stok-warung.html
- Sitemap creata e inviata a Google Search Console
- robots.txt aggiunto
- canonical link verificati

## Regole operative future
- Qualsiasi modifica strutturale richiede approvazione
- Nessuna modifica SEO critica senza alert preventivo
- 1 batch commit al giorno (salvo bug)
