'use client';

import * as React from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Send,
  Paperclip,
  Check,
  CheckCheck,
  ArrowLeft,
  Info,
  Calendar,
  Sparkles,
} from 'lucide-react';
import { Conversation, ChatMessage } from '@/data/conversations';
import { Avatar } from '@/components/ui/Avatar';
import { Button } from '@/components/ui/Button';
import { useChatStore } from '@/lib/store/chatStore';
import { formatTimeAgo } from '@/lib/format';
import { cn } from '@/lib/utils';

interface ThreadProps {
  conversation: Conversation;
  onBack?: () => void;
  onToggleContext?: () => void;
}

export function Thread({
  conversation,
  onBack,
  onToggleContext,
}: ThreadProps) {
  const { sendMessage, addSellerReply } = useChatStore();

  const [inputText, setInputText] = React.useState('');
  const [isTyping, setIsTyping] = React.useState(false);
  const messagesEndRef = React.useRef<HTMLDivElement>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [conversation.messages, isTyping]);

  const handleSend = (textToSend?: string, attachmentUrl?: string) => {
    const text = (textToSend ?? inputText).trim();
    if (!text && !attachmentUrl) return;

    // Send buyer message
    sendMessage(conversation.id, text, attachmentUrl);
    setInputText('');

    // Trigger simulated seller response after 1 to 2 seconds
    setIsTyping(true);
    const delay = Math.floor(Math.random() * 800) + 1200; // 1.2s to 2.0s

    setTimeout(() => {
      setIsTyping(false);

      const realisticReplies = [
        'Yes, that sounds good to me! Let me know what time works best for you.',
        'It is available and in great shape. Can we meet near the campus cafeteria tomorrow?',
        'I am open to reasonable offers. Let’s inspect the product in person first!',
        'Sure, let’s schedule a time to verify the serial number and test it thoroughly.',
        'Sounds fair! Please bring exact cash or we can do UPI on the spot after checking.',
      ];
      const randomReply =
        realisticReplies[Math.floor(Math.random() * realisticReplies.length)];

      addSellerReply(conversation.id, randomReply);
    }, delay);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleFileAttach = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      const url = URL.createObjectURL(files[0]);
      handleSend('', url);
    }
  };

  const quickReplies = [
    'Is this still available?',
    'Can we meet tomorrow?',
    'Is the price negotiable?',
    'Can you share more photos?',
  ];

  return (
    <div className="flex flex-col h-full bg-bg relative">
      {/* Thread Header */}
      <div className="h-16 px-4 sm:px-6 border-b hairline-border bg-surface flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          {onBack && (
            <button
              type="button"
              onClick={onBack}
              className="md:hidden p-2 -ml-2 rounded-btn text-text-secondary hover:text-text hover:bg-surface-elevated focus-ring"
              aria-label="Back to conversations"
            >
              <ArrowLeft className="w-5 h-5 stroke-[1.5]" />
            </button>
          )}
          <Avatar name={conversation.sellerName} size="md" status="online" />
          <div>
            <h3 className="text-base font-semibold text-text font-heading flex items-center gap-2">
              <span>{conversation.sellerName}</span>
              <span className="text-[11px] font-normal text-text-muted">Verified Seller</span>
            </h3>
            <span className="text-micro text-success flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-success" />
              <span>Active now</span>
            </span>
          </div>
        </div>

        {onToggleContext && (
          <button
            type="button"
            onClick={onToggleContext}
            className="p-2 rounded-btn border hairline-border bg-surface text-text-secondary hover:text-text hover:bg-surface-elevated focus-ring"
            aria-label="Toggle listing details"
          >
            <Info className="w-4 h-4 stroke-[1.5]" />
          </button>
        )}
      </div>

      {/* Message Stream */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
        {/* Day separator */}
        <div className="flex items-center justify-center my-2">
          <span className="text-micro uppercase tracking-wider text-text-muted px-3 py-1 rounded-full bg-surface border hairline-border">
            Today
          </span>
        </div>

        {conversation.messages.map((msg) => {
          const isMe = msg.senderId === 'user-me';

          return (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className={cn('flex flex-col', isMe ? 'items-end' : 'items-start')}
            >
              <div
                className={cn(
                  'max-w-[85%] sm:max-w-[70%] rounded-card p-3.5 space-y-2 shadow-subtle',
                  isMe
                    ? 'bg-primary/10 border border-primary/20 text-text'
                    : 'bg-surface border hairline-border text-text'
                )}
              >
                {msg.attachment && (
                  <div className="relative aspect-[4/3] w-48 sm:w-60 rounded-input overflow-hidden border hairline-border">
                    <Image
                      src={msg.attachment.url}
                      alt="Attachment"
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                {msg.text && (
                  <p className="text-base whitespace-pre-wrap leading-relaxed">{msg.text}</p>
                )}
              </div>

              {/* Timestamp & Read Receipt */}
              <div className="flex items-center gap-1 mt-1 text-[11px] text-text-muted px-1">
                <span>{new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                {isMe && (
                  <span className="ml-0.5">
                    {msg.status === 'read' ? (
                      <CheckCheck className="w-3.5 h-3.5 text-primary stroke-[2]" />
                    ) : (
                      <Check className="w-3.5 h-3.5 stroke-[2]" />
                    )}
                  </span>
                )}
              </div>
            </motion.div>
          );
        })}

        {/* Simulated Seller Typing Indicator (3 dots pulse) */}
        {isTyping && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-1.5 p-3 rounded-card bg-surface border hairline-border max-w-[80px]"
          >
            <span className="w-2 h-2 rounded-full bg-text-muted animate-bounce [animation-delay:-0.3s]" />
            <span className="w-2 h-2 rounded-full bg-text-muted animate-bounce [animation-delay:-0.15s]" />
            <span className="w-2 h-2 rounded-full bg-text-muted animate-bounce" />
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick-reply chips row */}
      <div className="px-4 py-2 bg-surface/50 border-t hairline-border flex items-center gap-2 overflow-x-auto no-scrollbar">
        <Sparkles className="w-3.5 h-3.5 text-primary shrink-0 stroke-[1.5]" />
        {quickReplies.map((chip, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => handleSend(chip)}
            className="px-2.5 py-1 rounded-input border hairline-border bg-surface hover:bg-surface-elevated text-small text-text-secondary hover:text-text whitespace-nowrap transition-colors focus-ring"
          >
            {chip}
          </button>
        ))}
      </div>

      {/* Input Composer (respects keyboard and safe area) */}
      <div className="p-3 sm:p-4 bg-surface border-t hairline-border pb-[max(1rem,env(safe-area-inset-bottom))]">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-end gap-2"
        >
          {/* Attachment button */}
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="p-2.5 rounded-btn border hairline-border bg-surface hover:bg-surface-elevated text-text-muted hover:text-text focus-ring transition-colors"
            aria-label="Attach photo"
          >
            <Paperclip className="w-4 h-4 stroke-[1.5]" />
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileAttach}
          />

          {/* Text Area */}
          <div className="flex-1 relative">
            <textarea
              rows={1}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Write a message... (Enter to send, Shift+Enter for newline)"
              className="w-full resize-none max-h-32 p-2.5 rounded-input border hairline-border bg-bg text-base text-text placeholder:text-text-muted focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-150"
            />
          </div>

          {/* Send Button */}
          <Button
            type="submit"
            variant="primary"
            size="md"
            disabled={!inputText.trim()}
            className="gap-1.5 shrink-0"
          >
            <Send className="w-4 h-4 stroke-[2]" />
            <span className="hidden sm:inline">Send</span>
          </Button>
        </form>
      </div>
    </div>
  );
}

