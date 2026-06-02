# How to Edit VVCosmic.com

All website content is controlled from **`config/site-data.js`**.

| Section | What you can change |
|---------|---------------------|
| `site` | Phone, email, practitioner name, footer quote, domain |
| `seo` | Page titles and descriptions |
| `testimonials` | Client reflection quotes |

After editing, restart the server: `npm start`

## Pages

- **Home** — `views/index.ejs` (structure) + `public/css/refinement.css` (final design)
- **Inquiry** — `views/booking.ejs` (single form, no pricing)

## Inquiry form fields

Full Name, Country, Email, WhatsApp, Area of Concern, Message

Submissions are stored in server memory (`server.js`) until email/DB is connected.

## Brand

- Logo: `views/partials/logo.ejs` — **VV** (stone) + **COSMIC** (bronze)
- Lotus: `views/partials/lotus-icon.ejs`, `views/partials/hero-lotus.ejs`
- Colors: `public/css/refinement.css` (`:root` variables)

## Images

- `/public/images/vastu-purusha-blueprint.jpg` — Spatial Intelligence section only
- Temple carving textures removed per brand direction
