# Appliper Chrome side panel extension

This repository contains a minimal Manifest V3 Chrome extension that opens
`https://appliper.io/` in a tab-specific side panel.

## What it does

- Uses the appliper favicon as the extension icon.
- Opens the side panel from the extension toolbar icon.
- Opens a tab-specific side panel only for tabs where you click the icon.
- Auto-fills the **job URL, company, position, and job description** from the
  current tab into the appliper.io dashboard form.

## How autofill works

When you click the toolbar icon, the worker injects a self-contained extractor
into every frame of the job tab (granted by `activeTab`) and reads the title,
company and description straight from the page DOM — **no AI, no external
service**. Per field it prefers, in order: a hand-tuned per-site selector → the
page's schema.org `JobPosting` JSON-LD → generic heuristics (largest scored text
block, `<h1>`, `og:` meta). Results from all frames are merged so an embedded ATS
iframe (Greenhouse / Lever / iCIMS) still provides the description.

The values are posted into the embedded dashboard and filled **only into empty
fields** — if a value looks wrong, just edit it in the form and it won't be
overwritten. Extraction logic lives in `extractJobFromFrame()` in
[`background.js`](background.js); the form-filling lives in
[`content/appliper-autofill.js`](content/appliper-autofill.js).

> Note: `content/scrape-job.js` is an older, unused scraper (not referenced by
> the manifest). The active extraction is `extractJobFromFrame()` in
> `background.js`.

## Embedding

`appliper.io` sends `X-Frame-Options: SAMEORIGIN` by default. The extension uses
`declarativeNetRequest` to remove that header (and blocking CSP frame rules) for
requests loaded inside the side panel iframe.

## Load the extension

1. Open `chrome://extensions`.
2. Turn on Developer mode.
3. Click Load unpacked.
4. Select `D:\Dev\cAppliper`.
