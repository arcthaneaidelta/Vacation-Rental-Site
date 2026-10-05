import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useStore, selectLive } from '../store/useStore';
import { 
  filtersFromParams, 
  filtersToParams, 
  applyFilters, 
  mostRestrictive, 
  emptyFilters, 
  type Filters 
} from '../lib/filters';
import { FilterBar } from '../components/listing/FilterBar';
import { ListingCard } from '../components/listing/ListingCard';
import { CardSkeleton } from '../components/ui/Skeleton';
import { EmptyState } from '../components/ui/EmptyState';
import { Button } from '../components/ui/Button';
import { SearchX, Heart, Sparkles } from 'lucide-react';

export const Browse: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const liveListings = useStore(selectLive);
  const savedIds = useStore((s) => s.saved);

  const [layout, setLayout] = useState<'grid' | 'list'>('grid');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const showSavedOnly = searchParams.get('saved') === 'true';

  // Parse filters from URL
  const filters: Filters = useMemo(() => {
    return filtersFromParams(searchParams);
  }, [searchParams]);

  // Update filters in URL
  const handleFiltersChange = (next: Filters) => {
    const params = filtersToParams(next);
    if (showSavedOnly) params.set('saved', 'true');
    setSearchParams(params);
    setPage(1);
  };

  // Base list to filter
  const baseList = useMemo(() => {
    if (showSavedOnly) {
      return liveListings.filter((l) => savedIds.includes(l.id));
    }
    return liveListings;
  }, [liveListings, showSavedOnly, savedIds]);

  // Filtered and sorted listings
  const filteredListings = useMemo(() => {
    return applyFilters(baseList, filters);
  }, [baseList, filters]);

  // Paginated visible listings
  const pageSize = 12;
  const visibleListings = filteredListings.slice(0, page * pageSize);
  const hasMore = visibleListings.length < filteredListings.length;

  const restrictiveSuggestion = useMemo(() => {
    if (filteredListings.length === 0) {
      return mostRestrictive(baseList, filters);
    }
    return null;
  }, [baseList, filters, filteredListings.length]);

  return (
    <div className="flex-1 flex flex-col bg-sand-50">
      {/* Header Band */}
      <section className="bg-white border-b border-line-200 pt-28 pb-8">
        <div className="container-x">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
            <div>
              <span className="eyebrow block mb-1">
                {showSavedOnly ? 'Your Saved Condos' : 'Directory'}
              </span>
              <h1 className="h1-page font-serif text-tide-900">
                {showSavedOnly ? 'Saved Vacation Condos' : 'Condos on the Grand Strand'}
              </h1>
            </div>

            <div className="text-xs text-ink-600 tabular" aria-live="polite">
              Showing {filteredListings.length} {filteredListings.length === 1 ? 'condo' : 'condos'}
              {showSavedOnly && (
                <button
                  onClick={() => {
                    const p = new URLSearchParams(searchParams);
                    p.delete('saved');
                    setSearchParams(p);
                  }}
                  className="ml-2 text-brass-600 hover:underline font-semibold"
                >
                  View all
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Sticky Filter Bar */}
      <FilterBar
        filters={filters}
        onChange={handleFiltersChange}
        resultCount={filteredListings.length}
        layout={layout}
        onLayoutChange={setLayout}
      />

      {/* Listings Grid / List Section */}
      <div className="container-x py-10 flex-1">
        {filteredListings.length === 0 ? (
          <div className="py-12">
            {showSavedOnly ? (
              <EmptyState
                icon={<Heart className="w-8 h-8 text-brass-600" />}
                title="No saved condos yet"
                message="Click the heart on any condo card to save your favorites for this trip."
                actionLabel="Browse all condos"
                onAction={() => {
                  const p = new URLSearchParams(searchParams);
                  p.delete('saved');
                  setSearchParams(p);
                }}
              />
            ) : (
              <EmptyState
                icon={<SearchX className="w-8 h-8 text-brass-600" />}
                title="No condos match those filters yet"
                message={
                  restrictiveSuggestion
                    ? `Try removing ${restrictiveSuggestion}, or clear all filters to see more results.`
                    : 'Try clearing your filters or changing your bedroom requirement.'
                }
                actionLabel="Clear all filters"
                onAction={() => handleFiltersChange(emptyFilters)}
              />
            )}

            {!showSavedOnly && (
              <div className="mt-8 text-center">
                <p className="text-xs text-ink-500 mb-2">Own a condo matching these criteria?</p>
                <Link to="/list-your-condo" className="text-xs font-semibold text-brass-600 hover:underline">
                  List your condo free for six months →
                </Link>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-10">
            <div
              className={
                layout === 'grid'
                  ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8'
                  : 'space-y-4'
              }
            >
              {visibleListings.map((listing, idx) => (
                <ListingCard
                  key={listing.id}
                  listing={listing}
                  layout={layout}
                  priority={idx < 3}
                />
              ))}
            </div>

            {/* Load More Pagination */}
            {hasMore && (
              <div className="text-center pt-4">
                <Button
                  variant="secondary"
                  size="md"
                  onClick={() => setPage((prev) => prev + 1)}
                >
                  Load more condos ({filteredListings.length - visibleListings.length} remaining)
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
