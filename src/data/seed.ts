import type { Activity, Amenity, Application, Area, Building, Inquiry, Listing, ListingCore, Market } from './types';
import { gallery, localImages, pools } from './images';

const HOUR = 3600_000;
const DAY = 24 * HOUR;

export const FOUNDING_SPOTS_TOTAL = 25;

export const markets: Market[] = [
  {
    id: 'grand-strand', name: 'Grand Strand', region: 'South Carolina', status: 'live', showComingSoon: true,
    eyebrow: 'Grand Strand, South Carolina',
    headline: 'Beach condos, straight from the people who love them.',
    support: 'Browse owner-listed condos in North Myrtle Beach, Myrtle Beach, and Surfside Beach. Contact owners directly, no middlemen.',
  },
  {
    id: 'gulf-shores', name: 'Gulf Shores', region: 'Alabama', status: 'planned', showComingSoon: true,
    eyebrow: 'Gulf Shores, Alabama · Coming soon',
    headline: 'The Gulf Coast is next.',
    support: 'We are preparing owner-listed condos in Gulf Shores and Orange Beach. Owners can reserve a founding spot ahead of launch.',
  },
  {
    id: 'outer-banks', name: 'Outer Banks', region: 'North Carolina', status: 'planned', showComingSoon: false,
    eyebrow: 'Outer Banks, North Carolina · Coming soon',
    headline: 'Quiet dunes, coming to the directory.',
    support: 'Nags Head and Kill Devil Hills are on our list. Owners can register interest today.',
  },
];

export const areas: Area[] = [
  {
    id: 'north-myrtle-beach', market: 'grand-strand', name: 'North Myrtle Beach',
    descriptor: 'Wide family beaches and Ocean Drive',
    description: 'Broad, gently sloping beaches with Cherry Grove at the north end and the shag-dancing heritage of Ocean Drive at its heart. Calmer than the central Strand, and a favorite for multi-generation family trips.',
    image: localImages.nmb,
  },
  {
    id: 'myrtle-beach', market: 'grand-strand', name: 'Myrtle Beach',
    descriptor: 'The boardwalk and the central Strand',
    description: 'The center of the Grand Strand: a 1.2-mile oceanfront boardwalk, Broadway-area entertainment, and dining within walking distance of many buildings. Ideal when you want everything close by.',
    image: { ...pools.beach[0], alt: 'Wide sandy beach along the central Grand Strand' },
  },
  {
    id: 'surfside-beach', market: 'grand-strand', name: 'Surfside Beach',
    descriptor: 'Quiet sand and a classic pier',
    description: 'A smaller, family-oriented town with low-rise buildings, an easygoing pace, and a long fishing pier. Mornings here are quiet, and the beach rarely feels crowded.',
    image: localImages.surfside,
  },
  { id: 'gulf-shores', market: 'gulf-shores', name: 'Gulf Shores', descriptor: 'White sand on the Gulf', description: 'Sugar-white sand and calm Gulf water. Owner listings open soon.', image: { ...pools.beach[4], alt: 'Gulf shoreline' } },
  { id: 'orange-beach', market: 'gulf-shores', name: 'Orange Beach', descriptor: 'Marinas and quiet coves', description: 'Back-bay marinas and quiet beaches. Owner listings open soon.', image: { ...pools.beach[6], alt: 'Coastal shoreline' } },
  { id: 'nags-head', market: 'outer-banks', name: 'Nags Head', descriptor: 'Dunes and long piers', description: 'Tall dunes and classic piers. Owner listings open soon.', image: { ...pools.beach[1], alt: 'Dunes by the sea' } },
];

