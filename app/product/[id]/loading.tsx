export default function ProductLoading() {
  return (
    <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full animate-pulse">
      {/* Breadcrumb skeleton */}
      <div className="h-4 w-64 bg-surface-elevated rounded mb-6" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left column */}
        <div className="lg:col-span-7 space-y-4">
          <div className="aspect-[4/3] w-full bg-surface-elevated rounded-card" />
          <div className="grid grid-cols-3 gap-3">
            <div className="aspect-[4/3] bg-surface-elevated rounded-input" />
            <div className="aspect-[4/3] bg-surface-elevated rounded-input" />
            <div className="aspect-[4/3] bg-surface-elevated rounded-input" />
          </div>
          <div className="h-48 bg-surface-elevated rounded-card" />
        </div>

        {/* Right column */}
        <div className="lg:col-span-5 space-y-6">
          <div className="h-64 bg-surface-elevated rounded-card" />
          <div className="h-32 bg-surface-elevated rounded-card" />
          <div className="h-40 bg-surface-elevated rounded-card" />
        </div>
      </div>
    </div>
  );
}

