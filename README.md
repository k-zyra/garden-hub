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

Tasks, sowing events, and photos are stored locally in the browser using `localStorage`.
