const STORAGE_KEY = "alat-warung-keuangan";

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

function render() {
  const saved = loadSaved();
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
}

elHitung.addEventListener("click", hitung);
render();
