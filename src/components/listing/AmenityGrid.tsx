import React, { useState } from 'react';
import type { AmenityId } from '../../data/types';
import { amenities } from '../../data/seed';
import { 
  Waves, 
  Sparkles, 
  Flame, 
  Baby, 
  Footprints, 
  Umbrella, 
  Wind, 
  Wifi, 
  UtensilsCrossed, 
  Tv, 
  Briefcase, 
  Dog, 
  Building2, 
  Car, 
  Shirt, 
  Dumbbell, 
  Check, 
  Grid 
} from 'lucide-react';
import { Modal } from '../ui/Modal';

interface AmenityGridProps {
  amenityIds: AmenityId[];
  otherAmenity?: string;
}

export const getAmenityIcon = (id: AmenityId | string) => {
  switch (id) {
    case 'oceanfront': return Waves;
    case 'pool':
    case 'indoor-pool':
    case 'lazy-river': return Waves;
    case 'hot-tub': return Flame;
    case 'kids-pool':
    case 'crib': return Baby;
    case 'beach-access': return Footprints;
    case 'beach-gear': return Umbrella;
    case 'balcony': return Wind;
    case 'ac': return Wind;
    case 'wifi': return Wifi;
    case 'full-kitchen': return UtensilsCrossed;
    case 'smart-tv': return Tv;
    case 'workspace': return Briefcase;
    case 'pet-friendly': return Dog;
    case 'elevator': return Building2;
    case 'free-parking': return Car;
    case 'washer-dryer': return Shirt;
    case 'fitness': return Dumbbell;
    default: return Check;
  }
};

export const AmenityGrid: React.FC<AmenityGridProps> = ({ amenityIds, otherAmenity }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const matched = amenities.filter((a) => amenityIds.includes(a.id));
  const preview = matched.slice(0, 8);
  const remainingCount = matched.length - preview.length + (otherAmenity ? 1 : 0);

  const beachGroup = matched.filter((a) => a.group === 'beach');
  const comfortGroup = matched.filter((a) => a.group === 'comfort');
  const practicalGroup = matched.filter((a) => a.group === 'practical');

  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 gap-y-3.5 gap-x-6">
        {preview.map((a) => {
          const Icon = getAmenityIcon(a.id);
          return (
            <div key={a.id} className="flex items-center gap-3 text-sm text-ink-900">
              <Icon className="w-4 h-4 text-brass-600 shrink-0" strokeWidth={1.75} />
              <span>{a.label}</span>
            </div>
          );
        })}
        {otherAmenity && preview.length < 8 && (
          <div className="flex items-center gap-3 text-sm text-ink-900">
            <Check className="w-4 h-4 text-brass-600 shrink-0" strokeWidth={1.75} />
            <span>{otherAmenity}</span>
          </div>
        )}
      </div>

      {remainingCount > 0 && (
        <button
          onClick={() => setModalOpen(true)}
          className="mt-5 btn btn-secondary btn-sm"
        >
          <Grid className="w-3.5 h-3.5 text-brass-600 mr-1.5" />
          <span>Show all {matched.length + (otherAmenity ? 1 : 0)} amenities</span>
        </button>
      )}

      {/* Modal with all amenities grouped */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="All condo amenities"
        size="md"
      >
        <div className="space-y-6 max-h-[70vh] overflow-y-auto pr-2">
          {beachGroup.length > 0 && (
            <div>
              <h4 className="text-xs font-semibold text-brass-600 uppercase tracking-wider mb-3">
                Beach & Water
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {beachGroup.map((a) => {
                  const Icon = getAmenityIcon(a.id);
                  return (
                    <div key={a.id} className="flex items-center gap-2.5 text-sm text-ink-900">
                      <Icon className="w-4 h-4 text-brass-600 shrink-0" strokeWidth={1.75} />
                      <span>{a.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {comfortGroup.length > 0 && (
            <div>
              <h4 className="text-xs font-semibold text-brass-600 uppercase tracking-wider mb-3">
                Comfort & Living
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {comfortGroup.map((a) => {
                  const Icon = getAmenityIcon(a.id);
                  return (
                    <div key={a.id} className="flex items-center gap-2.5 text-sm text-ink-900">
                      <Icon className="w-4 h-4 text-brass-600 shrink-0" strokeWidth={1.75} />
                      <span>{a.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {practicalGroup.length > 0 && (
            <div>
              <h4 className="text-xs font-semibold text-brass-600 uppercase tracking-wider mb-3">
                Practical
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {practicalGroup.map((a) => {
                  const Icon = getAmenityIcon(a.id);
                  return (
                    <div key={a.id} className="flex items-center gap-2.5 text-sm text-ink-900">
                      <Icon className="w-4 h-4 text-brass-600 shrink-0" strokeWidth={1.75} />
                      <span>{a.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {otherAmenity && (
            <div>
              <h4 className="text-xs font-semibold text-brass-600 uppercase tracking-wider mb-3">
                Owner Note
              </h4>
              <div className="flex items-center gap-2.5 text-sm text-ink-900">
                <Check className="w-4 h-4 text-brass-600 shrink-0" strokeWidth={1.75} />
                <span>{otherAmenity}</span>
              </div>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
};
