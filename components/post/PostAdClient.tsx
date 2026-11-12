'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Banknote,
  Smartphone,
  ArrowLeftRight,
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  Eye,
  RotateCcw,
  Sparkles,
} from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { StepIndicator } from '@/components/post/StepIndicator';
import { PhotoUploader } from '@/components/post/PhotoUploader';
import { ProductCard } from '@/components/listing/ProductCard';
import { SegmentedControl } from '@/components/ui/SegmentedControl';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/Sheet';
import { useListingsStore } from '@/lib/store/listingsStore';
import { useAuthStore } from '@/lib/store/authStore';
import { CITIES, CATEGORIES } from '@/data/cities';
import { Listing, ListingCategory, Condition, ListingType, PaymentMode } from '@/data/listings';
import { formatPrice } from '@/lib/format';

interface FormState {
  title: string;
  description: string;
  category: ListingCategory;
  condition: Condition;
  listingType: ListingType;
  price: number;
  rentPerDay: number;
  city: string;
  area: string;
  paymentMode: PaymentMode;
  images: string[];
}

const DEFAULT_FORM: FormState = {
  title: '',
  description: '',
  category: 'electronics',
  condition: 'Like New',
  listingType: 'sell',
  price: 0,
  rentPerDay: 0,
  city: 'Mumbai',
  area: 'Bandra West',
  paymentMode: 'both',
  images: [
    'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1512054502232-10a0a035d672?auto=format&fit=crop&w=1200&q=80',
  ],
};

const DRAFT_STORAGE_KEY = 'bazaarx_post_ad_draft';

