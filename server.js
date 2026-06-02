require('dotenv').config();

const express = require('express');
const path = require('path');
const { body, validationResult } = require('express-validator');
const siteData = require('./config/site-data');

const app = express();
const PORT = process.env.PORT || 3000;
const SITE = siteData.site;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const inquiries = [];

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
  res.render('booking', baseLocals({
    seo: {
      ...siteData.seo.booking,
      canonical: `${SITE.domain}/booking`,
    },
    pageTitle: siteData.seo.booking.title,
  }));
});

app.get('/robots.txt', (req, res) => {
  res.type('text/plain');
  res.send(`User-agent: *
Allow: /

Sitemap: ${SITE.domain}/sitemap.xml
`);
});

app.get('/sitemap.xml', (req, res) => {
  const urls = ['/', '/booking'];
  const lastmod = new Date().toISOString().split('T')[0];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((url) => `  <url>
    <loc>${SITE.domain}${url === '/' ? '' : url}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${url === '/' ? '1.0' : '0.8'}</priority>
  </url>`).join('\n')}
</urlset>`;

  res.type('application/xml');
  res.send(xml);
});

app.post(
  '/api/inquiry',
  [
    body('name').trim().notEmpty().withMessage('Full name is required'),
    body('country').trim().notEmpty().withMessage('Country is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('whatsapp').trim().notEmpty().withMessage('WhatsApp number is required'),
    body('concern').trim().notEmpty().withMessage('Area of concern is required'),
    body('message').trim().notEmpty().withMessage('Message is required'),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const inquiry = {
      id: Date.now().toString(36),
      ...req.body,
      submittedAt: new Date().toISOString(),
      status: 'pending',
    };

    inquiries.push(inquiry);

    res.json({
      success: true,
      inquiryId: inquiry.id,
      message: 'Your inquiry has been received. We will respond within 48 hours.',
    });
  }
);

app.listen(PORT, () => {
  console.log(`${SITE.name} running at http://localhost:${PORT}`);
  console.log('Edit content in: config/site-data.js');
});
