/**
 * VVCosmic.com — Site content & settings
 * Edit this file to update text, services, pricing, contact info, and SEO.
 */

module.exports = {
  site: {
    name: 'VVCosmic',
    domain: 'https://vvcosmic.com',
    tagline: 'Pattern Intelligence & Life Alignment',
    practitioner: 'Harshil Sevak',
    email: 'contact@vvcosmic.com',
    phone: '+91 00000 00000',
    phoneDisplay: '+91 00000 00000',
    location: 'India',
    description:
      'VVCosmic.com — Consult Harshil Sevak for Vedic astrology, numerology, vastu, palmistry & tantra. Personalized guidance for clarity, alignment, and life transformation.',
  },

  seo: {
    home: {
      title: 'Harshil Sevak | Best Astrologer in India | VVCosmic.com',
      description:
        'Consult Harshil Sevak at VVCosmic.com — trusted Vedic astrologer offering astrology, numerology, vastu consultation, palmistry & tantra remedies. Book your private session today.',
      keywords:
        'Harshil Sevak, VVCosmic, best astrologer in India, Vedic astrologer, vastu consultant, numerology, palmistry, tantra, astrology consultation, vastu shastra',
    },
    booking: {
      title: 'Book Appointment | Harshil Sevak | VVCosmic.com',
      description:
        'Book a private consultation with Harshil Sevak — astrology, numerology, vastu, palmistry & tantra. Secure inquiry and appointment at VVCosmic.com.',
      keywords: 'book astrologer, appointment Harshil Sevak, VVCosmic booking, vastu consultation booking',
    },
  },

  services: [
    {
      id: 'astrology',
      name: 'Astrology',
      slug: 'astrology',
      icon: '☉',
      shortDescription:
        'Unlock celestial guidance for your destiny. Gain insights and clarity on life\'s journey through expert Vedic astrology tailored to your birth chart.',
      description:
        'Vedic astrology as a system of pattern intelligence — chart analysis, planetary influences, and karmic tendencies observed with depth and precision.',
      features: ['Birth chart analysis', 'Planetary period guidance', 'Career & relationship insights', 'Personalized remedies'],
    },
    {
      id: 'numerology',
      name: 'Numerology',
      slug: 'numerology',
      icon: '∞',
      shortDescription:
        'Decode the numbers of your life path. Explore personality traits, destiny, and potential through personalized numerology guidance.',
      description:
        'Understand how numbers shape your tendencies, timing, and life direction — integrated with your broader alignment work.',
      features: ['Life path analysis', 'Name & date numerology', 'Compatibility insights', 'Timing guidance'],
    },
    {
      id: 'vastu',
      name: 'Vastu Consultation',
      slug: 'vastu-consultation',
      icon: '⌂',
      shortDescription:
        'Spatial intelligence for home and workspace. Understand how architecture, direction, and flow influence clarity and emotional balance.',
      description:
        'Vastu presented as environmental psychology and energetic architecture — grounded corrections, not superstition.',
      features: ['Home & office vastu', 'Directional analysis', 'Spatial corrections', 'Energy flow optimization'],
    },
    {
      id: 'palmistry',
      name: 'Palmistry',
      slug: 'palmistry',
      icon: '✋',
      shortDescription:
        'Explore the lines of your palms for insights into temperament, life patterns, and potential through ancient palmistry wisdom.',
      description:
        'Hand analysis as an observational layer — reading inherent tendencies and life trajectory with calm, intelligent interpretation.',
      features: ['Line & mount analysis', 'Life pattern reading', 'Temperament insights', 'Integrated guidance'],
    },
    {
      id: 'tantra',
      name: 'Tantra',
      slug: 'tantra',
      icon: '◈',
      shortDescription:
        'Spiritual practices for healing, connection, and energetic balance. Authentic tantric remedies aligned with your personal path.',
      description:
        'Refined tantric remedies and practices for energetic correction — approached with seriousness, discretion, and personalized care.',
      features: ['Energetic balancing', 'Personalized remedies', 'Spiritual alignment', 'Confidential guidance'],
    },
  ],

  consultations: [
    {
      id: 'astrology-session',
      serviceId: 'astrology',
      name: 'Astrology Consultation',
      duration: '60 minutes',
      price: 2500,
      currency: 'INR',
      description: 'In-depth Vedic astrology session — birth chart analysis, life patterns, and personalized guidance.',
    },
    {
      id: 'vastu-consultation',
      serviceId: 'vastu',
      name: 'Vastu Consultation',
      duration: '90 minutes',
      price: 3500,
      currency: 'INR',
      description: 'Home or office vastu analysis with spatial corrections and environmental alignment recommendations.',
    },
    {
      id: 'complete-guidance',
      serviceId: 'astrology',
      name: 'Complete Guidance Session',
      duration: '120 minutes',
      price: 5000,
      currency: 'INR',
      description: 'Comprehensive session covering astrology, numerology, and lifestyle alignment with Harshil Sevak.',
    },
    {
      id: 'numerology-reading',
      serviceId: 'numerology',
      name: 'Numerology Reading',
      duration: '45 minutes',
      price: 1500,
      currency: 'INR',
      description: 'Personalized numerology analysis — life path, name vibration, and timing insights.',
    },
    {
      id: 'palmistry-session',
      serviceId: 'palmistry',
      name: 'Palmistry Session',
      duration: '45 minutes',
      price: 1500,
      currency: 'INR',
      description: 'Detailed palm reading with insights into temperament, patterns, and life direction.',
    },
    {
      id: 'tantra-remedy',
      serviceId: 'tantra',
      name: 'Tantra Remedy Consultation',
      duration: '60 minutes',
      price: 3000,
      currency: 'INR',
      description: 'Private tantric remedy consultation for energetic balancing and spiritual alignment.',
    },
  ],

  videos: [
    {
      id: 'Fh6rgO3ZNG0',
      title: 'Vedic Astrology Insights',
      url: 'https://www.youtube.com/watch?v=Fh6rgO3ZNG0',
    },
    {
      id: 'pibn6Exo19M',
      title: 'Life Patterns & Alignment',
      url: 'https://www.youtube.com/watch?v=pibn6Exo19M',
    },
    {
      id: 'EDeHQeFu7h4',
      title: 'Vastu & Environmental Guidance',
      url: 'https://www.youtube.com/watch?v=EDeHQeFu7h4',
    },
    {
      id: 'vwtoXMxxB5M',
      title: 'Spiritual Remedies & Wisdom',
      url: 'https://www.youtube.com/watch?v=vwtoXMxxB5M',
    },
  ],
};