export const amenities: Amenity[] = [
  { id: 'oceanfront', label: 'Oceanfront', group: 'beach', filter: true },
  { id: 'pool', label: 'Pool', group: 'beach', filter: true },
  { id: 'lazy-river', label: 'Lazy river', group: 'beach', filter: true },
  { id: 'hot-tub', label: 'Hot tub', group: 'beach', filter: true },
  { id: 'indoor-pool', label: 'Indoor pool', group: 'beach' },
  { id: 'kids-pool', label: 'Kids pool', group: 'beach' },
  { id: 'beach-access', label: 'Private beach access', group: 'beach' },
  { id: 'beach-gear', label: 'Beach chairs and umbrella', group: 'beach' },
  { id: 'balcony', label: 'Balcony', group: 'comfort', filter: true },
  { id: 'ac', label: 'Air conditioning', group: 'comfort' },
  { id: 'wifi', label: 'Fast Wi-Fi', group: 'comfort' },
  { id: 'full-kitchen', label: 'Full kitchen', group: 'comfort' },
  { id: 'smart-tv', label: 'Smart TV', group: 'comfort' },
  { id: 'workspace', label: 'Desk / workspace', group: 'comfort' },
  { id: 'crib', label: 'Crib and high chair', group: 'comfort' },
  { id: 'pet-friendly', label: 'Pet friendly', group: 'practical', filter: true },
  { id: 'elevator', label: 'Elevator', group: 'practical', filter: true },
  { id: 'free-parking', label: 'Free parking', group: 'practical', filter: true },
  { id: 'washer-dryer', label: 'Washer/dryer', group: 'practical', filter: true },
  { id: 'fitness', label: 'Fitness room', group: 'practical', filter: true },
];

export const buildings: Building[] = [
  { id: 'sea-oats-tower', areaId: 'north-myrtle-beach', name: 'Sea Oats Tower', street: 'S Ocean Blvd', floors: 18, pools: 3, yearBuilt: 2006, beachDistance: 'Oceanfront', notes: 'Oceanfront tower with indoor and outdoor pools and a long sundeck.', amenities: ['oceanfront', 'pool', 'indoor-pool', 'hot-tub', 'elevator', 'free-parking'], image: pools.building[2] },
  { id: 'the-pelican-club', areaId: 'north-myrtle-beach', name: 'The Pelican Club', street: 'Ocean Dr', floors: 12, pools: 2, yearBuilt: 2001, beachDistance: '1 min walk', notes: 'Known for its lazy river and hot tub courtyard.', amenities: ['pool', 'lazy-river', 'hot-tub', 'elevator'], image: pools.pool[0] },
  { id: 'cherry-point-terrace', areaId: 'north-myrtle-beach', name: 'Cherry Point Terrace', street: 'Sea Mountain Hwy', floors: 9, pools: 1, yearBuilt: 1998, beachDistance: '3 min walk', notes: 'Quiet, pet-friendly building near Cherry Grove.', amenities: ['pool', 'pet-friendly', 'elevator', 'free-parking'], image: pools.building[1] },
  { id: 'dune-crest-resort', areaId: 'myrtle-beach', name: 'Dune Crest Resort', street: 'N Ocean Blvd', floors: 24, pools: 4, yearBuilt: 2009, beachDistance: 'Oceanfront', notes: 'Large resort building with a fitness room and kids pool.', amenities: ['oceanfront', 'pool', 'kids-pool', 'fitness', 'elevator'], image: pools.building[0] },
  { id: 'harbor-light-suites', areaId: 'myrtle-beach', name: 'Harbor Light Suites', street: '9th Ave N', floors: 15, pools: 2, yearBuilt: 2004, beachDistance: '2 min walk', notes: 'An easy walk to the boardwalk and Broadway-area dining.', amenities: ['pool', 'elevator'], image: pools.building[4] },
  { id: 'the-windward', areaId: 'myrtle-beach', name: 'The Windward', street: 'Ocean Blvd', floors: 20, pools: 2, yearBuilt: 2012, beachDistance: 'Oceanfront', notes: 'Rooftop pool and deep private balconies on every unit.', amenities: ['oceanfront', 'pool', 'balcony', 'elevator', 'fitness'], image: pools.building[3] },
  { id: 'marsh-wren-villas', areaId: 'surfside-beach', name: 'Marsh Wren Villas', street: 'Surfside Dr', floors: 6, pools: 1, yearBuilt: 1999, beachDistance: '5 min walk', notes: 'Low-rise villas with free parking at the door.', amenities: ['pool', 'free-parking'], image: pools.pool[4] },
  { id: 'pier-view-condominiums', areaId: 'surfside-beach', name: 'Pier View Condominiums', street: 'N Ocean Blvd', floors: 10, pools: 2, yearBuilt: 2003, beachDistance: 'Oceanfront', notes: 'Oceanfront, a short stroll from the pier.', amenities: ['oceanfront', 'pool', 'elevator'], image: pools.pool[2] },
];

const b = (id: string) => buildings.find((x) => x.id === id)!;

