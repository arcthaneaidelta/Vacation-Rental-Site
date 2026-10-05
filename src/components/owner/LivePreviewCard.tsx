import React from 'react';
import type { ListingCore } from '../../data/types';
import { buildings, areas } from '../../data/seed';
import { bedLabel, money, plural } from '../../lib/format';
import { Badge } from '../ui/Badge';
import { unsplashUrl } from '../../data/images';
import { Heart, Waves, Sparkles } from 'lucide-react';

interface LivePreviewCardProps {
  data: Partial<ListingCore>;
  newBuildingName?: string;
}

export const LivePreviewCard: React.FC<LivePreviewCardProps> = ({ data, newBuildingName }) => {
  const building = buildings.find((b) => b.id === data.buildingId);
  const buildingName = newBuildingName || building?.name || 'Selected Building';
  const area = areas.find((a) => a.id === data.areaId);

  const cover = data.photos?.[0];
  const coverSrc = cover
    ? cover.kind === 'unsplash'
      ? unsplashUrl(cover.src, 600, 450)
      : cover.src
    : null;

  const isOceanfront = data.view === 'Oceanfront' || data.amenities?.includes('oceanfront');

  return (
    <div className="w-80 shrink-0 sticky top-28 hidden xl:block">
      <div className="mb-2 flex items-center justify-between text-xs text-ink-500">
        <span className="font-semibold text-brass-600 uppercase tracking-wider flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5" /> Live Public Preview
        </span>
        <span>Updates as you type</span>
      </div>

      <div className="card overflow-hidden shadow-2 border border-line-300 bg-white">
        {/* Card Media */}
        <div className="relative aspect-[4/3] bg-sand-100 overflow-hidden">
          {coverSrc ? (
            <img
              src={coverSrc}
              alt="Listing cover preview"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center text-ink-500">
              <span className="text-xs">Your cover photo will appear here</span>
            </div>
          )}

          {isOceanfront && (
            <div className="absolute top-2.5 left-2.5">
              <Badge variant="oceanfront" size="sm" />
            </div>
          )}

          <div className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white/90 border border-line-200 flex items-center justify-center text-tide-900 shadow-1">
            <Heart className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Card Content */}
        <div className="p-4 space-y-2">
          <div className="flex items-center justify-between text-[11px] text-ink-500">
            <span className="font-semibold text-brass-600 uppercase tracking-wider truncate max-w-[160px]">
              {buildingName}
            </span>
            <span>{area?.name || 'Grand Strand'}</span>
          </div>

          <h4 className="font-serif text-base text-tide-900 font-medium line-clamp-1">
            {data.title || 'Sunrise Beach Condo'}
          </h4>

          <p className="text-xs text-ink-600">
            {bedLabel(data.bedrooms ?? 2)} · {plural(data.bathrooms ?? 2, 'bath')} · Sleeps{' '}
            {data.sleeps ?? 6}
            {data.view ? ` · ${data.view}` : ''}
          </p>

          <div className="pt-3 border-t border-line-200 flex items-center justify-between text-xs">
            <div>
              <span className="font-semibold text-tide-900">
                {data.rateLow ? `From ${money(data.rateLow)}` : 'Inquire'}
              </span>
              <span className="text-ink-500 text-[11px]"> / night</span>
            </div>
            <span className="text-brass-600 font-medium">Founding listing</span>
          </div>
        </div>
      </div>
    </div>
  );
};
