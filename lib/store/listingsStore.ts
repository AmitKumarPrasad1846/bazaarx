import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Listing, SEED_LISTINGS } from '@/data/listings';

interface ListingsState {
  listings: Listing[];
  savedIds: string[];
  addListing: (listing: Omit<Listing, 'id' | 'createdAt' | 'views' | 'status'>) => Listing;
  updateListing: (id: string, updates: Partial<Listing>) => void;
  deleteListing: (id: string) => Listing | undefined;
  restoreListing: (listing: Listing) => void;
  markAsSold: (id: string) => void;
  toggleSave: (id: string) => boolean; // returns true if now saved, false if unsaved
  isSaved: (id: string) => boolean;
  incrementViews: (id: string) => void;
}

export const useListingsStore = create<ListingsState>()(
  persist(
    (set, get) => ({
      listings: SEED_LISTINGS,
      savedIds: ['bzx-1', 'bzx-4'], // Initial saved items for demonstration

      addListing: (newListingData) => {
        const id = `bzx-${Date.now()}`;
        const newListing: Listing = {
          ...newListingData,
          id,
          createdAt: new Date().toISOString(),
          views: 1,
          status: 'active',
        };

        set((state) => ({
          listings: [newListing, ...state.listings],
        }));

        return newListing;
      },

      updateListing: (id, updates) => {
        set((state) => ({
          listings: state.listings.map((item) =>
            item.id === id ? { ...item, ...updates } : item
          ),
        }));
      },

      deleteListing: (id) => {
        const itemToDelete = get().listings.find((item) => item.id === id);
        if (itemToDelete) {
          set((state) => ({
            listings: state.listings.filter((item) => item.id !== id),
            savedIds: state.savedIds.filter((savedId) => savedId !== id),
          }));
        }
        return itemToDelete;
      },

      restoreListing: (listing) => {
        set((state) => ({
          listings: [listing, ...state.listings.filter((l) => l.id !== listing.id)],
        }));
      },

      markAsSold: (id) => {
        set((state) => ({
          listings: state.listings.map((item) =>
            item.id === id ? { ...item, status: 'sold' as const } : item
          ),
        }));
      },

      toggleSave: (id) => {
        const currentSaved = get().savedIds;
        const exists = currentSaved.includes(id);
        const newSaved = exists
          ? currentSaved.filter((savedId) => savedId !== id)
          : [...currentSaved, id];

        set({ savedIds: newSaved });
        return !exists;
      },

      isSaved: (id) => {
        return get().savedIds.includes(id);
      },

      incrementViews: (id) => {
        set((state) => ({
          listings: state.listings.map((item) =>
            item.id === id ? { ...item, views: item.views + 1 } : item
          ),
        }));
      },
    }),
    {
      name: 'bazaarx-listings-storage',
    }
  )
);

