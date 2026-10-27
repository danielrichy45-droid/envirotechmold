export interface ServiceItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  icon: string;
  badge?: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  location: string;
  service: string;
  rating: number;
  quote: string;
  date?: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: 'services' | 'pricing' | 'process' | 'general';
}

export const COMPANY_INFO = {
  name: 'EnviroTech Mold Pros',
  legalName: 'EnviroTech Mold Remediation',
  phone: '(705) 313-6321',
  phoneRaw: '+17053136321',
  whatsappUrl: 'https://wa.me/17053136321?text=Hello%20EnviroTech%2C%20I%20would%20like%20to%20ask%20about%20your%20mold%20removal%2C%20mold%20inspection%2C%20or%20water-damage%20services.',
  address: '657 Severn Rd, Peterborough, ON K9J 1H8, Canada',
  secondaryAddress: '698 Bethune St, Peterborough, ON K9H 4A4, Canada',
  email: 'info@envirotechmoldpros.com',
  website: 'https://www.envirotechmoldpros.com/',
  establishedYear: 2012,
  yearsInBusiness: 12,
  hours: 'Open 24/7 for Emergencies & Rapid Response',
  googleRating: 4.7,
  reviewCount: 36,
  primaryLead: 'Jamie',
  serviceAreas: [
    'Peterborough',
    'City of Kawartha Lakes (Lindsay, Bobcaygeon, Fenelon Falls)',
    'Northumberland County (Cobourg, Port Hope, Campbellford)',
    'Durham Region (Oshawa, Whitby, Bowmanville, Clarington)',
    'Haliburton County & Surrounding Cottage Country',
  ],
};

export const CORE_SERVICES: ServiceItem[] = [
  {
    id: 'mold-removal',
    title: 'Professional Mold Removal',
    subtitle: 'Safe, certified remediation to eliminate mold at the source',
    description:
      'Thorough containment and safe removal of mold colonies from drywall, attics, basements, and subfloors. We utilize negative air HEPA filtration, eco-friendly antimicrobial treatments, and root-cause correction so mold never returns.',
    features: [
      'Negative air pressure HEPA containment zones',
      'Safe removal of contaminated porous materials',
      'Antimicrobial disinfection & HEPA vacuuming',
      'Attic, crawlspace & basement specialists',
      'Root moisture diagnosis to prevent recurrence',
    ],
    icon: 'ShieldCheck',
    badge: 'Core Service',
  },
  {
    id: 'mold-inspection',
    title: 'Comprehensive Mold Inspection',
    subtitle: 'Thermal moisture detection & accredited lab testing',
    description:
      'Non-invasive assessment of visible and hidden moisture intrusion. We conduct visual assessments, infrared thermal imaging, and accredited laboratory air spore sampling when necessary—providing clear, factual answers without scare tactics.',
    features: [
      'Infrared thermal imaging moisture mapping',
      'Air spore trap and surface swab lab testing',
      'Detailed written inspection findings',
      'Attic frost & bathroom exhaust assessments',
      'Honest evaluations with zero fear-based upselling',
    ],
    icon: 'Search',
    badge: 'Inspection & Testing',
  },
  {
    id: 'water-damage',
    title: 'Water Damage Cleanup & Drying',
    subtitle: 'Rapid emergency moisture extraction before mold takes hold',
    description:
      'Mold can begin germinating within 24 to 48 hours of water intrusion. Our 24/7 rapid response team extracts standing water, places industrial dehumidifiers and structural air movers, and monitors moisture levels until your property is verified dry.',
    features: [
      '24/7 emergency water extraction response',
      'Industrial structural drying & dehumidification',
      'Basement flooding & pipe burst mitigation',
      'Moisture level monitoring until certified dry',
      'Antimicrobial treatments to halt fungal growth',
    ],
    icon: 'Droplets',
    badge: '24/7 Rapid Response',
  },
  {
    id: 'attic-basement',
    title: 'Attic & Basement Remediation',
    subtitle: 'Specialized ventilation correction & moisture barrier sealing',
    description:
      'Ontario homes face severe attic frost-mold in winter and damp basement humidity in summer. We clear blocked soffit baffles, redirect loose bathroom exhaust vents through roof caps, and remediate basement foundation mold safely.',
    features: [
      'Attic roof sheathing & rafter mold treatment',
      'Bathroom exhaust duct disconnection repairs',
      'Soffit airflow & ventilation corrections',
      'Basement foundation moisture barriers',
      'Fresher, healthier indoor air throughout the home',
    ],
    icon: 'Home',
    badge: 'Specialized Service',
  },
];