const notes = (pets = 'No pets', min = '3 nights; 7 nights June to August') => ({
  checkIn: 'Check-in 4:00 PM, check-out 10:00 AM', pets, smoking: 'Non-smoking unit and balcony', minStay: min,
});

const owner = (first: string, last: string, note = 'Usually replies within a few hours'): ListingCore['owner'] => ({
  first, last, email: `${first.split(' ')[0].toLowerCase()}.${last.toLowerCase()}@example.com`, phone: '(843) 555-01' + String(first.length * 7).padStart(2, '0'), preferred: 'Email', responseNote: note,
});

type Seed = Omit<Listing, 'id' | 'status' | 'createdAt' | 'updatedAt' | 'photos' | 'areaId'> & { seed: number; count: number; beach: number; age: number };

const seeds: Seed[] = [
  {
    slug: 'sunrise-2br-sea-oats-tower', title: 'Sunrise 2BR with Full Ocean View', buildingId: 'sea-oats-tower', floor: 14, bedrooms: 2, bathrooms: 2, sleeps: 6, view: 'Oceanfront',
    amenities: ['oceanfront', 'pool', 'indoor-pool', 'hot-tub', 'balcony', 'elevator', 'free-parking', 'washer-dryer', 'wifi', 'ac', 'full-kitchen', 'beach-gear'],
    rateLow: 145, rateHigh: 265, featured: true, seed: 0, count: 12, beach: 0, age: 40,
    description: [
      'The balcony faces due east, so the sun comes up directly over the water while the coffee brews. We bought this unit in 2019 and redid it in soft whites and natural oak, with blackout shades in both bedrooms for the late sleepers.',
      'The primary has a king bed and its own bath with a walk-in shower. The second bedroom has two queens, and the sofa in the living room pulls out for a fifth and sixth guest. The kitchen is fully stocked, including a good chef’s knife.',
      'Sea Oats Tower has an indoor pool for cooler mornings and a long outdoor sundeck. We leave beach chairs and an umbrella in the hall closet. Parking is free for one car.',
    ],
    houseNotes: notes(), sleeping: [{ room: 'Primary bedroom', beds: '1 king' }, { room: 'Guest bedroom', beds: '2 queens' }, { room: 'Living room', beds: 'Queen sleeper sofa' }],
    owner: owner('Marlene', 'Hughes'), externalUrl: 'https://www.example.com/marlene-sea-oats',
  },
  {
    slug: 'family-3br-pelican-club', title: 'Family 3BR by the Lazy River', buildingId: 'the-pelican-club', floor: 6, bedrooms: 3, bathrooms: 3, sleeps: 8, view: 'Pool view',
    amenities: ['pool', 'lazy-river', 'hot-tub', 'balcony', 'elevator', 'washer-dryer', 'wifi', 'ac', 'full-kitchen', 'crib', 'smart-tv'],
    rateLow: 185, rateHigh: 310, featured: true, seed: 1, count: 11, beach: 1, age: 38,
    description: [
      'Our kids learned to float on the Pelican Club lazy river, and the balcony looks right down on it, so you can watch the pool and still see a sliver of ocean between the towers.',
      'Three bedrooms each have their own bathroom, which makes a real difference for two families sharing. We keep a crib, a high chair, and a box of sand toys in the hall closet.',
      'The building is a one-minute walk to the beach along a boardwalk path. Ocean Drive restaurants are a short drive or a long walk.',
    ],
    houseNotes: notes(), sleeping: [{ room: 'Primary bedroom', beds: '1 king' }, { room: 'Bedroom 2', beds: '1 queen' }, { room: 'Bedroom 3', beds: '2 twins' }, { room: 'Living room', beds: 'Queen sleeper sofa' }],
    owner: owner('Dev', 'Raman', 'Usually replies the same day'), externalUrl: 'https://www.example.com/pelican-3br',
  },
  {
    slug: 'quiet-1br-cherry-point', title: 'Quiet 1BR, Pet Friendly, Cherry Grove', buildingId: 'cherry-point-terrace', floor: 3, bedrooms: 1, bathrooms: 1, sleeps: 4, view: 'Garden view',
    amenities: ['pool', 'pet-friendly', 'elevator', 'free-parking', 'wifi', 'ac', 'full-kitchen', 'workspace'],
    rateLow: 110, rateHigh: 175, featured: false, seed: 2, count: 9, beach: 2, age: 34,
    description: [
      'A simple, comfortable one-bedroom for couples, a small family, or anyone traveling with a well-behaved dog. Cherry Point Terrace is one of the few buildings nearby that welcomes pets.',
      'The bedroom has a queen bed, and the living room sofa sleeps two more. There is a small desk by the window with a strong Wi-Fi signal if you need to check in on work.',
      'It is a three-minute walk to the beach and a short drive to Cherry Grove Pier and the marsh boardwalks, which are lovely at sunset.',
    ],
    houseNotes: notes('Up to 2 dogs, with a pet fee paid to the owner', '2 nights; 5 nights June to August'), sleeping: [{ room: 'Bedroom', beds: '1 queen' }, { room: 'Living room', beds: 'Full sleeper sofa' }],
    owner: owner('Tamika', 'Brooks'),
  },
  {
    slug: 'corner-4br-sea-oats-tower', title: 'Corner 4BR Oceanfront Retreat', buildingId: 'sea-oats-tower', floor: 17, bedrooms: 4, bathrooms: 4, sleeps: 12, view: 'Oceanfront',
    amenities: ['oceanfront', 'pool', 'indoor-pool', 'hot-tub', 'balcony', 'elevator', 'free-parking', 'washer-dryer', 'wifi', 'ac', 'full-kitchen', 'smart-tv', 'beach-gear'],
    rateLow: 260, rateHigh: 340, featured: true, seed: 3, count: 12, beach: 3, age: 31,
    description: [
      'A corner unit on the seventeenth floor, with windows on two sides and a wraparound balcony that sees the ocean, the beach to the north, and the marsh at dusk.',
      'Four bedrooms and four full baths sleep twelve comfortably. The dining table seats ten, and the kitchen has two dishwashers, which we promise you will appreciate.',
      'We hand over the keys in person when we can, and we keep a printed guide of our favorite local spots on the counter.',
    ],
    houseNotes: notes('No pets', '4 nights; 7 nights June to August'), sleeping: [{ room: 'Primary bedroom', beds: '1 king' }, { room: 'Bedroom 2', beds: '1 king' }, { room: 'Bedroom 3', beds: '2 queens' }, { room: 'Bedroom 4', beds: 'Bunk beds and 1 twin' }],
    owner: owner('Greg and Linda', 'Patterson', 'Usually reply within a day'), externalUrl: 'https://www.example.com/patterson-corner',
  },
  {
    slug: 'bright-2br-dune-crest', title: 'Bright 2BR with Kids Pool and Gym', buildingId: 'dune-crest-resort', floor: 11, bedrooms: 2, bathrooms: 2, sleeps: 6, view: 'Ocean view',
    amenities: ['pool', 'kids-pool', 'fitness', 'balcony', 'elevator', 'washer-dryer', 'wifi', 'ac', 'full-kitchen'],
    rateLow: 150, rateHigh: 240, featured: true, seed: 4, count: 10, beach: 4, age: 27,
    description: [
      'Light pours into this eleventh-floor unit all afternoon. The ocean view is angled from the balcony, and the sound of the surf carries up at night.',
      'Dune Crest has a shallow kids pool, a fitness room with real equipment, and a sundeck right on the sand. The unit itself has a king bedroom, a queen bedroom, and a sleeper sofa.',
      'Restaurants along the north end of Ocean Blvd are a short walk away, and the boardwalk is a ten-minute drive.',
    ],
    houseNotes: notes(), sleeping: [{ room: 'Primary bedroom', beds: '1 king' }, { room: 'Guest bedroom', beds: '1 queen' }, { room: 'Living room', beds: 'Queen sleeper sofa' }],
    owner: owner('Priya', 'Natarajan'),
  },
  {
    slug: 'boardwalk-1br-harbor-light', title: 'Boardwalk 1BR, Walk Everywhere', buildingId: 'harbor-light-suites', floor: 8, bedrooms: 1, bathrooms: 1, sleeps: 4, view: 'Ocean view',
    amenities: ['pool', 'balcony', 'elevator', 'wifi', 'ac', 'full-kitchen', 'smart-tv'],
    rateLow: 120, rateHigh: 195, featured: false, seed: 5, count: 9, beach: 5, age: 24,
    description: [
      'Leave the car parked. Harbor Light Suites is two minutes from the sand and a short stroll to the boardwalk, the observation wheel, and dozens of places to eat.',
      'The one-bedroom is freshly painted, with a queen bed, a sleeper sofa, and a balcony with a partial ocean view that is perfect for evening drinks.',
      'Ideal for couples or a small family who want to be in the middle of everything and come back to somewhere calm.',
    ],
    houseNotes: notes('No pets', '2 nights; 4 nights June to August'), sleeping: [{ room: 'Bedroom', beds: '1 queen' }, { room: 'Living room', beds: 'Full sleeper sofa' }],
    owner: owner('Anthony', 'Russo', 'Usually replies within an hour'),
  },
  {
    slug: 'high-floor-3br-windward', title: '3BR High Floor with Rooftop Pool', buildingId: 'the-windward', floor: 18, bedrooms: 3, bathrooms: 2, sleeps: 8, view: 'Oceanfront',
    amenities: ['oceanfront', 'pool', 'balcony', 'elevator', 'fitness', 'washer-dryer', 'wifi', 'ac', 'full-kitchen', 'smart-tv'],
    rateLow: 210, rateHigh: 320, featured: true, seed: 6, count: 11, beach: 6, age: 20,
    description: [
      'From the eighteenth floor the ocean fills every window. The Windward is one of the newer buildings on the Strand, and the rooftop pool is the best place in town to watch the weather roll in.',
      'Three bedrooms, two full baths, and a deep private balcony with seating for six. The kitchen opens to the living room, so whoever is cooking still gets the view.',
      'We are a family of five ourselves, and we stock the unit the way we like to find it.',
    ],
    houseNotes: notes(), sleeping: [{ room: 'Primary bedroom', beds: '1 king' }, { room: 'Bedroom 2', beds: '1 queen' }, { room: 'Bedroom 3', beds: '2 twins' }],
    owner: owner('Colleen', 'Murphy'), externalUrl: 'https://www.example.com/windward-1804',
  },
  {
    slug: 'calm-2br-windward', title: 'Calm 2BR with Wide Balcony', buildingId: 'the-windward', floor: 9, bedrooms: 2, bathrooms: 2, sleeps: 6, view: 'Ocean view',
    amenities: ['oceanfront', 'pool', 'balcony', 'elevator', 'fitness', 'washer-dryer', 'wifi', 'ac', 'full-kitchen', 'workspace'],
    rateLow: 160, rateHigh: 250, featured: false, seed: 7, count: 10, beach: 7, age: 16,
    description: [
      'A quiet two-bedroom with one of the widest balconies in the building. We furnished it simply, with good mattresses and linen bedding, and left room to breathe.',
      'The second bedroom doubles as an office with a proper desk. Both bedrooms have their own bath.',
      'Guests have access to The Windward rooftop pool and fitness room. Parking is in the covered garage.',
    ],
    houseNotes: notes(), sleeping: [{ room: 'Primary bedroom', beds: '1 king' }, { room: 'Guest bedroom', beds: '1 queen and desk' }, { room: 'Living room', beds: 'Queen sleeper sofa' }],
    owner: owner('Rob', 'Delgado'),
  },
  {
    slug: 'low-rise-2br-marsh-wren', title: 'Low-Rise 2BR Villa near the Marsh', buildingId: 'marsh-wren-villas', floor: 2, bedrooms: 2, bathrooms: 2, sleeps: 6, view: 'Garden view',
    amenities: ['pool', 'free-parking', 'washer-dryer', 'wifi', 'ac', 'full-kitchen', 'beach-gear', 'crib'],
    rateLow: 125, rateHigh: 190, featured: false, seed: 8, count: 9, beach: 8, age: 12,
    description: [
      'If elevators and crowds are not your thing, Marsh Wren Villas is a breath of fresh air. Park at the door, carry the cooler up one flight, and you are home.',
      'The villa has two bedrooms, two baths, and a screened porch that looks over live oaks. It is a five-minute walk to a quiet stretch of beach.',
      'Surfside’s pier, coffee shops, and a good fish market are all close by.',
    ],
    houseNotes: notes('No pets', '3 nights; 7 nights June to August'), sleeping: [{ room: 'Primary bedroom', beds: '1 queen' }, { room: 'Guest bedroom', beds: '2 twins' }, { room: 'Living room', beds: 'Full sleeper sofa' }],
    owner: owner('Naomi', 'Fischer'),
  },
  {
    slug: 'oceanfront-2br-pier-view', title: 'Oceanfront 2BR Facing the Pier', buildingId: 'pier-view-condominiums', floor: 7, bedrooms: 2, bathrooms: 2, sleeps: 6, view: 'Oceanfront',
    amenities: ['oceanfront', 'pool', 'balcony', 'elevator', 'washer-dryer', 'wifi', 'ac', 'full-kitchen', 'smart-tv', 'beach-gear'],
    rateLow: 155, rateHigh: 245, featured: true, seed: 9, count: 10, beach: 0, age: 8,
    description: [
      'Straight out from the balcony is the Surfside pier, with fishermen at dawn and lights along the rail at night.',
      'Two bedrooms and two baths, an updated kitchen, and a living room arranged around the view. We added a second balcony chair set because everyone wants to be out there.',
      'Pier View is oceanfront, with an outdoor pool and direct beach access.',
    ],
    houseNotes: notes(), sleeping: [{ room: 'Primary bedroom', beds: '1 king' }, { room: 'Guest bedroom', beds: '2 queens' }],
    owner: owner('Luis', 'Ortega'), externalUrl: 'https://www.example.com/pierview-704',
  },
  {
    slug: 'family-suite-3br-dune-crest', title: '3BR Family Suite, Steps to Sand', buildingId: 'dune-crest-resort', floor: 5, bedrooms: 3, bathrooms: 3, sleeps: 10, view: 'Pool view',
    amenities: ['oceanfront', 'pool', 'kids-pool', 'fitness', 'elevator', 'washer-dryer', 'wifi', 'ac', 'full-kitchen', 'crib'],
    rateLow: 195, rateHigh: 295, featured: false, seed: 10, count: 10, beach: 1, age: 5,
    description: [
      'A low floor means quick trips down to the pool and the beach, which matters when you are hauling toys, snacks, and small children.',
      'Three bedrooms, three baths, and a bunk room nook that kids love. The living room seats everyone for movie night.',
      'Dune Crest has a kids pool, a fitness room, and an on-site café for morning coffee.',
    ],
    houseNotes: notes(), sleeping: [{ room: 'Primary bedroom', beds: '1 king' }, { room: 'Bedroom 2', beds: '2 queens' }, { room: 'Bunk nook', beds: 'Twin bunk beds' }],
    owner: owner('Heather', 'Lindqvist'),
  },
  {
    slug: 'simple-1br-pier-view', title: 'Simple 1BR with Sunrise Balcony', buildingId: 'pier-view-condominiums', floor: 4, bedrooms: 1, bathrooms: 1, sleeps: 4, view: 'Ocean view',
    amenities: ['oceanfront', 'pool', 'balcony', 'elevator', 'wifi', 'ac', 'full-kitchen'],
    rateLow: 115, rateHigh: 180, featured: false, seed: 11, count: 8, beach: 2, age: 2,
    description: [
      'A clean, straightforward one-bedroom with a balcony that catches the sunrise. Good for couples, solo travelers, or a small family on a budget.',
      'Queen bed in the bedroom, a sleeper sofa in the living room, and a kitchen with the basics done well.',
      'Pier View has an oceanfront pool, and the pier is a short walk up the beach.',
    ],
    houseNotes: notes('No pets', '2 nights; 5 nights June to August'), sleeping: [{ room: 'Bedroom', beds: '1 queen' }, { room: 'Living room', beds: 'Full sleeper sofa' }],
    owner: owner('Calvin', 'Ware'),
  },
];

