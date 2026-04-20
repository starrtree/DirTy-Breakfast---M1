# DirTy-Breakfast---M1

This repository now includes a static MVP frontend **plus** a lightweight Node backend (no external dependencies) so you can run everything directly in-repo.

## Run locally (full-stack in repo)

```bash
node server.mjs
```

Then open: http://localhost:3000

## What this includes

- `index.html`, `styles.css`, `app.js`: static restaurant website MVP
- `static-data/menu.json`: menu data loaded by the frontend
- `server.mjs`: local backend server + `/api/subscribe` endpoint
- `api/submissions.json`: persisted VIP form submissions

## GitHub Pages note

GitHub Pages can host the static files (`index.html`), but Pages does **not** run Node APIs.
For API-backed behavior, use `node server.mjs` locally or deploy `server.mjs` to a Node host.
