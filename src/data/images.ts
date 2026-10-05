import type { Photo } from './types';

/**
 * Image manifest. Licensed Unsplash photography (Unsplash License) plus three
 * locally generated editorial images. Every photo carries alt text and a
 * dominant colour placeholder; <Img> falls back to a sand block on failure.
 */
const u = (id: string, alt: string, color = '#E9E2D6'): Photo => ({ id, src: id, kind: 'unsplash', alt, color });

export const unsplashUrl = (id: string, w: number, h?: number) =>
  `https://images.unsplash.com/photo-${id}?w=${w}${h ? `&h=${h}&fit=crop` : ''}&q=70&auto=format`;

export const pools = {
  living: [
    u('1522708323590-d24dbb6b0267', 'Open living room with a sofa facing tall windows', '#D9D4CB'),
    u('1502672260266-1c1ef2d93688', 'Bright living room with a light sofa and wood floors', '#DCD6CC'),
    u('1560448204-e02f11c3d0e2', 'Living area with soft seating and natural light', '#E0D8CC'),
    u('1493809842364-78817add7ffb', 'Living room with a reading chair and plants', '#D4CFC6'),
    u('1586023492125-27b2c045efd7', 'Neutral living room with a low coffee table', '#D8D0C3'),
    u('1600210492486-724fe5c67fb0', 'Living room opening to a balcony', '#DAD3C8'),
    u('1600607687939-ce8a6c25118c', 'Open-plan living and dining space', '#D6D0C7'),
    u('1513694203232-719a280e022f', 'Cozy seating area with throw pillows', '#D9CFC2'),
    u('1554995207-c18c203602cb', 'Living room with linen sofa and large windows', '#E1DBD1'),
    u('1567767292278-a4f21aa2d36e', 'Sofa with cushions in a calm, bright room', '#DCD4C9'),
    u('1618221195710-dd6b41faaea6', 'Modern living room in soft neutral tones', '#D7D1C8'),
    u('1600566753190-17f0baa2a6c3', 'Spacious living room with a sectional sofa', '#DDD6CB'),
    u('1600566753086-00f18fb6b3ea', 'Living and kitchen area with an island', '#DBD5CC'),
    u('1600210491892-03d54c0aaf87', 'Light-filled living room with a rug', '#DCD5CA'),
    u('1600585154526-990dced4db0d', 'Lounge area with a view through glass doors', '#D5D0C8'),
    u('1560185007-cde436f6a4d0', 'Dining table set beside the living room', '#DDD4C6'),
    u('1560185893-a55cbc8c57e8', 'Simple living room with white walls', '#E2DCD2'),
    u('1560184897-ae75f418493e', 'Bedroom-adjacent sitting area', '#DED7CC'),
  ],
  bedroom: [
    u('1505693416388-ac5ce068fe85', 'Bedroom with white linens and soft light', '#DED9D0'),
    u('1616594039964-ae9021a400a0', 'Primary bedroom with a large upholstered bed', '#D8D1C6'),
    u('1595526114035-0d45ed16cfbf', 'Guest bedroom with neutral bedding', '#DCD5CB'),
    u('1631049307264-da0ec9d70304', 'King bedroom with bedside lamps', '#D3CBBF'),
    u('1582719478250-c89cae4dc85b', 'Bedroom with two queen beds', '#D9D2C6'),
    u('1590490360182-c33d57733427', 'Bedroom with a window seat', '#D6D0C6'),
    u('1578683010236-d716f9a3f461', 'Calm bedroom with wood accents', '#D7CDBF'),
    u('1505691938895-1758d7feb511', 'Bedroom with a bench at the foot of the bed', '#DDD6CC'),
    u('1615874959474-d609969a20ed', 'Bedroom with layered white bedding', '#DFD9CF'),
    u('1611892440504-42a792e24d32', 'Bedroom with a reading nook', '#D5CEC3'),
    u('1618773928121-c32242e63f39', 'Bedroom in soft sand tones', '#D9D1C4'),
  ],
  kitchen: [
    u('1484154218962-a197022b5858', 'Full kitchen with white cabinets', '#DCD8D2'),
    u('1556909114-f6e7ad7d3136', 'Kitchen with an island and stools', '#D7D2CA'),
    u('1600489000022-c2086d79f9d4', 'Kitchen with stone counters', '#D9D4CC'),
  ],
  bath: [
    u('1552321554-5fefe8c9ef14', 'Bathroom with a walk-in shower', '#DEDBD5'),
    u('1584622650111-993a426fbf0a', 'Bathroom vanity with a large mirror', '#DCD8D1'),
    u('1620626011761-996317b8d101', 'Bright bathroom with a soaking tub', '#E0DCD5'),
  ],
  pool: [
    u('1520250497591-112f2f40a3f4', 'Resort pool with lounge chairs', '#B9CBC8'),
    u('1571896349842-33c89424de2d', 'Outdoor pool framed by a building', '#AFC4C6'),
    u('1566073771259-6a8506099945', 'Pool deck at a coastal resort', '#B7C9C9'),
    u('1540541338287-41700207dee6', 'Pool with umbrellas and loungers', '#B4C8C2'),
    u('1512917774080-9991f1c4c750', 'Pool beside a low-rise building', '#BCCACA'),
    u('1613490493576-7fde63acd811', 'Quiet pool at dusk', '#9FB3B8'),
  ],
  beach: [
    u('1519046904884-53103b34b206', 'Wide sandy beach under a clear sky', '#CFD8D6'),
    u('1473116763249-2faaef81ccda', 'Shoreline with gentle waves', '#C9D5D6'),
    u('1510414842594-a61c69b5ae57', 'Beach and water seen from above', '#BFD0CF'),
    u('1499793983690-e29da59ef1c2', 'Beach chairs facing the ocean', '#D0D6D2'),
    u('1468413253725-0d5181091126', 'Waves rolling onto the sand', '#C3D1D4'),
    u('1506953823976-52e1fdc0149a', 'Aerial view of the beach', '#BCCFD0'),
    u('1471922694854-ff1b63b20054', 'Surf breaking at the shoreline', '#BFCED3'),
    u('1515238152791-8216bfdf89a7', 'Beach umbrella on the sand', '#D3D6CF'),
    u('1507525428034-b723cf961d3e', 'Calm beach with clear water', '#BFD5D3'),
  ],
  building: [
    u('1545579133-99bb5ab189bd', 'Residential building with balconies', '#CAD0D2'),
    u('1460317442991-0ec209397118', 'Mid-rise condo building facade', '#C8CDD0'),
    u('1574362848149-11496d93a7c7', 'Condo tower with private balconies', '#C9CFD3'),
    u('1512918728675-ed5a9ecdebfd', 'Stacked balconies on a residential tower', '#CDD1D1'),
    u('1545324418-cc1a3fa10c00', 'Modern residential building exterior', '#C6CCD0'),
  ],
};

