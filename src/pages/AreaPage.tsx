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
  ArrowRight, 
  Sparkles 
} from 'lucide-react';

export const AreaPage: React.FC = () => {
  const { area: areaId } = useParams<{ area: string }>();
  const liveListings = useStore(selectLive);

  const area = areas.find((a) => a.id === areaId) || areas[0];
  const areaBuildings = buildings.filter((b) => b.areaId === area.id);
  const areaListings = liveListings.filter((l) => l.areaId === area.id);

  return (
    <div className="flex-1 flex flex-col bg-sand-50">
      {/* Breadcrumbs */}
      <div className="bg-white border-b border-line-200 pt-24 pb-3">
        <div className="container-x flex items-center gap-1.5 text-xs text-ink-500">
          <Link to="/" className="hover:text-tide-900">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-line-300" />
          <Link to="/areas" className="hover:text-tide-900">Areas</Link>
          <ChevronRight className="w-3.5 h-3.5 text-line-300" />
          <span className="text-tide-900 font-semibold">{area.name}</span>
        </div>
      </div>

      {/* Area Hero */}
      <section className="relative min-h-[360px] bg-tide-900 text-white flex items-end p-6 sm:p-12 overflow-hidden">
        <img
          src={area.image.src}
          alt={area.name}
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 photo-scrim" />

        <div className="container-x relative z-10 max-w-2xl py-6 space-y-3">
          <span className="eyebrow !text-brass-500">Coastal Community</span>
          <h1 className="h1 text-white font-serif">{area.name}</h1>
          <p className="text-sm sm:text-base text-white/90 leading-relaxed font-sans">
            {area.description}
          </p>
          <div className="pt-1 flex items-center gap-4 text-xs text-white/80">
            <span>{areaBuildings.length} premier buildings</span>
            <span>·</span>
            <span>{areaListings.length} owner listings</span>
          </div>
        </div>
      </section>

      {/* Buildings in this Area */}
      <section className="section bg-white border-b border-line-200">
        <div className="container-x">
          <div className="mb-8">
            <span className="eyebrow block mb-1">Building Directory</span>
            <h2 className="h2 font-serif text-tide-900">Condo buildings in {area.name}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {areaBuildings.map((b) => {
              const bListings = areaListings.filter((l) => l.buildingId === b.id);
              return (
                <Link
                  key={b.id}
                  to={`/areas/${area.id}/${b.id}`}
                  className="card card-hover group overflow-hidden flex flex-col justify-between"
                >
                  <div className="aspect-[16/10] bg-sand-100 overflow-hidden relative">
                    <img
                      src={b.image.src}
                      alt={b.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-2.5 right-2.5 bg-white/90 px-2 py-0.5 rounded text-[11px] font-semibold text-tide-900 shadow-1">
                      {b.beachDistance}
                    </div>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-serif text-xl font-medium text-tide-900 group-hover:text-brass-600 transition-colors">
                        {b.name}
                      </h3>
                      <p className="text-xs text-ink-500 mt-1">
                        {b.street} · {b.floors} floors · Built in {b.yearBuilt}
                      </p>
                      <p className="text-xs text-ink-600 mt-2 line-clamp-2 leading-relaxed">
                        {b.notes}
                      </p>
                    </div>

                    <div className="pt-4 mt-4 border-t border-line-200 flex items-center justify-between text-xs">
                      <span className="font-semibold text-tide-900">
                        {bListings.length} {bListings.length === 1 ? 'condo listed' : 'condos listed'}
                      </span>
                      <span className="text-brass-600 font-semibold group-hover:underline flex items-center gap-1">
                        View building <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* All Listings in Area */}
      <section className="section bg-sand-50">
        <div className="container-x">
          <div className="flex items-baseline justify-between mb-8">
            <div>
              <span className="eyebrow block mb-1">Available Units</span>
              <h2 className="h2 font-serif text-tide-900">All condos in {area.name}</h2>
            </div>
            <Link
              to={`/browse?area=${area.id}`}
              className="text-xs font-semibold text-tide-900 hover:underline"
            >
              Filter these condos →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {areaListings.map((l) => (
              <ListingCard key={l.id} listing={l} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
