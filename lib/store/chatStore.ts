import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Conversation, ChatMessage, SEED_CONVERSATIONS } from '@/data/conversations';

interface ChatState {
  conversations: Conversation[];
  activeConversationId: string | null;
  setActiveConversationId: (id: string | null) => void;
  getConversation: (id: string) => Conversation | undefined;
  getOrCreateConversationForListing: (
    listingId: string,
    sellerId: string,
    sellerName: string
  ) => Conversation;
  sendMessage: (
    convId: string,
    text: string,
    attachmentUrl?: string
  ) => ChatMessage;
  addSellerReply: (convId: string, text: string) => void;
  setMeetingSchedule: (
    convId: string,
    meeting: { date: string; location: string }
  ) => void;
  markConversationRead: (convId: string) => void;
}

export const useChatStore = create<ChatState>()(
  persist(
    (set, get) => ({
      conversations: SEED_CONVERSATIONS,
      activeConversationId: 'conv-1',

      setActiveConversationId: (id) => {
        set({ activeConversationId: id });
        if (id) {
          get().markConversationRead(id);
        }
      },

      getConversation: (id) => {
        return get().conversations.find((c) => c.id === id);
      },

      getOrCreateConversationForListing: (listingId, sellerId, sellerName) => {
        const existing = get().conversations.find(
          (c) => c.listingId === listingId && c.sellerId === sellerId
        );
        if (existing) {
          return existing;
        }

        const newConv: Conversation = {
          id: `conv-${Date.now()}`,
          listingId,
          sellerId,
          sellerName,
          buyerId: 'user-me',
          buyerName: 'Arjun Sharma',
          lastMessage: 'Conversation started',
          lastMessageTime: new Date().toISOString(),
          unreadCount: 0,
          messages: [],
        };

        set((state) => ({
          conversations: [newConv, ...state.conversations],
          activeConversationId: newConv.id,
        }));

        return newConv;
      },

      sendMessage: (convId, text, attachmentUrl) => {
        const newMsg: ChatMessage = {
          id: `msg-${Date.now()}`,
          senderId: 'user-me',
          senderName: 'Arjun Sharma',
          text,
          timestamp: new Date().toISOString(),
          status: 'sent',
          attachment: attachmentUrl
            ? {
                type: 'image',
                url: attachmentUrl,
              }
            : undefined,
        };

        set((state) => ({
          conversations: state.conversations.map((c) => {
            if (c.id === convId) {
              return {
                ...c,
                lastMessage: text || 'Photo attached',
                lastMessageTime: newMsg.timestamp,
                messages: [...c.messages, newMsg],
              };
            }
            return c;
          }),
        }));

        return newMsg;
      },

      addSellerReply: (convId, text) => {
        const conv = get().conversations.find((c) => c.id === convId);
        if (!conv) return;

        const replyMsg: ChatMessage = {
          id: `msg-${Date.now()}`,
          senderId: conv.sellerId,
          senderName: conv.sellerName,
          text,
          timestamp: new Date().toISOString(),
          status: 'delivered',
        };

        set((state) => ({
          conversations: state.conversations.map((c) => {
            if (c.id === convId) {
              return {
                ...c,
                lastMessage: text,
                lastMessageTime: replyMsg.timestamp,
                messages: [...c.messages, replyMsg],
              };
            }
            return c;
          }),
        }));
      },

      setMeetingSchedule: (convId, meeting) => {
        set((state) => ({
          conversations: state.conversations.map((c) =>
            c.id === convId ? { ...c, meetingScheduled: meeting } : c
          ),
        }));
      },

      markConversationRead: (convId) => {
        set((state) => ({
          conversations: state.conversations.map((c) => {
            if (c.id === convId) {
              return {
                ...c,
                unreadCount: 0,
                messages: c.messages.map((m) =>
                  m.senderId !== 'user-me' ? { ...m, status: 'read' as const } : m
                ),
              };
            }
            return c;
          }),
        }));
      },
    }),
    {
      name: 'bazaarx-chat-storage',
    }
  )
);

