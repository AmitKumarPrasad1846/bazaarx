'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Package,
  CheckCircle,
  Eye,
  Heart,
  MessageSquare,
  Plus,
  Trash2,
  CheckCheck,
  Edit,
  ExternalLink,
  AlertTriangle,
} from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Avatar } from '@/components/ui/Avatar';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/Dialog';
import { StatCard } from '@/components/dashboard/StatCard';
import { ProductCard } from '@/components/listing/ProductCard';
import { useListingsStore } from '@/lib/store/listingsStore';
import { useChatStore } from '@/lib/store/chatStore';
import { useAuthStore } from '@/lib/store/authStore';
import { Listing } from '@/data/listings';
import { formatPrice, formatTimeAgo } from '@/lib/format';

export function DashboardClient() {
  const router = useRouter();
  const { user } = useAuthStore();
  const { listings, savedIds, markAsSold, deleteListing, restoreListing } = useListingsStore();
  const { conversations } = useChatStore();

  const [activeTab, setActiveTab] = React.useState<'ads' | 'saved' | 'messages'>('ads');
  const [deleteConfirmId, setDeleteConfirmId] = React.useState<string | null>(null);

  // Filter listings owned by this user (or sample listings assigned to user-me)
  const myAds = React.useMemo(() => {
    return listings.filter((l) => l.sellerId === user?.id || l.sellerId === 'user-me' || l.sellerId === 'seller-1');
  }, [listings, user]);

  const savedListings = React.useMemo(() => {
    return listings.filter((l) => savedIds.includes(l.id));
  }, [listings, savedIds]);

  // Total stats
  const activeCount = myAds.filter((a) => a.status === 'active').length;
  const soldCount = myAds.filter((a) => a.status === 'sold').length;
  const totalViews = myAds.reduce((acc, a) => acc + a.views, 0);

  const handleDeleteAd = (id: string) => {
    const deleted = deleteListing(id);
    setDeleteConfirmId(null);

    if (deleted) {
      toast('Ad removed from marketplace', {
        description: deleted.title,
        action: {
          label: 'Undo (5s)',
          onClick: () => {
            restoreListing(deleted);
            toast.success('Ad restored successfully');
          },
        },
        duration: 5000,
      });
    }
  };

  const handleMarkSold = (id: string) => {
    markAsSold(id);
    toast.success('Listing marked as sold!');
  };

  return (
    <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full space-y-8">
      {/* Welcome Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b hairline-border">
        <div className="flex items-center gap-3">
          <Avatar name={user?.name || 'Arjun Sharma'} size="lg" status="online" />
          <div>
            <h1 className="text-h2 sm:text-h1 font-bold text-text font-heading">
              {user?.name || 'My Dashboard'}
            </h1>
            <p className="text-small text-text-muted">
              Member since {user?.memberSince || 'Jan 2024'} · {user?.email}
            </p>
          </div>
        </div>

        <Link href="/post">
          <Button variant="primary" size="md" className="gap-2 font-semibold">
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>Post New Ad</span>
          </Button>
        </Link>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Total Ads"
          value={myAds.length}
          icon={Package}
          colorClass="text-primary"
        />
        <StatCard
          label="Active Ads"
          value={activeCount}
          icon={CheckCircle}
          colorClass="text-success"
        />
        <StatCard
          label="Items Sold"
          value={soldCount}
          icon={CheckCheck}
          colorClass="text-accent"
        />
        <StatCard
          label="Total Views"
          value={totalViews || 1240}
          icon={Eye}
          colorClass="text-info"
        />
      </div>

      {/* Tabs with sliding underline */}
      <div className="border-b hairline-border">
        <div className="relative flex space-x-8">
          {[
            { id: 'ads', label: 'My Ads', count: myAds.length },
            { id: 'saved', label: 'Saved Wishlist', count: savedListings.length },
            { id: 'messages', label: 'Messages', count: conversations.length },
          ].map((tab) => {
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as 'ads' | 'saved' | 'messages')}
                className={`relative pb-3 text-base font-medium transition-colors flex items-center gap-2 ${
                  isSelected ? 'text-text font-semibold' : 'text-text-muted hover:text-text'
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`text-micro px-1.5 py-0.2 rounded-[4px] tabular-nums ${
                    isSelected ? 'bg-primary/10 text-primary' : 'bg-surface-elevated text-text-muted'
                  }`}
                >
                  {tab.count}
                </span>

                {isSelected && (
                  <motion.div
                    layoutId="dashboard-tab-underline"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                    transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab 1: My Ads */}
      {activeTab === 'ads' && (
        <div>
          {myAds.length === 0 ? (
            <div className="p-12 text-center rounded-card border hairline-border bg-surface my-6 space-y-4">
              <Package className="w-12 h-12 text-text-muted mx-auto stroke-[1.5]" />
              <h3 className="text-h3 font-semibold text-text font-heading">
                You haven&apos;t posted any ads yet
              </h3>
              <p className="text-small text-text-secondary max-w-sm mx-auto">
                Turn your unused electronics, books, or bikes into cash. It takes less than 60 seconds.
              </p>
              <Link href="/post">
                <Button variant="primary" size="md">
                  Post Your First Ad
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence>
                {myAds.map((ad) => (
                  <motion.div
                    key={ad.id}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="group rounded-card border hairline-border bg-surface overflow-hidden shadow-subtle hover:border-border-strong flex flex-col justify-between"
                  >
                    <div>
                      {/* Image & Status Badge */}
                      <div className="relative aspect-[16/9] w-full overflow-hidden bg-surface-elevated">
                        <Image
                          src={ad.images[0]}
                          alt={ad.title}
                          fill
                          sizes="360px"
                          className="object-cover"
                        />
                        <div className="absolute top-2.5 left-2.5">
                          <Badge
                            variant={
                              ad.status === 'sold'
                                ? 'accent'
                                : ad.status === 'expired'
                                ? 'muted'
                                : 'success'
                            }
                            className="font-semibold shadow"
                          >
                            {ad.status.toUpperCase()}
                          </Badge>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-4 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-h3 font-semibold text-text tabular-nums font-heading">
                            {formatPrice(
                              ad.listingType === 'rent' && ad.rentPerDay ? ad.rentPerDay : ad.price,
                              ad.listingType === 'rent'
                            )}
                          </span>
                          <span className="text-micro text-text-muted tabular-nums">
                            {ad.views} views
                          </span>
                        </div>
                        <h4 className="text-base font-medium text-text line-clamp-1">
                          {ad.title}
                        </h4>
                        <p className="text-small text-text-muted">
                          {ad.city} · {formatTimeAgo(ad.createdAt)}
                        </p>
                      </div>
                    </div>

                    {/* Actions: Always visible on touch, hover reveal on desktop */}
                    <div className="p-3 border-t hairline-border bg-surface-elevated flex items-center justify-between gap-2">
                      <Link href={`/product/${ad.id}`}>
                        <Button variant="ghost" size="sm" className="gap-1 text-micro">
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span>View</span>
                        </Button>
                      </Link>

                      <div className="flex items-center gap-1">
                        {ad.status === 'active' && (
                          <Button
                            variant="secondary"
                            size="sm"
                            onClick={() => handleMarkSold(ad.id)}
                            className="gap-1 text-micro text-success hover:bg-success/10"
                          >
                            <CheckCheck className="w-3.5 h-3.5" />
                            <span>Mark Sold</span>
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setDeleteConfirmId(ad.id)}
                          className="p-2 text-danger hover:bg-danger/10"
                          aria-label="Delete ad"
                        >
                          <Trash2 className="w-4 h-4 stroke-[1.5]" />
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Saved Wishlist */}
      {activeTab === 'saved' && (
        <div>
          {savedListings.length === 0 ? (
            <div className="p-12 text-center rounded-card border hairline-border bg-surface my-6 space-y-4">
              <Heart className="w-12 h-12 text-text-muted mx-auto stroke-[1.5]" />
              <h3 className="text-h3 font-semibold text-text font-heading">
                Your wishlist is empty
              </h3>
              <p className="text-small text-text-secondary max-w-sm mx-auto">
                Click the heart icon on any product card while browsing to save it here for quick reference.
              </p>
              <Link href="/listings">
                <Button variant="secondary" size="md">
                  Browse Active Listings
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedListings.map((listing) => (
                <ProductCard key={listing.id} listing={listing} />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 3: Messages */}
      {activeTab === 'messages' && (
        <div>
          {conversations.length === 0 ? (
            <div className="p-12 text-center rounded-card border hairline-border bg-surface my-6 space-y-4">
              <MessageSquare className="w-12 h-12 text-text-muted mx-auto stroke-[1.5]" />
              <h3 className="text-h3 font-semibold text-text font-heading">
                No active conversations
              </h3>
              <p className="text-small text-text-secondary max-w-sm mx-auto">
                Reach out to sellers by clicking &ldquo;Chat with Seller&rdquo; on any listing.
              </p>
            </div>
          ) : (
            <div className="rounded-card border hairline-border bg-surface divide-y hairline-border overflow-hidden shadow-subtle">
              {conversations.map((conv) => (
                <Link
                  key={conv.id}
                  href={`/chat?listing=${conv.listingId}`}
                  className="p-4 flex items-center justify-between hover:bg-surface-elevated transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Avatar name={conv.sellerName} size="md" />
                    <div>
                      <h4 className="text-base font-semibold text-text">{conv.sellerName}</h4>
                      <p className="text-small text-text-muted line-clamp-1">{conv.lastMessage}</p>
                    </div>
                  </div>
                  <div className="text-right text-micro text-text-muted shrink-0 tabular-nums">
                    {formatTimeAgo(conv.lastMessageTime)}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={!!deleteConfirmId}
        onOpenChange={(open) => !open && setDeleteConfirmId(null)}
      >
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <div className="w-10 h-10 rounded-input bg-danger/10 text-danger flex items-center justify-center mb-2">
              <AlertTriangle className="w-5 h-5 stroke-[1.5]" />
            </div>
            <DialogTitle>Delete This Listing?</DialogTitle>
            <DialogDescription>
              Are you sure you want to remove this advertisement? You can undo this action within 5 seconds.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="secondary"
              onClick={() => setDeleteConfirmId(null)}
            >
              Cancel
            </Button>
            <Button
              variant="danger"
              onClick={() => deleteConfirmId && handleDeleteAd(deleteConfirmId)}
            >
              Confirm Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

