# EmbSys Products

A responsive React + Vite product catalog for industrial automation and electronic control solutions.

## Live site

https://aadithya-78.github.io/embsysproducts/

## Run locally

```bash
npm install
npm run dev
```

Create a production build with `npm run build`.

## Deployment

Every push to `main` automatically builds and deploys the app to GitHub Pages through `.github/workflows/deploy-pages.yml`.

## Product data

Catalog data is maintained in `src/data/catalog.js`. Generated Excel source files are stored in `public/data`.

Regenerate all workbooks after changing `src/data/catalog.js`:

```bash
npm run generate:excel
```

The catalog content is purpose-written for this interface and does not copy the public EmbSys product listing. Prices are indicative and exclude GST and freight.
