-- Alat Warung — Supabase Schema
-- Auth: Phone OTP (built-in Supabase Auth)

-- Users profile (extends auth.users)
create table public.users (
  id uuid primary key references auth.users(id) on delete cascade,
  phone text unique not null,
  nama_warung text,
  created_at timestamptz default now()
);

alter table public.users enable row level security;

create policy "Users can read own profile"
  on public.users for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on public.users for update
  using (auth.uid() = id);

create policy "Users can insert own profile"
  on public.users for insert
  with check (auth.uid() = id);

-- Debts (utang)
create table public.debts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  nama text not null,
  jumlah integer not null,
  catatan text,
  created_at timestamptz default now(),
  paid_at timestamptz
);

alter table public.debts enable row level security;

create policy "Users can CRUD own debts"
  on public.debts for all
  using (auth.uid() = user_id);

create index idx_debts_user on public.debts(user_id);

-- Stock (stok)
create table public.stock (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  nama text not null,
  habis boolean default false,
  updated_at timestamptz default now()
);

alter table public.stock enable row level security;

create policy "Users can CRUD own stock"
  on public.stock for all
  using (auth.uid() = user_id);

create index idx_stock_user on public.stock(user_id);

-- Finances (keuangan)
create table public.finances (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  masuk integer default 0,
  keluar integer default 0,
  tanggal date default current_date,
  created_at timestamptz default now()
);

alter table public.finances enable row level security;

create policy "Users can CRUD own finances"
  on public.finances for all
  using (auth.uid() = user_id);

create index idx_finances_user on public.finances(user_id);
