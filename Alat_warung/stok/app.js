const STORAGE_KEY = "alat-warung-stok";

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

function render() {
  const items = loadItems();
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
      li.style.background = "#fbe7e0";
      li.style.borderColor = "#e7b8a8";
    }

    checkbox.addEventListener("change", () => {
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

function addItem() {
  const nama = elBarang.value.trim();
  if (!nama) {
    alert("Isi nama barang dulu.");
    return;
  }

  const items = loadItems();
  items.unshift({ nama, habis: false });
  saveItems(items);
  elBarang.value = "";
  render();
}

elTambah.addEventListener("click", addItem);
render();
