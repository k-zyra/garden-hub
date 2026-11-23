# Garden Hub

An interactive garden planner with a task list, sowing calendar, and personal photo gallery.

## Local setup

Start a local server:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000` in your browser.

Starting a local server is required because the page loads its HTML sections using `fetch()`.

## GitHub Pages

1. Upload the project files to the `main` branch of a GitHub repository.
2. Open **Settings → Pages**.
3. Under **Build and deployment**, select **Deploy from a branch**.
4. Select the `main` branch and the `/ (root)` folder, then click **Save**.

## Supabase setup

1. Open the Supabase SQL Editor.
2. Run the statements from `supabase.sql`.
3. Keep the public publishable key in `js/supabase-config.js`.
4. Do not add a Supabase `service_role` key to the browser project.

Tasks, sowing events, and photos are synchronized with Supabase. `localStorage` remains as a local fallback/cache.

The example SQL policies allow public read and write access. For private per-user data, enable Supabase authentication and add user ownership plus stricter Row Level Security policies.
