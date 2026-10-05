import React, { useState } from 'react';
import type { Listing } from '../../data/types';
import { useStore } from '../../store/useStore';
import { mockApi, MockNetworkError } from '../../lib/mockApi';
import { Drawer } from '../ui/Drawer';
import { Button } from '../ui/Button';
import { 
  CheckCircle2, 
  AlertCircle, 
  Mail, 
  Calendar, 
  Users, 
  ChevronDown, 
  ShieldCheck 
} from 'lucide-react';

interface InquiryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  listing: Listing;
}

export const InquiryDrawer: React.FC<InquiryDrawerProps> = ({ isOpen, onClose, listing }) => {
  const toast = useStore((s) => s.toast);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [checkIn, setCheckIn] = useState('Jun 12, 2027');
  const [checkOut, setCheckOut] = useState('Jun 19, 2027');
  const [guests, setGuests] = useState(4);
  const [message, setMessage] = useState(
    `Hi ${listing.owner.first}, I'm interested in your ${listing.bedrooms}BR at ${listing.title}. Are these dates open, and could you confirm the check-in time?`
  );

  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(false);
  const [errorBanner, setErrorBanner] = useState<string | null>(null);
  const [sentSuccess, setSentSuccess] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);

  const errors: Record<string, string> = {};
  if (!name.trim()) errors.name = 'Please provide your name';
  if (!email.trim() || !email.includes('@')) errors.email = 'Valid email is required';
  if (!checkIn.trim()) errors.checkIn = 'Check-in date required';
  if (!checkOut.trim()) errors.checkOut = 'Check-out date required';
  if (!message.trim() || message.length < 15) errors.message = 'Please include a brief message for the owner';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ name: true, email: true, checkIn: true, checkOut: true, message: true });

    if (Object.keys(errors).length > 0) return;

    setLoading(true);
    setErrorBanner(null);

    try {
      await mockApi.submitInquiry({
        listingId: listing.id,
        name,
        email,
        phone,
        checkIn,
        checkOut,
        guests,
        message,
      });

      setSentSuccess(true);
      toast({
        kind: 'success',
        title: 'Inquiry sent',
        body: `Delivered to ${listing.owner.first}'s inbox and logged in Admin.`,
        action: { label: 'View in Admin Log', to: '/admin/inquiries' },
      });
    } catch (err) {
      if (err instanceof MockNetworkError) {
        setErrorBanner('We couldn’t send your message. Your details are still here. Please try again.');
      } else {
        setErrorBanner('An unexpected error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSentSuccess(false);
    setErrorBanner(null);
    onClose();
  };

  return (
    <Drawer
      isOpen={isOpen}
      onClose={handleReset}
      title={sentSuccess ? 'Inquiry Sent' : `Contact ${listing.owner.first}`}
      description={
        sentSuccess
          ? `Direct inquiry delivered to ${listing.owner.first}`
          : `Send a direct message about ${listing.title}`
      }
      width="md"
    >
      {sentSuccess ? (
        <div className="py-6 space-y-6">
          <div className="text-center space-y-3">
            <div className="w-14 h-14 bg-ok-100 text-ok-600 rounded-full mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8" strokeWidth={2.2} />
            </div>
            <h4 className="h3 font-serif text-tide-900">Message sent to {listing.owner.first}</h4>
            <p className="text-sm text-ink-600 max-w-sm mx-auto leading-relaxed">
              You’ll hear back at <strong className="text-tide-900">{email}</strong>. {listing.owner.responseNote}.
            </p>
          </div>

          {/* Email Preview Accordion */}
          <div className="border border-line-200 rounded-lg overflow-hidden bg-sand-50/50">
            <button
              onClick={() => setPreviewOpen(!previewOpen)}
              className="w-full p-3.5 text-left flex items-center justify-between text-xs font-semibold text-tide-900 hover:bg-sand-100 transition-colors"
            >
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-brass-600" />
                <span>Preview the email the owner receives</span>
              </div>
              <ChevronDown
                className={`w-4 h-4 transition-transform ${previewOpen ? 'rotate-180' : ''}`}
              />
            </button>

            {previewOpen && (
              <div className="p-4 border-t border-line-200 bg-white text-xs space-y-3 font-sans">
                <div className="pb-2 border-b border-line-200 text-ink-500 space-y-1">
                  <p><strong>To:</strong> {listing.owner.email} ({listing.owner.first} {listing.owner.last})</p>
                  <p><strong>From:</strong> inquiries@rentabeachcondo.com (on behalf of {name})</p>
                  <p><strong>Subject:</strong> New inquiry for {listing.title}</p>
                </div>
                <div className="text-ink-900 space-y-2">
                  <p className="font-serif italic text-tide-900">
                    “{message}”
                  </p>
                  <div className="bg-sand-50 p-2.5 rounded border border-line-200 space-y-1 text-ink-600">
                    <p><strong>Dates:</strong> {checkIn} – {checkOut}</p>
                    <p><strong>Party:</strong> {guests} guests</p>
                    <p><strong>Reply to:</strong> {name} ({email}{phone ? ` · ${phone}` : ''})</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="pt-4 flex flex-col gap-2.5">
            <Button variant="primary" onClick={handleReset} className="w-full justify-center">
              Done
            </Button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 pb-12">
          {errorBanner && (
            <div className="p-3 bg-err-100 text-err-600 rounded border border-err-600/30 flex items-start gap-2 text-xs">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{errorBanner}</span>
            </div>
          )}

          {/* Dates & Party Quick Row */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="label text-xs">Check-in</label>
              <div className="relative">
                <input
                  type="text"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  onBlur={() => setTouched({ ...touched, checkIn: true })}
                  className="input !py-2 !text-sm"
                  placeholder="e.g. Jun 14, 2027"
                  aria-invalid={Boolean(touched.checkIn && errors.checkIn)}
                />
              </div>
              {touched.checkIn && errors.checkIn && (
                <p className="error-text text-xs">{errors.checkIn}</p>
              )}
            </div>

            <div>
              <label className="label text-xs">Check-out</label>
              <div className="relative">
                <input
                  type="text"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  onBlur={() => setTouched({ ...touched, checkOut: true })}
                  className="input !py-2 !text-sm"
                  placeholder="e.g. Jun 21, 2027"
                  aria-invalid={Boolean(touched.checkOut && errors.checkOut)}
                />
              </div>
              {touched.checkOut && errors.checkOut && (
                <p className="error-text text-xs">{errors.checkOut}</p>
              )}
            </div>
          </div>

          {/* Guests stepper */}
          <div>
            <label className="label text-xs">Number of Guests</label>
            <div className="flex items-center gap-3">
              <div className="flex items-center border border-line-200 rounded bg-white">
                <button
                  type="button"
                  onClick={() => setGuests(Math.max(1, guests - 1))}
                  className="px-3 py-2 text-ink-600 hover:text-ink-900 font-bold"
                >
                  –
                </button>
                <span className="w-12 text-center text-sm font-semibold tabular">
                  {guests}
                </span>
                <button
                  type="button"
                  onClick={() => setGuests(Math.min(listing.sleeps + 4, guests + 1))}
                  className="px-3 py-2 text-ink-600 hover:text-ink-900 font-bold"
                >
                  +
                </button>
              </div>
              <span className="text-xs text-ink-500">
                Condo sleeps up to {listing.sleeps}
              </span>
            </div>
          </div>

          {/* Name & Email */}
          <div>
            <label className="label text-xs">Your Name *</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onBlur={() => setTouched({ ...touched, name: true })}
              className="input !py-2 !text-sm"
              placeholder="First and last name"
              aria-invalid={Boolean(touched.name && errors.name)}
            />
            {touched.name && errors.name && (
              <p className="error-text text-xs">{errors.name}</p>
            )}
          </div>

          <div>
            <label className="label text-xs">Your Email *</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => setTouched({ ...touched, email: true })}
              className="input !py-2 !text-sm"
              placeholder="owner-replies-here@example.com"
              aria-invalid={Boolean(touched.email && errors.email)}
            />
            {touched.email && errors.email && (
              <p className="error-text text-xs">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="label text-xs">Phone (optional)</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="input !py-2 !text-sm"
              placeholder="(843) 555-0199"
            />
          </div>

          {/* Message */}
          <div>
            <label className="label text-xs">Message for {listing.owner.first} *</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onBlur={() => setTouched({ ...touched, message: true })}
              className="input !text-sm !min-h-[100px]"
              aria-invalid={Boolean(touched.message && errors.message)}
            />
            {touched.message && errors.message && (
              <p className="error-text text-xs">{errors.message}</p>
            )}
          </div>

          {/* Assurance note */}
          <div className="p-3 bg-sand-100 rounded text-xs text-ink-600 flex items-start gap-2">
            <ShieldCheck className="w-4 h-4 text-brass-600 shrink-0 mt-0.5" />
            <span>
              Direct contact: RentABeachCondo forwards your message directly to {listing.owner.first}. No middleman fees or platform markups.
            </span>
          </div>

          <div className="pt-2">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              loading={loading}
              className="w-full justify-center"
            >
              Send message to owner
            </Button>
          </div>
        </form>
      )}
    </Drawer>
  );
};
