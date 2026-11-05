export type Service = {
  slug: string;
  name: string;
  shortName: string;
  category: string;
  faqCategory: string;
  tagline: string;
  description: string;
  image: string;
  offerings: string[];
  care: string;
  audience: string;
  introHeading: string;
  consultation: string;
  preparation: string;
};

export const services: Service[] = [
  {
    slug: 'hair-wig-hair-replacement',
    name: 'Hair Wig & Hair Replacement Services',
    shortName: 'Hair Wigs & Replacement',
    category: 'Hair Systems',
    faqCategory: 'Hair Wigs & Replacement',
    tagline: 'Hair Wigs & Replacement in Kolathur, Chennai',
    description:
      'Hair wigs and non-surgical systems for women and men. Explore fitting, customisation and ongoing maintenance at VLASY in Kolathur, Chennai.',
    image: '/images/studio-v2/women-wig-fitting.webp',
    offerings: [
      "Men's Hair Wigs",
      "Women's Hair Wigs",
      'Non-Surgical Hair Replacement',
      'Hair Patch Fixing',
      'Hair System Installation',
      'Hair Bonding & Hair Weaving',
      'Custom Hair Wigs',
      'Natural Human Hair Wigs',
      'Hair Wig Maintenance & Servicing',
      'Hair Patch Removal & Refitting',
      'Hairline Restoration & Styling',
    ],
    care: 'Regular cleaning, servicing and professional refitting are part of caring for wigs and hair systems. Follow the guidance for your chosen base, hair and attachment method.',
    audience: 'For women and men exploring hair wigs & replacement.',
    introHeading: 'A fit that suits your hair and your routine.',
    consultation:
      'Tell us about your hair loss, scalp comfort and the style you want. We will discuss wig and hair-system options, fitting, maintenance and the costs to consider. Non-surgical systems provide coverage; they do not regrow hair or treat a medical cause of hair loss.',
    preparation:
      'Mention scalp sensitivities, previous attachment methods and the time you can set aside for cleaning and refits. Ask for the full maintenance plan before choosing a system.',
  },
  {
    slug: 'hair-extensions',
    name: 'Hair Extensions Services',
    shortName: 'Hair Extensions',
    category: 'Hair',
    faqCategory: 'Hair Extensions',
    tagline: 'Hair Extensions in Kolathur, Chennai',
    description:
      'Explore hair extensions for length and volume in Chennai, including clip-in, tape-in, keratin bond and micro ring options at VLASY.',
    image: '/images/studio-v2/extensions-portrait.webp',
    offerings: [
      'Permanent Hair Extensions',
      'Temporary Hair Extensions',
      'Clip-In Hair Extensions',
      'Tape-In Hair Extensions',
      'Keratin Bond Hair Extensions',
      'Micro Ring Hair Extensions',
      'Hair Volume Extensions',
      'Hair Length Extensions',
      'Hair Extension Maintenance & Removal',
    ],
    care: 'Use the brushing, washing and product routine recommended for your method. Arrange maintenance and professional removal as advised.',
    audience: 'Explore hair extensions with a personal consultation before you book.',
    introHeading: 'Choose length and volume with a clear plan.',
    consultation:
      'Share your preferred length, volume and styling routine. Your hair condition and scalp comfort help guide which method, if any, is suitable. Ask about application, blending, maintenance and removal before deciding.',
    preparation:
      'Bring a reference and mention recent colour or chemical treatments, scalp sensitivity and any extensions you have worn before.',
  },
  {
    slug: 'haircut-styling',
    name: 'Haircut & Hair Styling',
    shortName: 'Haircuts & Styling',
    category: 'Hair',
    faqCategory: 'Haircuts & Styling',
    tagline: 'Haircuts & Styling in Kolathur, Chennai',
    description:
      'Haircuts and styling for women, men and children in Kolathur, Chennai. Explore cuts, blow-dries and occasion hairstyles at VLASY.',
    image: '/images/studio-v2/women-bob-cut.webp',
    offerings: [
      "Men's Haircut & Styling",
      "Women's Haircut & Styling",
      "Kids' Haircuts",
      'Layer Cut',
      'Step Cut',
      'Feather Cut',
      'Bob Cut',
      'Pixie Cut',
      'Trending & Creative Haircuts',
      'Blow Dry & Hair Setting',
      'Party & Occasion Hairstyles',
    ],
    care: 'Ask how to recreate your finish at home, which heat protection to use and when to plan your next trim.',
    audience: 'For women and men exploring haircuts & styling.',
    introHeading: 'A haircut that works beyond the salon.',
    consultation:
      'Tell us what you like about your current haircut and what you would change. We consider texture, growth, length and the time you want to spend styling at home.',
    preparation:
      'Bring hairstyle references and tell us about recent treatments. For an occasion, share your outfit, accessories and event timing.',
  },
  {
    slug: 'hair-colouring',
    name: 'Hair Colouring Services',
    shortName: 'Hair Colouring',
    category: 'Hair',
    faqCategory: 'Hair Colouring',
    tagline: 'Hair Colouring in Kolathur, Chennai',
    description:
      'From root touch-ups and grey coverage to balayage and fashion shades, explore hair colouring at VLASY in Kolathur, Chennai.',
    image: '/images/studio-v2/colour-portrait.webp',
    offerings: [
      'Global Hair Colouring',
      'Root Touch-Up',
      'Hair Highlights',
      'Balayage',
      'Ombre Hair Colour',
      'Fashion Hair Colouring',
      'Grey Hair Coverage',
      'Beard Colouring',
      'Hair Colour Correction',
    ],
    care: 'Follow your stylist’s advice on washing, conditioning and heat protection. Confirm a refresh schedule that suits your chosen colour.',
    audience: 'For women and men exploring hair colouring.',
    introHeading: 'Find a colour direction you can maintain.',
    consultation:
      'Your colour history matters. We will discuss your starting shade, hair condition and the upkeep you prefer before agreeing on a direction. Colour correction or a major change may require more than one appointment.',
    preparation:
      'Mention previous colour, lightening or chemical treatments. Ask whether a patch or strand test is needed before your service.',
  },
  {
    slug: 'hair-treatments',
    name: 'Hair Treatments',
    shortName: 'Hair Treatments',
    category: 'Hair Care',
    faqCategory: 'Hair Treatments',
    tagline: 'Hair Treatments in Kolathur, Chennai',
    description:
      'Explore hair spa, conditioning, keratin, smoothening and scalp-care services at VLASY in Chennai. Discuss suitability and aftercare before treatment.',
    image: '/images/studio-v2/hair-spa.webp',
    offerings: [
      'Hair Spa',
      'Keratin Treatment',
      'Hair Smoothening',
      'Hair Straightening',
      'Hair Rebonding',
      'Hair Botox Treatment',
      'Scalp Care Treatment',
      'Dandruff Care Treatment',
      'Deep Conditioning Treatment',
      'Damaged Hair Repair Treatment',
    ],
    care: 'Aftercare varies by treatment. Follow the agreed washing, styling and product guidance. Hair Botox is a cosmetic salon treatment name, not an injectable medical procedure.',
    audience: 'For women and men exploring hair treatments.',
    introHeading: 'Make time for your hair and scalp.',
    consultation:
      'Talk us through dryness, frizz, scalp discomfort or damage and the treatments already in your hair. We will explain suitable cosmetic options and what the proposed service involves. Salon scalp care does not replace medical assessment or guarantee a cure for dandruff or hair loss.',
    preparation:
      'Share allergies, recent chemical services and any scalp irritation. Ask about the products, suitability checks and home-care commitment before starting.',
  },
  {
    slug: 'mens-grooming',
    name: "Men's Grooming Services",
    shortName: "Men's Grooming",
    category: 'Grooming',
    faqCategory: "Men's Grooming",
    tagline: "Men's Grooming in Kolathur, Chennai",
    description:
      'Haircuts, beard care, shaves and grooming services for men at VLASY in Kolathur, Chennai. Ask about individual services and grooming packages.',
    image: '/images/studio-v2/styling-portrait.webp',
    offerings: [
      'Beard Trimming',
      'Beard Styling',
      'Clean Shave',
      'Premium Haircut',
      'Head Massage',
      "Men's Facial",
      "Men's Hair Spa",
      'Beard Colouring',
      'Grooming Packages',
    ],
    care: 'Follow the aftercare suggested for shaving, skin treatments and colouring. Confirm package inclusions and pricing with the team before booking.',
    audience: "Explore men's grooming with a personal consultation before you book.",
    introHeading: 'Grooming planned around your everyday routine.',
    consultation:
      'Bring your preferred haircut or beard reference and tell us about your usual routine. We will discuss shape, maintenance and the services you would like to combine.',
    preparation:
      'Mention sensitive skin, shaving irritation, scalp concerns or products that have caused a reaction. Ask about patch testing before beard colouring.',
  },
  {
    slug: 'womens-beauty',
    name: "Women's Beauty Services",
    shortName: "Women's Beauty",
    category: 'Beauty',
    faqCategory: "Women's Beauty",
    tagline: "Women's Beauty in Kolathur, Chennai",
    description:
      'Facials, threading, waxing, cleanup and beauty care for women at VLASY in Chennai. Discuss your skin, preparation and aftercare with the team.',
    image: '/images/studio-v2/beauty-portrait.webp',
    offerings: [
      'Facial & Skin Care',
      'Cleanup',
      'Detan Treatment',
      'Threading',
      'Eyebrow Shaping',
      'Upper Lip Threading',
      'Waxing',
      'Bleaching',
      'Face Massage',
      'Skin Hydration Treatment',
    ],
    care: 'Follow treatment-specific aftercare and avoid introducing unfamiliar products immediately after your visit without guidance. Medical skin concerns belong with a qualified clinician.',
    audience: "Explore women's beauty with a personal consultation before you book.",
    introHeading: 'Personal beauty care, at your pace.',
    consultation:
      'Tell us what your skin needs, which products you use and any known sensitivities. We will explain the proposed treatment and help you plan beauty care around your routine or occasion.',
    preparation:
      'Mention allergies, recent procedures and products that have irritated your skin. Ask about suitability checks or patch testing for new products.',
  },
  {
    slug: 'bridal-special-occasion',
    name: 'Bridal & Special Occasion Services',
    shortName: 'Bridal & Occasions',
    category: 'Occasion',
    faqCategory: 'Bridal & Occasions',
    tagline: 'Bridal & Occasions in Kolathur, Chennai',
    description:
      'Plan bridal, engagement, reception and party looks with VLASY in Chennai. Explore hair, makeup, saree draping and grooming for your occasion.',
    image: '/images/studio-v2/bridal-portrait.webp',
    offerings: [
      'Bridal Makeup',
      'Engagement Makeup',
      'Reception Makeup',
      'Party Makeup',
      'HD Makeup',
      'Airbrush Makeup',
      'Bridal Hairstyling',
      'Saree Draping',
      'Groom Makeup & Styling',
    ],
    care: 'Follow your artist’s preparation advice and confirm touch-up needs, accessories and the agreed schedule. Trials, travel, additional looks and other inclusions should be confirmed separately.',
    audience: 'Explore bridal & occasions with a personal consultation before you book.',
    introHeading: 'Your occasion, with every detail considered.',
    consultation:
      'Share your outfit, jewellery, venue and event schedule. We will discuss your preferred finish, hairstyle, preparation and any trial you would like to enquire about. Confirm the makeup method and availability with the team.',
    preparation:
      'Enquire once your date is known. Mention skin sensitivities, product preferences and any changes of outfit or look, and agree on timings and inclusions before booking.',
  },
  {
    slug: 'nail-beauty',
    name: 'Nail & Additional Beauty Services',
    shortName: 'Nails & Additional Beauty',
    category: 'Nails',
    faqCategory: 'Nails & Additional Beauty',
    tagline: 'Nails & Additional Beauty in Kolathur, Chennai',
    description:
      'Explore manicures, pedicures, gel polish, nail art, extensions and hand or foot spa care at VLASY in Kolathur, Chennai.',
    image: '/images/studio-v2/manicure.webp',
    offerings: [
      'Manicure',
      'Pedicure',
      'Nail Polish Application',
      'Gel Nail Polish',
      'Nail Art',
      'Nail Extensions',
      'Hand & Foot Spa',
    ],
    care: 'Follow the recommended care for your polish or extensions. Arrange appropriate removal rather than peeling products off, and seek medical advice for painful or infected nails.',
    audience: 'For women and men exploring nails & additional beauty.',
    introHeading: 'Your shape, colour and finishing details.',
    consultation:
      'Bring a nail reference and tell us your preferred length, shape and finish. We will discuss the condition of your natural nails, the appointment involved and the upkeep required.',
    preparation:
      'Mention allergies, skin irritation, nail damage or existing product on your nails. Ask about preparation and removal before your appointment.',
  },
];
export const getService = (slug: string) => services.find((service) => service.slug === slug);
