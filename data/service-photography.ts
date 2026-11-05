import type { Service } from './services';
export type ServiceFrame = { src: string; alt: string; caption: string };
export type ServicePhotography = { heading: string; introduction: string; frames: ServiceFrame[] };
const frame = (file: string, alt: string, caption: string): ServiceFrame => ({
  src: `/images/studio-v2/${file}.webp`,
  alt: `AI editorial illustration: ${alt}`,
  caption,
});
export const servicePhotography: Record<string, ServicePhotography> = {
  'hair-wig-hair-replacement': {
    heading: 'A fit, finish and care plan for you.',
    introduction:
      'Explore wig options for women and men, with a clear discussion of comfort, styling and servicing.',
    frames: [
      frame(
        'women-wig-fitting',
        'stylist fitting a wig for an Indian woman',
        'A personal fitting consultation',
      ),
      frame(
        'replacement-portrait',
        'man with a short natural hairstyle; not a treatment result',
        'Style options for men',
      ),
      frame(
        'replacement-detail',
        'lace-base hair system on a mannequin head',
        'Understand the base and maintenance',
      ),
    ],
  },
  'hair-extensions': {
    heading: 'Length and volume, thoughtfully blended.',
    introduction:
      'Compare the method, colour match and care requirements before choosing your extensions.',
    frames: [
      frame(
        'extensions-process',
        'stylist sectioning long hair',
        'Careful sectioning and blending',
      ),
      frame(
        'extensions-detail',
        'stylist matching an extension weft',
        'Explore the right extension method',
      ),
      frame(
        'extensions-portrait',
        'woman with long straight dark hair',
        'Your preferred length and movement',
      ),
    ],
  },
  'haircut-styling': {
    heading: 'The shape you want. A routine that works.',
    introduction:
      'Haircuts for women, men and children, with styling for everyday wear or a special occasion.',
    frames: [
      frame('women-blow-dry', 'woman receiving a blow-dry', 'A finish for your occasion'),
      frame('women-bob-cut', 'woman with a precision bob haircut', 'Explore shape and length'),
      frame('styling-process', 'stylist cutting a man’s hair', 'Haircuts and styling for men'),
    ],
  },
  'hair-colouring': {
    heading: 'Explore your next colour direction.',
    introduction:
      'Share your inspiration, previous colour and preferred upkeep so the team can discuss a realistic plan.',
    frames: [
      frame(
        'colour-process',
        'colourist applying colour with a brush',
        'Colour planned around your hair',
      ),
      frame(
        'colour-detail',
        'hair colour application with foils',
        'Highlights, placement and technique',
      ),
      frame(
        'colour-portrait',
        'hair with subtle warm colour',
        'A finish to discuss with your stylist',
      ),
    ],
  },
  'hair-treatments': {
    heading: 'Care for the hair you have.',
    introduction:
      'Talk through frizz, dryness, damage or scalp concerns before agreeing on a suitable cosmetic service.',
    frames: [
      frame(
        'hair-spa',
        'woman receiving a conditioning hair treatment',
        'Hair spa and conditioning care',
      ),
      frame(
        'women-blow-dry',
        'stylist drying and smoothing a woman’s hair',
        'Discuss treatment and finishing options',
      ),
      frame(
        'beauty-process',
        'clean towels and preparation bowls',
        'Preparation and personalised aftercare',
      ),
    ],
  },
  'mens-grooming': {
    heading: 'Grooming that fits your everyday life.',
    introduction:
      'From a beard tidy-up to a complete grooming appointment, agree on the details before you begin.',
    frames: [
      frame('styling-process', 'stylist cutting a man’s hair', 'A haircut shaped around you'),
      frame('styling-detail', 'close-up of a short men’s haircut', 'Detail in the cut and finish'),
      frame('styling-portrait', 'man with a short textured hairstyle', 'A look you can maintain'),
    ],
  },
  'womens-beauty': {
    heading: 'A little time for personal care.',
    introduction:
      'Explore your beauty routine with attention to skin comfort, preparation and the occasion ahead.',
    frames: [
      frame(
        'beauty-portrait',
        'woman receiving a facial mask',
        'Facial and skin-care consultations',
      ),
      frame('beauty-detail', 'woman receiving a gentle facial massage', 'Time to pause and reset'),
      frame('beauty-process', 'towel and skincare preparation', 'Care in every step'),
    ],
  },
  'bridal-special-occasion': {
    heading: 'Your occasion, planned in the details.',
    introduction:
      'Coordinate hair, makeup, draping and styling with your outfit, preferences and event schedule.',
    frames: [
      frame(
        'bridal-process',
        'makeup artist preparing an Indian bride',
        'Makeup planned around your preferences',
      ),
      frame(
        'bridal-detail',
        'jasmine-adorned bridal hairstyle',
        'Hair and accessories, brought together',
      ),
      frame('bridal-portrait', 'bride in a maroon silk saree', 'A personal occasion look'),
    ],
  },
  'nail-beauty': {
    heading: 'A polished finish, down to the details.',
    introduction:
      'Choose a shape, colour and care routine for your hands and feet, with suitability discussed first.',
    frames: [
      frame(
        'manicure',
        'nail technician applying polish to a woman’s hands',
        'Manicure, polish and nail art',
      ),
      frame('pedicure', 'professional pedicure in a salon', 'Pedicure and foot-care options'),
      frame(
        'beauty-tools-detail',
        'clean beauty tools on a workstation',
        'Preparation and careful finishing',
      ),
    ],
  },
};
/** Intended editorial client focus for the current service lead images. */
export const serviceImageAudience = (service: Service): 'women' | 'men' =>
  service.slug === 'mens-grooming' ? 'men' : 'women';
