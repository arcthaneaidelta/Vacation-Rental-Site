export type MarketId = 'grand-strand' | 'gulf-shores' | 'outer-banks';

export interface Market {
  id: MarketId;
  name: string;
  region: string;
  status: 'live' | 'planned';
  showComingSoon: boolean;
  eyebrow: string;
  headline: string;
  support: string;
}

export interface Area {
  id: string;
  market: MarketId;
  name: string;
  descriptor: string;
  description: string;
  image: Photo;
}

export type AmenityId =
  | 'oceanfront' | 'pool' | 'indoor-pool' | 'lazy-river' | 'hot-tub' | 'kids-pool' | 'beach-access' | 'beach-gear'
  | 'balcony' | 'ac' | 'wifi' | 'full-kitchen' | 'smart-tv' | 'workspace' | 'crib'
  | 'pet-friendly' | 'elevator' | 'free-parking' | 'washer-dryer' | 'fitness';

export interface Amenity {
  id: AmenityId;
  label: string;
  group: 'beach' | 'comfort' | 'practical';
  filter?: boolean;
}

export interface Building {
  id: string;
  areaId: string;
  name: string;
  street: string;
  floors: number;
  pools: number;
  yearBuilt: number;
  beachDistance: string;
  notes: string;
  amenities: AmenityId[];
  image: Photo;
}

export interface Photo {
  id: string;
  src: string;
  kind: 'unsplash' | 'local' | 'blob';
  alt: string;
  color?: string;
  caption?: string;
}

export type ViewType = 'Oceanfront' | 'Ocean view' | 'Pool view' | 'Garden view';

export interface HouseNotes {
  checkIn: string;
  pets: string;
  smoking: string;
  minStay: string;
}

export interface Owner {
  first: string;
  last: string;
  email: string;
  phone: string;
  preferred: 'Email' | 'Phone' | 'Text';
  responseNote: string;
}

export interface ListingCore {
  title: string;
  buildingId: string;
  areaId: string;
  floor: number;
  bedrooms: number;
  bathrooms: number;
  sleeps: number;
  view: ViewType;
  amenities: AmenityId[];
  otherAmenity?: string;
  photos: Photo[];
  rateLow?: number;
  rateHigh?: number;
  description: string[];
  houseNotes: HouseNotes;
  sleeping: { room: string; beds: string }[];
  owner: Owner;
  externalUrl?: string;
}

export type ListingStatus = 'live' | 'draft' | 'archived';

export interface Listing extends ListingCore {
  id: string;
  slug: string;
  status: ListingStatus;
  featured: boolean;
  createdAt: number;
  updatedAt: number;
}

export type ApplicationStatus = 'pending' | 'changes' | 'approved' | 'rejected';

export interface Application {
  id: string;
  ref: string;
  status: ApplicationStatus;
  submittedAt: number;
  data: ListingCore;
  newBuilding?: { name: string; street: string };
  flags?: string[];
  decisionNote?: string;
  listingId?: string;
}

export interface Inquiry {
  id: string;
  listingId: string;
  name: string;
  email: string;
  phone?: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  message: string;
  createdAt: number;
  status: 'Delivered' | 'Opened';
  fresh?: boolean;
}

export type ActivityType = 'approved' | 'edited' | 'submitted' | 'inquiry' | 'archived' | 'removed' | 'changes' | 'rejected' | 'published' | 'restored';

export interface Activity {
  id: string;
  type: ActivityType;
  text: string;
  at: number;
}

export interface EmailLog {
  id: string;
  to: string;
  subject: string;
  body: string;
  at: number;
  kind: 'inquiry' | 'changes' | 'approved' | 'rejected' | 'contact';
}
