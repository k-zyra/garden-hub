-- Run this in Supabase SQL Editor

insert into public.gardenhub_tasks (id, name, date, done) values
  (1001, 'Podlać świeżo zasadzone sałaty', current_date + 1, false),
  (1002, 'Usunąć chwasty przy grządkach', current_date + 3, false),
  (1003, 'Sprawdzić nasionka pomidorów', current_date - 1, true),
  (1004, 'Dodać kompost do grządki warzywnej', current_date + 7, false)
 on conflict (id) do update set
  name = excluded.name,
  date = excluded.date,
  done = excluded.done;

insert into public.gardenhub_events (id, name, date, color) values
  (2001, 'Sałata', current_date + 2, 'green'),
  (2002, 'Rzodkiewka', current_date + 5, 'pink'),
  (2003, 'Marchew', current_date + 9, 'amber'),
  (2004, 'Bazylia', current_date + 12, 'blue')
 on conflict (id) do update set
  name = excluded.name,
  date = excluded.date,
  color = excluded.color;

insert into public.gardenhub_photos (id, title, description, image, date) values
  (
    3001,
    'Pierwsze kiełki',
    'Sałata zaczęła właśnie pojawiać się nad ziemią.',
    'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=900&q=80',
    now() - interval '2 days'
  ),
  (
    3002,
    'Domowa mini-szklarnia',
    'Sadzonki rosną szybciej pod szkłem.',
    'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=900&q=80',
    now() - interval '5 days'
  )
 on conflict (id) do update set
  title = excluded.title,
  description = excluded.description,
  image = excluded.image,
  date = excluded.date;
