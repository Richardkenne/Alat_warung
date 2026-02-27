const STORAGE_KEY = "alat-warung-stok";
const db = window.alatWarungDB;

const elBarang = document.getElementById("barang");
const elTambah = document.getElementById("tambah");
const elDaftar = document.getElementById("daftar");

function loadItems() {
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : [];
}

function saveItems(items) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

async function render() {
  let items = null;
  if (db && db.isOnline()) {
    items = await db.fetchStock();
  }
  if (!items) {
    items = loadItems();
  }

  elDaftar.innerHTML = "";

  items.forEach((item, index) => {
    const li = document.createElement("li");

    const label = document.createElement("label");
    label.style.display = "flex";
    label.style.alignItems = "center";
    label.style.gap = "10px";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = item.habis;

    const name = document.createElement("span");
    name.textContent = item.nama;
    name.style.fontWeight = "700";

    if (item.habis) {
      li.style.background = "#fef2f2";
      li.style.borderColor = "#fecaca";
    }

    checkbox.addEventListener("change", async () => {
      if (item.id && db && db.isOnline()) {
        await db.toggleStock(item.id, checkbox.checked);
      }
      const updated = loadItems();
      updated[index].habis = checkbox.checked;
      saveItems(updated);
      render();
    });

    label.appendChild(checkbox);
    label.appendChild(name);
    li.appendChild(label);
    elDaftar.appendChild(li);
  });
}

async function addItem() {
  const nama = elBarang.value.trim();
  if (!nama) {
    alert("Isi nama barang dulu.");
    return;
  }

  const items = loadItems();
  items.unshift({ nama, habis: false });
  saveItems(items);

  if (db && db.isOnline()) {
    db.addStock(nama);
  }

  elBarang.value = "";
  render();
}

elTambah.addEventListener("click", addItem);

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
