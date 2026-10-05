import React, { useState, useEffect } from 'react';
import type { Photo } from '../../data/types';
import { Img } from '../ui/Img';
import { Grid, X, ChevronLeft, ChevronRight } from 'lucide-react';

interface ListingGalleryProps {
  photos: Photo[];
  title: string;
}

export const ListingGallery: React.FC<ListingGalleryProps> = ({ photos, title }) => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [mobileActiveIndex, setMobileActiveIndex] = useState(0);

  const isOpen = lightboxIndex !== null;

  // Keyboard navigation for Lightbox
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowRight') {
        setLightboxIndex((prev) => (prev !== null ? (prev + 1) % photos.length : 0));
      }
      if (e.key === 'ArrowLeft') {
        setLightboxIndex((prev) => (prev !== null ? (prev - 1 + photos.length) % photos.length : 0));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.classList.add('scroll-locked');

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.classList.remove('scroll-locked');
    };
  }, [isOpen, photos.length]);

  const displayPhotos = photos.slice(0, 5);

  return (
    <div>
      {/* Desktop Mosaic Layout (hidden on small mobile) */}
      <div className="hidden md:grid grid-cols-4 grid-rows-2 gap-2.5 h-[420px] lg:h-[480px] rounded-lg overflow-hidden relative">
        {/* Main Cover Photo (takes 2 cols, 2 rows) */}
        {displayPhotos[0] && (
          <div
            onClick={() => setLightboxIndex(0)}
            className="col-span-2 row-span-2 relative cursor-pointer group overflow-hidden bg-sand-100"
          >
            <Img
              photo={displayPhotos[0]}
              widthPx={900}
              heightPx={600}
              className="w-full h-full object-cover"
              zoomOnHover
              priority
            />
            <div className="absolute inset-0 bg-tide-900/10 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        )}

        {/* 4 Supporting Photos */}
        {displayPhotos.slice(1, 5).map((photo, idx) => (
          <div
            key={photo.id || idx}
            onClick={() => setLightboxIndex(idx + 1)}
            className="relative cursor-pointer group overflow-hidden bg-sand-100"
          >
            <Img
              photo={photo}
              widthPx={500}
              heightPx={350}
              className="w-full h-full object-cover"
              zoomOnHover
            />
            <div className="absolute inset-0 bg-tide-900/10 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        ))}

        {/* "Show all photos" button */}
        <button
          onClick={() => setLightboxIndex(0)}
          className="absolute bottom-4 right-4 z-10 bg-white/95 backdrop-blur-sm border border-line-300 text-tide-900 px-4 py-2 rounded text-xs font-semibold shadow-2 hover:bg-white flex items-center gap-2 hover:scale-[1.02] active:scale-95 transition-all"
        >
          <Grid className="w-4 h-4 text-brass-600" />
          <span>Show all {photos.length} photos</span>
        </button>
      </div>

      {/* Mobile Swipeable Carousel */}
      <div className="md:hidden relative aspect-[4/3] rounded-lg overflow-hidden bg-sand-100">
        <div
          className="flex h-full overflow-x-auto snap-x snap-mandatory no-scrollbar"
          onScroll={(e) => {
            const el = e.currentTarget;
            const index = Math.round(el.scrollLeft / el.clientWidth);
            setMobileActiveIndex(index);
          }}
        >
          {photos.map((photo, idx) => (
            <div
              key={photo.id || idx}
              onClick={() => setLightboxIndex(idx)}
              className="w-full h-full shrink-0 snap-center relative cursor-pointer"
            >
              <Img
                photo={photo}
                widthPx={640}
                heightPx={480}
                className="w-full h-full object-cover"
                loading={idx === 0 ? 'eager' : 'lazy'}
              />
            </div>
          ))}
        </div>

        {/* Mobile Counter Pill */}
        <div className="absolute bottom-3 right-3 z-10 bg-tide-900/80 backdrop-blur-sm text-white px-2.5 py-1 rounded-full text-xs font-medium tabular">
          {mobileActiveIndex + 1} / {photos.length}
        </div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Photo gallery"
          className="fixed inset-0 z-modal bg-tide-950/95 flex flex-col justify-between p-4 sm:p-6 text-white"
        >
          {/* Lightbox Header */}
          <div className="flex items-center justify-between z-20 shrink-0 pb-4">
            <div className="text-sm font-medium">
              <span className="font-serif text-base sm:text-lg">{title}</span>
              <span className="mx-2 text-white/40">·</span>
              <span className="text-white/80 tabular">
                {lightboxIndex + 1} of {photos.length}
              </span>
            </div>
            <button
              onClick={() => setLightboxIndex(null)}
              aria-label="Close photo gallery"
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Current Photo View */}
          <div className="relative flex-1 flex items-center justify-center min-h-0 py-2">
            <button
              onClick={() =>
                setLightboxIndex((prev) => (prev !== null ? (prev - 1 + photos.length) % photos.length : 0))
              }
              aria-label="Previous photo"
              className="absolute left-2 sm:left-4 z-20 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <div className="max-w-5xl max-h-full flex items-center justify-center p-2">
              <Img
                photo={photos[lightboxIndex]}
                widthPx={1400}
                className="max-h-[75vh] w-auto object-contain rounded"
              />
            </div>

            <button
              onClick={() =>
                setLightboxIndex((prev) => (prev !== null ? (prev + 1) % photos.length : 0))
              }
              aria-label="Next photo"
              className="absolute right-2 sm:right-4 z-20 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Lightbox Footer Caption / Thumbnails */}
          <div className="text-center text-xs text-white/70 py-2 shrink-0">
            {photos[lightboxIndex]?.alt || photos[lightboxIndex]?.caption || title}
          </div>
        </div>
      )}
    </div>
  );
};
