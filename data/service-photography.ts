import type { Service } from './services';
export type ServiceFrame = { src: string; alt: string; caption: string };
export type ServicePhotography = {
  heading: string;
  introduction: string;
  leadDetail: ServiceFrame;
  frames: ServiceFrame[];
};
const frame = (file: string, alt: string, caption: string): ServiceFrame => ({
  src: file.startsWith('new:')
    ? `/images/services-unique/editorial/${file.slice(4)}.webp`
    : `/images/studio-v2/${file}.webp`,
  alt: `${alt}; illustrative style reference`,
  caption,
});
export const servicePhotography: Record<string, ServicePhotography> = {
  'hair-wig-hair-replacement': {
    heading: 'A fit, finish and care plan for you.',
    introduction:
      'Explore wig options for women and men, with a clear discussion of comfort, styling and servicing.',
    leadDetail: frame(
      'replacement-detail',
      'A lace-base hair system on an ivory stand',
      'Compare base and hairline details',
    ),
    frames: [
      frame(
        'replacement-portrait',
        'Indian man with a textured short hair-system style',
        'Explore styling for men',
      ),
      frame(
        'replacement-process',
        'Stylist discussing a hair system with an Indian man',
        'Discuss fitting and attachment',
      ),
      frame(
        'new:wig-care-detail',
        'Stylist brushing a removable dark wig on a mannequin',
        'Plan ongoing wig care',
      ),
    ],
  },
  'hair-extensions': {
    heading: 'Length and volume, thoughtfully blended.',
    introduction:
      'Compare the method, colour match and care requirements before choosing your extensions.',
    leadDetail: frame(
      'extensions-detail',
      'Stylist matching a dark hair-extension weft',
      'Match colour and texture',
    ),
    frames: [
      frame(
        'extensions-process',
        'Stylist sectioning long dark hair',
        'Careful sectioning and blending',
      ),
      frame(
        'clip-in',
        'Dark clip-in extension wefts with small attachment clips',
        'Explore removable extensions',
      ),
      frame(
        'tape-in',
        'Flat tape-in extension tabs in sectioned hair',
        'Understand tape-in attachments',
      ),
    ],
  },
  'haircut-styling': {
    heading: 'The shape you want. A routine that works.',
    introduction:
      'Haircuts for women, men and children, with styling for everyday wear or a special occasion.',
    leadDetail: frame(
      'women-blow-dry',
      'Woman receiving a professional blow-dry',
      'Finish and movement',
    ),
    frames: [
      frame('kids-haircut', 'Child receiving a salon haircut', 'Haircuts for younger clients'),
      frame('pixie-cut', 'Indian woman with a short pixie haircut', 'Explore a shorter shape'),
      frame(
        'new:layer-cut-detail',
        'Indian woman with a softly layered haircut',
        'Layers with movement',
      ),
    ],
  },
  'hair-colouring': {
    heading: 'Explore your next colour direction.',
    introduction:
      'Share your inspiration, previous colour and preferred upkeep so the team can discuss a realistic plan.',
    leadDetail: frame(
      'colour-process',
      'Colourist applying hair colour with a brush',
      'Colour planned around your hair',
    ),
    frames: [
      frame('colour-detail', 'Hair colour application with foils', 'Highlights and placement'),
      frame(
        'new:colour-swatches-detail',
        'Hair colour swatches on a salon worktop',
        'Find your colour direction',
      ),
      frame(
        'new:colour-consultation',
        'Indian woman discussing colour swatches with her stylist',
        'Agree on tone and upkeep',
      ),
    ],
  },
  'hair-treatments': {
    heading: 'Care for the hair you have.',
    introduction:
      'Talk through frizz, dryness, damage or scalp concerns before agreeing on a suitable cosmetic service.',
    leadDetail: frame(
      'head-massage',
      'Indian man receiving a salon head massage',
      'A moment of scalp care',
    ),
    frames: [
      frame(
        'new:conditioning-mask-detail',
        'Conditioning mask prepared beside a salon wash basin',
        'Conditioning for dry lengths',
      ),
      frame(
        'new:smoothing-process-detail',
        'Stylist smoothing sectioned hair with a professional iron',
        'Discuss smoothing options',
      ),
      frame(
        'new:scalp-consultation-detail',
        'Stylist examining a neat parting during a scalp consultation',
        'Start with a scalp conversation',
      ),
    ],
  },
  'mens-grooming': {
    heading: 'Grooming that fits your everyday life.',
    introduction:
      'From a beard tidy-up to a complete grooming appointment, agree on the details before you begin.',
    leadDetail: frame(
      'styling-process',
      'Barber cutting a man’s hair',
      'A haircut shaped around you',
    ),
    frames: [
      frame(
        'styling-detail',
        'Close view of a short men’s haircut',
        'Detail in the cut and finish',
      ),
      frame('beard-trim', 'Barber tidying a man’s beard', 'Shape and definition'),
      frame('clean-shave', 'Man receiving a professional shave', 'A clean, considered finish'),
    ],
  },
  'womens-beauty': {
    heading: 'A little time for personal care.',
    introduction:
      'Explore your beauty routine with attention to skin comfort, preparation and the occasion ahead.',
    leadDetail: frame(
      'beauty-detail',
      'Woman receiving a facial massage',
      'Time for personal care',
    ),
    frames: [
      frame('beauty-process', 'Clean skincare preparation bowls and towels', 'Careful preparation'),
      frame('threading', 'Beauty professional threading an eyebrow', 'Brow shaping and definition'),
      frame(
        'waxing',
        'Beauty professional applying wax to a forearm',
        'Discuss your beauty routine',
      ),
    ],
  },
  'bridal-special-occasion': {
    heading: 'Your occasion, planned in the details.',
    introduction:
      'Coordinate hair, makeup, draping and styling with your outfit, preferences and event schedule.',
    leadDetail: frame(
      'bridal-process',
      'Makeup artist preparing an Indian bride',
      'Makeup around your preferences',
    ),
    frames: [
      frame('bridal-detail', 'Jasmine-adorned bridal hairstyle', 'Hair and accessories together'),
      frame(
        'airbrush-makeup',
        'Makeup artist using an airbrush tool',
        'Discuss your preferred finish',
      ),
      frame('saree-draping', 'Stylist arranging silk saree pleats', 'Draping for your occasion'),
    ],
  },
  'nail-beauty': {
    heading: 'A polished finish, down to the details.',
    introduction:
      'Choose a shape, colour and care routine for your hands and feet, with suitability discussed first.',
    leadDetail: frame('pedicure', 'Professional pedicure in a salon', 'Care for your feet'),
    frames: [
      frame('nail-art', 'Champagne and gold floral nail art', 'Colour and individual details'),
      frame('nail-extensions', 'Nail technician shaping extensions', 'Choose shape and length'),
      frame(
        'new:nail-tools-detail',
        'Manicure tools and polish prepared on a clean towel',
        'Preparation and finishing',
      ),
    ],
  },
};
/** Intended editorial client focus for the current service lead images. */
export const serviceImageAudience = (service: Service): 'women' | 'men' =>
  service.slug === 'mens-grooming' ? 'men' : 'women';