export function seedListings(now = Date.now()): Listing[] {
  return seeds.map(({ seed, count, beach, age, ...s }, i) => {
    const bld = b(s.buildingId);
    return {
      ...s,
      id: `lst-${i + 1}`,
      areaId: bld.areaId,
      status: 'live',
      photos: gallery(seed, count, bld.image, beach),
      createdAt: now - age * DAY,
      updatedAt: now - Math.max(1, age - 3) * DAY,
    } satisfies Listing;
  });
}

const appCore = (p: Partial<ListingCore> & Pick<ListingCore, 'title' | 'buildingId' | 'bedrooms'>, seed: number, count: number): ListingCore => {
  const bld = b(p.buildingId);
  return {
    areaId: bld.areaId, floor: 5, bathrooms: Math.max(1, p.bedrooms), sleeps: p.bedrooms * 2 + 2, view: 'Ocean view',
    amenities: ['pool', 'elevator', 'wifi', 'ac', 'full-kitchen'], photos: gallery(seed, count, bld.image, seed),
    rateLow: 120, rateHigh: 200,
    description: [], houseNotes: notes(), sleeping: [], owner: owner('Owner', 'Sample'),
    ...p,
  } as ListingCore;
};

export function seedApplications(now = Date.now()): Application[] {
  return [
    {
      id: 'app-45', ref: 'RBC-2026-0045', status: 'pending', submittedAt: now - 2 * DAY - 3 * HOUR,
      flags: ['Amenity details incomplete: pool type not specified'],
      data: appCore({
        title: '3BR Corner Unit, Pool View', buildingId: 'the-windward', bedrooms: 3, bathrooms: 2, sleeps: 8, floor: 12, view: 'Pool view',
        amenities: ['pool', 'balcony', 'elevator', 'wifi', 'ac', 'full-kitchen'], rateLow: 190, rateHigh: 290,
        description: ['A corner three-bedroom on the twelfth floor with windows on two sides and a balcony over the pool deck.', 'Two full baths, an open kitchen, and room for eight. The Windward rooftop pool is two floors up the elevator.'],
        sleeping: [{ room: 'Primary bedroom', beds: '1 king' }, { room: 'Bedroom 2', beds: '1 queen' }, { room: 'Bedroom 3', beds: '2 twins' }],
        owner: owner('Janelle', 'Carter'), externalUrl: 'https://www.example.com/windward-1201',
      }, 3, 14),
    },
    {
      id: 'app-46', ref: 'RBC-2026-0046', status: 'pending', submittedAt: now - 1 * DAY - 5 * HOUR,
      data: appCore({
        title: 'Bright 1BR near the Boardwalk', buildingId: 'harbor-light-suites', bedrooms: 1, bathrooms: 1, sleeps: 4, floor: 10, view: 'Ocean view',
        amenities: ['pool', 'balcony', 'elevator', 'wifi', 'ac', 'full-kitchen', 'smart-tv'], rateLow: 125, rateHigh: 205,
        description: ['A tenth-floor one-bedroom, two minutes from the sand and a short walk to the boardwalk.', 'Queen bedroom, sleeper sofa, and a balcony with a partial ocean view. Newly updated kitchen and bath.'],
        sleeping: [{ room: 'Bedroom', beds: '1 queen' }, { room: 'Living room', beds: 'Full sleeper sofa' }],
        owner: owner('Marcus', 'Bell'),
      }, 13, 9),
    },
    {
      id: 'app-47', ref: 'RBC-2026-0047', status: 'pending', submittedAt: now - 3 * HOUR,
      data: appCore({
        title: 'Cozy Studio Steps from the Pier', buildingId: 'pier-view-condominiums', bedrooms: 0, bathrooms: 1, sleeps: 2, floor: 3, view: 'Ocean view',
        amenities: ['oceanfront', 'pool', 'elevator', 'wifi', 'ac'], rateLow: 95, rateHigh: 150,
        description: ['A compact oceanfront studio for two, steps from the Surfside pier.', 'Queen bed, kitchenette, and a small balcony for morning coffee.'],
        sleeping: [{ room: 'Studio', beds: '1 queen' }],
        owner: owner('Elena', 'Vasquez'), externalUrl: 'https://www.example.com/pierview-studio',
      }, 15, 6),
    },
  ];
}

