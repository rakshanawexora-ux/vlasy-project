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
];
