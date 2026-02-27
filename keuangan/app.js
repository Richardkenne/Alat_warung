const STORAGE_KEY = "alat-warung-keuangan";
const db = window.alatWarungDB;

const elMasuk = document.getElementById("masuk");
const elKeluar = document.getElementById("keluar");
const elHitung = document.getElementById("hitung");
const elHasil = document.getElementById("hasil");

function rupiah(n) {
  const safe = Number(n) || 0;
  return "Rp " + safe.toLocaleString("id-ID");
}

function loadSaved() {
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : { masuk: 0, keluar: 0, hasil: 0 };
}

function save(values) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(values));
}

async function render() {
  let saved = null;
  if (db && db.isOnline()) {
    const remote = await db.fetchFinances();
    if (remote) {
      saved = { masuk: remote.masuk, keluar: remote.keluar, hasil: remote.masuk - remote.keluar };
    }
  }
  if (!saved) {
    saved = loadSaved();
  }

  elMasuk.value = saved.masuk || "";
  elKeluar.value = saved.keluar || "";
  elHasil.textContent = rupiah(saved.hasil || 0);
}

function hitung() {
  const masuk = Number(elMasuk.value) || 0;
  const keluar = Number(elKeluar.value) || 0;
  const hasil = masuk - keluar;
  elHasil.textContent = rupiah(hasil);
  save({ masuk, keluar, hasil });

  if (db && db.isOnline()) {
    db.saveFinances(masuk, keluar);
  }
}

elHitung.addEventListener("click", hitung);

// Paywall
const elPaywall = document.getElementById("paywall");
const elUpgrade = document.getElementById("upgrade");
const elTutup = document.getElementById("tutup");

function showPaywall() { elPaywall.style.display = "flex"; elPaywall.setAttribute("aria-hidden", "false"); }
function hidePaywall() { elPaywall.style.display = "none"; elPaywall.setAttribute("aria-hidden", "true"); }

Array.from(document.querySelectorAll("[data-paywall]"))
  .forEach(btn => btn.addEventListener("click", showPaywall));
if (elTutup) elTutup.addEventListener("click", hidePaywall);
if (elUpgrade) elUpgrade.addEventListener("click", () => { alert("Terima kasih! Pembayaran belum aktif."); hidePaywall(); });

render();
