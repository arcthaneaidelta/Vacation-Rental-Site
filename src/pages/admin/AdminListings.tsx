import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../../store/useStore';
import { buildings, areas } from '../../data/seed';
import type { Listing, ListingStatus } from '../../data/types';
import { bedLabel, money, relTime } from '../../lib/format';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Drawer } from '../../components/ui/Drawer';
import { Modal } from '../../components/ui/Modal';
import { 
  Search, 
  Plus, 
  Edit3, 
  Copy, 
  Trash2, 
  ExternalLink, 
  MoreVertical, 
  Check, 
  Eye, 
  RotateCcw 
} from 'lucide-react';

export const AdminListings: React.FC = () => {
  const listings = useStore((s) => s.listings);
  const inquiries = useStore((s) => s.inquiries);
  const updateListing = useStore((s) => s.updateListing);
  const setListingStatus = useStore((s) => s.setListingStatus);
  const duplicateListing = useStore((s) => s.duplicateListing);
  const removeListing = useStore((s) => s.removeListing);
  const undoRemove = useStore((s) => s.undoRemove);
  const toast = useStore((s) => s.toast);

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [areaFilter, setAreaFilter] = useState<string>('all');

  // Edit Drawer state
  const [editingListing, setEditingListing] = useState<Listing | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editRateLow, setEditRateLow] = useState<number | undefined>(undefined);
  const [editRateHigh, setEditRateHigh] = useState<number | undefined>(undefined);
  const [editFloor, setEditFloor] = useState(1);
  const [editDescription, setEditDescription] = useState('');

  // Remove Modal state
  const [removingId, setRemovingId] = useState<string | null>(null);

  const openEditDrawer = (l: Listing) => {
    setEditingListing(l);
    setEditTitle(l.title);
    setEditRateLow(l.rateLow);
    setEditRateHigh(l.rateHigh);
    setEditFloor(l.floor);
    setEditDescription(l.description[0] || '');
  };

  const handleSaveEdit = () => {
    if (!editingListing) return;
    updateListing(editingListing.id, {
      title: editTitle,
      rateLow: editRateLow,
      rateHigh: editRateHigh,
      floor: editFloor,
      description: [editDescription, ...editingListing.description.slice(1)],
    });
    setEditingListing(null);
    toast({
      kind: 'success',
      title: 'Listing updated',
      body: `Changes saved for “${editTitle}”.`,
    });
  };

  const handleConfirmRemove = () => {
    if (!removingId) return;
    const target = listings.find((l) => l.id === removingId);
    removeListing(removingId);
    setRemovingId(null);

    toast({
      kind: 'info',
      title: 'Listing removed',
      body: `“${target?.title}” has been removed from directory.`,
      action: {
        label: 'Undo',
        run: () => undoRemove(),
      },
    });
  };

  const filteredListings = listings.filter((l) => {
    if (statusFilter !== 'all' && l.status !== statusFilter) return false;
    if (areaFilter !== 'all' && l.areaId !== areaFilter) return false;
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      l.title.toLowerCase().includes(q) ||
      l.owner.first.toLowerCase().includes(q) ||
      l.owner.last.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="eyebrow block mb-1">Directory Management</span>
          <h1 className="h2 font-serif text-tide-900">All Condo Listings</h1>
          <p className="text-xs text-ink-500 mt-1">
            Edit rates, manage publication status, duplicate, or remove listings without hiring a developer.
          </p>
        </div>

        <Link to="/admin/listings/new">
          <Button variant="primary" size="sm" icon={<Plus className="w-4 h-4" />}>
            Add New Listing
          </Button>
        </Link>
      </div>

      {/* Controls Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-line-200">
        <div className="flex items-center gap-2 flex-wrap flex-1">
          {/* Status filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="input !py-1.5 !text-xs !w-auto"
          >
            <option value="all">All statuses ({listings.length})</option>
            <option value="live">Live ({listings.filter((l) => l.status === 'live').length})</option>
            <option value="draft">Draft ({listings.filter((l) => l.status === 'draft').length})</option>
            <option value="archived">Archived ({listings.filter((l) => l.status === 'archived').length})</option>
          </select>

          {/* Area filter */}
          <select
            value={areaFilter}
            onChange={(e) => setAreaFilter(e.target.value)}
            className="input !py-1.5 !text-xs !w-auto"
          >
            <option value="all">All areas</option>
            {areas.filter((a) => a.market === 'grand-strand').map((a) => (
              <option key={a.id} value={a.id}>
                {a.name}
              </option>
            ))}
          </select>
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 text-ink-500 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search listings..."
            className="input !pl-9 !py-1.5 text-xs w-full"
          />
        </div>
      </div>

      {/* Table of Listings */}
      <div className="card bg-white border border-line-200 overflow-hidden shadow-1">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-ink-900">
            <thead className="bg-sand-50/80 border-b border-line-200 text-ink-500 uppercase font-semibold text-[10px] tracking-wider">
              <tr>
                <th className="py-3.5 px-4 sm:px-6">Property / Title</th>
                <th className="py-3.5 px-4">Building & Area</th>
                <th className="py-3.5 px-4">Rates</th>
                <th className="py-3.5 px-4">Inquiries</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Updated</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line-200">
              {filteredListings.map((l) => {
                const bld = buildings.find((b) => b.id === l.buildingId);
                const area = areas.find((a) => a.id === l.areaId);
                const inqCount = inquiries.filter((i) => i.listingId === l.id).length;

                return (
                  <tr key={l.id} className="hover:bg-sand-50 transition-colors">
                    <td className="py-3.5 px-4 sm:px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded overflow-hidden shrink-0 bg-sand-100">
                          {l.photos[0] && (
                            <img
                              src={l.photos[0].src}
                              alt={l.title}
                              className="w-full h-full object-cover"
                            />
                          )}
                        </div>
                        <div className="min-w-0">
                          <Link
                            to={`/condo/${l.slug}`}
                            className="font-semibold text-tide-900 hover:text-brass-600 transition-colors truncate block"
                          >
                            {l.title}
                          </Link>
                          <span className="text-[11px] text-ink-500">
                            {bedLabel(l.bedrooms)} · Floor {l.floor} · {l.owner.first}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="font-medium text-tide-900">{bld?.name}</div>
                      <span className="text-[11px] text-ink-500">{area?.name}</span>
                    </td>

                    <td className="py-3.5 px-4 font-semibold text-tide-900">
                      {l.rateLow ? `${money(l.rateLow)}–${money(l.rateHigh)}` : 'Inquire'}
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="badge bg-sand-100 text-ink-900 text-[11px]">
                        {inqCount} received
                      </span>
                    </td>

                    <td className="py-3.5 px-4">
                      <select
                        value={l.status}
                        onChange={(e) => setListingStatus(l.id, e.target.value as ListingStatus)}
                        className={`text-xs font-semibold rounded px-2 py-1 border transition-colors ${
                          l.status === 'live'
                            ? 'bg-ok-100 text-ok-600 border-ok-600/30'
                            : l.status === 'draft'
                            ? 'bg-sand-100 text-ink-600 border-line-300'
                            : 'bg-sand-200 text-ink-500 border-line-200'
                        }`}
                      >
                        <option value="live">Live</option>
                        <option value="draft">Draft</option>
                        <option value="archived">Archived</option>
                      </select>
                    </td>

                    <td className="py-3.5 px-4 text-ink-500">
                      {relTime(l.updatedAt)}
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => openEditDrawer(l)}
                          className="p-1.5 rounded hover:bg-sand-100 text-ink-600 hover:text-tide-900"
                          title="Edit listing details"
                          aria-label="Edit"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => {
                            duplicateListing(l.id);
                            toast({
                              kind: 'success',
                              title: 'Listing duplicated',
                              body: `Created draft copy of “${l.title}”.`,
                            });
                          }}
                          className="p-1.5 rounded hover:bg-sand-100 text-ink-600 hover:text-tide-900"
                          title="Duplicate listing"
                          aria-label="Duplicate"
                        >
                          <Copy className="w-3.5 h-3.5" />
                        </button>

                        <Link
                          to={`/condo/${l.slug}`}
                          className="p-1.5 rounded hover:bg-sand-100 text-ink-600 hover:text-tide-900"
                          title="View live listing"
                          aria-label="View live"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </Link>

                        <button
                          onClick={() => setRemovingId(l.id)}
                          className="p-1.5 rounded hover:bg-err-100 text-ink-500 hover:text-err-600"
                          title="Remove listing"
                          aria-label="Remove"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Listing Drawer */}
      <Drawer
        isOpen={Boolean(editingListing)}
        onClose={() => setEditingListing(null)}
        title="Edit Condo Listing"
        description="Update headline, rates, or floor. Changes take effect immediately."
        width="md"
      >
        <div className="space-y-5 pb-10">
          <div>
            <label className="label text-xs">Listing Headline / Title *</label>
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              className="input text-sm"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="label text-xs">Rate Low ($ / night)</label>
              <input
                type="number"
                value={editRateLow ?? ''}
                onChange={(e) => setEditRateLow(Number(e.target.value) || undefined)}
                className="input text-sm"
              />
            </div>
            <div>
              <label className="label text-xs">Rate High ($ / night)</label>
              <input
                type="number"
                value={editRateHigh ?? ''}
                onChange={(e) => setEditRateHigh(Number(e.target.value) || undefined)}
                className="input text-sm"
              />
            </div>
          </div>

          <div>
            <label className="label text-xs">Unit Floor</label>
            <input
              type="number"
              value={editFloor}
              onChange={(e) => setEditFloor(Number(e.target.value))}
              className="input text-sm"
            />
          </div>

          <div>
            <label className="label text-xs">Description Lead Paragraph</label>
            <textarea
              rows={4}
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
              className="input text-sm"
            />
          </div>

          <div className="pt-4 border-t border-line-200 flex justify-end gap-2">
            <Button variant="ghost" size="sm" onClick={() => setEditingListing(null)}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" onClick={handleSaveEdit}>
              Save changes
            </Button>
          </div>
        </div>
      </Drawer>

      {/* Remove Confirmation Modal */}
      <Modal
        isOpen={Boolean(removingId)}
        onClose={() => setRemovingId(null)}
        title="Remove this listing from the directory?"
        size="sm"
      >
        <div className="space-y-4 text-xs sm:text-sm text-ink-600">
          <p>
            This listing will be immediately unpublished from search and building pages. You will have an 8-second window to undo this action.
          </p>
          <div className="pt-2 flex justify-end gap-2">
            <Button variant="ghost" size="sm" onClick={() => setRemovingId(null)}>
              Cancel
            </Button>
            <Button variant="danger" size="sm" onClick={handleConfirmRemove}>
              Remove listing
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
