require('dotenv').config();

const express = require('express');
const path = require('path');
const siteData = require('./config/site-data');
const { buildJsonLdGraph, buildSitemapXml, buildLlmsTxt } = require('./lib/seo-build');

const app = express();
const PORT = process.env.PORT || 3000;
const SITE = siteData.site;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

function baseLocals(extra = {}) {
  const phoneTel = SITE.phoneTel || `tel:${SITE.phone.replace(/\s/g, '')}`;
  const seoHome = {
    ...siteData.seo.home,
    googleSiteVerification: siteData.seo.googleSiteVerification || '',
  };
  const canonical = `${SITE.domain.replace(/\/$/, '')}/`;

  return {
    site: { ...SITE, phoneTel },
    services: siteData.practiceDomains,
    practiceDomains: siteData.practiceDomains,
    testimonials: siteData.testimonials,
    faqs: siteData.faqs,
    jsonLdGraph: buildJsonLdGraph({
      site: SITE,
      services: siteData.practiceDomains,
      testimonials: siteData.testimonials,
      faqs: siteData.faqs,
      seo: seoHome,
      canonical,
    }),
    ...extra,
  };
}

app.get('/', (req, res) => {
  const canonical = `${SITE.domain.replace(/\/$/, '')}/`;
  res.render('index', baseLocals({
    seo: {
      ...siteData.seo.home,
      googleSiteVerification: siteData.seo.googleSiteVerification || '',
      canonical,
    },
    pageTitle: siteData.seo.home.title,
  }));
});

app.get('/booking', (req, res) => {
  res.redirect(301, SITE.whatsappUrl);
});

app.get('/intake', (req, res) => {
  const origin = SITE.domain.replace(/\/$/, '');
  const canonical = `${origin}/intake`;
  const whatsappPhone = (SITE.whatsappUrl.match(/wa\.me\/(\d+)/) || [])[1]
    || SITE.phone.replace(/\D/g, '');

  res.render('intake', {
    site: { ...SITE, phoneTel: SITE.phoneTel || `tel:${SITE.phone.replace(/\s/g, '')}` },
    seo: {
      title: 'VVCosmic Intake Form | Consultation details',
      description:
        'Share astrology or vastu consultation details with Harshil Sevak. Submit opens WhatsApp with your information pre-filled.',
      canonical,
      robots: 'noindex, follow',
    },
    jsonLdGraph: {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'VVCosmic consultation intake form',
      description: 'Client intake for astrology and vastu consultations',
      url: canonical,
      inLanguage: 'en-IN',
      isPartOf: {
        '@type': 'WebSite',
        name: SITE.name,
        url: `${origin}/`,
      },
    },
    whatsappPhone,
  });
});

app.get('/robots.txt', (req, res) => {
  const origin = SITE.domain.replace(/\/$/, '');
  res.type('text/plain');
  res.send(`# ${SITE.name}
User-agent: *
Allow: /

User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: anthropic-ai
Allow: /

User-agent: ClaudeBot
Allow: /

Sitemap: ${origin}/sitemap.xml

# AI / answer-engine summary
# ${origin}/llms.txt
`);
});

app.get('/sitemap.xml', (req, res) => {
  res.type('application/xml');
  res.send(buildSitemapXml({ site: SITE }));
});

app.get('/llms.txt', (req, res) => {
  res.type('text/plain; charset=utf-8');
  res.send(buildLlmsTxt({
    site: SITE,
    services: siteData.practiceDomains,
    faqs: siteData.faqs,
  }));
});

app.use((req, res) => {
  res.status(404).type('text/html');
  res.send(`<!DOCTYPE html>
<html lang="en-IN">
<head><meta charset="UTF-8"><meta name="robots" content="noindex"><title>Page not found | ${SITE.name}</title></head>
<body><p>Page not found. <a href="/">Return to ${SITE.name}</a>.</p></body>
</html>`);
});

app.listen(PORT, () => {
  console.log(`${SITE.name} running at http://localhost:${PORT}`);
  console.log('Edit content in: config/site-data.js');
  console.log(`Sitemap: http://localhost:${PORT}/sitemap.xml`);
});
