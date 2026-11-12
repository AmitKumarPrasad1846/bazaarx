'use client';

import * as React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

export const Sheet = DialogPrimitive.Root;
export const SheetTrigger = DialogPrimitive.Trigger;
export const SheetClose = DialogPrimitive.Close;
export const SheetPortal = DialogPrimitive.Portal;

export const SheetOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      'fixed inset-0 z-50 bg-black/40 backdrop-blur-sm transition-opacity duration-300 data-[state=open]:opacity-100 data-[state=closed]:opacity-0',
      className
    )}
    {...props}
  />
));
SheetOverlay.displayName = DialogPrimitive.Overlay.displayName;

interface SheetContentProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> {
  side?: 'top' | 'bottom' | 'left' | 'right';
  showHandle?: boolean;
}

export const SheetContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  SheetContentProps
>(({ side = 'bottom', className, children, showHandle = true, ...props }, ref) => {
  const sideClasses = {
    top: 'inset-x-0 top-0 border-b hairline-border data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top rounded-b-modal',
    bottom:
      'inset-x-0 bottom-0 border-t hairline-border data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom rounded-t-modal max-h-[90vh]',
    left: 'inset-y-0 left-0 h-full w-3/4 max-w-sm border-r hairline-border data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left',
    right:
      'inset-y-0 right-0 h-full w-3/4 max-w-sm border-l hairline-border data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right',
  };

  return (
    <SheetPortal>
      <SheetOverlay />
      <DialogPrimitive.Content
        ref={ref}
        className={cn(
          'fixed z-50 bg-surface p-6 shadow-subtle-hover transition ease-out duration-300 overflow-y-auto focus:outline-none',
          sideClasses[side],
          className
        )}
        {...props}
      >
        {side === 'bottom' && showHandle && (
          <div className="w-12 h-1.5 bg-border-strong rounded-full mx-auto mb-4" />
        )}
        {children}
        <DialogPrimitive.Close className="absolute right-4 top-4 rounded-[6px] p-1 text-text-muted hover:text-text hover:bg-surface-elevated focus-ring transition-colors">
          <X className="h-4 w-4 stroke-[1.5]" />
          <span className="sr-only">Close</span>
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </SheetPortal>
  );
});
SheetContent.displayName = 'SheetContent';

export const SheetHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('flex flex-col space-y-1.5 text-left', className)} {...props} />
);
SheetHeader.displayName = 'SheetHeader';

export const SheetFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('flex items-center justify-end space-x-2 pt-4', className)} {...props} />
);
SheetFooter.displayName = 'SheetFooter';

export const SheetTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn('text-h3 font-semibold text-text font-heading', className)}
    {...props}
  />
));
SheetTitle.displayName = DialogPrimitive.Title.displayName;

export const SheetDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn('text-small text-text-secondary', className)}
    {...props}
  />
));
SheetDescription.displayName = DialogPrimitive.Description.displayName;

