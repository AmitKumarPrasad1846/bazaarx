import { Suspense } from 'react';
import { Metadata } from 'next';
import { LoginClient } from '@/components/auth/LoginClient';

export const metadata: Metadata = {
  title: 'Sign In / Register · BazaarX',
  description: 'Log in to your BazaarX account or register to start buying, selling, and renting.',
};

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="flex-1 flex items-center justify-center min-h-[50vh]">
          <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
        </div>
      }
    >
      <LoginClient />
    </Suspense>
  );
}