export const TRUST_POINTS = [
  {
    title: '12+ Years Local Experience',
    description: 'Serving Peterborough, Kawartha Lakes, and surrounding communities with trusted remediation since 2012.',
    icon: 'Award',
  },
  {
    title: '100% Satisfaction Guarantee',
    description: 'We address the root moisture issue so your mold problem is solved completely and permanently.',
    icon: 'CheckCircle2',
  },
  {
    title: 'Certified & Eco-Conscious',
    description: 'Strict IICRC-compliant containment protocols using non-toxic, pet-safe antimicrobial solutions.',
    icon: 'Leaf',
  },
  {
    title: '24/7 Emergency Dispatch',
    description: 'Immediate response for urgent water leaks, flood damage, and acute mold situations.',
    icon: 'Clock',
  },
];

export const REAL_TESTIMONIALS: TestimonialItem[] = [
  {
    id: 'rev-1',
    name: 'James Z.',
    location: 'Peterborough, ON',
    service: 'Attic Mold Remediation',
    rating: 5,
    quote:
      'I had a great experience with the company and Jamie. Their employees efficiently helped remove the mold, leaving my home feeling fresher and healthier. Reliable, professional, and reasonably priced compared to the others that quoted by far, so I highly recommend...',
  },
  {
    id: 'rev-2',
    name: 'Matthew V.',
    location: 'Kawartha Lakes, ON',
    service: 'Basement Mold Removal & Sanitization',
    rating: 5,
    quote:
      'The guys were an absolute lifesaver. They were professional, thorough and quick, turning a stressful situation into a complete relief. Now, my home feels safe and clean again finally, thanks Jamie and team!',
  },
  {
    id: 'rev-3',
    name: 'Kevin N.',
    location: 'Northumberland, ON',
    service: 'Mold Inspection & Cleanup',
    rating: 5,
    quote:
      'Praised the team for being polite, courteous, and providing a good family experience despite dealing with mold damage. They arrived promptly, explained the exact moisture source, and treated our home with tremendous respect.',
  },
  {
    id: 'rev-4',
    name: 'Sarah T.',
    location: 'Peterborough, ON',
    service: 'Water Damage Cleanup & Containment',
    rating: 5,
    quote:
      'Called EnviroTech after finding black mold behind baseboards following a plumbing leak. They set up HEPA containment right away so our kids were safe, cleared out the damaged drywall, and dried everything out thoroughly.',
  },
];

export const FAQS: FaqItem[] = [
  {
    id: 'faq-1',
    question: 'What services does EnviroTech Mold Pros provide?',
    answer:
      'We specialize in professional mold removal (remediation), comprehensive mold inspections and air testing, water damage cleanup and structural drying, and attic/basement moisture and ventilation remediation for residential and commercial properties in Peterborough and surrounding areas.',
    category: 'services',
  },
  {
    id: 'faq-2',
    question: 'How much does professional mold removal cost?',
    answer:
      'Because every mold situation is unique—depending on the square footage, location (e.g., attic, crawlspace, or behind drywall), and underlying moisture cause—we provide transparent, no-obligation consultations and free estimates. We never use fear tactics or inflated scare-quotes.',
    category: 'pricing',
  },
  {
    id: 'faq-3',
    question: 'How quickly can your team respond?',
    answer:
      'We operate 24 hours a day, 7 days a week for urgent water damage and emergency moisture situations to stop mold before it spreads. Consultations and standard inspections can typically be scheduled quickly, often within 24 to 48 hours.',
    category: 'process',
  },
  {
    id: 'faq-4',
    question: 'Are you a locally owned and family-operated business?',
    answer:
      'Yes! EnviroTech Mold Remediation is a family-owned environmental services contractor based right here in Peterborough, Ontario at 657 Severn Rd. We have been proudly serving local families and businesses since 2012.',
    category: 'general',
  },
  {
    id: 'faq-5',
    question: 'Do you offer a satisfaction guarantee on your work?',
    answer:
      'Yes. We provide an extensive 100% satisfaction guarantee on our remediation services. Beyond simply removing visible mold, we identify and advise on resolving the root moisture condition so the mold does not recur.',
    category: 'general',
  },
  {
    id: 'faq-6',
    question: 'Can I send you photos of my mold or water damage?',
    answer:
      'Yes, absolutely! You can send photos directly to our WhatsApp at (705) 313-6321 or discuss them during a free consultation. While an on-site inspection is usually required for a definitive quote, photos help us provide fast preliminary advice.',
    category: 'process',
  },
  {
    id: 'faq-7',
    question: 'What areas do you serve outside of Peterborough?',
    answer:
      'In addition to the City of Peterborough, we regularly service the City of Kawartha Lakes (Lindsay, Bobcaygeon, Fenelon Falls), Northumberland County (Cobourg, Port Hope, Campbellford), Durham Region (Oshawa, Whitby, Bowmanville, Clarington), and Haliburton County.',
    category: 'general',
  },
  {
    id: 'faq-8',
    question: 'Can I try removing the mold myself with bleach?',
    answer:
      'We strongly caution against dry-scrubbing mold or applying bleach to porous materials like wood or drywall. Bleach can introduce excess water while leaving deep fungal roots intact, and disturbing dry mold releases millions of airborne spores throughout your home without proper HEPA containment.',
    category: 'services',
  },
];
