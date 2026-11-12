export default function GlobalLoading() {
  return (
    <div className="flex-1 flex items-center justify-center min-h-[60vh]">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
        <span className="text-micro font-medium uppercase tracking-wider text-text-muted">
          Loading BazaarX...
        </span>
      </div>
    </div>
  );
}

