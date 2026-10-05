import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { areas, buildings } from '../../data/seed';
import { useStore, selectLive } from '../../store/useStore';
import { applyFilters } from '../../lib/filters';
import { Search, MapPin, Building as BuildingIcon, BedDouble } from 'lucide-react';
import { Button } from '../ui/Button';

interface SearchBarProps {
  initialArea?: string;
  initialBuilding?: string;
  initialBeds?: number;
  variant?: 'hero' | 'compact';
  onSearch?: (params: { area: string; building: string; beds: number }) => void;
  className?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  initialArea = '',
  initialBuilding = '',
  initialBeds = 0,
  variant = 'hero',
  onSearch,
  className = '',
}) => {
  const navigate = useNavigate();
  const liveListings = useStore(selectLive);

  const [area, setArea] = useState(initialArea);
  const [building, setBuilding] = useState(initialBuilding);
  const [beds, setBeds] = useState(initialBeds);
  const [animatingCount, setAnimatingCount] = useState(false);

  // Sync with initial props if they change
  useEffect(() => {
    setArea(initialArea);
    setBuilding(initialBuilding);
    setBeds(initialBeds);
  }, [initialArea, initialBuilding, initialBeds]);

  // Dependent buildings list
  const availableBuildings = useMemo(() => {
    if (!area) return buildings;
    return buildings.filter((b) => b.areaId === area);
  }, [area]);

  // Handle Area change
  const handleAreaChange = (newArea: string) => {
    setArea(newArea);
    // If current building does not belong to new area, reset building
    if (newArea && building) {
      const match = buildings.find((b) => b.id === building && b.areaId === newArea);
      if (!match) setBuilding('');
    }
  };

  // Handle Building change: if user selects a building, auto-set its Area
  const handleBuildingChange = (newBuilding: string) => {
    setBuilding(newBuilding);
    if (newBuilding) {
      const bObj = buildings.find((b) => b.id === newBuilding);
      if (bObj && bObj.areaId !== area) {
        setArea(bObj.areaId);
      }
    }
  };

  // Calculate live matching count
  const matchingCount = useMemo(() => {
    return applyFilters(liveListings, {
      area,
      building,
      beds,
      amenities: [],
      sort: 'featured',
    }).length;
  }, [liveListings, area, building, beds]);

  // Trigger quick number swap animation on count change
  useEffect(() => {
    setAnimatingCount(true);
    const t = setTimeout(() => setAnimatingCount(false), 150);
    return () => clearTimeout(t);
  }, [matchingCount]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch({ area, building, beds });
    } else {
      const params = new URLSearchParams();
      if (area) params.set('area', area);
      if (building) params.set('building', building);
      if (beds > 0) params.set('beds', String(beds));
      navigate(`/browse?${params.toString()}`);
    }
  };

  const isHero = variant === 'hero';

  return (
    <form
      onSubmit={handleSubmit}
      className={`bg-white rounded-lg border border-line-200 shadow-2 p-2.5 sm:p-3 transition-shadow hover:shadow-3 ${
        isHero ? 'w-full max-w-4xl mx-auto' : 'w-full'
      } ${className}`}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-2 sm:gap-2.5 items-center">
        {/* Area dropdown */}
        <div className="lg:col-span-4 relative flex items-center bg-sand-50/70 hover:bg-sand-100 rounded px-3 py-2 border border-line-200 transition-colors">
          <MapPin className="w-4 h-4 text-brass-600 shrink-0 mr-2.5" strokeWidth={1.75} />
          <div className="flex-1 min-w-0">
            <label htmlFor="search-area" className="block text-[10px] font-semibold text-ink-500 uppercase tracking-wider leading-none mb-1">
              Coastal Area
            </label>
            <select
              id="search-area"
              value={area}
              onChange={(e) => handleAreaChange(e.target.value)}
              className="w-full bg-transparent text-sm font-semibold text-tide-900 focus:outline-none cursor-pointer truncate"
            >
              <option value="">All Grand Strand Areas</option>
              {areas.filter(a => a.market === 'grand-strand').map((a) => (
                <option key={a.id} value={a.id}>
                  {a.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Building dropdown */}
        <div className="lg:col-span-4 relative flex items-center bg-sand-50/70 hover:bg-sand-100 rounded px-3 py-2 border border-line-200 transition-colors">
          <BuildingIcon className="w-4 h-4 text-brass-600 shrink-0 mr-2.5" strokeWidth={1.75} />
          <div className="flex-1 min-w-0">
            <label htmlFor="search-building" className="block text-[10px] font-semibold text-ink-500 uppercase tracking-wider leading-none mb-1">
              Condo Building
            </label>
            <select
              id="search-building"
              value={building}
              onChange={(e) => handleBuildingChange(e.target.value)}
              className="w-full bg-transparent text-sm font-semibold text-tide-900 focus:outline-none cursor-pointer truncate"
            >
              <option value="">Any building</option>
              {availableBuildings.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Bedrooms selector */}
        <div className="lg:col-span-2 relative flex items-center bg-sand-50/70 hover:bg-sand-100 rounded px-3 py-2 border border-line-200 transition-colors">
          <BedDouble className="w-4 h-4 text-brass-600 shrink-0 mr-2.5" strokeWidth={1.75} />
          <div className="flex-1 min-w-0">
            <label htmlFor="search-beds" className="block text-[10px] font-semibold text-ink-500 uppercase tracking-wider leading-none mb-1">
              Bedrooms
            </label>
            <select
              id="search-beds"
              value={beds}
              onChange={(e) => setBeds(Number(e.target.value))}
              className="w-full bg-transparent text-sm font-semibold text-tide-900 focus:outline-none cursor-pointer truncate"
            >
              <option value="0">Any beds</option>
              <option value="1">1 Bedroom</option>
              <option value="2">2 Bedrooms</option>
              <option value="3">3 Bedrooms</option>
              <option value="4">4+ Bedrooms</option>
            </select>
          </div>
        </div>

        {/* Search button with live count */}
        <div className="lg:col-span-2">
          <Button
            type="submit"
            variant="primary"
            className="w-full h-[48px] justify-center px-3"
          >
            <Search className="w-4 h-4 shrink-0 mr-1.5" strokeWidth={2} />
            <span className="truncate">
              Search <span className={animatingCount ? 'num-swap' : ''}>{matchingCount}</span>
            </span>
          </Button>
        </div>
      </div>
    </form>
  );
};
