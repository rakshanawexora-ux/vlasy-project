// Editorial imagery only. Add consented real client images and paired before/after photographs before publishing outcomes.
export const transformationCategories = [
  'All',
  'Hair Replacement',
  'Extensions',
  'Colour',
  'Cuts',
  'Bridal',
] as const;
export const transformations = [
  {
    id: 'volume',
    title: 'The art of natural volume',
    category: 'Extensions',
    image: '/images/editorial/extensions-portrait.webp',
    detail:
      'Length, movement and a beautifully blended finish. Editorial inspiration, not a documented client result.',
  },
  {
    id: 'dimension',
    title: 'A softer kind of dimension',
    category: 'Colour',
    image: '/images/editorial/colour-portrait.webp',
    detail:
      'A tonal direction to explore with your stylist. Editorial inspiration, not a documented client result.',
  },
  {
    id: 'confidence',
    title: 'Confidence, reimagined',
    category: 'Hair Replacement',
    image: '/images/editorial/replacement-portrait.webp',
    detail:
      'Explore a personalised hair solution through consultation. Editorial inspiration, not a documented client result.',
  },
  {
    id: 'shape',
    title: 'Movement in every detail',
    category: 'Cuts',
    image: '/images/editorial/styling-portrait.webp',
    detail:
      'Shape and finish tailored to the individual. Editorial inspiration, not a documented client result.',
  },
  {
    id: 'occasion',
    title: 'An unforgettable kind of you',
    category: 'Bridal',
    image: '/images/editorial/bridal-portrait.webp',
    detail:
      'Occasion inspiration for a considered bridal look. Editorial inspiration, not a documented client result.',
  },
];
