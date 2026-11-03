export type Service = {
  faqCategory: string;
  slug: string;
  name: string;
  category: string;
  tagline: string;
  description: string;
  image: string;
  offerings: string[];
  offeringDetails: string[];
  care: string;
  audience: string;
  introHeading: string;
  consultation: string;
  preparation: string;
};

export const services: Service[] = [
  {
    slug: 'hair-replacement',
    faqCategory: 'Hair Replacement',
    name: 'Hair Replacement',
    category: 'Hair transformation',
    tagline: 'A little more hair. A lot more you.',
    description:
      'Explore non-surgical hair replacement in Chennai. Talk through hair systems, fitting, blending and ongoing maintenance with the VLASY team before you decide.',
    image: '/images/editorial/replacement-detail.webp',
    offerings: [
      'Personalised hair systems',
      'Hairline & density design',
      'Custom fitting & blending',
      'Maintenance & refitting',
    ],
    care: 'A hair system needs regular professional maintenance. We will explain cleaning, refitting and home care before you decide.',
    audience:
      'For people exploring non-surgical options for thinning hair or hair loss. Suitability depends on your scalp, lifestyle and expectations; a consultation comes first.',
    introHeading: 'A hair system that fits your routine.',
    consultation:
      'We start with your hair-loss pattern, scalp comfort and the look you have in mind. Your routine matters too: tell us about exercise, swimming and the time you can set aside for care. A system adds coverage; it does not regrow hair or treat the cause of hair loss.',
    preparation:
      'Bring a hairstyle reference and mention scalp irritation, sensitivities or previous attachment methods. Ask for a clear breakdown of the system, fitting, refits and replacement costs. Seek medical advice for sudden or unexplained hair loss.',
    offeringDetails: [
      'Discuss the base, hair type and attachment options that may suit your scalp and lifestyle.',
      'Explore an age-appropriate hairline, colour and density rather than assuming more hair is always better.',
      'Ask how the system is fitted, cut and blended with your existing hair, and how it is removed.',
      'Understand cleaning, refitting appointments, home care and the cost of eventual replacement.',
    ],
  },
  {
    slug: 'hair-extensions',
    faqCategory: 'Hair Extensions',
    name: 'Hair Extensions',
    category: 'Hair transformation',
    tagline: 'Length. Volume. Confidence.',
    description:
      'Looking for more length or volume? Explore hair extensions in Chennai with guidance on colour matching, suitable methods, blending and the care involved.',
    image: '/images/editorial/extensions-detail.webp',
    offerings: [
      'Length & volume consultation',
      'Tape-in options',
      'Bonded extension options',
      'Colour matching & blending',
    ],
    care: 'Gentle brushing, suitable products and scheduled maintenance help protect your natural hair. Your stylist will discuss method-specific care.',
    audience:
      'For added length, fullness or a new silhouette. Hair condition and scalp health guide which method, if any, is suitable.',
    introHeading: 'More length or volume, with a clear plan.',
    consultation:
      'Bring a reference and tell us how you wear your hair day to day. We will discuss your hair condition, the volume you want and how much maintenance feels practical. The best starting point is a method that suits your natural hair.',
    preparation:
      'Share any scalp sensitivities, previous extensions and recent colour or chemical treatments. Ask about installation, removal, products and maintenance appointments before choosing a method.',
    offeringDetails: [
      'Talk through your preferred length and fullness, along with what your existing hair can comfortably support.',
      'Ask whether tape-in extensions are suitable and how installation, washing and refitting work.',
      'Discuss bonded methods, suitability, removal and the care needed to protect your natural hair.',
      'Consider shade, texture and the finishing cut together so the overall shape feels balanced.',
    ],
  },
  {
    slug: 'hair-colour',
    faqCategory: 'Hair Colour',
    name: 'Hair Colour',
    category: 'Hair services',
    tagline: 'Colour with a point of view.',
    description:
      'Explore hair colour in Chennai, from subtle highlights and balayage to grey coverage. Discuss your colour history, hair condition and maintenance with VLASY.',
    image: '/images/editorial/colour-detail.webp',
    offerings: [
      'Balayage & dimension',
      'Global colour',
      'Highlights & face framing',
      'Grey coverage & gloss',
    ],
    care: 'Colour-safe washing, heat protection and a tailored refresh schedule keep your finish looking considered. A patch test may be required.',
    audience:
      'Whether you want a subtle refresh or a bigger change, we begin with your colour history, hair condition and desired maintenance.',
    introHeading: 'A colour direction you can live with.',
    consultation:
      'A good colour conversation starts with what is already in your hair. Tell us about previous colour, chemical treatments and the finish you want. We will talk through realistic options, the appointments involved and how often you want to return.',
    preparation:
      'Bring colour references and a clear account of recent treatments. Ask whether patch or strand testing is needed. Some changes need more than one appointment; agree on the plan and costs before starting.',
    offeringDetails: [
      'Explore softer placement and dimension, with your starting colour and hair condition in mind.',
      'Discuss an all-over colour direction, expected upkeep and the effect on previously coloured hair.',
      'Consider where brightness or contrast will sit around your face and through the hair.',
      'Ask about coverage, tonal refreshes and a maintenance schedule that suits your routine.',
    ],
  },
  {
    slug: 'hair-cut-styling',
    faqCategory: 'Haircuts & Styling',
    name: 'Haircuts & Styling',
    category: 'Hair services',
    tagline: 'A cut that feels like you.',
    description:
      'Find your next haircut in Chennai. Explore personalised cuts, shaping, blow-dries and occasion styling at VLASY, with advice for caring for your hair at home.',
    image: '/images/editorial/styling-detail.webp',
    offerings: [
      'Women’s cuts & shaping',
      'Men’s cuts & grooming',
      'Blow-dries & finishing',
      'Occasion styling',
    ],
    care: 'Leave with practical styling guidance and a trim plan that suits your cut. Good hair should fit into your everyday life.',
    audience:
      'For every texture and expression. We talk about your natural movement, styling time and what makes you feel most comfortable.',
    introHeading: 'A haircut that works after wash day, too.',
    consultation:
      'Tell us what you like about your current cut and what is not working. Your natural texture, styling time and preferred length help shape the recommendation. Bring a reference, but leave room for a cut that suits your own hair.',
    preparation:
      'Mention recent treatments, scalp sensitivities and how you usually dry or style your hair. Ask what you will need to recreate the finish at home and when to plan your next trim.',
    offeringDetails: [
      'Discuss length, shape and how your natural texture can work with your preferred style.',
      'Explore a cut and grooming direction that suits your hairline, growth and everyday routine.',
      'Choose a finish for an appointment or occasion, with guidance on heat protection and styling.',
      'Bring your outfit and event references so the hairstyle can be planned as part of the complete look.',
    ],
  },
  {
    slug: 'bridal',
    faqCategory: 'Bridal',
    name: 'Bridal Services',
    category: 'Beauty & occasion',
    tagline: 'Your day. Your kind of beautiful.',
    description:
      'Plan bridal hair and makeup in Chennai with VLASY. Discuss your outfit, preferred look, preparation, trial availability and event timings before booking.',
    image: '/images/editorial/bridal-detail.webp',
    offerings: [
      'Bridal makeup',
      'Bridal hair',
      'Pre-bridal beauty consultation',
      'Trial & occasion looks',
    ],
    care: 'Share your event timings and preferences early. Trial availability, products, preparation and the final schedule are discussed during consultation.',
    audience:
      'For brides and their loved ones seeking a cohesive, personalised look. Bring your outfit, inspiration and the details that matter to you.',
    introHeading: 'A bridal look that still feels like you.',
    consultation:
      'Share your outfit, jewellery and the details of your day. We will talk about the hair and makeup you feel comfortable in, the timing of preparation and any trial you would like to discuss. Your preferences should lead the conversation.',
    preparation:
      'Enquire once your date and venue are known. Mention skin sensitivities, products you avoid and any changes of outfit or look. Confirm availability, location, timings, inclusions and pricing with the team.',
    offeringDetails: [
      'Explore your preferred makeup finish, colour direction and the balance between photographs and how you want to feel in person.',
      'Discuss your outfit, jewellery, hair texture and any accessories before choosing a bridal hairstyle.',
      'Ask what preparation is appropriate for you and allow time to discuss sensitivities or new treatments.',
      'Confirm whether a trial is available, what it includes and how any additional occasion looks are planned.',
    ],
  },
  {
    slug: 'beauty-treatments',
    faqCategory: 'Beauty Treatments',
    name: 'Beauty Treatments',
    category: 'Beauty & occasion',
    tagline: 'A moment, just for you.',
    description:
      'Make time for beauty care in Chennai. Explore facial and beauty consultations at VLASY, with attention to skin sensitivities, preparation and aftercare.',
    image: '/images/editorial/beauty-detail.webp',
    offerings: [
      'Skin & facial consultation',
      'Personalised facial rituals',
      'Everyday beauty care',
      'Occasion preparation',
    ],
    care: 'Tell us about allergies, sensitivities and current products. We will explain preparation and aftercare specific to your chosen treatment.',
    audience:
      'For everyday maintenance or a little time for yourself. Treatment suitability is discussed individually; medical concerns belong with a qualified clinician.',
    introHeading: 'Care that starts with listening to your skin.',
    consultation:
      'Tell us how your skin feels, which products you use and what you want from the appointment. We will discuss suitable beauty options and explain preparation and aftercare. Medical skin concerns should be assessed by a qualified clinician.',
    preparation:
      'Mention allergies, sensitivities, recent procedures and any products that have caused irritation. Avoid trying a new treatment immediately before an important occasion without first discussing suitability.',
    offeringDetails: [
      'Start with your concerns, current routine and sensitivities before considering a treatment.',
      'Discuss the products and steps involved and whether the proposed facial is suitable for your skin.',
      'Explore practical beauty care that makes sense alongside your existing routine.',
      'Plan preparation around the date of your event, allowing time to discuss any new products or treatments.',
    ],
  },
  {
    slug: 'mehndi',
    faqCategory: 'Mehndi',
    name: 'Mehndi',
    category: 'Beauty & occasion',
    tagline: 'Tradition, in every detail.',
    description:
      'Explore bridal and occasion mehndi in Chennai. Discuss design, coverage, timing and aftercare with VLASY before choosing a look for your celebration.',
    image: '/images/editorial/mehndi-detail.webp',
    offerings: [
      'Bridal mehndi',
      'Occasion mehndi',
      'Minimal contemporary designs',
      'Design & timing consultation',
    ],
    care: 'Your artist will explain drying time and aftercare. Tell us about sensitivities and allow enough time before your occasion.',
    audience:
      'For weddings, celebrations and smaller moments. We discuss design coverage, timing and your preferred aesthetic before booking.',
    introHeading: 'A mehndi design with room for your preferences.',
    consultation:
      'Bring patterns you love and tell us how much coverage you have in mind. We will discuss the balance of detail, the time needed and how the design fits your occasion. A reference helps the conversation, even if you are still deciding.',
    preparation:
      'Share your event date, preferred coverage and any known sensitivities. Ask about the products used, application time, drying and aftercare. Colour development varies; an exact stain or finish cannot be guaranteed.',
    offeringDetails: [
      'Discuss coverage and the level of detail you would like for your wedding celebrations.',
      'Explore designs for family events, festivals and smaller celebrations.',
      'Consider lighter coverage and simpler patterns if you prefer a more understated look.',
      'Agree on the design direction, appointment timing, drying period and aftercare before your visit.',
    ],
  },
];

export const getService = (slug: string) => services.find((service) => service.slug === slug);
