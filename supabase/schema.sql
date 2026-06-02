-- ============================================================
-- American College Arcus Club — Supabase schema (уеб + native)
-- Изпълни в Supabase → SQL Editor → New query → Run.
-- ============================================================

-- ---------- ПРОФИЛИ / ЧЛЕНСТВО / РОЛЯ ----------
create table if not exists public.profiles (
  id         uuid primary key references auth.users(id) on delete cascade,
  username   text unique,
  full_name  text,
  membership text not null default 'guest'
             check (membership in ('founder','founding','club','alumni','corporate','guest')),
  role       text not null default 'member' check (role in ('member','admin')),
  created_at timestamptz not null default now()
);
alter table public.profiles enable row level security;

create or replace function public.is_admin() returns boolean
  language sql stable security definer set search_path=public as $$
  select exists(select 1 from public.profiles where id=auth.uid() and role='admin');
$$;

create policy "p_self_read"  on public.profiles for select using (auth.uid()=id);
create policy "p_self_upd"   on public.profiles for update using (auth.uid()=id);
create policy "p_self_ins"   on public.profiles for insert with check (auth.uid()=id);
create policy "p_admin_read" on public.profiles for select using (public.is_admin());
create policy "p_admin_upd"  on public.profiles for update using (public.is_admin());

-- авто-създаване на профил при регистрация
create or replace function public.handle_new_user() returns trigger
  language plpgsql security definer set search_path=public as $$
begin
  insert into public.profiles (id, username, full_name, membership, role)
  values (new.id,
    coalesce(new.raw_user_meta_data->>'username', split_part(new.email,'@',1)),
    coalesce(new.raw_user_meta_data->>'full_name',''),
    coalesce(new.raw_user_meta_data->>'membership','guest'), 'member');
  return new;
end; $$;
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users
  for each row execute function public.handle_new_user();

-- ---------- СЪБИТИЯ (с видимост по членство) ----------
create table if not exists public.events (
  id        uuid primary key default gen_random_uuid(),
  title     text not null,
  format    text,
  place     text,
  date      date,
  time      text,
  ends      text,
  capacity  int default 0,
  audience  text[] not null default array['all'],   -- ['all'] или списък категории
  stream_url text,                                  -- линк за live stream (YouTube/Vimeo/др.)
  is_live   boolean not null default false,         -- включен ли е стриймът сега
  created_at timestamptz not null default now()
);
-- ако таблицата вече съществува:
alter table public.events add column if not exists stream_url text;
alter table public.events add column if not exists is_live boolean not null default false;
alter table public.events add column if not exists ends text;
alter table public.events enable row level security;

-- член вижда само събития за неговото членство; админ вижда всички
create policy "e_read" on public.events for select using (
  public.is_admin()
  or 'all' = any(audience)
  or (select membership from public.profiles where id=auth.uid()) = any(audience)
);
create policy "e_admin_write" on public.events for all
  using (public.is_admin()) with check (public.is_admin());

-- ---------- РЕЗЕРВАЦИИ ----------
create table if not exists public.reservations (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid not null references auth.users(id) on delete cascade,
  event_id   uuid references public.events(id) on delete set null,
  who        text, membership text,
  format     text, place text, date date, time text,
  party_size int not null default 2,
  note       text,
  status     text not null default 'requested'
             check (status in ('requested','confirmed','declined','cancelled')),
  created_at timestamptz not null default now()
);
alter table public.reservations enable row level security;
create policy "r_own"        on public.reservations for all using (auth.uid()=user_id) with check (auth.uid()=user_id);
create policy "r_admin_read" on public.reservations for select using (public.is_admin());
create policy "r_admin_upd"  on public.reservations for update using (public.is_admin());

-- ---------- ЗАПАЗЕНИ СЪБИТИЯ (личен календар) ----------
create table if not exists public.saved_events (
  id       uuid primary key default gen_random_uuid(),
  user_id  uuid not null references auth.users(id) on delete cascade,
  event_id uuid not null references public.events(id) on delete cascade,
  unique (user_id, event_id)
);
alter table public.saved_events enable row level security;
create policy "s_own" on public.saved_events for all using (auth.uid()=user_id) with check (auth.uid()=user_id);

-- ---------- ПРИМЕРНИ СЪБИТИЯ ----------
insert into public.events (title,format,place,date,time,capacity,audience) values
 ('Разговор за съвременната българска проза','conversation','Клубна зала','2026-06-12','19:00',30,array['all']),
 ('Гастрономическа вечер','table','Trapezna','2026-06-19','20:00',20,array['club','corporate','founding','founder']),
 ('Вечер на европейския авторски филм','cinema','Кино салон','2026-06-26','19:30',40,array['all']),
 ('Основателска вечер','community','Частен салон','2026-07-03','19:00',16,array['founder','founding'])
on conflict do nothing;

-- ============================================================
-- СЛЕД като се регистрираш в приложението, направи се админ:
--   update public.profiles set role='admin' where username='твоето_име';
-- ============================================================
