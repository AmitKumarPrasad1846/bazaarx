'use client';

import * as React from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Maximize2, X } from 'lucide-react';
import { Dialog, DialogPortal, DialogOverlay } from '@/components/ui/Dialog';
import * as DialogPrimitive from '@radix-ui/react-dialog';

interface GalleryLightboxProps {
  images: [string, string, string];
  title: string;
}

export function GalleryLightbox({ images, title }: GalleryLightboxProps) {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [lightboxOpen, setLightboxOpen] = React.useState(false);

  const prevImage = React.useCallback(() => {
    setActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  }, [images.length]);

  const nextImage = React.useCallback(() => {
    setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  }, [images.length]);

  // Keyboard navigation (ArrowLeft / ArrowRight)
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        prevImage();
      } else if (e.key === 'ArrowRight') {
        nextImage();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextImage, prevImage]);

  return (
    <div className="flex flex-col space-y-3 w-full">
      {/* Main Image with 150ms fade swap and click-to-lightbox */}
      <div
        onClick={() => setLightboxOpen(true)}
        className="group relative aspect-[4/3] w-full rounded-card border hairline-border overflow-hidden bg-surface-elevated cursor-zoom-in select-none shadow-subtle"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full h-full"
          >
            <Image
              src={images[activeIndex]}
              alt={`${title} - Photo ${activeIndex + 1}`}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 55vw"
              className="object-cover"
            />
          </motion.div>
        </AnimatePresence>

        {/* Hover zoom indicator */}
        <div className="absolute bottom-3 right-3 z-10 px-2 py-1 rounded-[4px] bg-black/60 backdrop-blur-sm text-white text-micro font-medium flex items-center gap-1.5 opacity-80 group-hover:opacity-100 transition-opacity">
          <Maximize2 className="w-3.5 h-3.5 stroke-[1.5]" />
          <span>Click to expand</span>
        </div>

        {/* Desktop Prev / Next overlay arrows */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            prevImage();
          }}
          className="absolute left-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity focus:opacity-100"
          aria-label="Previous photo"
        >
          <ChevronLeft className="w-4 h-4 stroke-[2]" />
        </button>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            nextImage();
          }}
          className="absolute right-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity focus:opacity-100"
          aria-label="Next photo"
        >
          <ChevronRight className="w-4 h-4 stroke-[2]" />
        </button>
      </div>

      {/* 3 Thumbnails Row */}
      <div className="grid grid-cols-3 gap-3">
        {images.map((img, idx) => {
          const isActive = idx === activeIndex;
          return (
            <button
              key={idx}
              type="button"
              onClick={() => setActiveIndex(idx)}
              className={`relative aspect-[4/3] rounded-input border overflow-hidden bg-surface-elevated transition-all duration-150 focus-ring ${
                isActive
                  ? 'border-primary ring-2 ring-primary/20 opacity-100 scale-[1.02]'
                  : 'hairline-border opacity-70 hover:opacity-100'
              }`}
              aria-label={`View photo ${idx + 1}`}
            >
              <Image
                src={img}
                alt={`${title} thumbnail ${idx + 1}`}
                fill
                sizes="150px"
                className="object-cover"
              />
            </button>
          );
        })}
      </div>

      {/* Lightbox Dialog */}
      <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
        <DialogPortal>
          <DialogOverlay className="bg-black/90 backdrop-blur-md" />
          <DialogPrimitive.Content className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 outline-none">
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setLightboxOpen(false)}
              className="absolute top-6 right-6 z-50 p-2.5 rounded-full bg-surface-elevated/20 text-white hover:bg-surface-elevated/40 transition-colors focus-ring"
              aria-label="Close fullscreen gallery"
            >
              <X className="w-5 h-5 stroke-[2]" />
            </button>

            {/* Prev Image */}
            <button
              type="button"
              onClick={prevImage}
              className="absolute left-4 sm:left-8 z-50 p-3 rounded-full bg-surface-elevated/20 text-white hover:bg-surface-elevated/40 transition-colors focus-ring"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6 stroke-[2]" />
            </button>

            {/* Main Lightbox Image */}
            <div className="relative w-full max-w-4xl h-[70vh] sm:h-[80vh] flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="relative w-full h-full"
                >
                  <Image
                    src={images[activeIndex]}
                    alt={`${title} - Fullscreen photo ${activeIndex + 1}`}
                    fill
                    sizes="100vw"
                    className="object-contain"
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Next Image */}
            <button
              type="button"
              onClick={nextImage}
              className="absolute right-4 sm:right-8 z-50 p-3 rounded-full bg-surface-elevated/20 text-white hover:bg-surface-elevated/40 transition-colors focus-ring"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6 stroke-[2]" />
            </button>

            {/* Bottom Caption Counter */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/90 text-small font-medium bg-black/60 px-4 py-1.5 rounded-full backdrop-blur-sm tabular-nums">
              {activeIndex + 1} / {images.length}
            </div>
          </DialogPrimitive.Content>
        </DialogPortal>
      </Dialog>
    </div>
  );
}

