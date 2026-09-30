# Danceyard87Portfolio

Portfolio website for Danceyard87, built with React + Vite and hosted on Netlify.

## Getting started

```bash
nvm use        # Node 22
npm install
npm run dev    # http://localhost:5173
```

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the dev server |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | Lint with oxlint |

## CI/CD

- `.github/workflows/ci.yml` — on every PR into `main`: lint, build, and deploy a Netlify preview (link posted on the PR).
- `.github/workflows/deploy.yml` — on push to `main`: lint, build, and deploy to production (gated by the `production` environment).

Both need the repo secrets `NETLIFY_AUTH_TOKEN` and `NETLIFY_SITE_ID`.
