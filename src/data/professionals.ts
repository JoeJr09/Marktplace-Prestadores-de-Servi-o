import type { Professional } from '../types/professional'

export const professionals: Professional[] = [
  {
    id: 'marcus-sterling',
    name: 'Marcus Sterling',
    category: 'Electrical',
    location: 'Brooklyn, NY',
    rating: 4.9,
    reviewCount: 124,
    priceRange: 'From $180 / consultation',
    tags: ['Fast service', 'Clean work', 'Detail-oriented'],
    avatarColor: '#f1c27d',
    isTopRated: true,
    plan: 'gold',
    responseTime: '2 hours',
    specialties: ['Panel upgrades', 'Smart home wiring', 'Emergency repairs'],
    services: [
      { name: 'On-site diagnostic visit', price: '$180+', description: 'Full inspection and safety report.' },
      { name: 'Smart home consultation', price: '$260+', description: 'Design and planning for smart devices.' },
      { name: 'Ongoing maintenance', price: 'From $89 / month', description: 'Priority repair and inspections.' }
    ],
    bioShort:
      'Licensed master electrician specializing in residential and light commercial projects across Brooklyn.',
    bioLong:
      'Marcus has delivered more than 300 residential and commercial electrical projects in the greater NYC area. His work focuses on safety-first installations, discreet cable management, and smart home integrations that feel invisible but reliable. Clients appreciate his on-time arrivals, transparent pricing, and clear explanations of every step in the process.'
  },
  {
    id: 'elena-rodriguez',
    name: 'Elena Rodriguez',
    category: 'Plumbing',
    location: 'Manhattan, NY',
    rating: 4.7,
    reviewCount: 98,
    priceRange: 'From $220 / service',
    tags: ['Fair price', 'Expert advice', 'Respectful'],
    avatarColor: '#c68642',
    isTopRated: true,
    plan: 'silver',
    responseTime: '4 hours',
    specialties: ['High-rise plumbing', 'Bathroom remodels', 'Leak detection'],
    services: [
      { name: 'Emergency leak response', price: '$220+', description: 'Priority visits for urgent leaks and pipe bursts.' },
      { name: 'Fixture installs', price: '$260+', description: 'Faucets, toilets, showers and drains installed to spec.' }
    ],
    bioShort:
      'Plumbing specialist focused on high-rise and multi-unit buildings in Midtown and Downtown Manhattan.',
    bioLong:
      'Elena is known for her calm, methodical approach on complex plumbing projects. From full-stack riser replacements to premium residential bathroom upgrades, she coordinates seamlessly with building management and other trades to keep projects on schedule.'
  },
  {
    id: 'david-chen',
    name: 'David Chen',
    category: 'Cleaning',
    location: 'Queens, NY',
    rating: 4.8,
    reviewCount: 76,
    priceRange: 'From $140 / visit',
    tags: ['Trustworthy', 'Punctual', 'Detailed'],
    avatarColor: '#e0ac69',
    isTopRated: false,
    plan: 'bronze',
    responseTime: 'Same day',
    specialties: ['Post-renovation clean', 'Move-in / move-out', 'Recurring home service'],
    services: [
      { name: 'Deep clean - apartment', price: '$140+', description: 'Complete clean for apartments up to 2 bedrooms.' },
      { name: 'Post-renovation clean', price: '$260+', description: 'Dust removal and detailing after construction.' }
    ],
    bioShort:
      'Residential cleaning professional serving Queens and surrounding neighborhoods.',
    bioLong:
      'David leads a small, well-trained team specializing in detail-oriented cleaning for homeowners and small offices. His clients trust him with keys, alarm codes, and special care instructions for sensitive surfaces.'
  },
  {
    id: 'sarah-jenkins',
    name: 'Sarah Jenkins',
    category: 'Maintenance',
    location: 'Jersey City, NJ',
    rating: 4.6,
    reviewCount: 88,
    priceRange: 'From $120 / visit',
    tags: ['Very helpful', 'Saved me money', 'Creative solutions'],
    avatarColor: '#8d5524',
    isTopRated: false,
    plan: 'silver',
    responseTime: 'Next day',
    specialties: ['General maintenance', 'Minor repairs', 'Tenant-ready checks'],
    services: [
      { name: 'Maintenance walkthrough', price: '$120', description: 'Checklist-based review of property condition.' },
      { name: 'On-call handyman block', price: '$260', description: 'Up to 4 hours of on-site work for grouped tasks.' }
    ],
    bioShort:
      'Maintenance specialist helping landlords and residents keep properties tenant-ready.',
    bioLong:
      'Sarah focuses on preventative maintenance and quick-turn repairs that keep homes and small multifamily buildings running smoothly. She is known for her honest assessments and ability to suggest cost-effective fixes.'
  }
]
