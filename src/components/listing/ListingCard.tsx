import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import type { Listing } from '../../data/types';
import { buildings, areas } from '../../data/seed';
import { Img } from '../ui/Img';
import { Badge } from '../ui/Badge';
import { useStore } from '../../store/useStore';
import { bedLabel, money, plural } from '../../lib/format';
import { Heart, ChevronLeft, ChevronRight, Waves } from 'lucide-react';

interface ListingCardProps {
  listing: Listing;
  layout?: 'grid' | 'list' | 'compact';
  priority?: boolean;
}

export const ListingCard: React.FC<ListingCardProps> = ({
  listing,
  layout = 'grid',
  priority = false,
}) => {
  const saved = useStore((s) => s.saved.includes(listing.id));
  const toggleSaved = useStore((s) => s.toggleSaved);

  const [activePhotoIdx, setActivePhotoIdx] = useState(0);
  const maxDots = Math.min(4, listing.photos.length);
  const previewPhotos = listing.photos.slice(0, maxDots);

  const building = buildings.find((b) => b.id === listing.buildingId);
  const area = areas.find((a) => a.id === listing.areaId);

  const isOceanfront = listing.view === 'Oceanfront' || listing.amenities.includes('oceanfront');

  const nextPhoto = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setActivePhotoIdx((prev) => (prev + 1) % maxDots);
  };

  const prevPhoto = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setActivePhotoIdx((prev) => (prev - 1 + maxDots) % maxDots);
  };

  const handleHeartClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleSaved(listing.id);
  };

  if (layout === 'compact') {
    return (
      <div className="card flex items-center gap-3.5 p-3 hover:border-line-300 transition-colors">
        <div className="w-16 h-16 rounded overflow-hidden shrink-0 bg-sand-100">
          <Img
            photo={listing.photos[0]}
            widthPx={200}
            heightPx={200}
            className="w-full h-full"
            loading={priority ? 'eager' : 'lazy'}
          />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-xs text-brass-600 font-semibold uppercase tracking-wider">
            {building?.name}
          </p>
          <h5 className="font-serif text-base text-tide-900 font-medium truncate">
            {listing.title}
          </h5>
          <p className="text-xs text-ink-500 mt-0.5">
            {bedLabel(listing.bedrooms)} · Sleeps {listing.sleeps}
            {listing.rateLow && ` · From ${money(listing.rateLow)}/nt`}
          </p>
        </div>
      </div>
    );
  }

  if (layout === 'list') {
    return (
      <div className="card card-hover group overflow-hidden flex flex-col md:flex-row transition-all duration-200">
        <Link
          to={`/condo/${listing.slug}`}
          className="relative md:w-72 lg:w-80 shrink-0 aspect-[4/3] md:aspect-auto overflow-hidden bg-sand-100 block"
        >
          <Img
            photo={previewPhotos[activePhotoIdx]}
            widthPx={640}
            heightPx={480}
            className="w-full h-full object-cover"
            zoomOnHover
            loading={priority ? 'eager' : 'lazy'}
          />
          {isOceanfront && (
            <div className="absolute top-3 left-3 z-10">
              <Badge variant="oceanfront" />
            </div>
          )}
          <button
            onClick={handleHeartClick}
            aria-label={saved ? 'Remove from saved' : 'Save condo'}
            className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm border border-line-200 flex items-center justify-center text-tide-900 hover:scale-105 active:scale-95 transition-all shadow-1"
          >
            <Heart
              className={`w-4 h-4 transition-colors ${
                saved ? 'fill-brass-500 text-brass-500' : 'text-tide-900'
              }`}
            />
          </button>
        </Link>

        <div className="p-5 md:p-6 flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs text-ink-500 mb-1">
              <span className="font-medium text-brass-600 uppercase tracking-wider">
                {area?.name} · {building?.name}
              </span>
              <span>Floor {listing.floor}</span>
            </div>
            <Link to={`/condo/${listing.slug}`}>
              <h3 className="font-serif text-xl sm:text-2xl text-tide-900 font-medium group-hover:text-tide-800 transition-colors line-clamp-1">
                {listing.title}
              </h3>
            </Link>
            <p className="text-xs text-ink-600 mt-2">
              {bedLabel(listing.bedrooms)} · {plural(listing.bathrooms, 'bath')} · Sleeps {listing.sleeps} · {listing.view}
            </p>
            <p className="text-sm text-ink-600 mt-2.5 line-clamp-2 leading-relaxed">
              {listing.description[0]}
            </p>
          </div>

          <div className="pt-4 mt-4 border-t border-line-200 flex items-center justify-between">
            <div className="text-sm">
              <span className="font-semibold text-tide-900">
                {listing.rateLow ? `From ${money(listing.rateLow)}` : 'Inquire for rates'}
              </span>
              <span className="text-xs text-ink-500"> / night, by owner</span>
            </div>
            <Link
              to={`/condo/${listing.slug}`}
              className="text-xs font-semibold text-tide-900 hover:text-tide-800 arrow-link"
            >
              View condo <span className="arrow">→</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Default: Grid Card
  return (
    <div className="card card-hover group overflow-hidden flex flex-col transition-all duration-200">
      {/* Media container */}
      <div className="relative aspect-[4/3] overflow-hidden bg-sand-100">
        <Link to={`/condo/${listing.slug}`} className="block w-full h-full" tabIndex={-1}>
          <Img
            photo={previewPhotos[activePhotoIdx]}
            widthPx={600}
            heightPx={450}
            className="w-full h-full object-cover"
            zoomOnHover
            loading={priority ? 'eager' : 'lazy'}
          />
        </Link>

        {/* Top Badges */}
        <div className="absolute top-3 left-3 z-10 flex flex-wrap gap-1.5 pointer-events-none">
          {isOceanfront && <Badge variant="oceanfront" />}
          {listing.featured && <Badge variant="featured" />}
        </div>

        {/* Save button */}
        <button
          onClick={handleHeartClick}
          aria-label={saved ? 'Remove from saved' : 'Save condo'}
          className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm border border-line-200 flex items-center justify-center text-tide-900 hover:scale-105 active:scale-95 transition-all shadow-1"
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              saved ? 'fill-brass-500 text-brass-500' : 'text-tide-900'
            }`}
          />
        </button>

        {/* Image pagination controls on hover */}
        {maxDots > 1 && (
          <>
            <div className="absolute inset-y-0 left-1 flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={prevPhoto}
                aria-label="Previous photo"
                className="w-7 h-7 rounded-full bg-white/90 text-tide-900 flex items-center justify-center shadow-1 hover:bg-white"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
            </div>
            <div className="absolute inset-y-0 right-1 flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={nextPhoto}
                aria-label="Next photo"
                className="w-7 h-7 rounded-full bg-white/90 text-tide-900 flex items-center justify-center shadow-1 hover:bg-white"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Dots */}
            <div className="absolute bottom-2.5 inset-x-0 flex justify-center gap-1.5 z-10 pointer-events-none">
              {previewPhotos.map((_, i) => (
                <span
                  key={i}
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${
                    i === activePhotoIdx
                      ? 'bg-white w-3 shadow-1'
                      : 'bg-white/60'
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Card Content */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between text-xs text-ink-500 mb-1">
            <span className="font-semibold text-brass-600 uppercase tracking-wider truncate">
              {building?.name}
            </span>
            <span className="shrink-0 ml-2">{area?.name}</span>
          </div>

          <Link to={`/condo/${listing.slug}`}>
            <h3 className="font-serif text-lg sm:text-xl text-tide-900 font-medium group-hover:text-tide-800 transition-colors line-clamp-1">
              {listing.title}
            </h3>
          </Link>

          <p className="text-xs text-ink-600 mt-1.5">
            {bedLabel(listing.bedrooms)} · {plural(listing.bathrooms, 'bath')} · Sleeps {listing.sleeps} · {listing.view}
          </p>
        </div>

        <div className="pt-3.5 mt-3.5 border-t border-line-200 flex items-center justify-between">
          <div className="text-sm">
            <span className="font-semibold text-tide-900">
              {listing.rateLow ? `From ${money(listing.rateLow)}` : 'Inquire for rate'}
            </span>
            <span className="text-xs text-ink-500"> / nt</span>
          </div>
          <span className="text-xs font-semibold text-tide-900 group-hover:text-tide-800 flex items-center gap-1">
            View condo <span className="arrow transition-transform group-hover:translate-x-0.5">→</span>
          </span>
        </div>
      </div>
    </div>
  );
};
