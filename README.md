# Danceyard87Portfolio

Portfolio website for Dance Yard Studio, built with React + Vite and hosted on Netlify.

All site content lives in [`src/data/danceyard.json`](src/data/danceyard.json) (source: [client profile](docs/functional-spec/client-profile-danceyard.md)); photos are listed in [`src/data/photos.json`](src/data/photos.json). Edit those files to update text, classes, videos, gallery, events or contact details.

> **Sample content:** photos are from Unsplash, videos are well-known YouTube dance videos, and the testimonials and privacy policy are placeholders. Replace them with Dance Yard's own before launch.

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
- `.github/workflows/deploy.yml` — on push to `main`: lint and build once, then promote that build through three environments on the same Netlify site:

| Environment | URL | GitHub environment | Approval |
|---|---|---|---|
| Dev | `https://dev--<site>.netlify.app` | `dev` | None, deploys on every merge |
| UAT | `https://uat--<site>.netlify.app` | `uat` | Required reviewer |
| Live | Production URL / custom domain | `production` | Required reviewer |

Both workflows need the repo secrets `NETLIFY_AUTH_TOKEN` and `NETLIFY_SITE_ID`. Turn on **Required reviewers** for the `uat` and `production` environments in GitHub → Settings → Environments; without it, UAT and Live deploy straight after Dev.

The enquiry form uses Netlify Forms: turn on form detection in the Netlify site settings. Netlify registers the form from the hidden copy in `index.html`, so keep its field names in sync with `src/sections/Join.jsx`.

## Docs

- [Functional spec](docs/functional-spec/)
- [Technical spec](docs/tech-spec/technical-spec.md) – architecture, flow diagrams, data model, CI/CD and operations
