import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import type { Inquiry } from '../../data/types';
import { relTime, fmtDateTime } from '../../lib/format';
import { Badge } from '../../components/ui/Badge';
import { Drawer } from '../../components/ui/Drawer';
import { 
  Mail, 
  Search, 
  CheckCircle2, 
  Clock, 
  User, 
  Calendar, 
  Users, 
  ShieldCheck 
} from 'lucide-react';

export const AdminInquiries: React.FC = () => {
  const inquiries = useStore((s) => s.inquiries);
  const listings = useStore((s) => s.listings);
  const markInquiryOpened = useStore((s) => s.markInquiryOpened);

  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const openDetail = (inq: Inquiry) => {
    setSelectedInquiry(inq);
    if (inq.fresh) {
      markInquiryOpened(inq.id);
    }
  };

  const filteredInquiries = inquiries.filter((inq) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    const l = listings.find((x) => x.id === inq.listingId);
    return (
      inq.name.toLowerCase().includes(q) ||
      inq.email.toLowerCase().includes(q) ||
      inq.message.toLowerCase().includes(q) ||
      (l?.title && l.title.toLowerCase().includes(q))
    );
  });

  const selectedListing = selectedInquiry
    ? listings.find((l) => l.id === selectedInquiry.listingId)
    : null;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="eyebrow block mb-1">Notification Tracking</span>
          <h1 className="h2 font-serif text-tide-900">Traveler Inquiries Log</h1>
          <p className="text-xs text-ink-500 mt-1">
            Real-time delivery verification for traveler inquiries. Forwarded straight to owner inboxes.
          </p>
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 text-ink-500 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search inquiries or guests..."
            className="input !pl-9 !py-1.5 text-xs w-full"
          />
        </div>
      </div>

      {/* Inquiries Table */}
      <div className="card bg-white border border-line-200 overflow-hidden shadow-1">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-ink-900">
            <thead className="bg-sand-50/80 border-b border-line-200 text-ink-500 uppercase font-semibold text-[10px] tracking-wider">
              <tr>
                <th className="py-3.5 px-4 sm:px-6">Delivered</th>
                <th className="py-3.5 px-4">Traveler Guest</th>
                <th className="py-3.5 px-4">Condo Listing</th>
                <th className="py-3.5 px-4">Owner Host</th>
                <th className="py-3.5 px-4">Dates & Party</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">View</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line-200">
              {filteredInquiries.map((inq) => {
                const l = listings.find((x) => x.id === inq.listingId);
                const isFresh = Boolean(inq.fresh);

                return (
                  <tr
                    key={inq.id}
                    onClick={() => openDetail(inq)}
                    className={`hover:bg-sand-50 cursor-pointer transition-colors ${
                      isFresh ? 'bg-seaglass-100/50' : ''
                    }`}
                  >
                    <td className="py-3.5 px-4 sm:px-6 text-ink-500 font-medium whitespace-nowrap">
                      {relTime(inq.createdAt)}
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-tide-900">{inq.name}</div>
                      <span className="text-[11px] text-ink-500">{inq.email}</span>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="font-medium text-tide-900 truncate max-w-[200px]">
                        {l?.title || 'Condo listing'}
                      </div>
                    </td>

                    <td className="py-3.5 px-4 text-ink-600">
                      {l?.owner.first} {l?.owner.last}
                    </td>

                    <td className="py-3.5 px-4 text-[11px] text-ink-500">
                      <div>{inq.checkIn} – {inq.checkOut}</div>
                      <span>{inq.guests} guests</span>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-ok-600 bg-ok-100 px-2 py-0.5 rounded-full border border-ok-600/30">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Delivered</span>
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <span className="text-xs font-semibold text-brass-600 hover:underline">
                        Message →
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Inquiry Detail Drawer & Rendered Email Preview */}
      <Drawer
        isOpen={Boolean(selectedInquiry)}
        onClose={() => setSelectedInquiry(null)}
        title="Traveler Inquiry Notification"
        description={selectedInquiry ? `Delivered ${fmtDateTime(selectedInquiry.createdAt)}` : ''}
        width="md"
      >
        {selectedInquiry && (
          <div className="space-y-6 pb-10">
            {/* Delivery Confirmation Banner */}
            <div className="p-3.5 bg-ok-100/60 border border-ok-600/30 rounded-lg text-xs text-ok-600 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>
                Delivered to <strong>{selectedListing?.owner.email}</strong>. No middleman holding fees.
              </span>
            </div>

            {/* Rendered Email Preview Card */}
            <div className="card p-5 bg-white border border-line-300 shadow-2 space-y-4 font-sans text-xs">
              <div className="border-b border-line-200 pb-3 space-y-1.5 text-ink-500">
                <p><strong>To:</strong> {selectedListing?.owner.first} {selectedListing?.owner.last} &lt;{selectedListing?.owner.email}&gt;</p>
                <p><strong>From:</strong> RentABeachCondo Notifications &lt;inquiries@rentabeachcondo.com&gt;</p>
                <p><strong>Reply-To:</strong> {selectedInquiry.name} &lt;{selectedInquiry.email}&gt;</p>
                <p className="font-semibold text-tide-900 pt-1">
                  <strong>Subject:</strong> New traveler inquiry for {selectedListing?.title}
                </p>
              </div>

              <div className="py-2 text-ink-900 leading-relaxed space-y-3">
                <p className="font-serif italic text-base text-tide-900 bg-sand-50 p-4 rounded border border-line-200">
                  “{selectedInquiry.message}”
                </p>

                <div className="grid grid-cols-2 gap-3 p-3 bg-sand-100 rounded text-xs text-ink-600">
                  <div>
                    <span className="font-semibold text-tide-900 block">Requested Dates:</span>
                    <span>{selectedInquiry.checkIn} – {selectedInquiry.checkOut}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-tide-900 block">Party Size:</span>
                    <span>{selectedInquiry.guests} guests</span>
                  </div>
                  <div>
                    <span className="font-semibold text-tide-900 block">Traveler Contact:</span>
                    <span>{selectedInquiry.name} ({selectedInquiry.phone || 'No phone provided'})</span>
                  </div>
                  <div>
                    <span className="font-semibold text-tide-900 block">Listing:</span>
                    <span>{selectedListing?.title}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => setSelectedInquiry(null)}
                className="btn btn-secondary btn-sm w-full justify-center"
              >
                Close message
              </button>
            </div>
          </div>
        )}
      </Drawer>
    </div>
  );
};
