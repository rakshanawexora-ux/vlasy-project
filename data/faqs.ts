import { services } from './services';
export const faqs = [
  ...services.flatMap((service) => [
    {
      category: service.shortName,
      q: `What should I discuss before choosing ${service.shortName.toLowerCase()}?`,
      a: service.consultation,
    },
    {
      category: service.shortName,
      q: 'How should I prepare for my appointment?',
      a: service.preparation,
    },
  ]),
  {
    category: 'Appointments',
    q: 'Where is VLASY located?',
    a: 'VLASY is in Kolathur, Chennai. Ask the team to confirm directions, opening hours and specialist availability before your visit.',
  },
  {
    category: 'Appointments',
    q: 'Is my appointment confirmed when I submit the form?',
    a: 'No. Your submission is an enquiry. The team confirms the service, date, time, pricing and appointment details with you.',
  },
  {
    category: 'Academy',
    q: 'Can beginners enquire about training?',
    a: 'Yes. Ask about programs suited to your experience and confirm the current syllabus, eligibility, duration, fees and certification details before enrolling.',
  },
  {
    category: 'Academy',
    q: 'What should I ask about practical learning?',
    a: 'Request the current course guide, supervised practice arrangements, assessment details and any materials or tools included in your chosen program.',
  },
];
