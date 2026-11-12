import { Metadata } from 'next';
import { AuthGuard } from '@/components/auth/AuthGuard';
import { DashboardClient } from '@/components/dashboard/DashboardClient';

export const metadata: Metadata = {
  title: 'My Dashboard · BazaarX',
  description: 'Manage your active marketplace ads, track views, inspect saved wishlist, and review messages.',
};

export default function DashboardPage() {
  return (
    <AuthGuard>
      <DashboardClient />
    </AuthGuard>
  );
}

