import { Suspense } from 'react';
import { Metadata } from 'next';
import { AuthGuard } from '@/components/auth/AuthGuard';
import { ChatClient } from '@/components/chat/ChatClient';

export const metadata: Metadata = {
  title: 'Direct Messages · BazaarX',
  description: 'Chat securely with buyers and sellers. Schedule safe handovers with zero middleman interference.',
};

export default function ChatPage() {
  return (
    <AuthGuard>
      <Suspense
        fallback={
          <div className="flex-1 flex items-center justify-center min-h-[50vh]">
            <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
          </div>
        }
      >
        <ChatClient />
      </Suspense>
    </AuthGuard>
  );
}