export const localImages = {
  hero: { id: 'hero', src: '/images/hero.jpg', kind: 'local', alt: 'Calm ocean at sunrise from a quiet South Carolina beach with dune grass', color: '#E9D9CB' } as Photo,
  nmb: { id: 'area-nmb', src: '/images/area-nmb.jpg', kind: 'local', alt: 'Wide family beach lined with mid-rise condos in North Myrtle Beach', color: '#D8D4CC' } as Photo,
  surfside: { id: 'area-surfside', src: '/images/area-surfside.jpg', kind: 'local', alt: 'Weathered wooden pier stretching into a calm sea at Surfside Beach', color: '#CFD6D1' } as Photo,
};

/** Builds a gallery that leads with a unique living-room cover. */
export function gallery(seed: number, count: number, buildingPhoto: Photo, beachIdx: number): Photo[] {
  const pick = <T,>(arr: T[], i: number) => arr[((i % arr.length) + arr.length) % arr.length];
  const list: Photo[] = [
    pick(pools.living, seed),
    pick(pools.living, seed + 12),
    pick(pools.bedroom, seed),
    pick(pools.kitchen, seed),
    pick(pools.bath, seed),
    pick(pools.beach, beachIdx),
    pick(pools.bedroom, seed + 4),
    buildingPhoto,
    pick(pools.living, seed + 6),
    pick(pools.bedroom, seed + 8),
    pick(pools.pool, seed),
    pick(pools.beach, beachIdx + 3),
    pick(pools.bath, seed + 1),
    pick(pools.kitchen, seed + 1),
  ];
  const seen = new Set<string>();
  const out: Photo[] = [];
  for (const p of list) {
    if (seen.has(p.id)) continue;
    seen.add(p.id);
    out.push({ ...p, id: `${p.id}` });
    if (out.length >= count) break;
  }
  return out;
}
