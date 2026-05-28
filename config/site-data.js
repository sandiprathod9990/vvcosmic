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
    description:
      'VVCosmic — A refined advisory practice for pattern observation, life architecture analysis, lifestyle alignment, and spatial intelligence with Harshil Sevak.',
  },

  seo: {
    home: {
      title: 'VVCosmic | Life Alignment & Pattern Intelligence | Harshil Sevak',
      description:
        'VVCosmic with Harshil Sevak — private advisory for pattern observation, karmic analysis, lifestyle alignment, spatial intelligence, and strategic life correction. Begin your inquiry.',
      keywords:
        'VVCosmic, Harshil Sevak, life alignment, pattern intelligence, vastu spatial intelligence, lifestyle alignment, karmic patterns, life architecture advisory',
    },
    booking: {
      title: 'Begin Your Inquiry | VVCosmic',
      description:
        'Submit a private consultation inquiry to VVCosmic. Share your life context for pattern observation and alignment advisory with Harshil Sevak.',
      keywords: 'VVCosmic inquiry, Harshil Sevak consultation, life alignment booking',
    },
  },

  practiceDomains: [
    {
      id: 'pattern-observation',
      slug: 'pattern-observation',
      name: 'Pattern Observation',
      description:
        'Chart intelligence and recurring theme analysis — observing emotional tendencies, behavioral loops, and karmic continuity before any conclusion is drawn.',
      aspects: ['Birth chart & planetary periods', 'Recurring life themes', 'Emotional & behavioral observation', 'Karmic pattern continuity'],
    },
    {
      id: 'lifestyle-alignment',
      slug: 'lifestyle-alignment',
      name: 'Lifestyle Alignment',
      description:
        'Daily rhythm, routine, and thought-speech-action alignment — understanding how lifestyle refinement shapes how patterns express in your life.',
      aspects: ['Daily rhythm analysis', 'Thought & speech habits', 'Emotional cycles', 'Conscious living structure'],
    },
    {
      id: 'spatial-intelligence',
      slug: 'spatial-intelligence',
      name: 'Spatial Intelligence',
      description:
        'Environmental psychology of living and working spaces — architecture, light, and flow as influences on clarity, behavior, and decision-making.',
      aspects: ['Home & workspace analysis', 'Energetic architecture', 'Spatial correction', 'Environmental friction'],
    },
    {
      id: 'behavioral-analysis',
      slug: 'behavioral-analysis',
      name: 'Behavioral & Energetic Analysis',
      description:
        'Observation of energetic leakage, unconscious repetition, and inherited tendencies — integrated with numerological and palm-based pattern layers where relevant.',
      aspects: ['Energetic tendencies', 'Unconscious repetition', 'Numerological patterns', 'Integrated observation'],
    },
    {
      id: 'life-architecture',
      slug: 'life-architecture',
      name: 'Life Architecture',
      description:
        'A holistic view of how chart, behavior, environment, and awareness intersect — the hidden structures influencing outcomes across career, relationships, and inner life.',
      aspects: ['Hidden pattern mapping', 'Cross-domain analysis', 'Strategic awareness', 'Long-term alignment'],
    },
  ],

  consultations: [
    {
      id: 'pattern-session',
      serviceId: 'pattern-observation',
      name: 'Pattern Observation Session',
      duration: '90 minutes',
      price: 3500,
      currency: 'INR',
      description: 'Deep observational session — chart analysis, recurring themes, and current life architecture.',
    },
    {
      id: 'alignment-intensive',
      serviceId: 'life-architecture',
      name: 'Alignment Intensive',
      duration: '3 hours',
      price: 8500,
      currency: 'INR',
      description: 'Full advisory process — pattern observation, root cause analysis, and strategic correction planning.',
    },
    {
      id: 'spatial-review',
      serviceId: 'spatial-intelligence',
      name: 'Spatial Intelligence Review',
      duration: '120 minutes',
      price: 4500,
      currency: 'INR',
      description: 'Environmental and spatial analysis — how surroundings influence clarity, behavior, and emotional state.',
    },
    {
      id: 'lifestyle-session',
      serviceId: 'lifestyle-alignment',
      name: 'Lifestyle Alignment Session',
      duration: '75 minutes',
      price: 2800,
      currency: 'INR',
      description: 'Rhythm, routine, and alignment work across thought, speech, action, and daily structure.',
    },
  ],

  videos: [
    { id: 'Fh6rgO3ZNG0', title: 'On Recurring Patterns', url: 'https://www.youtube.com/watch?v=Fh6rgO3ZNG0' },
    { id: 'pibn6Exo19M', title: 'Life Architecture & Alignment', url: 'https://www.youtube.com/watch?v=pibn6Exo19M' },
    { id: 'EDeHQeFu7h4', title: 'Spatial Intelligence', url: 'https://www.youtube.com/watch?v=EDeHQeFu7h4' },
    { id: 'vwtoXMxxB5M', title: 'Awareness & Refinement', url: 'https://www.youtube.com/watch?v=vwtoXMxxB5M' },
  ],
};
