-- Run this in Supabase SQL Editor.
-- This schema is suitable for a demo or a single-user shared garden.

create table if not exists public.tasks (
  id bigint primary key,
  name text not null,
  date date,
  done boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.events (
  id bigint primary key,
  name text not null,
  date date not null,
  color text not null default 'green',
  created_at timestamptz not null default now()
);

create table if not exists public.photos (
  id bigint primary key,
  title text not null,
  description text not null default '',
  image text not null,
  date timestamptz not null default now()
);

alter table public.tasks enable row level security;
alter table public.events enable row level security;
alter table public.photos enable row level security;

create policy "Public read tasks" on public.tasks for select using (true);
create policy "Public insert tasks" on public.tasks for insert with check (true);
create policy "Public update tasks" on public.tasks for update using (true) with check (true);
create policy "Public delete tasks" on public.tasks for delete using (true);

create policy "Public read events" on public.events for select using (true);
create policy "Public insert events" on public.events for insert with check (true);
create policy "Public update events" on public.events for update using (true) with check (true);
create policy "Public delete events" on public.events for delete using (true);

create policy "Public read photos" on public.photos for select using (true);
create policy "Public insert photos" on public.photos for insert with check (true);
create policy "Public update photos" on public.photos for update using (true) with check (true);
create policy "Public delete photos" on public.photos for delete using (true);
