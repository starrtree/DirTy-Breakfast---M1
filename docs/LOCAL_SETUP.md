# Dirty Breakfast — Local Setup

This repo already has its own `.git` history. If you received another generated project bundle that contains a `.git` folder, **do not copy that nested `.git` folder into this repo**.

## 1) Import generated files safely (if needed)

If your generated bundle includes extra app files, copy only source files into this repo and skip VCS/agent metadata:

- Skip: `.git/`, `.github/`, `skills/`, `.codex/`
- Keep: `src/`, `public/`, config files, package files

Example (from your unpacked bundle directory):

```bash
rsync -av --exclude '.git' --exclude '.github' --exclude 'skills' --exclude '.codex' /path/to/generated-bundle/ /workspace/DirTy-Breakfast---M1/
```

## 2) Install dependencies

Run:

```bash
./scripts/setup.sh
```

The setup script:
- detects whether `next` is available in `node_modules`
- attempts `npm install`
- prints actionable proxy/registry guidance if package downloads are blocked (HTTP 403)

## 3) Run the app

```bash
npm run dev
```

Then open `http://localhost:3000`.

## Notes on images

`next.config.ts` allows remote images from `i.imgur.com`, and app image URLs are configured in `src/app/page.tsx`.
