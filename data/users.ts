export interface SellerProfile {
  id: string;
  name: string;
  avatarUrl?: string;
  memberSince: string;
  rating: number;
  reviewCount: number;
  responseTime: string;
  verified: boolean;
  city: string;
  bio: string;
}

export const USERS: Record<string, SellerProfile> = {
  'seller-1': {
    id: 'seller-1',
    name: 'Rohan Mehta',
    memberSince: 'Jan 2024',
    rating: 4.9,
    reviewCount: 38,
    responseTime: 'within 15 mins',
    verified: true,
    city: 'Mumbai',
    bio: 'Tech enthusiast & developer. Selling gear I no longer use. Honest condition reports only.',
  },
  'seller-2': {
    id: 'seller-2',
    name: 'Priya Sharma',
    memberSince: 'Mar 2023',
    rating: 4.8,
    reviewCount: 24,
    responseTime: 'within 1 hour',
    verified: true,
    city: 'Delhi',
    bio: 'Avid motorcyclist and mechanical engineer. All vehicles meticulously serviced.',
  },
  'seller-3': {
    id: 'seller-3',
    name: 'Aditya Nair',
    memberSince: 'Aug 2023',
    rating: 5.0,
    reviewCount: 19,
    responseTime: 'within 30 mins',
    verified: true,
    city: 'Bangalore',
    bio: 'Designer moving cities. Looking to hand over solid furniture to fellow creatives.',
  },
  'seller-4': {
    id: 'seller-4',
    name: 'Sneha Kulkarni',
    memberSince: 'Nov 2023',
    rating: 4.9,
    reviewCount: 42,
    responseTime: 'within 10 mins',
    verified: true,
    city: 'Pune',
    bio: 'Freelance filmmaker & photographer. Renting pro camera rigs and lenses in Pune.',
  },
  'seller-5': {
    id: 'seller-5',
    name: 'Vikram Reddy',
    memberSince: 'Feb 2024',
    rating: 4.7,
    reviewCount: 15,
    responseTime: 'within 2 hours',
    verified: true,
    city: 'Hyderabad',
    bio: 'Console gamer & IT professional. Upgraded to PC so parting with my PS5 setup.',
  },
  'seller-6': {
    id: 'seller-6',
    name: 'Kavita Joshi',
    memberSince: 'May 2023',
    rating: 4.9,
    reviewCount: 29,
    responseTime: 'within 20 mins',
    verified: true,
    city: 'Jaipur',
    bio: 'Trail cyclist and outdoor enthusiast. Renting well-tuned mountain bikes.',
  },
  'seller-7': {
    id: 'seller-7',
    name: 'Ananya Sen',
    memberSince: 'Dec 2023',
    rating: 4.8,
    reviewCount: 17,
    responseTime: 'within 45 mins',
    verified: true,
    city: 'Kolkata',
    bio: 'Literature student clearing space on the bookshelf. Authentic editions in great condition.',
  },
  'seller-8': {
    id: 'seller-8',
    name: 'Tenzin Norbu',
    memberSince: 'Jun 2023',
    rating: 5.0,
    reviewCount: 31,
    responseTime: 'within 15 mins',
    verified: true,
    city: 'Manali',
    bio: 'Local trek guide in Himachal. Providing weather-tested waterproof camping equipment.',
  },
};

