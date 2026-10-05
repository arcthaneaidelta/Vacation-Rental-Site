import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { areas, buildings, amenities } from '../../data/seed';
import { pools } from '../../data/images';
import { useStore } from '../../store/useStore';
import { mockApi } from '../../lib/mockApi';
import type { ListingCore, ViewType, AmenityId } from '../../data/types';
import { Button } from '../../components/ui/Button';
import { ArrowLeft, PlusCircle } from 'lucide-react';

export const AdminAddListing: React.FC = () => {
  const navigate = useNavigate();
  const addListing = useStore((s) => s.addListing);
  const toast = useStore((s) => s.toast);

  const [title, setTitle] = useState('');
  const [areaId, setAreaId] = useState('north-myrtle-beach');
  const [buildingId, setBuildingId] = useState('sea-oats-tower');
  const [floor, setFloor] = useState(6);
  const [bedrooms, setBedrooms] = useState(2);
  const [bathrooms, setBathrooms] = useState(2);
  const [sleeps, setSleeps] = useState(6);
  const [rateLow, setRateLow] = useState(150);
  const [rateHigh, setRateHigh] = useState(250);
  const [view, setView] = useState<ViewType>('Oceanfront');
  const [ownerFirst, setOwnerFirst] = useState('');
  const [ownerLast, setOwnerLast] = useState('');
  const [ownerEmail, setOwnerEmail] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !ownerFirst.trim() || !ownerEmail.trim()) return;

    setLoading(true);
    const data: ListingCore = {
      title,
      buildingId,
      areaId,
      floor,
      bedrooms,
      bathrooms,
      sleeps,
      view,
      amenities: ['oceanfront', 'pool', 'elevator', 'wifi', 'ac', 'full-kitchen', 'washer-dryer'],
      photos: [
        pools.living[2],
        pools.bedroom[2],
        pools.kitchen[0],
        pools.bath[0],
        pools.beach[1],
        pools.pool[1],
      ],
      rateLow,
      rateHigh,
      description: [description || 'Beautifully appointed beach condo on the Grand Strand with ocean views.'],
      houseNotes: {
        checkIn: 'Check-in 4:00 PM, check-out 10:00 AM',
        pets: 'No pets',
        smoking: 'Non-smoking',
        minStay: '3 nights',
      },
      sleeping: [{ room: 'Primary bedroom', beds: '1 king' }, { room: 'Guest bedroom', beds: '2 queens' }],
      owner: {
        first: ownerFirst,
        last: ownerLast,
        email: ownerEmail,
        phone: '(843) 555-0100',
        preferred: 'Email',
        responseNote: 'Usually replies within a few hours',
      },
    };

    try {
      const live = await mockApi.addListing(data);
      toast({
        kind: 'success',
        title: 'Listing published',
        body: `“${title}” added directly to live directory.`,
        action: { label: 'View live', to: `/condo/${live.slug}` },
      });
      navigate('/admin/listings');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div className="flex items-center gap-3 pb-4 border-b border-line-200">
        <Link to="/admin/listings" className="btn btn-secondary btn-sm !px-2.5">
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div>
          <span className="eyebrow block mb-0.5">Admin Fast-Track</span>
          <h1 className="h3 font-serif text-tide-900">Add New Condo Listing</h1>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="card p-6 sm:p-8 bg-white border border-line-200 space-y-5">
        <div>
          <label className="label text-xs">Listing Title *</label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Sunrise 2BR with Oceanfront Balcony"
            className="input text-sm"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="label text-xs">Coastal Area</label>
            <select
              value={areaId}
              onChange={(e) => setAreaId(e.target.value)}
              className="input text-sm"
            >
              {areas.filter((a) => a.market === 'grand-strand').map((a) => (
                <option key={a.id} value={a.id}>{a.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="label text-xs">Building</label>
            <select
              value={buildingId}
              onChange={(e) => setBuildingId(e.target.value)}
              className="input text-sm"
            >
              {buildings.map((b) => (
                <option key={b.id} value={b.id}>{b.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-3">
          <div>
            <label className="label text-xs">Floor</label>
            <input
              type="number"
              value={floor}
              onChange={(e) => setFloor(Number(e.target.value))}
              className="input text-sm"
            />
          </div>
          <div>
            <label className="label text-xs">Bedrooms</label>
            <input
              type="number"
              value={bedrooms}
              onChange={(e) => setBedrooms(Number(e.target.value))}
              className="input text-sm"
            />
          </div>
          <div>
            <label className="label text-xs">Bathrooms</label>
            <input
              type="number"
              value={bathrooms}
              onChange={(e) => setBathrooms(Number(e.target.value))}
              className="input text-sm"
            />
          </div>
          <div>
            <label className="label text-xs">Sleeps</label>
            <input
              type="number"
              value={sleeps}
              onChange={(e) => setSleeps(Number(e.target.value))}
              className="input text-sm"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="label text-xs">Rate Low ($)</label>
            <input
              type="number"
              value={rateLow}
              onChange={(e) => setRateLow(Number(e.target.value))}
              className="input text-sm"
            />
          </div>
          <div>
            <label className="label text-xs">Rate High ($)</label>
            <input
              type="number"
              value={rateHigh}
              onChange={(e) => setRateHigh(Number(e.target.value))}
              className="input text-sm"
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 pt-2 border-t border-line-200">
          <div>
            <label className="label text-xs">Owner First Name *</label>
            <input
              type="text"
              required
              value={ownerFirst}
              onChange={(e) => setOwnerFirst(e.target.value)}
              className="input text-sm"
            />
          </div>
          <div>
            <label className="label text-xs">Owner Last Name</label>
            <input
              type="text"
              value={ownerLast}
              onChange={(e) => setOwnerLast(e.target.value)}
              className="input text-sm"
            />
          </div>
          <div>
            <label className="label text-xs">Owner Email *</label>
            <input
              type="email"
              required
              value={ownerEmail}
              onChange={(e) => setOwnerEmail(e.target.value)}
              className="input text-sm"
            />
          </div>
        </div>

        <div>
          <label className="label text-xs">Description</label>
          <textarea
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="input text-sm"
            placeholder="Overview of the condo..."
          />
        </div>

        <div className="pt-4 border-t border-line-200 flex justify-end gap-2">
          <Link to="/admin/listings" className="btn btn-ghost btn-sm">
            Cancel
          </Link>
          <Button type="submit" variant="primary" size="md" loading={loading}>
            Publish Live Directly
          </Button>
        </div>
      </form>
    </div>
  );
};
