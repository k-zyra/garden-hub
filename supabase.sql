-- Run this in Supabase SQL Editor

create table if not exists public.gardenhub_tasks (
  id bigint primary key,
  name text not null,
  date date,
  done boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.gardenhub_events (
  id bigint primary key,
  name text not null,
  date date not null,
  color text not null default 'green',
  created_at timestamptz not null default now()
);

create table if not exists public.gardenhub_photos (
  id bigint primary key,
  title text not null,
  description text not null default '',
  image text not null,
  date timestamptz not null default now()
);

alter table public.gardenhub_tasks enable row level security;
alter table public.gardenhub_events enable row level security;
alter table public.gardenhub_photos enable row level security;

create policy "GardenHub read tasks" on public.gardenhub_tasks for select using (true);
create policy "GardenHub insert tasks" on public.gardenhub_tasks for insert with check (true);
create policy "GardenHub update tasks" on public.gardenhub_tasks for update using (true) with check (true);
create policy "GardenHub delete tasks" on public.gardenhub_tasks for delete using (true);

create policy "GardenHub read events" on public.gardenhub_events for select using (true);
create policy "GardenHub insert events" on public.gardenhub_events for insert with check (true);
create policy "GardenHub update events" on public.gardenhub_events for update using (true) with check (true);
create policy "GardenHub delete events" on public.gardenhub_events for delete using (true);

create policy "GardenHub read photos" on public.gardenhub_photos for select using (true);
create policy "GardenHub insert photos" on public.gardenhub_photos for insert with check (true);
create policy "GardenHub update photos" on public.gardenhub_photos for update using (true) with check (true);
create policy "GardenHub delete photos" on public.gardenhub_photos for delete using (true);
