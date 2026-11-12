'use client';

import * as React from 'react';
import { Search } from 'lucide-react';
import { Conversation } from '@/data/conversations';
import { Avatar } from '@/components/ui/Avatar';
import { formatTimeAgo } from '@/lib/format';
import { cn } from '@/lib/utils';

interface ConversationListProps {
  conversations: Conversation[];
  activeId: string | null;
  onSelect: (id: string) => void;
  className?: string;
}

export function ConversationList({
  conversations,
  activeId,
  onSelect,
  className,
}: ConversationListProps) {
  const [search, setSearch] = React.useState('');
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const filtered = React.useMemo(() => {
    if (!search.trim()) return conversations;
    const query = search.toLowerCase();
    return conversations.filter(
      (c) =>
        c.sellerName.toLowerCase().includes(query) ||
        c.lastMessage.toLowerCase().includes(query)
    );
  }, [conversations, search]);

  return (
    <div className={cn('flex flex-col h-full bg-surface border-r hairline-border', className)}>
      {/* Header & Search */}
      <div className="p-4 border-b hairline-border space-y-3">
        <h2 className="text-h3 font-semibold text-text font-heading">
          Messages
        </h2>
        <div className="relative flex items-center">
          <Search className="w-3.5 h-3.5 text-text-muted absolute left-3 pointer-events-none stroke-[1.5]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search conversations..."
            className="h-9 w-full rounded-input border hairline-border bg-bg pl-8 pr-3 text-small text-text placeholder:text-text-muted focus:outline-none focus:border-primary transition-colors"
          />
        </div>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto divide-y hairline-border">
        {filtered.length === 0 ? (
          <div className="p-6 text-center text-small text-text-muted">
            No conversations match your search.
          </div>
        ) : (
          filtered.map((conv) => {
            const isActive = conv.id === activeId;
            return (
              <button
                key={conv.id}
                type="button"
                onClick={() => onSelect(conv.id)}
                className={cn(
                  'w-full p-3.5 flex items-start gap-3 text-left transition-colors duration-150',
                  isActive
                    ? 'bg-primary/10 border-l-2 border-l-primary'
                    : 'hover:bg-surface-elevated'
                )}
              >
                <Avatar name={conv.sellerName} size="md" status="online" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="text-small font-semibold text-text truncate">
                      {conv.sellerName}
                    </span>
                    <span className="text-micro text-text-muted shrink-0 tabular-nums">
                      {mounted ? formatTimeAgo(conv.lastMessageTime) : 'recently'}
                    </span>
                  </div>
                  <p className="text-small text-text-secondary truncate line-clamp-1">
                    {conv.lastMessage}
                  </p>
                </div>
                {conv.unreadCount > 0 && (
                  <span className="w-4 h-4 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center shrink-0">
                    {conv.unreadCount}
                  </span>
                )}
              </button>
            );
          })
        )}
      </div>
    </div>
  );
}

