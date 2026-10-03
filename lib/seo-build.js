/**
 * Build JSON-LD @graph and sitemap helpers for SEO / AEO
 */

function absoluteUrl(domain, path) {
  const base = domain.replace(/\/$/, '');
  if (!path || path === '/') return `${base}/`;
  return `${base}${path.startsWith('/') ? path : `/${path}`}`;
}

function buildJsonLdGraph({ site, services, testimonials, faqs, seo, canonical }) {
  const siteUrl = site.domain.replace(/\/$/, '');
  const pageUrl = canonical || `${siteUrl}/`;
  const ogImage = absoluteUrl(site.domain, site.ogImage || '/og-image.png');

  const serviceList = (services || []).map((s, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: s.name,
    description: s.description,
    url: `${pageUrl}#${s.slug === 'astrology' ? 'astrology' : 'vastu'}`,
  }));

  const reviews = (testimonials || []).map((t) => ({
    '@type': 'Review',
    reviewBody: t.quote,
    author: {
      '@type': 'Person',
      name: (t.cite || '').split(',')[0].trim() || 'Client',
    },
    itemReviewed: {
      '@type': 'ProfessionalService',
      name: site.name,
      url: siteUrl,
    },
  }));

  const graph = [
    {
      '@type': 'WebSite',
      '@id': `${siteUrl}/#website`,
      url: siteUrl,
      name: site.name,
      description: site.description,
      inLanguage: 'en-IN',
      publisher: { '@id': `${siteUrl}/#organization` },
    },
    {
      '@type': 'WebPage',
      '@id': `${pageUrl}#webpage`,
      url: pageUrl,
      name: seo?.title || site.name,
      description: seo?.description || site.description,
      isPartOf: { '@id': `${siteUrl}/#website` },
      about: { '@id': `${siteUrl}/#organization` },
      inLanguage: 'en-IN',
      primaryImageOfPage: {
        '@type': 'ImageObject',
        url: ogImage,
      },
    },
    {
      '@type': 'Organization',
      '@id': `${siteUrl}/#organization`,
      name: site.name,
      url: siteUrl,
      email: site.email,
      telephone: site.phone,
      logo: {
        '@type': 'ImageObject',
        url: absoluteUrl(site.domain, '/favicon-32.png'),
      },
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: site.phone,
        email: site.email,
        contactType: 'customer service',
        areaServed: ['IN', 'Worldwide'],
        availableLanguage: ['English', 'Hindi', 'Gujarati'],
      },
      founder: { '@id': `${siteUrl}/#person` },
    },
    {
      '@type': 'ProfessionalService',
      '@id': `${siteUrl}/#service`,
      name: site.name,
      url: siteUrl,
      description: site.description,
      email: site.email,
      telephone: site.phone,
      image: ogImage,
      areaServed: {
        '@type': 'Country',
        name: site.location || 'India',
      },
      provider: { '@id': `${siteUrl}/#organization` },
      serviceType: (services || []).map((s) => s.name),
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Advisory services',
        itemListElement: (services || []).map((s) => ({
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: s.name,
            description: s.description,
          },
        })),
      },
    },
    {
      '@type': 'Person',
      '@id': `${siteUrl}/#person`,
      name: site.practitioner,
      url: `${pageUrl}#about`,
      jobTitle: 'Life Alignment & Pattern Intelligence Advisor',
      worksFor: { '@id': `${siteUrl}/#organization` },
      knowsAbout: [
        'Vedic Astrology',
        'Pattern Observation',
        'Life Architecture',
        'Vastu Intelligence',
        'Lifestyle Alignment',
        'Environmental Psychology',
      ],
    },
    {
      '@type': 'ItemList',
      '@id': `${pageUrl}#services`,
      name: 'Practice domains',
      itemListElement: serviceList,
    },
  ];

  if (faqs && faqs.length) {
    graph.push({
      '@type': 'FAQPage',
      '@id': `${pageUrl}#faq`,
      mainEntity: faqs.map((f) => ({
        '@type': 'Question',
        name: f.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: f.answer,
        },
      })),
    });
  }

  reviews.forEach((r, i) => {
    graph.push({ ...r, '@id': `${pageUrl}#review-${i + 1}` });
  });

  return {
    '@context': 'https://schema.org',
    '@graph': graph,
  };
}

function buildSitemapXml({ site, lastmod }) {
  const base = site.domain.replace(/\/$/, '');
  const mod = lastmod || new Date().toISOString().split('T')[0];
  const home = `${base}/`;
  const ogImage = `${base}${site.ogImage || '/og-image.png'}`;

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  <url>
    <loc>${home}</loc>
    <lastmod>${mod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
    <image:image>
      <image:loc>${ogImage}</image:loc>
      <image:title>${escapeXml(site.name)} — ${escapeXml(site.tagline)}</image:title>
    </image:image>
  </url>
</urlset>`;
}

function buildLlmsTxt({ site, services, faqs }) {
  const lines = [
    `# ${site.name}`,
    `> ${site.description}`,
    '',
    '## Canonical site',
    site.domain.replace(/\/$/, '') + '/',
    '',
    '## Practitioner',
    `- ${site.practitioner}`,
    '',
    '## Contact',
    `- Phone / WhatsApp: ${site.phone}`,
    `- Email: ${site.email}`,
    `- Location: ${site.location}`,
    '',
    '## Services',
    ...(services || []).map((s) => `- ${s.name}: ${s.description}`),
    '',
    '## Main topics',
    '- Pattern intelligence and life alignment',
    '- Astrology as pattern observation (not prediction)',
    '- Vastu intelligence for home and workspace',
    '- Thought, speech, and action alignment',
    '',
  ];

  if (faqs && faqs.length) {
    lines.push('## Frequently asked questions', '');
    faqs.forEach((f) => {
      lines.push(`### ${f.question}`, f.answer, '');
    });
  }

  lines.push('## Sitemap', `${site.domain.replace(/\/$/, '')}/sitemap.xml`);
  lines.push('', '## Consultation intake form (share with clients)', `${site.domain.replace(/\/$/, '')}/intake`);
  return lines.join('\n');
}

function escapeXml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

module.exports = {
  absoluteUrl,
  buildJsonLdGraph,
  buildSitemapXml,
  buildLlmsTxt,
};
