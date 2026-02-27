/**
 * Alat Warung — Supabase Client Wrapper
 * CDN-based, no build step. Fallback to localStorage if offline.
 *
 * Usage:
 *   <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
 *   <script src="../supabase/client.js"></script>
 */

// TODO: replace with your actual Supabase project values
const SUPABASE_URL = "https://YOUR_PROJECT.supabase.co";
const SUPABASE_ANON_KEY = "YOUR_ANON_KEY";

const sb = window.supabase
  ? window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
  : null;

function isOnline() {
  return navigator.onLine && sb;
}

// ── Auth (Phone OTP) ──────────────────────────────────

async function signInWithPhone(phone) {
  if (!sb) return { error: "Supabase not loaded" };
  return sb.auth.signInWithOtp({ phone });
}

async function verifyOtp(phone, token) {
  if (!sb) return { error: "Supabase not loaded" };
  const res = await sb.auth.verifyOtp({ phone, token, type: "sms" });
  if (res.data?.user) {
    await sb.from("users").upsert({
      id: res.data.user.id,
      phone,
    }, { onConflict: "id" });
  }
  return res;
}

async function signOut() {
  if (!sb) return;
  return sb.auth.signOut();
}

async function getUser() {
  if (!sb) return null;
  const { data } = await sb.auth.getUser();
  return data?.user || null;
}

// ── Debts CRUD ────────────────────────────────────────

async function fetchDebts() {
  if (!isOnline()) return null;
  const user = await getUser();
  if (!user) return null;
  const { data } = await sb
    .from("debts")
    .select("*")
    .eq("user_id", user.id)
    .is("paid_at", null)
    .order("created_at", { ascending: false });
  return data;
}

async function addDebt(nama, jumlah, catatan) {
  if (!isOnline()) return null;
  const user = await getUser();
  if (!user) return null;
  return sb.from("debts").insert({ user_id: user.id, nama, jumlah, catatan });
}

async function deleteDebt(id) {
  if (!isOnline()) return null;
  return sb.from("debts").delete().eq("id", id);
}

async function markDebtPaid(id) {
  if (!isOnline()) return null;
  return sb.from("debts").update({ paid_at: new Date().toISOString() }).eq("id", id);
}

// ── Stock CRUD ────────────────────────────────────────

async function fetchStock() {
  if (!isOnline()) return null;
  const user = await getUser();
  if (!user) return null;
  const { data } = await sb
    .from("stock")
    .select("*")
    .eq("user_id", user.id)
    .order("updated_at", { ascending: false });
  return data;
}

async function addStock(nama) {
  if (!isOnline()) return null;
  const user = await getUser();
  if (!user) return null;
  return sb.from("stock").insert({ user_id: user.id, nama });
}

async function toggleStock(id, habis) {
  if (!isOnline()) return null;
  return sb.from("stock").update({ habis, updated_at: new Date().toISOString() }).eq("id", id);
}

// ── Finances CRUD ─────────────────────────────────────

async function fetchFinances() {
  if (!isOnline()) return null;
  const user = await getUser();
  if (!user) return null;
  const { data } = await sb
    .from("finances")
    .select("*")
    .eq("user_id", user.id)
    .order("tanggal", { ascending: false })
    .limit(1);
  return data?.[0] || null;
}

async function saveFinances(masuk, keluar) {
  if (!isOnline()) return null;
  const user = await getUser();
  if (!user) return null;
  return sb.from("finances").upsert({
    user_id: user.id,
    masuk,
    keluar,
    tanggal: new Date().toISOString().slice(0, 10),
  }, { onConflict: "user_id,tanggal" });
}

// ── Exports ───────────────────────────────────────────

window.alatWarungDB = {
  isOnline,
  signInWithPhone,
  verifyOtp,
  signOut,
  getUser,
  fetchDebts,
  addDebt,
  deleteDebt,
  markDebtPaid,
  fetchStock,
  addStock,
  toggleStock,
  fetchFinances,
  saveFinances,
};
