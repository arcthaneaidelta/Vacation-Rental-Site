import React from 'react';
import type { Listing } from '../../data/types';
import { money } from '../../lib/format';
import { Button } from '../ui/Button';
import { MessageSquare, ExternalLink, ShieldCheck, Clock } from 'lucide-react';

interface ContactCardProps {
  listing: Listing;
  onOpenInquiry: () => void;
  onOpenExternalNotice: () => void;
}

export const ContactCard: React.FC<ContactCardProps> = ({
  listing,
  onOpenInquiry,
  onOpenExternalNotice,
}) => {
  return (
    <>
      {/* Desktop Sticky Card */}
      <div className="hidden lg:block card p-6 shadow-2 sticky top-[calc(var(--header-h)+24px)]">
        {/* Rate headline */}
        <div className="pb-4 border-b border-line-200">
          <div className="flex items-baseline gap-1">
            <span className="font-serif text-3xl font-medium text-tide-900">
              {listing.rateLow ? money(listing.rateLow) : 'Inquire'}
            </span>
            {listing.rateHigh && (
              <span className="text-lg text-ink-600 font-serif">
                – {money(listing.rateHigh)}
              </span>
            )}
            <span className="text-sm text-ink-500 font-normal"> / night</span>
          </div>
          <p className="text-xs text-ink-500 mt-1">
            Set directly by owner · No guest service fees
          </p>
        </div>

        {/* Owner response note */}
        <div className="py-4 border-b border-line-200 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-sand-200 text-tide-900 font-serif font-semibold flex items-center justify-center text-sm shrink-0">
            {listing.owner.first.charAt(0)}
          </div>
          <div className="text-xs min-w-0">
            <p className="font-semibold text-tide-900 truncate">
              Hosted directly by {listing.owner.first}
            </p>
            <p className="text-ink-500 flex items-center gap-1 mt-0.5">
              <Clock className="w-3 h-3 text-brass-600 shrink-0" />
              <span>{listing.owner.responseNote}</span>
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-5 space-y-2.5">
          <Button
            variant="primary"
            size="lg"
            className="w-full justify-center"
            onClick={onOpenInquiry}
            icon={<MessageSquare className="w-4 h-4" strokeWidth={2} />}
          >
            Contact Owner
          </Button>

          {listing.externalUrl && (
            <Button
              variant="secondary"
              size="md"
              className="w-full justify-center text-xs"
              onClick={onOpenExternalNotice}
              icon={<ExternalLink className="w-3.5 h-3.5 text-brass-600" strokeWidth={2} />}
            >
              Book on owner's site
            </Button>
          )}

          <p className="text-[11px] text-ink-500 text-center leading-normal pt-1">
            Rates and availability are confirmed directly with the owner. RentABeachCondo does not process bookings or payments.
          </p>
        </div>

        <div className="mt-5 p-3 rounded bg-sand-50 border border-line-200 flex items-start gap-2 text-xs text-ink-600">
          <ShieldCheck className="w-4 h-4 text-brass-600 shrink-0 mt-0.5" strokeWidth={2} />
          <span>
            Verified owner listing on the Grand Strand. Deal directly, avoid OTA traveler commissions.
          </span>
        </div>
      </div>

      {/* Mobile Fixed Bottom Bar */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 bg-white border-t border-line-200 p-3.5 shadow-3 z-30 flex items-center justify-between safe-bottom">
        <div>
          <div className="flex items-baseline gap-1">
            <span className="font-serif text-lg font-semibold text-tide-900">
              {listing.rateLow ? money(listing.rateLow) : 'Inquire'}
            </span>
            {listing.rateHigh && (
              <span className="text-xs text-ink-600 font-serif">
                –{money(listing.rateHigh)}
              </span>
            )}
            <span className="text-xs text-ink-500"> / nt</span>
          </div>
          <p className="text-[10px] text-ink-500">Set by {listing.owner.first}</p>
        </div>

        <div className="flex items-center gap-2">
          {listing.externalUrl && (
            <Button
              variant="secondary"
              size="sm"
              onClick={onOpenExternalNotice}
              className="!px-2.5"
              aria-label="Book on owner's site"
            >
              <ExternalLink className="w-4 h-4 text-brass-600" />
            </Button>
          )}
          <Button
            variant="primary"
            size="sm"
            onClick={onOpenInquiry}
          >
            Contact Owner
          </Button>
        </div>
      </div>
    </>
  );
};
