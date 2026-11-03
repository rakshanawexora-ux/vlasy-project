/** Fictional AI editorial imagery, not documented VLASY clients, staff or results. */
export type ServiceFrame = { src: string; alt: string; caption: string };
export type ServicePhotography = { heading: string; introduction: string; frames: ServiceFrame[] };
const workspace: ServiceFrame = {
  src: '/images/editorial/academy-process.webp',
  alt: 'AI editorial still life of scissors, comb, sectioning clips and a clean towel',
  caption: 'Thoughtful preparation, down to the details',
};
const preparation: ServiceFrame = {
  src: '/images/editorial/beauty-process.webp',
  alt: 'AI editorial still life of a therapist preparing a clean towel and skincare bowls',
  caption: 'A little preparation. A personal approach.',
};
export const servicePhotography: Record<string, ServicePhotography> = {
  'hair-replacement': {
    heading: 'A closer look at your next chapter.',
    introduction:
      'Talk through the hairline, density and daily care together. Every choice should make sense for the way you live.',
    frames: [
      {
        src: '/images/editorial/replacement-process.webp',
        alt: 'AI illustration of an Indian stylist combing a man’s short dark hairstyle; not a hair replacement result',
        caption: 'Discuss the shape, texture and daily routine',
      },
      {
        src: '/images/editorial/replacement-portrait.webp',
        alt: 'AI editorial portrait of an Indian man with a natural short hairstyle',
        caption: 'Discuss the appearance you feel comfortable with',
      },
      workspace,
    ],
  },
  'hair-extensions': {
    heading: 'Movement. Texture. The finer details.',
    introduction:
      'Explore the direction you love, then discuss the method, colour match and upkeep that suit your existing hair.',
    frames: [
      {
        src: '/images/editorial/extensions-process.webp',
        alt: 'AI editorial illustration of a stylist sectioning long hair with a comb',
        caption: 'Every section, carefully considered',
      },
      {
        src: '/images/editorial/extensions-portrait.webp',
        alt: 'AI editorial portrait showing long textured dark hair',
        caption: 'Length, texture and movement in conversation',
      },
      workspace,
    ],
  },
  'hair-colour': {
    heading: 'Dimension you can make your own.',
    introduction:
      'Bring your colour references. Your stylist will consider your starting shade, colour history and the condition of your hair.',
    frames: [
      {
        src: '/images/editorial/colour-process.webp',
        alt: 'AI illustration of an Indian colourist applying hair colour with a tint brush',
        caption: 'A thoughtful approach to colour',
      },
      {
        src: '/images/editorial/colour-portrait.webp',
        alt: 'AI editorial view of wavy hair with subtle caramel tones',
        caption: 'Explore the tone and texture you love',
      },
      workspace,
    ],
  },
  'hair-cut-styling': {
    heading: 'Shape that works beyond the chair.',
    introduction:
      'A reference is a starting point. Your texture, styling routine and preferred silhouette help shape the final direction.',
    frames: [
      {
        src: '/images/editorial/styling-process.webp',
        alt: 'AI editorial illustration of a stylist trimming a seated man’s short hair',
        caption: 'Shape, section by section',
      },
      {
        src: '/images/editorial/styling-portrait.webp',
        alt: 'AI editorial portrait of a man with a short textured haircut',
        caption: 'An individual shape and finish',
      },
      workspace,
    ],
  },
  bridal: {
    heading: 'Every detail, thoughtfully connected.',
    introduction:
      'Share your outfit, event schedule and the look you feel most yourself in. Hair and makeup should feel like part of the same story.',
    frames: [
      {
        src: '/images/editorial/bridal-process.webp',
        alt: 'AI editorial illustration of a makeup artist preparing a South Indian bride wearing jasmine',
        caption: 'Time for the finishing details',
      },
      {
        src: '/images/editorial/bridal-portrait.webp',
        alt: 'AI editorial portrait of a South Indian bride with jasmine and gold jewellery',
        caption: 'Occasion details, brought together',
      },
      preparation,
    ],
  },
  'beauty-treatments': {
    heading: 'A little time, entirely for you.',
    introduction:
      'Discuss skin sensitivities, current products and what you want from your appointment before choosing a treatment.',
    frames: [
      {
        src: '/images/editorial/beauty-portrait.webp',
        alt: 'AI editorial illustration of a beauty therapist applying a facial mask',
        caption: 'Personal care, thoughtfully considered',
      },
      preparation,
      {
        src: '/images/editorial/beauty-tools-detail.webp',
        alt: 'AI editorial still life of clean makeup brushes and beauty tools',
        caption: 'Care in the preparation and finishing details',
      },
    ],
  },
  mehndi: {
    heading: 'An occasion, in the details.',
    introduction:
      'Explore coverage, pattern and timing with your artist. Bring references for the balance of tradition and simplicity you prefer.',
    frames: [
      {
        src: '/images/editorial/mehndi-process.webp',
        alt: 'AI editorial illustration of an Indian artist applying mehndi using a henna cone',
        caption: 'A personal design, one detail at a time',
      },
      {
        src: '/images/editorial/mehndi-portrait.webp',
        alt: 'AI editorial close-up of traditional mehndi patterns on palms',
        caption: 'Explore a design direction with your artist',
      },
      preparation,
    ],
  },
};
