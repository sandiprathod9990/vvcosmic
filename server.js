require('dotenv').config();

const express = require('express');
const path = require('path');
const siteData = require('./config/site-data');

const app = express();
const PORT = process.env.PORT || 3000;
const SITE = siteData.site;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

function baseLocals(extra = {}) {
  return {
    site: SITE,
    services: siteData.practiceDomains,
    practiceDomains: siteData.practiceDomains,
    testimonials: siteData.testimonials,
    ...extra,
  };
}

app.get('/', (req, res) => {
  res.render('index', baseLocals({
    seo: {
      ...siteData.seo.home,
      canonical: `${SITE.domain}/`,
    },
    pageTitle: siteData.seo.home.title,
  }));
});

app.get('/booking', (req, res) => {
  res.redirect(301, SITE.whatsappUrl);
});

app.get('/robots.txt', (req, res) => {
  res.type('text/plain');
  res.send(`User-agent: *
Allow: /

Sitemap: ${SITE.domain}/sitemap.xml
`);
});

app.get('/sitemap.xml', (req, res) => {
  const urls = ['/'];
  const lastmod = new Date().toISOString().split('T')[0];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((url) => `  <url>
    <loc>${SITE.domain}${url === '/' ? '' : url}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>`).join('\n')}
</urlset>`;

  res.type('application/xml');
  res.send(xml);
});

app.listen(PORT, () => {
  console.log(`${SITE.name} running at http://localhost:${PORT}`);
  console.log('Edit content in: config/site-data.js');
});
