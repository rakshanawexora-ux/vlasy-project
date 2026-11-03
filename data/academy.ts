export const programs = [
  {
    slug: 'professional-hairdressing',
    name: 'Professional Hairdressing',
    number: '01',
    description:
      'Build a foundation in consultation, sectioning, cutting, finishing and everyday salon practice.',
    topics: 'Cutting · Styling · Consultation',
    image: '/images/editorial/styling-process.webp',
    focus: [
      {
        title: 'Consultation & preparation',
        copy: 'Explore how a stylist listens to preferences, considers texture and prepares for a service.',
      },
      {
        title: 'Shape & technique',
        copy: 'Discuss the cutting, sectioning and styling techniques included in the current program.',
      },
      {
        title: 'Everyday salon practice',
        copy: 'Ask about tool handling, hygiene, supervised practice and how feedback is given.',
      },
    ],
  },
  {
    slug: 'hair-colour-artistry',
    name: 'Hair Colour Artistry',
    number: '02',
    description:
      'Explore colour theory, thoughtful placement and the technical decisions behind a considered result.',
    topics: 'Colour theory · Application · Aftercare',
    image: '/images/editorial/colour-process.webp',
    focus: [
      {
        title: 'Understanding colour',
        copy: 'Explore colour theory and how starting shade, history and hair condition inform a consultation.',
      },
      {
        title: 'Placement & application',
        copy: 'Ask which colour techniques, demonstrations and supervised exercises are included.',
      },
      {
        title: 'Care & consultation',
        copy: 'Discuss suitability, product guidance, preparation and the aftercare conversation.',
      },
    ],
  },
  {
    slug: 'beauty-makeup',
    name: 'Beauty & Makeup',
    number: '03',
    description:
      'Explore skin preparation, makeup application and personalised looks for different occasions.',
    topics: 'Skin preparation · Makeup · Hygiene',
    image: '/images/editorial/beauty-portrait.webp',
    focus: [
      {
        title: 'Preparation & hygiene',
        copy: 'Explore consultation, sensitivities, workstation preparation and appropriate hygiene.',
      },
      {
        title: 'Application & finish',
        copy: 'Ask about the makeup skills, tools and practice formats in the current syllabus.',
      },
      {
        title: 'Personalising a look',
        copy: 'Consider preferences, occasion, lighting and the balance of a complete look.',
      },
    ],
  },
  {
    slug: 'bridal-artistry',
    name: 'Bridal Artistry',
    number: '04',
    description:
      'Develop an approach to bridal hair and makeup, from inspiration to a coordinated final look.',
    topics: 'Bridal hair · Makeup · Client experience',
    image: '/images/editorial/bridal-process.webp',
    focus: [
      {
        title: 'Planning the occasion',
        copy: 'Explore consultation, references, outfit details and the timing of preparation.',
      },
      {
        title: 'Hair & makeup together',
        copy: 'Ask which bridal styling and makeup techniques are demonstrated and practised.',
      },
      {
        title: 'The client experience',
        copy: 'Discuss trials, communication, preparation and the finishing details of an occasion look.',
      },
    ],
  },
];
export const getProgram = (slug: string) => programs.find((program) => program.slug === slug);
