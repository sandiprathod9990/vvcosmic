/**
 * VVCosmic.com — Site content & settings
 */

module.exports = {
  site: {
    name: 'VVCosmic',
    domain: 'https://vvcosmic.com',
    tagline: 'Pattern Intelligence & Life Alignment',
    practitioner: 'Harshil Sevak',
    email: 'contact@vvcosmic.com',
    phone: '+91 81409 61570',
    phoneDisplay: '+91 81409 61570',
    location: 'India',
    footerQuote: 'Every life has a visible story and an invisible architecture.',
    description:
      'VVCosmic — Private advisory in astrology, vastu intelligence, pattern recognition, and life alignment with Harshil Sevak.',
    aboutLead:
      'Private advisory in pattern intelligence, astrology, and vastu alignment — grounded in observation, structure, and intentional refinement.',
    aboutBody:
      'The practice is selective and deeply personal. Each engagement begins with understanding how visible life is shaped by invisible architecture — chart patterns, behavioral loops, environment, and the quiet structures beneath repetition. Guidance follows observation, not prediction.',
  },

  seo: {
    home: {
      title: 'VVCosmic | Life Alignment & Pattern Intelligence | Harshil Sevak',
      description:
        'VVCosmic with Harshil Sevak — private advisory for pattern observation, astrology, vastu intelligence, and strategic life alignment. Begin the conversation.',
      keywords:
        'VVCosmic, Harshil Sevak, life alignment, pattern intelligence, astrology advisory, vastu intelligence, life architecture',
    },
  },

  practiceDomains: [
    { id: 'astrology', slug: 'astrology', name: 'Astrology', description: 'Pattern recognition through chart intelligence' },
    { id: 'vastu', slug: 'vastu', name: 'Vastu Intelligence', description: 'Environmental and vastu advisory' },
  ],

  testimonials: [
    {
      quote:
        'The clarity was quiet, not dramatic. I stopped reacting to the same patterns and began understanding the structure beneath them.',
      cite: 'Priya Desai, Mumbai',
      theme: 'Awareness & clarity',
    },
    {
      quote:
        'Small vastu adjustments created a noticeable shift in emotional stability. I had not considered how much my workspace was influencing my decisions.',
      cite: 'Amit Patel, Ahmedabad',
      theme: 'Environmental alignment',
    },
    {
      quote:
        'Less confusion, more internal steadiness. The guidance helped me align daily choices with what I actually understood about my patterns.',
      cite: 'Neha Kapoor, Delhi',
      theme: 'Decision-making',
    },
  ],
};

const site = module.exports.site;
site.phoneTel = `tel:${site.phone.replace(/\s/g, '')}`;
site.whatsappUrl =
  'https://wa.me/918140961570?text=Hi%20Vaishali%20Vastu%20Consultancy%21%20I%20would%20like%20to%20know%20more%20about%20your%20crystals.';
