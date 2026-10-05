import React, { useState } from 'react';
import type { Filters, SortKey } from '../../lib/filters';
import type { AmenityId } from '../../data/types';
import { areas, buildings, amenities } from '../../data/seed';
import { 
  SlidersHorizontal, 
  X, 
  LayoutGrid, 
  List, 
  Waves, 
  Check, 
  RotateCcw 
} from 'lucide-react';
import { Drawer } from '../ui/Drawer';
import { Button } from '../ui/Button';

interface FilterBarProps {
  filters: Filters;
  onChange: (next: Filters) => void;
  resultCount: number;
  layout: 'grid' | 'list';
  onLayoutChange: (layout: 'grid' | 'list') => void;
  className?: string;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  filters,
  onChange,
  resultCount,
  layout,
  onLayoutChange,
  className = '',
}) => {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [amenitiesPopoverOpen, setAmenitiesPopoverOpen] = useState(false);

  // Available buildings narrowed by area
  const availableBuildings = filters.area
    ? buildings.filter((b) => b.areaId === filters.area)
    : buildings;

  const filterAmenities = amenities.filter((a) => a.filter);

  const toggleAmenity = (id: AmenityId) => {
    const next = filters.amenities.includes(id)
      ? filters.amenities.filter((a) => a !== id)
      : [...filters.amenities, id];
    onChange({ ...filters, amenities: next });
  };

  const handleAreaChange = (area: string) => {
    // If building no longer belongs to area, clear building
    let building = filters.building;
    if (area && building) {
      const match = buildings.find((b) => b.id === building && b.areaId === area);
      if (!match) building = '';
    }
    onChange({ ...filters, area, building });
  };

  const handleBuildingChange = (building: string) => {
    let area = filters.area;
    if (building) {
      const bObj = buildings.find((b) => b.id === building);
      if (bObj && bObj.areaId !== area) {
        area = bObj.areaId;
      }
    }
    onChange({ ...filters, area, building });
  };

  const clearAll = () => {
    onChange({ area: '', building: '', beds: 0, amenities: [], sort: filters.sort });
  };

  const activeFiltersCount =
    (filters.area ? 1 : 0) +
    (filters.building ? 1 : 0) +
    (filters.beds > 0 ? 1 : 0) +
    filters.amenities.length;

  return (
    <div className={`bg-sand-50/95 backdrop-blur-md border-b border-line-200 py-3.5 sticky top-[var(--header-h)] z-filter transition-all ${className}`}>
      <div className="container-x">
        {/* Main Bar */}
        <div className="flex items-center justify-between gap-3">
          {/* Mobile Filter Button */}
          <div className="flex md:hidden items-center gap-2 flex-1">
            <button
              onClick={() => setMobileDrawerOpen(true)}
              className="flex items-center gap-2 bg-white border border-line-300 rounded px-3.5 py-2 text-sm font-semibold text-tide-900 shadow-1"
            >
              <SlidersHorizontal className="w-4 h-4 text-brass-600" />
              <span>Filters</span>
              {activeFiltersCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-tide-900 text-white text-xs flex items-center justify-center font-bold">
                  {activeFiltersCount}
                </span>
              )}
            </button>
            <div className="text-xs text-ink-600 tabular" aria-live="polite">
              {resultCount} {resultCount === 1 ? 'condo' : 'condos'}
            </div>
          </div>

          {/* Desktop Filters Controls */}
          <div className="hidden md:flex items-center gap-2.5 flex-wrap flex-1">
            {/* Area select */}
            <select
              value={filters.area}
              onChange={(e) => handleAreaChange(e.target.value)}
              className="bg-white border border-line-300 rounded px-3 py-1.5 text-sm font-medium text-tide-900 focus:outline-none focus:border-seaglass-500 shadow-1"
            >
              <option value="">All areas</option>
              {areas.filter((a) => a.market === 'grand-strand').map((a) => (
                <option key={a.id} value={a.id}>
                  {a.name}
                </option>
              ))}
            </select>

            {/* Building select */}
            <select
              value={filters.building}
              onChange={(e) => handleBuildingChange(e.target.value)}
              className="bg-white border border-line-300 rounded px-3 py-1.5 text-sm font-medium text-tide-900 focus:outline-none focus:border-seaglass-500 shadow-1 max-w-[190px] truncate"
            >
              <option value="">All buildings</option>
              {availableBuildings.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.name}
                </option>
              ))}
            </select>

            {/* Bedrooms pills */}
            <div className="flex items-center bg-white border border-line-300 rounded p-0.5 shadow-1">
              {[
                { val: 0, label: 'Any beds' },
                { val: 1, label: '1' },
                { val: 2, label: '2' },
                { val: 3, label: '3' },
                { val: 4, label: '4+' },
              ].map((item) => (
                <button
                  key={item.val}
                  onClick={() => onChange({ ...filters, beds: item.val })}
                  className={`px-2.5 py-1 text-xs font-semibold rounded-sm transition-colors ${
                    filters.beds === item.val
                      ? 'bg-tide-900 text-white'
                      : 'text-ink-600 hover:text-ink-900'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Key Amenities quick chips */}
            <div className="flex items-center gap-1.5">
              {['oceanfront', 'pool', 'pet-friendly'].map((amenityId) => {
                const a = amenities.find((x) => x.id === amenityId);
                if (!a) return null;
                const isSelected = filters.amenities.includes(a.id);
                return (
                  <button
                    key={a.id}
                    onClick={() => toggleAmenity(a.id)}
                    className={`chip text-xs !min-h-[32px] px-2.5 ${isSelected ? 'is-on' : ''}`}
                  >
                    {isSelected && <Check className="w-3 h-3 text-tide-900" />}
                    {a.label}
                  </button>
                );
              })}

              {/* More Amenities Popover Trigger */}
              <div className="relative">
                <button
                  onClick={() => setAmenitiesPopoverOpen(!amenitiesPopoverOpen)}
                  className={`chip text-xs !min-h-[32px] px-2.5 ${
                    filters.amenities.some((x) => !['oceanfront', 'pool', 'pet-friendly'].includes(x))
                      ? 'is-on'
                      : ''
                  }`}
                >
                  <span>More amenities</span>
                  {filters.amenities.filter((x) => !['oceanfront', 'pool', 'pet-friendly'].includes(x)).length > 0 && (
                    <span className="w-4 h-4 rounded-full bg-tide-900 text-white text-[10px] flex items-center justify-center font-bold">
                      {filters.amenities.filter((x) => !['oceanfront', 'pool', 'pet-friendly'].includes(x)).length}
                    </span>
                  )}
                </button>

                {/* Popover */}
                {amenitiesPopoverOpen && (
                  <div className="absolute left-0 top-full mt-2 w-72 bg-white rounded-lg border border-line-200 shadow-3 p-4 z-50 pop-in">
                    <div className="flex items-center justify-between pb-2 mb-3 border-b border-line-200">
                      <span className="text-xs font-semibold text-tide-900 uppercase tracking-wider">
                        Filter Amenities
                      </span>
                      <button
                        onClick={() => setAmenitiesPopoverOpen(false)}
                        className="text-ink-500 hover:text-ink-900 p-1"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <div className="space-y-1.5 max-h-60 overflow-y-auto pr-1">
                      {filterAmenities.map((a) => {
                        const isSelected = filters.amenities.includes(a.id);
                        return (
                          <label
                            key={a.id}
                            className="flex items-center gap-2.5 p-1.5 hover:bg-sand-50 rounded cursor-pointer text-xs text-ink-900"
                          >
                            <input
                              type="checkbox"
                              checked={isSelected}
                              onChange={() => toggleAmenity(a.id)}
                              className="checkbox !w-4 !h-4"
                            />
                            <span>{a.label}</span>
                          </label>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right controls: Sort and Layout toggle */}
          <div className="flex items-center gap-3">
            {/* Sort select */}
            <div className="flex items-center gap-1.5 text-xs text-ink-600">
              <span className="hidden lg:inline text-ink-500">Sort:</span>
              <select
                value={filters.sort}
                onChange={(e) => onChange({ ...filters, sort: e.target.value as SortKey })}
                className="bg-white border border-line-300 rounded px-2.5 py-1.5 text-xs font-semibold text-tide-900 focus:outline-none shadow-1"
              >
                <option value="featured">Featured</option>
                <option value="newest">Newest first</option>
                <option value="bedrooms">Bedrooms (high to low)</option>
              </select>
            </div>

            {/* Layout Toggle (Grid / List) */}
            <div className="hidden sm:flex items-center bg-white border border-line-300 rounded p-0.5 shadow-1">
              <button
                onClick={() => onLayoutChange('grid')}
                aria-label="Grid layout"
                className={`p-1.5 rounded-sm ${layout === 'grid' ? 'bg-tide-900 text-white' : 'text-ink-500 hover:text-ink-900'}`}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => onLayoutChange('list')}
                aria-label="List layout"
                className={`p-1.5 rounded-sm ${layout === 'list' ? 'bg-tide-900 text-white' : 'text-ink-500 hover:text-ink-900'}`}
              >
                <List className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Active Filter Chips bar (if active) */}
        {activeFiltersCount > 0 && (
          <div className="flex items-center gap-2 mt-3 pt-3 border-t border-line-200/60 overflow-x-auto no-scrollbar">
            <span className="text-xs text-ink-500 shrink-0">Active filters:</span>

            {filters.area && (
              <span className="inline-flex items-center gap-1 bg-sand-100 text-tide-900 text-xs px-2.5 py-1 rounded-full border border-line-300 font-medium">
                Area: {areas.find((a) => a.id === filters.area)?.name}
                <button onClick={() => onChange({ ...filters, area: '' })} className="hover:text-err-600">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {filters.building && (
              <span className="inline-flex items-center gap-1 bg-sand-100 text-tide-900 text-xs px-2.5 py-1 rounded-full border border-line-300 font-medium">
                Building: {buildings.find((b) => b.id === filters.building)?.name}
                <button onClick={() => onChange({ ...filters, building: '' })} className="hover:text-err-600">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {filters.beds > 0 && (
              <span className="inline-flex items-center gap-1 bg-sand-100 text-tide-900 text-xs px-2.5 py-1 rounded-full border border-line-300 font-medium">
                {filters.beds >= 4 ? '4+ bedrooms' : `${filters.beds} bedroom${filters.beds > 1 ? 's' : ''}`}
                <button onClick={() => onChange({ ...filters, beds: 0 })} className="hover:text-err-600">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {filters.amenities.map((aId) => {
              const a = amenities.find((x) => x.id === aId);
              return (
                <span
                  key={aId}
                  className="inline-flex items-center gap-1 bg-seaglass-100 text-tide-900 text-xs px-2.5 py-1 rounded-full border border-seaglass-500/40 font-medium"
                >
                  {a?.label || aId}
                  <button onClick={() => toggleAmenity(aId)} className="hover:text-err-600">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              );
            })}

            <button
              onClick={clearAll}
              className="text-xs font-semibold text-brass-600 hover:text-brass-700 underline underline-offset-2 ml-1 shrink-0"
            >
              Clear all
            </button>
          </div>
        )}
      </div>

      {/* Mobile Drawer with all filter controls */}
      <Drawer
        isOpen={mobileDrawerOpen}
        onClose={() => setMobileDrawerOpen(false)}
        title="Filter Condos"
        description="Filter by area, building, bedrooms, and amenities."
      >
        <div className="space-y-6 pb-20">
          {/* Area */}
          <div>
            <label className="label">Coastal Area</label>
            <select
              value={filters.area}
              onChange={(e) => handleAreaChange(e.target.value)}
              className="input"
            >
              <option value="">All areas</option>
              {areas.filter((a) => a.market === 'grand-strand').map((a) => (
                <option key={a.id} value={a.id}>
                  {a.name}
                </option>
              ))}
            </select>
          </div>

          {/* Building */}
          <div>
            <label className="label">Building</label>
            <select
              value={filters.building}
              onChange={(e) => handleBuildingChange(e.target.value)}
              className="input"
            >
              <option value="">All buildings</option>
              {availableBuildings.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.name}
                </option>
              ))}
            </select>
          </div>

          {/* Bedrooms */}
          <div>
            <label className="label">Bedrooms</label>
            <div className="grid grid-cols-5 gap-2">
              {[
                { val: 0, label: 'Any' },
                { val: 1, label: '1' },
                { val: 2, label: '2' },
                { val: 3, label: '3' },
                { val: 4, label: '4+' },
              ].map((item) => (
                <button
                  key={item.val}
                  onClick={() => onChange({ ...filters, beds: item.val })}
                  className={`py-2 text-xs font-semibold rounded border transition-colors ${
                    filters.beds === item.val
                      ? 'bg-tide-900 text-white border-tide-900'
                      : 'bg-white text-ink-900 border-line-300'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Amenities */}
          <div>
            <label className="label">Key Amenities</label>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {filterAmenities.map((a) => {
                const isSelected = filters.amenities.includes(a.id);
                return (
                  <button
                    key={a.id}
                    onClick={() => toggleAmenity(a.id)}
                    className={`choice-card !p-3 text-xs ${isSelected ? 'is-on' : ''}`}
                  >
                    <span className="font-medium text-tide-900">{a.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Sticky Show results button on mobile */}
          <div className="fixed bottom-0 inset-x-0 p-4 bg-white border-t border-line-200 flex gap-2">
            <Button
              variant="secondary"
              className="flex-1"
              onClick={clearAll}
            >
              Clear
            </Button>
            <Button
              variant="primary"
              className="flex-2 w-full"
              onClick={() => setMobileDrawerOpen(false)}
            >
              Show {resultCount} {resultCount === 1 ? 'condo' : 'condos'}
            </Button>
          </div>
        </div>
      </Drawer>
    </div>
  );
};
