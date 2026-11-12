export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  text: string;
  timestamp: string;
  status: 'sent' | 'delivered' | 'read';
  attachment?: {
    type: 'image';
    url: string;
  };
}

export interface Conversation {
  id: string;
  listingId: string;
  sellerId: string;
  sellerName: string;
  buyerId: string;
  buyerName: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  meetingScheduled?: {
    date: string;
    location: string;
  };
  messages: ChatMessage[];
}

const now = new Date();
const minsAgo = (m: number) => new Date(now.getTime() - m * 60 * 1000).toISOString();
const hoursAgo = (h: number) => new Date(now.getTime() - h * 3600 * 1000).toISOString();
const daysAgo = (d: number) => new Date(now.getTime() - d * 86400 * 1000).toISOString();

export const SEED_CONVERSATIONS: Conversation[] = [
  {
    id: 'conv-1',
    listingId: 'bzx-1',
    sellerId: 'seller-1',
    sellerName: 'Rohan Mehta',
    buyerId: 'user-me',
    buyerName: 'Arjun Sharma',
    lastMessage: 'Sounds great! Let’s meet at Starbucks Bandra around 5 PM tomorrow.',
    lastMessageTime: minsAgo(15),
    unreadCount: 1,
    meetingScheduled: {
      date: 'Tomorrow, 5:00 PM',
      location: 'Starbucks, Linking Road, Bandra West',
    },
    messages: [
      {
        id: 'msg-101',
        senderId: 'user-me',
        senderName: 'Arjun Sharma',
        text: 'Hi Rohan! Is the iPhone 13 still available? Can we do ₹40,000 in cash?',
        timestamp: hoursAgo(4),
        status: 'read',
      },
      {
        id: 'msg-102',
        senderId: 'seller-1',
        senderName: 'Rohan Mehta',
        text: 'Hi Arjun! Yes it is. ₹40,000 is slightly low given 88% battery and pristine body, but I can do ₹41,000 if we can close it in person tomorrow.',
        timestamp: hoursAgo(3),
        status: 'read',
      },
      {
        id: 'msg-103',
        senderId: 'user-me',
        senderName: 'Arjun Sharma',
        text: '₹41,000 works for me. Can you share a photo of the battery health screen just to confirm?',
        timestamp: hoursAgo(2),
        status: 'read',
      },
      {
        id: 'msg-104',
        senderId: 'seller-1',
        senderName: 'Rohan Mehta',
        text: 'Here you go! 88% Maximum Capacity verified.',
        timestamp: hoursAgo(1),
        status: 'read',
        attachment: {
          type: 'image',
          url: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=600&q=80',
        },
      },
      {
        id: 'msg-105',
        senderId: 'seller-1',
        senderName: 'Rohan Mehta',
        text: 'Sounds great! Let’s meet at Starbucks Bandra around 5 PM tomorrow.',
        timestamp: minsAgo(15),
        status: 'delivered',
      },
    ],
  },
  {
    id: 'conv-2',
    listingId: 'bzx-2',
    sellerId: 'seller-2',
    sellerName: 'Priya Sharma',
    buyerId: 'user-me',
    buyerName: 'Arjun Sharma',
    lastMessage: 'Yes, test drive is available. Please bring your driving license.',
    lastMessageTime: hoursAgo(2),
    unreadCount: 0,
    messages: [
      {
        id: 'msg-201',
        senderId: 'user-me',
        senderName: 'Arjun Sharma',
        text: 'Hello Priya, is the Classic 350 single-owner? Any previous insurance claims?',
        timestamp: daysAgo(1),
        status: 'read',
      },
      {
        id: 'msg-202',
        senderId: 'seller-2',
        senderName: 'Priya Sharma',
        text: 'Hey Arjun, single-owner, zero claims. Zero scratches on tank. I have all original service slips.',
        timestamp: hoursAgo(5),
        status: 'read',
      },
      {
        id: 'msg-203',
        senderId: 'user-me',
        senderName: 'Arjun Sharma',
        text: 'Can I take a test drive around Hauz Khas Social tomorrow afternoon?',
        timestamp: hoursAgo(3),
        status: 'read',
      },
      {
        id: 'msg-204',
        senderId: 'seller-2',
        senderName: 'Priya Sharma',
        text: 'Yes, test drive is available. Please bring your driving license.',
        timestamp: hoursAgo(2),
        status: 'read',
      },
    ],
  },
  {
    id: 'conv-3',
    listingId: 'bzx-4',
    sellerId: 'seller-4',
    sellerName: 'Sneha Kulkarni',
    buyerId: 'user-me',
    buyerName: 'Arjun Sharma',
    lastMessage: 'Dates confirmed for Nov 18-20 (3 days). Please bring original Aadhar card for verification.',
    lastMessageTime: hoursAgo(6),
    unreadCount: 0,
    meetingScheduled: {
      date: 'Saturday, 10:00 AM',
      location: 'CCD, Kothrud, Pune',
    },
    messages: [
      {
        id: 'msg-301',
        senderId: 'user-me',
        senderName: 'Arjun Sharma',
        text: 'Hi Sneha! I want to rent the Canon 200D for 3 days (Nov 18 to Nov 20). Total ₹2,400 right?',
        timestamp: daysAgo(1),
        status: 'read',
      },
      {
        id: 'msg-302',
        senderId: 'seller-4',
        senderName: 'Sneha Kulkarni',
        text: 'Hi Arjun! Yes, ₹800/day × 3 days = ₹2,400. Both lenses (18-55 and 50mm f/1.8) are included.',
        timestamp: hoursAgo(12),
        status: 'read',
      },
      {
        id: 'msg-303',
        senderId: 'seller-4',
        senderName: 'Sneha Kulkarni',
        text: 'Dates confirmed for Nov 18-20 (3 days). Please bring original Aadhar card for verification.',
        timestamp: hoursAgo(6),
        status: 'read',
      },
    ],
  },
  {
    id: 'conv-4',
    listingId: 'bzx-3',
    sellerId: 'seller-3',
    sellerName: 'Aditya Nair',
    buyerId: 'user-me',
    buyerName: 'Arjun Sharma',
    lastMessage: 'Is ₹4,000 cash fine for pickup today?',
    lastMessageTime: daysAgo(1),
    unreadCount: 0,
    messages: [
      {
        id: 'msg-401',
        senderId: 'user-me',
        senderName: 'Arjun Sharma',
        text: 'Hi Aditya, table looks neat. Can I collect it in a hatchback or does it need a tempo?',
        timestamp: daysAgo(2),
        status: 'read',
      },
      {
        id: 'msg-402',
        senderId: 'seller-3',
        senderName: 'Aditya Nair',
        text: 'It’s already disassembled! The legs unscrew cleanly, so it easily fits in any Uber hatchback with rear seats down.',
        timestamp: daysAgo(1),
        status: 'read',
      },
      {
        id: 'msg-403',
        senderId: 'user-me',
        senderName: 'Arjun Sharma',
        text: 'Is ₹4,000 cash fine for pickup today?',
        timestamp: daysAgo(1),
        status: 'read',
      },
    ],
  },
];

