import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { areas, buildings } from '../data/seed';
import { useStore, selectLive } from '../store/useStore';
import { ListingCard } from '../components/listing/ListingCard';
import { Button } from '../components/ui/Button';
import { 
  Building2, 
  MapPin, 
  ChevronRight, 
  Waves, 
  Calendar, 
  Layers, 
  Umbrella, 
  Sparkles 
} from 'lucide-react';

export const BuildingPage: React.FC = () => {
  const { area: areaId, building: buildingId } = useParams<{ area: string; building: string }>();
  const liveListings = useStore(selectLive);

  const building = buildings.find((b) => b.id === buildingId) || buildings[0];
  const area = areas.find((a) => a.id === (areaId || building.areaId)) || areas[0];

  const buildingListings = liveListings.filter((l) => l.buildingId === building.id);

  return (
    <div className="flex-1 flex flex-col bg-sand-50">
      {/* Breadcrumbs */}
      <div className="bg-white border-b border-line-200 pt-24 pb-3">
        <div className="container-x flex items-center gap-1.5 text-xs text-ink-500 overflow-x-auto no-scrollbar">
          <Link to="/" className="hover:text-tide-900 shrink-0">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-line-300 shrink-0" />
          <Link to="/areas" className="hover:text-tide-900 shrink-0">Areas</Link>
          <ChevronRight className="w-3.5 h-3.5 text-line-300 shrink-0" />
          <Link to={`/areas/${area.id}`} className="hover:text-tide-900 shrink-0">{area.name}</Link>
          <ChevronRight className="w-3.5 h-3.5 text-line-300 shrink-0" />
          <span className="text-tide-900 font-semibold truncate shrink-0">{building.name}</span>
        </div>
      </div>

      {/* Building Header Band */}
      <section className="bg-white border-b border-line-200 py-10 sm:py-14">
        <div className="container-x">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Building Information */}
            <div className="lg:col-span-7 space-y-4">
              <span className="eyebrow block">Condo Building Directory</span>
              <h1 className="h1 font-serif text-tide-900">{building.name}</h1>
              <p className="text-sm text-ink-600 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-brass-600 shrink-0" />
                <span>{building.street}, {area.name}, South Carolina</span>
              </p>
              <p className="text-sm sm:text-base text-ink-600 leading-relaxed max-w-xl">
                {building.notes}
              </p>

              {/* Building Facts Row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-line-200">
                <div className="p-3 bg-sand-50 rounded border border-line-200">
                  <div className="flex items-center gap-1.5 text-brass-600 text-xs font-semibold mb-1">
                    <Waves className="w-3.5 h-3.5" /> Beach Distance
                  </div>
                  <p className="font-serif text-base font-semibold text-tide-900">
                    {building.beachDistance}
                  </p>
                </div>

                <div className="p-3 bg-sand-50 rounded border border-line-200">
                  <div className="flex items-center gap-1.5 text-brass-600 text-xs font-semibold mb-1">
                    <Layers className="w-3.5 h-3.5" /> Stories / Floors
                  </div>
                  <p className="font-serif text-base font-semibold text-tide-900">
                    {building.floors} floors
                  </p>
                </div>

                <div className="p-3 bg-sand-50 rounded border border-line-200">
                  <div className="flex items-center gap-1.5 text-brass-600 text-xs font-semibold mb-1">
                    <Umbrella className="w-3.5 h-3.5" /> Swimming Pools
                  </div>
                  <p className="font-serif text-base font-semibold text-tide-900">
                    {building.pools} pools
                  </p>
                </div>

                <div className="p-3 bg-sand-50 rounded border border-line-200">
                  <div className="flex items-center gap-1.5 text-brass-600 text-xs font-semibold mb-1">
                    <Calendar className="w-3.5 h-3.5" /> Year Built
                  </div>
                  <p className="font-serif text-base font-semibold text-tide-900">
                    {building.yearBuilt}
                  </p>
                </div>
              </div>
            </div>

            {/* Building Image */}
            <div className="lg:col-span-5 aspect-[4/3] rounded-lg overflow-hidden bg-sand-100 shadow-2 border border-line-200">
              <img
                src={building.image.src}
                alt={building.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Condos in this building */}
      <section className="section bg-sand-50">
        <div className="container-x">
          <div className="flex items-baseline justify-between mb-8">
            <div>
              <span className="eyebrow block mb-1">Available Rentals</span>
              <h2 className="h2 font-serif text-tide-900">Condos in {building.name}</h2>
            </div>
            <span className="text-xs text-ink-500 font-semibold tabular">
              {buildingListings.length} {buildingListings.length === 1 ? 'condo available' : 'condos available'}
            </span>
          </div>

          {buildingListings.length === 0 ? (
            <div className="card p-10 text-center bg-white border border-line-200 max-w-md mx-auto space-y-3">
              <Building2 className="w-8 h-8 text-brass-600 mx-auto" />
              <h3 className="font-serif text-lg font-medium text-tide-900">
                Be the first to list in {building.name}
              </h3>
              <p className="text-xs text-ink-600">
                Are you an owner in {building.name}? Claim one of our 25 founding owner spots.
              </p>
              <div className="pt-2">
                <Link to="/list-your-condo/apply">
                  <Button variant="primary" size="sm">
                    List your condo free
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {buildingListings.map((l) => (
                <ListingCard key={l.id} listing={l} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
