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
    consultations: siteData.consultations,
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
  let selected = req.query.consultation || '';
  if (!selected && req.query.service) {
    const match = siteData.consultations.find((c) => c.serviceId === req.query.service);
    if (match) selected = match.id;
  }
  res.render('booking', baseLocals({
    seo: {
      ...siteData.seo.booking,
      canonical: `${SITE.domain}/booking`,
    },
    pageTitle: siteData.seo.booking.title,
    selectedConsultation: selected,
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
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('location').trim().notEmpty().withMessage('Location is required'),
    body('occupation').trim().notEmpty().withMessage('Occupation or field is required'),
    body('lifePhase').trim().notEmpty().withMessage('Current life phase is required'),
    body('concern').trim().notEmpty().withMessage('Area of concern is required'),
    body('purpose').trim().notEmpty().withMessage('Consultation purpose is required'),
    body('consultation').trim().notEmpty().withMessage('Please select a consultation type'),
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

app.post('/api/payment-intent', (req, res) => {
  const { consultationId, inquiryId } = req.body;
  const consultation = siteData.consultations.find((c) => c.id === consultationId);

  if (!consultation) {
    return res.status(400).json({ success: false, message: 'Invalid consultation selected' });
  }

  res.json({
    success: true,
    paymentIntent: {
      id: `pi_${Date.now()}`,
      amount: consultation.price * 100,
      currency: consultation.currency.toLowerCase(),
      consultation: consultation.name,
      inquiryId,
      status: 'requires_payment_method',
    },
    message:
      'Payment gateway integration ready. Connect Stripe or Razorpay credentials to enable live payments.',
  });
});

app.listen(PORT, () => {
  console.log(`${SITE.name} running at http://localhost:${PORT}`);
  console.log('Edit content in: config/site-data.js');
});