export function PostAdClient() {
  const router = useRouter();
  const { addListing } = useListingsStore();
  const { user } = useAuthStore();

  const [step, setStep] = React.useState(1);
  const [formData, setFormData] = React.useState<FormState>(DEFAULT_FORM);
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [mobilePreviewOpen, setMobilePreviewOpen] = React.useState(false);

  // Restore draft on mount
  React.useEffect(() => {
    try {
      const savedDraft = localStorage.getItem(DRAFT_STORAGE_KEY);
      if (savedDraft) {
        const parsed = JSON.parse(savedDraft);
        if (parsed.title || parsed.description) {
          setFormData(parsed);
          toast('Restored your draft from previous session', {
            action: {
              label: 'Discard',
              onClick: () => {
                localStorage.removeItem(DRAFT_STORAGE_KEY);
                setFormData(DEFAULT_FORM);
              },
            },
          });
        }
      }
    } catch {
      // ignore
    }
  }, []);

  // Autosave draft whenever form data updates
  React.useEffect(() => {
    if (formData.title || formData.description) {
      try {
        localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(formData));
      } catch {
        // ignore
      }
    }
  }, [formData]);

  const updateField = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[key];
        return copy;
      });
    }
  };

  // Step 1 Validation
  const validateStep1 = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    } else if (formData.title.trim().length < 5) {
      newErrors.title = 'Title must be at least 5 characters';
    } else if (formData.title.trim().length > 80) {
      newErrors.title = 'Title cannot exceed 80 characters';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    } else if (formData.description.trim().length < 20) {
      newErrors.description = 'Please write at least 20 characters describing condition & accessories';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Step 2 Validation
  const validateStep2 = () => {
    const newErrors: Record<string, string> = {};
    if (formData.images.length === 0) {
      newErrors.images = 'Please add at least 1 photo of the item';
    }

    if (!formData.price || formData.price <= 0) {
      newErrors.price = 'Please enter a valid price';
    }

    if (formData.listingType === 'rent' && (!formData.rentPerDay || formData.rentPerDay <= 0)) {
      newErrors.rentPerDay = 'Please enter rent per day';
    }

    if (!formData.area.trim()) {
      newErrors.area = 'Handover area or neighborhood is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (step === 1) {
      if (validateStep1()) setStep(2);
    } else if (step === 2) {
      if (validateStep2()) setStep(3);
    }
  };

  const handleBack = () => {
    setStep((prev) => Math.max(1, prev - 1));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const firstImage = formData.images[0] || DEFAULT_FORM.images[0];
    const secondImage = formData.images[1] || firstImage;
    const thirdImage = formData.images[2] || firstImage;

    setTimeout(() => {
      addListing({
        title: formData.title,
        description: formData.description,
        price: Number(formData.price),
        rentPerDay: formData.listingType === 'rent' ? Number(formData.rentPerDay) : undefined,
        category: formData.category,
        condition: formData.condition,
        city: formData.city,
        area: formData.area,
        listingType: formData.listingType,
        paymentMode: formData.paymentMode,
        images: [firstImage, secondImage, thirdImage],
        sellerId: user?.id || 'user-me',
        sellerName: user?.name || 'Arjun Sharma',
      });

      // Clear draft
      localStorage.removeItem(DRAFT_STORAGE_KEY);

      setIsSubmitting(false);
      toast.success('Ad posted successfully!', {
        description: 'Your item is now live on BazaarX marketplace.',
      });
      router.push('/dashboard');
    }, 700);
  };

  // Mock listing for real-time live preview
  const previewListing: Listing = {
    id: 'preview-listing',
    title: formData.title || 'Your Product Title Will Appear Here',
    description: formData.description || 'Description of your product will appear here...',
    price: formData.price || 0,
    rentPerDay: formData.listingType === 'rent' ? formData.rentPerDay || 0 : undefined,
    category: formData.category,
    condition: formData.condition,
    city: formData.city || 'Mumbai',
    area: formData.area || 'Neighborhood Area',
    listingType: formData.listingType,
    paymentMode: formData.paymentMode,
    images: [
      formData.images[0] || DEFAULT_FORM.images[0],
      formData.images[1] || DEFAULT_FORM.images[1],
      formData.images[2] || DEFAULT_FORM.images[2],
    ],
    sellerId: user?.id || 'user-me',
    sellerName: user?.name || 'Arjun Sharma',
    createdAt: new Date().toISOString(),
    views: 1,
    status: 'active',
  };

  return (
    <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
      {/* Header & Step Indicator */}
      <div className="max-w-3xl mb-8">
        <h1 className="text-h1 font-bold text-text font-heading">
          Post an Advertisement
        </h1>
        <p className="text-base text-text-secondary mt-1">
          List your pre-owned items for direct cash/online exchange in your city.
        </p>

        <div className="mt-8">
          <StepIndicator
            currentStep={step}
            steps={['Details', 'Photos & Price', 'Payment & Review']}
            onStepClick={(targetStep) => {
              if (targetStep < step) setStep(targetStep);
            }}
          />
        </div>
      </div>

      {/* Main Grid: Form (7 cols) + Sticky Live Preview (5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Form Column */}
        <div className="lg:col-span-7">
          <div className="rounded-card border hairline-border bg-surface p-6 sm:p-8 shadow-subtle">
            {/* Step 1: Details */}
            {step === 1 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-h3 font-semibold text-text font-heading">
                    Step 1: Item Details
                  </h3>
                  <p className="text-small text-text-muted">
                    Accurate descriptions help buyers reach out faster.
                  </p>
                </div>

                {/* Title */}
                <Input
                  label="Listing Title"
                  required
                  value={formData.title}
                  onChange={(e) => updateField('title', e.target.value)}
                  placeholder="e.g. Apple iPhone 13 (128GB, Midnight Black)"
                  error={errors.title}
                  hint={`${formData.title.length}/80 characters`}
                />

                {/* Category Select */}
                <div className="space-y-1.5">
                  <label className="text-small font-medium text-text">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => updateField('category', e.target.value as ListingCategory)}
                    className="h-10 w-full px-3 text-base bg-surface text-text rounded-input border hairline-border focus:outline-none focus:border-primary"
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Condition */}
                <div className="space-y-1.5">
                  <label className="text-small font-medium text-text">Condition</label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {(['Brand New', 'Like New', 'Good', 'Fair'] as Condition[]).map((cond) => {
                      const isSelected = formData.condition === cond;
                      return (
                        <button
                          key={cond}
                          type="button"
                          onClick={() => updateField('condition', cond)}
                          className={`py-2 px-3 rounded-input border text-small font-medium transition-colors ${
                            isSelected
                              ? 'bg-primary/10 border-primary text-primary'
                              : 'bg-surface hairline-border text-text hover:bg-surface-elevated'
                          }`}
                        >
                          {cond}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Description with Character Counter */}
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center">
                    <label className="text-small font-medium text-text">
                      Detailed Description
                    </label>
                    <span className="text-micro text-text-muted tabular-nums">
                      {formData.description.length}/1000
                    </span>
                  </div>
                  <textarea
                    rows={5}
                    value={formData.description}
                    onChange={(e) => updateField('description', e.target.value)}
                    placeholder="Mention age, scratches, included accessories, battery health, or reason for selling..."
                    className={`w-full p-3 rounded-input border bg-surface text-base text-text placeholder:text-text-muted focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 ${
                      errors.description ? 'border-danger' : 'hairline-border'
                    }`}
                  />
                  {errors.description && (
                    <p className="text-small text-danger">{errors.description}</p>
                  )}
                </div>

                {/* Next Button */}
                <div className="pt-4 border-t hairline-border flex justify-end">
                  <Button
                    type="button"
                    variant="primary"
                    size="md"
                    onClick={handleNext}
                    className="gap-2 font-medium"
                  >
                    <span>Next: Photos & Price</span>
                    <ArrowRight className="w-4 h-4 stroke-[1.5]" />
                  </Button>
                </div>
              </div>
            )}

            {/* Step 2: Photos and Price */}
            {step === 2 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-h3 font-semibold text-text font-heading">
                    Step 2: Photos, Price & Location
                  </h3>
                  <p className="text-small text-text-muted">
                    Clear photos and honest pricing attract genuine buyers.
                  </p>
                </div>

                {/* Photo Uploader */}
                <PhotoUploader
                  images={formData.images}
                  onChange={(imgs) => updateField('images', imgs)}
                  category={formData.category}
                />
                {errors.images && (
                  <p className="text-small text-danger">{errors.images}</p>
                )}

                {/* Sell / Rent Sliding Toggle */}
                <div className="space-y-2 pt-2">
                  <label className="text-small font-medium text-text">Listing Type</label>
                  <SegmentedControl
                    name="post-listing-type"
                    options={[
                      { id: 'sell', label: 'Sell (One-time Purchase)' },
                      { id: 'rent', label: 'Rent (Daily Rate)' },
                    ]}
                    value={formData.listingType}
                    onChange={(val) => updateField('listingType', val)}
                    className="w-full justify-around"
                  />
                </div>

                {/* Price input */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label={formData.listingType === 'rent' ? 'Security Deposit (₹)' : 'Asking Price (₹)'}
                    type="number"
                    required
                    value={formData.price || ''}
                    onChange={(e) => updateField('price', Number(e.target.value))}
                    placeholder="e.g. 42000"
                    error={errors.price}
                    className="tabular-nums"
                  />

                  {/* Rent per day sliding down with transform/opacity-only animation */}
                  {formData.listingType === 'rent' && (
                    <motion.div
                      initial={{ opacity: 0, scaleY: 0.95 }}
                      animate={{ opacity: 1, scaleY: 1 }}
                      exit={{ opacity: 0, scaleY: 0.95 }}
                      transition={{ duration: 0.2, ease: [0.32, 0.72, 0, 1] }}
                      className="origin-top"
                    >
                      <Input
                        label="Rent per day (₹)"
                        type="number"
                        required
                        value={formData.rentPerDay || ''}
                        onChange={(e) => updateField('rentPerDay', Number(e.target.value))}
                        placeholder="e.g. 800"
                        error={errors.rentPerDay}
                        className="tabular-nums"
                      />
                    </motion.div>
                  )}
                </div>

                {/* City & Area */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-small font-medium text-text">City</label>
                    <select
                      value={formData.city}
                      onChange={(e) => updateField('city', e.target.value)}
                      className="h-10 w-full px-3 text-base bg-surface text-text rounded-input border hairline-border focus:outline-none focus:border-primary"
                    >
                      {CITIES.map((c) => (
                        <option key={c.name} value={c.name}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <Input
                    label="Neighborhood / Campus Area"
                    required
                    value={formData.area}
                    onChange={(e) => updateField('area', e.target.value)}
                    placeholder="e.g. Bandra West, Linking Road"
                    error={errors.area}
                  />
                </div>

                {/* Back / Next Buttons */}
                <div className="pt-4 border-t hairline-border flex justify-between">
                  <Button
                    type="button"
                    variant="secondary"
                    size="md"
                    onClick={handleBack}
                    className="gap-2"
                  >
                    <ArrowLeft className="w-4 h-4 stroke-[1.5]" />
                    <span>Back</span>
                  </Button>
                  <Button
                    type="button"
                    variant="primary"
                    size="md"
                    onClick={handleNext}
                    className="gap-2 font-medium"
                  >
                    <span>Next: Payment & Review</span>
                    <ArrowRight className="w-4 h-4 stroke-[1.5]" />
                  </Button>
                </div>
              </div>
            )}

            {/* Step 3: Payment and Review */}
            {step === 3 && (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <h3 className="text-h3 font-semibold text-text font-heading">
                    Step 3: Accepted Payment & Final Review
                  </h3>
                  <p className="text-small text-text-muted">
                    Buyers will pay you directly upon in-person handover.
                  </p>
                </div>

                {/* Payment Mode (3 Radio Cards with Lucide Icons) */}
                <div className="space-y-2">
                  <label className="text-small font-medium text-text">
                    Preferred Settlement Method
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      {
                        id: 'cash',
                        title: 'Cash Only',
                        desc: 'Physical currency on handover',
                        icon: Banknote,
                        badgeClass: 'text-success',
                      },
                      {
                        id: 'online',
                        title: 'Online (UPI / IMPS)',
                        desc: 'Instant QR/bank transfer on spot',
                        icon: Smartphone,
                        badgeClass: 'text-info',
                      },
                      {
                        id: 'both',
                        title: 'Both Accepted',
                        desc: 'Flexible for the buyer',
                        icon: ArrowLeftRight,
                        badgeClass: 'text-text',
                      },
                    ].map((mode) => {
                      const Icon = mode.icon;
                      const isSelected = formData.paymentMode === mode.id;
                      return (
                        <div
                          key={mode.id}
                          onClick={() => updateField('paymentMode', mode.id as PaymentMode)}
                          className={`p-4 rounded-card border cursor-pointer transition-all duration-150 flex flex-col justify-between ${
                            isSelected
                              ? 'bg-primary/5 border-primary ring-2 ring-primary/20 shadow-subtle'
                              : 'bg-surface hairline-border hover:bg-surface-elevated'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <Icon className={`w-5 h-5 ${mode.badgeClass} stroke-[1.5]`} />
                            {isSelected && (
                              <CheckCircle className="w-4 h-4 text-primary stroke-[2]" />
                            )}
                          </div>
                          <div>
                            <h4 className="text-small font-semibold text-text">{mode.title}</h4>
                            <p className="text-micro text-text-muted leading-snug">{mode.desc}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Review Summary with Edit links */}
                <div className="rounded-input border hairline-border bg-surface-elevated p-4 space-y-3 text-small">
                  <div className="flex justify-between items-center pb-2 border-b hairline-border">
                    <span className="font-semibold text-text font-heading">Listing Summary</span>
                    <span className="text-micro uppercase text-success font-semibold">Ready to Publish</span>
                  </div>

                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-micro text-text-muted block">Title & Condition</span>
                      <span className="text-text font-medium">{formData.title}</span>
                      <span className="text-micro text-text-muted ml-2">({formData.condition})</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="text-micro text-primary hover:underline font-semibold"
                    >
                      Edit
                    </button>
                  </div>

                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-micro text-text-muted block">Pricing & Location</span>
                      <span className="text-text font-medium tabular-nums font-heading">
                        {formData.listingType === 'rent'
                          ? `${formatPrice(formData.rentPerDay)}/day (Deposit: ${formatPrice(formData.price)})`
                          : formatPrice(formData.price)}
                      </span>
                      <span className="text-micro text-text-muted ml-2">
                        · {formData.city}, {formData.area}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="text-micro text-primary hover:underline font-semibold"
                    >
                      Edit
                    </button>
                  </div>

                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-micro text-text-muted block">Photos</span>
                      <span className="text-text font-medium">{formData.images.length} photos uploaded</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="text-micro text-primary hover:underline font-semibold"
                    >
                      Edit
                    </button>
                  </div>
                </div>

                {/* Back & Submit Buttons */}
                <div className="pt-4 border-t hairline-border flex justify-between">
                  <Button
                    type="button"
                    variant="secondary"
                    size="md"
                    onClick={handleBack}
                    className="gap-2"
                  >
                    <ArrowLeft className="w-4 h-4 stroke-[1.5]" />
                    <span>Back</span>
                  </Button>
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    isLoading={isSubmitting}
                    className="font-semibold px-8"
                  >
                    Publish Advertisement
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Right Sticky Column: Real-time Live Preview (Real ProductCard) */}
        <div className="hidden lg:block lg:col-span-5 sticky top-24 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-micro font-semibold uppercase tracking-wider text-text-muted flex items-center gap-1.5">
              <Eye className="w-3.5 h-3.5 stroke-[1.5]" />
              <span>Live Buyer Card Preview</span>
            </span>
            <span className="text-micro text-primary font-medium">Updates live</span>
          </div>

          <div className="max-w-[340px]">
            <ProductCard listing={previewListing} />
          </div>

          <p className="text-micro text-text-muted leading-relaxed">
            This is exactly how students and nearby buyers will see your listing on the home page and search feeds.
          </p>
        </div>
      </div>

      {/* Mobile Floating Preview Button & Sheet */}
      <div className="lg:hidden fixed bottom-6 right-6 z-40">
        <Sheet open={mobilePreviewOpen} onOpenChange={setMobilePreviewOpen}>
          <SheetTrigger asChild>
            <Button variant="primary" size="md" className="gap-2 shadow-lg">
              <Eye className="w-4 h-4 stroke-[1.5]" />
              <span>Preview Card</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="p-6">
            <SheetHeader className="mb-4">
              <SheetTitle>Live Card Preview</SheetTitle>
            </SheetHeader>
            <div className="max-w-[320px] mx-auto py-2">
              <ProductCard listing={previewListing} />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}

