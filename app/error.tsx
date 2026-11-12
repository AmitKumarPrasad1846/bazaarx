'use client';

import * as React from 'react';
import { Button } from '@/components/ui/Button';
import { AlertTriangle } from 'lucide-react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  React.useEffect(() => {
    console.error('Unhandled app error:', error);
  }, [error]);

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 text-center my-16">
      <div className="w-16 h-16 rounded-full bg-danger/10 text-danger flex items-center justify-center mb-4">
        <AlertTriangle className="w-8 h-8 stroke-[1.5]" />
      </div>
      <h2 className="text-h2 font-bold text-text font-heading">
        Something went wrong
      </h2>
      <p className="text-base text-text-secondary max-w-md mt-2 mb-6">
        An unexpected error occurred while rendering this interface.
      </p>
      <Button variant="primary" size="md" onClick={() => reset()}>
        Try Again
      </Button>
    </div>
  );
}

