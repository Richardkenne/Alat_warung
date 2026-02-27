const STORAGE_KEY = "catat-utang-items";
const db = window.alatWarungDB;

const elNama = document.getElementById("nama");
const elJumlah = document.getElementById("jumlah");
const elCatatan = document.getElementById("catatan");
const elSimpan = document.getElementById("simpan");
const elList = document.getElementById("list");
const elTotal = document.getElementById("total");
const elHapusSemua = document.getElementById("hapusSemua");
const elPaywall = document.getElementById("paywall");
const elUpgrade = document.getElementById("upgrade");
const elTutup = document.getElementById("tutup");

function rupiah(n) {
  const safe = Number(n) || 0;
  return "Rp " + safe.toLocaleString("id-ID");
}

function loadItems() {
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : [];
}

function saveItems(items) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

async function render() {
  // Try Supabase first, fallback localStorage
  let items = null;
  if (db && db.isOnline()) {
    items = await db.fetchDebts();
  }
  if (!items) {
    items = loadItems();
  }

  elList.innerHTML = "";
  let total = 0;

  items.forEach((item, index) => {
    total += Number(item.jumlah);
    const li = document.createElement("li");

    const title = document.createElement("div");
    title.className = "item-title";
    title.textContent = `${item.nama} • ${rupiah(item.jumlah)}`;

    const meta = document.createElement("div");
    meta.className = "item-meta";
    meta.textContent = item.catatan ? item.catatan : "Tanpa catatan";

    const del = document.createElement("button");
    del.className = "ghost";
    del.textContent = "Hapus";
    del.addEventListener("click", async () => {
      if (item.id && db && db.isOnline()) {
        await db.deleteDebt(item.id);
      }
      const updated = loadItems();
      updated.splice(index, 1);
      saveItems(updated);
      render();
    });

    li.appendChild(title);
    li.appendChild(meta);
    li.appendChild(del);
    elList.appendChild(li);
  });

  elTotal.textContent = rupiah(total);
}

async function addItem() {
  const nama = elNama.value.trim();
  const jumlah = Number(elJumlah.value);
  const catatan = elCatatan.value.trim();

  if (!nama || !jumlah || jumlah <= 0) {
    alert("Isi nama dan jumlah utang dulu.");
    return;
  }

  // Save localStorage
  const items = loadItems();
  items.unshift({ nama, jumlah, catatan, waktu: Date.now() });
  saveItems(items);

  // Save Supabase (non-blocking)
  if (db && db.isOnline()) {
    db.addDebt(nama, jumlah, catatan);
  }

  elNama.value = "";
  elJumlah.value = "";
  elCatatan.value = "";
  render();
}

function showPaywall() {
  elPaywall.style.display = "flex";
  elPaywall.setAttribute("aria-hidden", "false");
}

function hidePaywall() {
  elPaywall.style.display = "none";
  elPaywall.setAttribute("aria-hidden", "true");
}

elSimpan.addEventListener("click", addItem);
elHapusSemua.addEventListener("click", async () => {
  if (confirm("Hapus semua utang?")) {
    saveItems([]);
    render();
  }
});

Array.from(document.querySelectorAll("[data-paywall]"))
  .forEach(btn => btn.addEventListener("click", showPaywall));

elTutup.addEventListener("click", hidePaywall);
elUpgrade.addEventListener("click", () => {
  alert("Terima kasih! Pembayaran belum aktif.");
  hidePaywall();
});

const scrollBtn = document.querySelector("[data-scroll]");
if (scrollBtn) {
  scrollBtn.addEventListener("click", () => {
    document.getElementById("tool").scrollIntoView({ behavior: "smooth" });
  });
}

render();
