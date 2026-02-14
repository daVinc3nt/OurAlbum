export interface Milestone {
  id: string;
  title: string;
  date: string;
  image: string;
  icon: 'camera' | 'heart' | 'plane';
  story: string;
  gallery: string[];
}

export const milestones: Milestone[] = [
  {
    id: '1',
    title: 'First Date',
    date: 'February 14, 2024',
    image: 'https://images.unsplash.com/photo-1595791125402-86d500754116?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb21hbnRpYyUyMGRpbm5lciUyMGRhdGV8ZW58MXx8fHwxNzcwOTYxMTM4fDA&ixlib=rb-4.1.0&q=80&w=1080',
    icon: 'heart',
    story: 'The evening we first met at that cozy little café downtown. The conversation flowed so naturally, and we talked for hours about everything and nothing. I knew there was something special about you from that very first moment.',
    gallery: [
      'https://images.unsplash.com/photo-1595791125402-86d500754116?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb21hbnRpYyUyMGRpbm5lciUyMGRhdGV8ZW58MXx8fHwxNzcwOTYxMTM4fDA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1549934159-af720506e2bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb21hbnRpYyUyMHBpY25pYyUyMGNvdXBsZXxlbnwxfHx8fDE3NzA5NjAxMTh8MA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1766717419809-954c4e4d0885?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3VwbGUlMjBsYXVnaGluZyUyMHRvZ2V0aGVyfGVufDF8fHx8MTc3MDk1OTE2MXww&ixlib=rb-4.1.0&q=80&w=1080',
    ]
  },
  {
    id: '2',
    title: 'Beach Getaway',
    date: 'April 22, 2024',
    image: 'https://images.unsplash.com/photo-1766735325744-d5bcfc3d925a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWFjaCUyMHZhY2F0aW9uJTIwY291cGxlfGVufDF8fHx8MTc3MTAzNDk1MXww&ixlib=rb-4.1.0&q=80&w=1080',
    icon: 'plane',
    story: 'Our first trip together to the seaside. Walking hand in hand along the shore as the sun set over the horizon. The sound of waves, the warmth of your hand in mine, and endless laughter made this weekend unforgettable.',
    gallery: [
      'https://images.unsplash.com/photo-1766735325744-d5bcfc3d925a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWFjaCUyMHZhY2F0aW9uJTIwY291cGxlfGVufDF8fHx8MTc3MTAzNDk1MXww&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1582845715481-a810047ab56a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3VwbGUlMjBob2xkaW5nJTIwaGFuZHMlMjBzdW5zZXR8ZW58MXx8fHwxNzcxMDMyOTc1fDA&ixlib=rb-4.1.0&q=80&w=1080',
    ]
  },
  {
    id: '3',
    title: 'City Adventure',
    date: 'June 10, 2024',
    image: 'https://images.unsplash.com/photo-1767487196225-ba9b9cb23f1c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3VwbGUlMjB3YWxraW5nJTIwY2l0eXxlbnwxfHx8fDE3NzEwMzQ5NTJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    icon: 'camera',
    story: 'Exploring the streets of the city together, discovering hidden cafés and bookstores. Every corner held a new adventure, and every moment with you felt like a scene from a beautiful film.',
    gallery: [
      'https://images.unsplash.com/photo-1767487196225-ba9b9cb23f1c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3VwbGUlMjB3YWxraW5nJTIwY2l0eXxlbnwxfHx8fDE3NzEwMzQ5NTJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1766717419809-954c4e4d0885?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3VwbGUlMjBsYXVnaGluZyUyMHRvZ2V0aGVyfGVufDF8fHx8MTc3MDk1OTE2MXww&ixlib=rb-4.1.0&q=80&w=1080',
    ]
  },
  {
    id: '4',
    title: 'Golden Hour',
    date: 'August 5, 2024',
    image: 'https://images.unsplash.com/photo-1582845715481-a810047ab56a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3VwbGUlMjBob2xkaW5nJTIwaGFuZHMlMjBzdW5zZXR8ZW58MXx8fHwxNzcxMDMyOTc1fDA&ixlib=rb-4.1.0&q=80&w=1080',
    icon: 'heart',
    story: 'A spontaneous evening walk that turned into one of our most cherished memories. The golden light, your smile, and the way you looked at me - this moment captured everything I love about us.',
    gallery: [
      'https://images.unsplash.com/photo-1582845715481-a810047ab56a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3VwbGUlMjBob2xkaW5nJTIwaGFuZHMlMjBzdW5zZXR8ZW58MXx8fHwxNzcxMDMyOTc1fDA&ixlib=rb-4.1.0&q=80&w=1080',
    ]
  },
];

export interface Template {
  id: string;
  name: string;
  preview: string;
  style: 'polaroid' | 'magazine' | 'minimalist';
  thumbnail: string;
}

export const templates: Template[] = [
  {
    id: 't1',
    name: 'Polaroid',
    preview: 'Classic instant photo with space for notes',
    style: 'polaroid',
    thumbnail: 'https://images.unsplash.com/photo-1595791125402-86d500754116?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb21hbnRpYyUyMGRpbm5lciUyMGRhdGV8ZW58MXx8fHwxNzcwOTYxMTM4fDA&ixlib=rb-4.1.0&q=80&w=400'
  },
  {
    id: 't2',
    name: 'Magazine',
    preview: 'Editorial layout with 70/30 split',
    style: 'magazine',
    thumbnail: 'https://images.unsplash.com/photo-1766735325744-d5bcfc3d925a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWFjaCUyMHZhY2F0aW9uJTIwY291cGxlfGVufDF8fHx8MTc3MTAzNDk1MXww&ixlib=rb-4.1.0&q=80&w=400'
  },
  {
    id: 't3',
    name: 'Minimalist',
    preview: 'Clean grid layout',
    style: 'minimalist',
    thumbnail: 'https://images.unsplash.com/photo-1767487196225-ba9b9cb23f1c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3VwbGUlMjB3YWxraW5nJTIwY2l0eXxlbnwxfHx8fDE3NzEwMzQ5NTJ8MA&ixlib=rb-4.1.0&q=80&w=400'
  },
];

// Date when the relationship started - used for login and days counter
export const START_DATE = '2026-02-07';

export function getDaysCount(): number {
  const startDate = new Date(START_DATE);
  const today = new Date();
  const diffTime = Math.abs(today.getTime() - startDate.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}
