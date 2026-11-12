import { Metadata } from 'next';
import { AuthGuard } from '@/components/auth/AuthGuard';
import { PostAdClient } from '@/components/post/PostAdClient';

export const metadata: Metadata = {
  title: 'Post an Ad (Sell / Rent) · BazaarX',
  description: 'List your pre-owned items directly with peers with zero commission and in-person handover.',
};

export default function PostAdPage() {
  return (
    <AuthGuard>
      <PostAdClient />
    </AuthGuard>
  );
}

