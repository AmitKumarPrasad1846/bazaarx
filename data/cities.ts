export interface CityInfo {
  name: string;
  popularAreas: string[];
}

export const CITIES: CityInfo[] = [
  {
    name: 'Mumbai',
    popularAreas: ['Bandra West', 'Andheri West', 'Powai', 'Juhu', 'Colaba', 'Dadar'],
  },
  {
    name: 'Delhi',
    popularAreas: ['Hauz Khas', 'Connaught Place', 'Saket', 'Dwarka', 'Vasant Kunj', 'Greater Kailash'],
  },
  {
    name: 'Bangalore',
    popularAreas: ['Koramangala', 'Indiranagar', 'HSR Layout', 'Whitefield', 'Jayanagar', 'JP Nagar'],
  },
  {
    name: 'Pune',
    popularAreas: ['Kothrud', 'Viman Nagar', 'Baner', 'Aundh', 'Wakad', 'Koregaon Park'],
  },
  {
    name: 'Hyderabad',
    popularAreas: ['Gachibowli', 'Jubilee Hills', 'Banjara Hills', 'Madhapur', 'Kondapur', 'Hitec City'],
  },
  {
    name: 'Chennai',
    popularAreas: ['Adyar', 'Anna Nagar', 'T. Nagar', 'Besant Nagar', 'Velachery', 'Mylapore'],
  },
  {
    name: 'Kolkata',
    popularAreas: ['Salt Lake', 'Park Street', 'New Town', 'Ballygunge', 'Alipore', 'Jadavpur'],
  },
  {
    name: 'Ahmedabad',
    popularAreas: ['Bodakdev', 'Satellite', 'Vastrapur', 'Navrangpura', 'Prahlad Nagar', 'SG Highway'],
  },
  {
    name: 'Jaipur',
    popularAreas: ['C-Scheme', 'Malviya Nagar', 'Vaishali Nagar', 'Mansarovar', 'Raja Park', 'Tonk Road'],
  },
  {
    name: 'Indore',
    popularAreas: ['Vijay Nagar', 'Palasia', 'Saket', 'Annapurna', 'Bhawarkua', 'Super Corridor'],
  },
  {
    name: 'Chandigarh',
    popularAreas: ['Sector 17', 'Sector 35', 'Sector 8', 'Mohali Phase 7', 'Panchkula Sector 5'],
  },
  {
    name: 'Manali',
    popularAreas: ['Mall Road', 'Old Manali', 'Vashisht', 'Aleo', 'Naggar Road'],
  },
  {
    name: 'Lucknow',
    popularAreas: ['Gomti Nagar', 'Hazratganj', 'Aliganj', 'Indira Nagar', 'Mahanagar'],
  },
];

export const CATEGORIES = [
  { id: 'electronics', name: 'Electronics', icon: 'Smartphone', count: 4820 },
  { id: 'vehicles', name: 'Vehicles', icon: 'Car', count: 3210 },
  { id: 'furniture', name: 'Furniture', icon: 'Armchair', count: 2150 },
  { id: 'property', name: 'Property', icon: 'Home', count: 1840 },
  { id: 'fashion', name: 'Fashion', icon: 'Shirt', count: 1420 },
  { id: 'books', name: 'Books', icon: 'BookOpen', count: 960 },
] as const;

export type CategoryId = typeof CATEGORIES[number]['id'];

