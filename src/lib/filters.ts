import type { AmenityId, Listing } from '../data/types';
import { amenities, buildings } from '../data/seed';

export type SortKey = 'featured' | 'newest' | 'bedrooms';
export interface Filters {
  area: string;
  building: string;
  beds: number; // 0 = any, 4 = 4+
  amenities: AmenityId[];
  sort: SortKey;
}

export const emptyFilters: Filters = { area: '', building: '', beds: 0, amenities: [], sort: 'featured' };

export function filtersFromParams(p: URLSearchParams): Filters {
  return {
    area: p.get('area') ?? '',
    building: p.get('building') ?? '',
    beds: Math.min(4, Math.max(0, Number(p.get('beds') ?? 0) || 0)),
    amenities: (p.get('amenities') ?? '').split(',').filter(Boolean) as AmenityId[],
    sort: (['featured', 'newest', 'bedrooms'].includes(p.get('sort') ?? '') ? p.get('sort') : 'featured') as SortKey,
  };
}

export function filtersToParams(f: Filters): URLSearchParams {
  const p = new URLSearchParams();
  if (f.area) p.set('area', f.area);
  if (f.building) p.set('building', f.building);
  if (f.beds) p.set('beds', String(f.beds));
  if (f.amenities.length) p.set('amenities', f.amenities.join(','));
  if (f.sort !== 'featured') p.set('sort', f.sort);
  return p;
}

const matchBeds = (l: Listing, beds: number) => !beds || (beds >= 4 ? l.bedrooms >= 4 : l.bedrooms === beds);

export function applyFilters(list: Listing[], f: Filters, skip?: keyof Filters | AmenityId): Listing[] {
  const out = list.filter((l) =>
    (skip === 'area' || !f.area || l.areaId === f.area) &&
    (skip === 'building' || !f.building || l.buildingId === f.building) &&
    (skip === 'beds' || matchBeds(l, f.beds)) &&
    f.amenities.every((a) => a === skip || l.amenities.includes(a)),
  );
  if (f.sort === 'newest') out.sort((a, b) => b.createdAt - a.createdAt);
  else if (f.sort === 'bedrooms') out.sort((a, b) => b.bedrooms - a.bedrooms);
  else out.sort((a, b) => Number(b.featured) - Number(a.featured) || b.createdAt - a.createdAt);
  return out;
}

/** Names the filter whose removal recovers the most results (for empty states). */
export function mostRestrictive(list: Listing[], f: Filters): string | null {
  const candidates: { label: string; n: number }[] = [];
  f.amenities.forEach((a) => candidates.push({ label: amenities.find((x) => x.id === a)?.label ?? a, n: applyFilters(list, f, a).length }));
  if (f.beds) candidates.push({ label: f.beds >= 4 ? '4+ bedrooms' : `${f.beds} bedroom${f.beds > 1 ? 's' : ''}`, n: applyFilters(list, f, 'beds').length });
  if (f.building) candidates.push({ label: buildings.find((b) => b.id === f.building)?.name ?? 'building', n: applyFilters(list, f, 'building').length });
  if (f.area) candidates.push({ label: 'the area filter', n: applyFilters(list, f, 'area').length });
  candidates.sort((a, b) => b.n - a.n);
  return candidates[0]?.n ? candidates[0].label : null;
}

export const activeFilterCount = (f: Filters) => (f.area ? 1 : 0) + (f.building ? 1 : 0) + (f.beds ? 1 : 0) + f.amenities.length;
