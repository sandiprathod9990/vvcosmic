# Render deployment

VVCosmic is a **Node.js Web Service** — not a Static Site.

## On Render.com

1. Cancel the Static Site setup.
2. Click **New +** → **Web Service** (not Static Site).
3. Connect your GitHub repo.
4. Use these settings:

| Field | Value |
|-------|--------|
| **Name** | `vvcosmic` |
| **Branch** | `main` |
| **Root Directory** | *(leave empty if repo root is this project)* |
| **Runtime** | Node |
| **Build Command** | `npm install` |
| **Start Command** | `npm start` |

5. Deploy. Your URL will be like: `https://vvcosmic.onrender.com`

6. After first deploy, update `config/site-data.js`:

```js
domain: 'https://vvcosmic.onrender.com',
```

Then push again so SEO/sitemap use the correct URL.

## Why not Static Site?

Static Site only serves HTML/CSS files. This project needs Express for:

- Booking form (`POST /api/inquiry`)
- EJS page rendering
- `sitemap.xml` and `robots.txt`

## Free tier note

Render free tier sleeps after ~15 min idle. First visit may take 30–60 seconds to wake up — fine for client demos.
