import React from 'react';
import { Link } from 'react-router-dom';
import { areas, buildings } from '../data/seed';
import { useStore, selectLive } from '../store/useStore';
import { ChevronRight, Building, ArrowRight } from 'lucide-react';

export const AreasIndex: React.FC = () => {
  const liveListings = useStore(selectLive);

  return (
    <div className="flex-1 flex flex-col bg-sand-50">
      {/* Header */}
      <section className="bg-white border-b border-line-200 pt-28 pb-10">
        <div className="container-x">
          <span className="eyebrow block mb-1">Coastal Directory</span>
          <h1 className="h1-page font-serif text-tide-900">
            Grand Strand Areas & Condo Buildings
          </h1>
          <p className="text-sm sm:text-base text-ink-600 mt-2 max-w-2xl leading-relaxed">
            RentABeachCondo organizes vacation rentals by specific coastal communities and premier condo buildings so you know exactly where you are staying.
          </p>
        </div>
      </section>

      {/* Areas & Buildings Grid */}
      <div className="container-x py-12 space-y-12">
        {areas
          .filter((a) => a.market === 'grand-strand')
          .map((area) => {
            const areaBuildings = buildings.filter((b) => b.areaId === area.id);
            const areaListings = liveListings.filter((l) => l.areaId === area.id);

            return (
              <div key={area.id} className="card p-6 sm:p-8 bg-white border border-line-200 shadow-1 space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-line-200 gap-3">
                  <div>
                    <span className="eyebrow !text-brass-600">Coastal Community</span>
                    <h2 className="font-serif text-2xl sm:text-3xl font-medium text-tide-900 mt-0.5">
                      {area.name}
                    </h2>
                    <p className="text-xs sm:text-sm text-ink-600 mt-1 max-w-xl">
                      {area.description}
                    </p>
                  </div>
                  <Link
                    to={`/areas/${area.id}`}
                    className="btn btn-secondary btn-sm shrink-0 self-start sm:self-center"
                  >
                    <span>View {area.name} ({areaListings.length})</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </Link>
                </div>

                {/* Buildings in this community */}
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-ink-500 mb-4">
                    Condo Buildings in {area.name}
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {areaBuildings.map((b) => {
                      const count = areaListings.filter((l) => l.buildingId === b.id).length;
                      return (
                        <Link
                          key={b.id}
                          to={`/areas/${area.id}/${b.id}`}
                          className="p-4 rounded-lg bg-sand-50 hover:bg-sand-100 border border-line-200 transition-colors flex items-center justify-between group"
                        >
                          <div className="min-w-0 pr-3">
                            <h5 className="font-serif text-base font-semibold text-tide-900 group-hover:text-brass-600 transition-colors truncate">
                              {b.name}
                            </h5>
                            <p className="text-xs text-ink-500 mt-0.5">
                              {b.street} · {b.beachDistance}
                            </p>
                            <span className="text-[11px] text-brass-600 font-medium block mt-1">
                              {count} {count === 1 ? 'condo listed' : 'condos listed'}
                            </span>
                          </div>
                          <ChevronRight className="w-4 h-4 text-ink-500 group-hover:text-tide-900 shrink-0" />
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};