const inq = (i: number, listingId: string, name: string, guests: number, checkIn: string, checkOut: string, message: string, hoursAgo: number, status: Inquiry['status']): Inquiry => ({
  id: `inq-${i}`, listingId, name, email: `${name.toLowerCase().split(' ')[0]}@example.com`, guests, checkIn, checkOut, message, createdAt: Date.now() - hoursAgo * HOUR, status,
});

export function seedInquiries(): Inquiry[] {
  return [
    inq(1, 'lst-1', 'Rachel Kim', 5, 'Jun 14, 2027', 'Jun 21, 2027', 'We are two couples and a toddler. Is the pack-and-play included, and is the indoor pool open in June?', 3, 'Delivered'),
    inq(2, 'lst-2', 'Tom Alvarez', 8, 'Jul 3, 2027', 'Jul 10, 2027', 'Hoping to book the July 4th week for our family reunion. Is the lazy river open in early July?', 9, 'Opened'),
    inq(3, 'lst-3', 'Sandra Lowe', 2, 'Sep 12, 2027', 'Sep 16, 2027', 'We travel with a small terrier. Is there a weight limit for pets?', 20, 'Opened'),
    inq(4, 'lst-7', 'Brian O’Neal', 7, 'Jun 28, 2027', 'Jul 5, 2027', 'Do you allow early check-in? We drive down overnight from Ohio.', 26, 'Delivered'),
    inq(5, 'lst-10', 'Keisha Grant', 4, 'May 22, 2027', 'May 26, 2027', 'Looking for a quiet long weekend. Is the balcony shared with the next unit?', 31, 'Opened'),
    inq(6, 'lst-4', 'Paul and Jen Steiner', 12, 'Aug 1, 2027', 'Aug 8, 2027', 'Three families, nine kids. Is there a dining table big enough for everyone?', 44, 'Opened'),
    inq(7, 'lst-5', 'Amira Haddad', 4, 'Jun 7, 2027', 'Jun 12, 2027', 'Is the kids pool heated? Our two are five and seven.', 52, 'Delivered'),
    inq(8, 'lst-6', 'Chris Moreno', 2, 'Oct 15, 2026', 'Oct 18, 2026', 'Anniversary trip. Can we walk to dinner on the boardwalk from here?', 60, 'Opened'),
    inq(9, 'lst-9', 'Diane Foster', 5, 'Jul 18, 2027', 'Jul 25, 2027', 'My father uses a walker. Is the villa on the second floor reachable without stairs?', 70, 'Opened'),
    inq(10, 'lst-11', 'Jamal Wright', 9, 'Jun 21, 2028', 'Jun 28, 2028', 'Planning ahead for next summer. Do you take inquiries this far out?', 84, 'Delivered'),
    inq(11, 'lst-8', 'Laura Chen', 3, 'Nov 6, 2026', 'Nov 13, 2026', 'I would be working remotely during the week. How fast is the Wi-Fi?', 96, 'Opened'),
    inq(12, 'lst-12', 'Mike Daniels', 2, 'Apr 10, 2027', 'Apr 14, 2027', 'Is the pool open in April?', 110, 'Opened'),
    inq(13, 'lst-1', 'Nicole Baptiste', 4, 'Aug 15, 2027', 'Aug 22, 2027', 'Does the unit have a coffee maker that takes pods or ground coffee?', 130, 'Opened'),
    inq(14, 'lst-2', 'Greg Holloway', 6, 'Jun 5, 2028', 'Jun 12, 2028', 'Do you offer a discount for a two-week stay?', 150, 'Opened'),
  ];
}

