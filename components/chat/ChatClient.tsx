'use client';

import * as React from 'react';
import { useSearchParams } from 'next/navigation';
import { useChatStore } from '@/lib/store/chatStore';
import { useListingsStore } from '@/lib/store/listingsStore';
import { ConversationList } from '@/components/chat/ConversationList';
import { Thread } from '@/components/chat/Thread';
import { ContextPanel } from '@/components/chat/ContextPanel';
import { MessageSquare } from 'lucide-react';

export function ChatClient() {
  const searchParams = useSearchParams();
  const listingParam = searchParams.get('listing');

  const {
    conversations,
    activeConversationId,
    setActiveConversationId,
    getOrCreateConversationForListing,
  } = useChatStore();
  const { listings } = useListingsStore();

  const [showContextMobile, setShowContextMobile] = React.useState(false);
  const [mobileView, setMobileView] = React.useState<'list' | 'thread'>('list');

  // Handle /chat?listing=ID param
  React.useEffect(() => {
    if (listingParam) {
      const targetListing = listings.find((l) => l.id === listingParam);
      if (targetListing) {
        const conv = getOrCreateConversationForListing(
          targetListing.id,
          targetListing.sellerId,
          targetListing.sellerName
        );
        setActiveConversationId(conv.id);
        setMobileView('thread');
      }
    }
  }, [listingParam, listings, getOrCreateConversationForListing, setActiveConversationId]);

  const activeConversation = React.useMemo(() => {
    return (
      conversations.find((c) => c.id === activeConversationId) || conversations[0] || null
    );
  }, [conversations, activeConversationId]);

  const activeListing = React.useMemo(() => {
    if (!activeConversation) return undefined;
    return listings.find((l) => l.id === activeConversation.listingId);
  }, [activeConversation, listings]);

  return (
    <div className="flex-1 flex w-full max-w-container mx-auto px-0 sm:px-6 lg:px-8 sm:py-6 h-[calc(100vh-4rem)] overflow-hidden">
      <div className="w-full h-full flex rounded-card border hairline-border overflow-hidden bg-surface shadow-subtle">
        {/* Left Pane: Conversations List (280px on desktop) */}
        <div
          className={`w-full md:w-[280px] shrink-0 h-full ${
            mobileView === 'thread' ? 'hidden md:flex' : 'flex'
          }`}
        >
          <ConversationList
            conversations={conversations}
            activeId={activeConversation?.id || null}
            onSelect={(id) => {
              setActiveConversationId(id);
              setMobileView('thread');
            }}
            className="w-full"
          />
        </div>

        {/* Center Pane: Active Thread */}
        <div
          className={`flex-1 h-full min-w-0 flex flex-col ${
            mobileView === 'list' ? 'hidden md:flex' : 'flex'
          }`}
        >
          {activeConversation ? (
            <Thread
              conversation={activeConversation}
              onBack={() => setMobileView('list')}
              onToggleContext={() => setShowContextMobile(!showContextMobile)}
            />
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-text-muted">
              <MessageSquare className="w-12 h-12 stroke-[1.5] mb-2 opacity-50" />
              <h3 className="text-h3 font-semibold text-text font-heading">
                No conversation selected
              </h3>
              <p className="text-small">Select a buyer or seller on the left to start messaging.</p>
            </div>
          )}
        </div>

        {/* Right Pane: Listing Context (280px on desktop, drawer on mobile if toggled) */}
        {activeConversation && (
          <div
            className={`hidden lg:block w-[280px] shrink-0 h-full ${
              showContextMobile ? 'block' : ''
            }`}
          >
            <ContextPanel
              listing={activeListing}
              conversationId={activeConversation.id}
              meetingScheduled={activeConversation.meetingScheduled}
            />
          </div>
        )}
      </div>
    </div>
  );
}

