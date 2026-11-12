'use client';

import * as React from 'react';
import Image from 'next/image';
import { Upload, X, ArrowLeft, ArrowRight, ImagePlus, Sparkles } from 'lucide-react';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

interface PhotoUploaderProps {
  images: string[];
  onChange: (images: string[]) => void;
  category?: string;
}

export function PhotoUploader({ images, onChange, category }: PhotoUploaderProps) {
  const [isDragging, setIsDragging] = React.useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const samplePhotoPresets: Record<string, string[]> = {
    electronics: [
      'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1512054502232-10a0a035d672?auto=format&fit=crop&w=1200&q=80',
    ],
    vehicles: [
      'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1558981420-87aa9dad1c89?auto=format&fit=crop&w=1200&q=80',
    ],
    furniture: [
      'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=80',
    ],
    default: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=1200&q=80',
    ],
  };

  const handleFiles = (files: FileList | null) => {
    if (!files) return;
    const validImages: string[] = [];

    Array.from(files).forEach((file) => {
      if (!file.type.startsWith('image/')) {
        toast.error(`${file.name} is not an image file`);
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        toast.error(`${file.name} exceeds maximum 5MB size`);
        return;
      }
      validImages.push(URL.createObjectURL(file));
    });

    if (validImages.length > 0) {
      const combined = [...images, ...validImages].slice(0, 5);
      onChange(combined);
      toast.success(`Added ${validImages.length} photo(s)`);
    }
  };

  const removeImage = (index: number) => {
    const updated = images.filter((_, i) => i !== index);
    onChange(updated);
  };

  const moveImage = (index: number, direction: 'left' | 'right') => {
    const newIndex = direction === 'left' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= images.length) return;
    const copy = [...images];
    const temp = copy[index];
    copy[index] = copy[newIndex];
    copy[newIndex] = temp;
    onChange(copy);
  };

  const loadSamplePhotos = () => {
    const preset =
      category && samplePhotoPresets[category]
        ? samplePhotoPresets[category]
        : samplePhotoPresets.default;
    onChange(preset);
    toast.success('Loaded 3 sample product photos');
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <label className="text-small font-semibold text-text uppercase tracking-wider block">
            Product Photos ({images.length}/5)
          </label>
          <p className="text-micro text-text-muted">
            First photo is your listing cover. Add up to 5 clear shots.
          </p>
        </div>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={loadSamplePhotos}
          className="text-primary hover:text-primary hover:bg-primary/10 gap-1.5 text-micro"
        >
          <Sparkles className="w-3.5 h-3.5 stroke-[1.5]" />
          <span>Use Sample Photos</span>
        </Button>
      </div>

      {/* Drag & Drop Box */}
      {images.length < 5 && (
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setIsDragging(false);
            handleFiles(e.dataTransfer.files);
          }}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-card p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-colors duration-150 ${
            isDragging
              ? 'border-primary bg-primary/5'
              : 'border-border hover:border-border-strong hover:bg-surface-elevated'
          }`}
        >
          <div className="w-12 h-12 rounded-full bg-surface border hairline-border flex items-center justify-center text-text-muted mb-3 shadow-subtle">
            <Upload className="w-5 h-5 stroke-[1.5]" />
          </div>
          <p className="text-small font-medium text-text">
            Drag & drop your photos here, or <span className="text-primary underline">browse</span>
          </p>
          <p className="text-micro text-text-muted mt-1">
            JPEG, PNG, WebP up to 5MB each
          </p>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*"
            className="hidden"
            onChange={(e) => handleFiles(e.target.files)}
          />
        </div>
      )}

      {/* Photo Preview Grid with Reorder and Cover Badge */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 pt-2">
          {images.map((url, idx) => (
            <div
              key={idx}
              className="group relative aspect-[4/3] rounded-input border hairline-border overflow-hidden bg-surface-elevated shadow-subtle"
            >
              <Image
                src={url}
                alt={`Uploaded photo ${idx + 1}`}
                fill
                sizes="160px"
                className="object-cover"
              />

              {/* Cover Badge */}
              {idx === 0 && (
                <div className="absolute top-1.5 left-1.5 z-10">
                  <Badge variant="primary" className="text-[9px] px-1.5 py-0.2 shadow">
                    COVER
                  </Badge>
                </div>
              )}

              {/* Action Overlay */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1 z-20">
                {idx > 0 && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      moveImage(idx, 'left');
                    }}
                    className="p-1 rounded bg-black/60 text-white hover:bg-black/90 transition-colors"
                    aria-label="Move photo left"
                  >
                    <ArrowLeft className="w-3.5 h-3.5 stroke-[2]" />
                  </button>
                )}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeImage(idx);
                  }}
                  className="p-1 rounded bg-danger text-white hover:bg-danger/80 transition-colors"
                  aria-label="Delete photo"
                >
                  <X className="w-3.5 h-3.5 stroke-[2]" />
                </button>
                {idx < images.length - 1 && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      moveImage(idx, 'right');
                    }}
                    className="p-1 rounded bg-black/60 text-white hover:bg-black/90 transition-colors"
                    aria-label="Move photo right"
                  >
                    <ArrowRight className="w-3.5 h-3.5 stroke-[2]" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