export function seedActivity(): Activity[] {
  const now = Date.now();
  return [
    { id: 'act-1', type: 'submitted', text: 'New application: Cozy Studio Steps from the Pier', at: now - 3 * HOUR },
    { id: 'act-2', type: 'inquiry', text: 'Inquiry delivered to Marlene (Sunrise 2BR)', at: now - 3.2 * HOUR },
    { id: 'act-3', type: 'inquiry', text: 'Inquiry delivered to Dev (Family 3BR)', at: now - 9 * HOUR },
    { id: 'act-4', type: 'edited', text: 'Updated rates on Calm 2BR with Wide Balcony', at: now - 22 * HOUR },
    { id: 'act-5', type: 'submitted', text: 'New application: Bright 1BR near the Boardwalk', at: now - 29 * HOUR },
    { id: 'act-6', type: 'approved', text: 'Approved and published: Simple 1BR with Sunrise Balcony', at: now - 2 * DAY },
    { id: 'act-7', type: 'submitted', text: 'New application: 3BR Corner Unit, Pool View', at: now - 2.1 * DAY },
    { id: 'act-8', type: 'approved', text: 'Approved and published: 3BR Family Suite, Steps to Sand', at: now - 5 * DAY },
    { id: 'act-9', type: 'edited', text: 'Replaced cover photo on Oceanfront 2BR Facing the Pier', at: now - 6 * DAY },
    { id: 'act-10', type: 'approved', text: 'Approved and published: Oceanfront 2BR Facing the Pier', at: now - 8 * DAY },
  ];
}
