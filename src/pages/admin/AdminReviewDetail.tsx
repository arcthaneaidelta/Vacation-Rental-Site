import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useStore } from '../../store/useStore';
import { mockApi } from '../../lib/mockApi';
import { ListingPage } from '../ListingPage';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { relTime } from '../../lib/format';
import { 
  CheckCircle2, 
  AlertCircle, 
  XCircle, 
  ArrowLeft, 
  ExternalLink, 
  Clock, 
  Mail, 
  ShieldCheck, 
  Eye 
} from 'lucide-react';

export const AdminReviewDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const applications = useStore((s) => s.applications);
  const toast = useStore((s) => s.toast);
  const unpublishApproved = useStore((s) => s.unpublishApproved);

  const app = applications.find((a) => a.id === id) || applications[0];

  // Checklist state
  const [checks, setChecks] = useState({
    photos: true,
    description: true,
    amenities: true,
    bookingLink: Boolean(app.data.externalUrl),
    ownerVerified: true,
  });

  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);

  // Modals
  const [approveConfirmOpen, setApproveConfirmOpen] = useState(false);
  const [changesModalOpen, setChangesModalOpen] = useState(false);
  const [rejectModalOpen, setRejectModalOpen] = useState(false);
  const [changesMessage, setChangesMessage] = useState(
    'Thanks for applying! We noticed your pool type amenity is incomplete. Could you reply confirming whether your building has an outdoor pool or lazy river?'
  );
  const [rejectReason, setRejectReason] = useState('Photos do not meet directory quality standards.');

  const toggleCheck = (k: keyof typeof checks) => {
    setChecks((prev) => ({ ...prev, [k]: !prev[k] }));
  };

  // Approve & Publish action
  const handleApprove = async () => {
    setLoading(true);
    setApproveConfirmOpen(false);

    try {
      const liveListing = await mockApi.approveApplication(app.id);
      toast({
        kind: 'success',
        title: 'Listing approved & published',
        body: `“${app.data.title}” is now live on the public directory.`,
        action: {
          label: 'View Live Listing',
          to: `/condo/${liveListing.slug}`,
        },
      });
    } catch (err) {
      toast({ kind: 'error', title: 'Approval failed', body: 'Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  // Request Changes action
  const handleRequestChanges = async () => {
    setLoading(true);
    setChangesModalOpen(false);

    try {
      await mockApi.requestChanges(app.id, changesMessage);
      toast({
        kind: 'info',
        title: 'Changes requested',
        body: `Notification emailed to ${app.data.owner.email}. Status set to Changes requested.`,
      });
    } catch (err) {
      toast({ kind: 'error', title: 'Request failed', body: 'Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  // Reject action
  const handleReject = async () => {
    setLoading(true);
    setRejectModalOpen(false);

    try {
      await mockApi.rejectApplication(app.id, rejectReason);
      toast({
        kind: 'info',
        title: 'Application declined',
        body: `Application ${app.ref} declined.`,
      });
      navigate('/admin/review');
    } catch (err) {
      toast({ kind: 'error', title: 'Action failed' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Breadcrumb & Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-line-200">
        <div className="flex items-center gap-3">
          <Link
            to="/admin/review"
            className="btn btn-secondary btn-sm !px-2.5 text-ink-600"
            aria-label="Back to queue"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs text-ink-500 font-semibold">{app.ref}</span>
              <Badge variant={app.status} />
            </div>
            <h1 className="font-serif text-xl sm:text-2xl font-medium text-tide-900 mt-0.5">
              Review: {app.data.title}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {app.status === 'approved' && app.listingId && (
            <Link to={`/condo/${app.listingId}`} className="btn btn-secondary btn-sm">
              <Eye className="w-3.5 h-3.5 mr-1 text-brass-600" />
              <span>View live on site</span>
            </Link>
          )}
        </div>
      </div>

      {/* Split-Screen Review Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column (60%): Live Preview of Public Listing */}
        <div className="lg:col-span-8 space-y-4">
          <div className="bg-sand-100 border border-line-300 rounded-lg p-3 text-xs text-ink-600 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4 text-brass-600" />
              <span>
                <strong>Live Traveler View Preview:</strong> Rendered identically to the public template.
              </span>
            </div>
            <span className="text-ink-500">Read-only preview</span>
          </div>

          <div className="card overflow-hidden bg-white border border-line-300 shadow-2">
            <ListingPage previewListing={app.data} />
          </div>
        </div>

        {/* Right Column (40%): Review Checklist & Decision Panel */}
        <div className="lg:col-span-4 space-y-6 sticky top-6">
          <div className="card p-6 bg-white border border-line-200 shadow-2 space-y-5">
            <div className="border-b border-line-200 pb-3">
              <h3 className="font-serif text-lg font-medium text-tide-900">
                Review Checklist
              </h3>
              <p className="text-xs text-ink-500 mt-0.5">
                Verify application details before publishing.
              </p>
            </div>

            {/* Checklist */}
            <div className="space-y-3 text-xs">
              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={checks.photos}
                  onChange={() => toggleCheck('photos')}
                  className="checkbox mt-0.5"
                />
                <div>
                  <strong className="text-tide-900 block">Photos meet standards</strong>
                  <span className="text-ink-500">{app.data.photos?.length || 0} high-resolution photos uploaded</span>
                </div>
              </label>

              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={checks.description}
                  onChange={() => toggleCheck('description')}
                  className="checkbox mt-0.5"
                />
                <div>
                  <strong className="text-tide-900 block">Description is accurate</strong>
                  <span className="text-ink-500">Clear sleeping layout, clean typography</span>
                </div>
              </label>

              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={checks.amenities}
                  onChange={() => toggleCheck('amenities')}
                  className="checkbox mt-0.5"
                />
                <div>
                  <strong className="text-tide-900 block">Amenities verified</strong>
                  <span className="text-ink-500">{app.data.amenities?.length || 0} features tagged</span>
                </div>
              </label>

              {app.data.externalUrl && (
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={checks.bookingLink}
                    onChange={() => toggleCheck('bookingLink')}
                    className="checkbox mt-0.5"
                  />
                  <div>
                    <strong className="text-tide-900 block">Booking link tested</strong>
                    <a
                      href={app.data.externalUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-brass-600 underline truncate block max-w-[200px]"
                    >
                      {app.data.externalUrl}
                    </a>
                  </div>
                </label>
              )}

              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={checks.ownerVerified}
                  onChange={() => toggleCheck('ownerVerified')}
                  className="checkbox mt-0.5"
                />
                <div>
                  <strong className="text-tide-900 block">Owner record confirmed</strong>
                  <span className="text-ink-500">{app.data.owner.first} {app.data.owner.last} ({app.data.owner.email})</span>
                </div>
              </label>
            </div>

            {/* Internal Notes */}
            <div className="pt-2 border-t border-line-200">
              <label className="label text-xs">Internal Administrative Notes</label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Optional notes for other administrators..."
                rows={3}
                className="input !text-xs"
              />
            </div>

            {/* Decision Buttons */}
            <div className="pt-4 border-t border-line-200 space-y-2">
              <Button
                variant="primary"
                size="md"
                loading={loading}
                disabled={app.status === 'approved'}
                onClick={() => setApproveConfirmOpen(true)}
                className="w-full justify-center"
                icon={<CheckCircle2 className="w-4 h-4 text-white" />}
              >
                {app.status === 'approved' ? 'Approved & Published' : 'Approve & Publish Live'}
              </Button>

              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setChangesModalOpen(true)}
                  className="justify-center text-xs"
                  disabled={app.status === 'approved'}
                >
                  Request changes
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setRejectModalOpen(true)}
                  className="justify-center text-xs !text-err-600 hover:!bg-err-100"
                  disabled={app.status === 'approved'}
                >
                  Decline
                </Button>
              </div>

              {app.status === 'approved' && (
                <button
                  onClick={() => unpublishApproved(app.id)}
                  className="text-xs text-err-600 hover:underline block text-center pt-2 w-full font-medium"
                >
                  Unpublish listing & return to queue
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Approve Confirmation Modal */}
      <Modal
        isOpen={approveConfirmOpen}
        onClose={() => setApproveConfirmOpen(false)}
        title="Approve and publish this condo listing?"
        size="sm"
      >
        <div className="space-y-4 text-xs sm:text-sm text-ink-600">
          <p>
            This listing will immediately become publicly searchable at <strong>/condo/{(app.data as any).slug || (app.data.title ? app.data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') : 'listing')}</strong> and will appear on the <strong>{app.data.buildingId}</strong> building page.
          </p>
          <div className="p-3 bg-sand-100 rounded text-xs text-ink-900 space-y-1">
            <p>• Founding spots will decrement by 1</p>
            <p>• Automated welcome confirmation logged to <strong>{app.data.owner.email}</strong></p>
            <p>• You can unpublish or edit this listing at any time</p>
          </div>
          <div className="pt-2 flex justify-end gap-2">
            <Button variant="ghost" size="sm" onClick={() => setApproveConfirmOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" onClick={handleApprove}>
              Confirm & Publish
            </Button>
          </div>
        </div>
      </Modal>

      {/* Request Changes Modal */}
      <Modal
        isOpen={changesModalOpen}
        onClose={() => setChangesModalOpen(false)}
        title="Request changes from owner"
        size="md"
      >
        <div className="space-y-4 text-xs sm:text-sm text-ink-600">
          <p>
            Send a direct notification email to <strong>{app.data.owner.email}</strong> explaining what needs adjustment before publication.
          </p>
          <div>
            <label className="label text-xs">Message for {app.data.owner.first}</label>
            <textarea
              rows={4}
              value={changesMessage}
              onChange={(e) => setChangesMessage(e.target.value)}
              className="input text-xs"
            />
          </div>
          <div className="pt-2 flex justify-end gap-2">
            <Button variant="ghost" size="sm" onClick={() => setChangesModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" onClick={handleRequestChanges}>
              Send message & update status
            </Button>
          </div>
        </div>
      </Modal>

      {/* Reject Modal */}
      <Modal
        isOpen={rejectModalOpen}
        onClose={() => setRejectModalOpen(false)}
        title="Decline this application?"
        size="sm"
      >
        <div className="space-y-3 text-xs sm:text-sm text-ink-600">
          <p>
            Are you sure you want to decline this application? It will be marked as declined in the queue.
          </p>
          <div>
            <label className="label text-xs">Reason for decline</label>
            <input
              type="text"
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              className="input !py-2 text-xs"
            />
          </div>
          <div className="pt-2 flex justify-end gap-2">
            <Button variant="ghost" size="sm" onClick={() => setRejectModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="danger" size="sm" onClick={handleReject}>
              Decline Application
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
