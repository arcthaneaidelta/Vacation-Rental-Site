import React from 'react';
import { Modal } from './Modal';
import { Button } from './Button';
import { ExternalLink, ShieldCheck } from 'lucide-react';

interface ExternalLinkNoticeProps {
  isOpen: boolean;
  onClose: () => void;
  url?: string;
  ownerName?: string;
}

export const ExternalLinkNotice: React.FC<ExternalLinkNoticeProps> = ({
  isOpen,
  onClose,
  url,
  ownerName = 'the owner',
}) => {
  const handleContinue = () => {
    onClose();
    // Open external link or demo target
    const target = url || '/external-demo';
    window.open(target, '_blank', 'noopener,noreferrer');
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="You're leaving RentABeachCondo.com"
      size="sm"
    >
      <div className="space-y-4">
        <p className="text-sm text-ink-600 leading-relaxed">
          Bookings are handled directly by {ownerName} on their approved booking site.
        </p>

        <div className="p-3.5 bg-sand-100 rounded border border-line-200 flex items-start gap-2.5 text-xs text-ink-600">
          <ShieldCheck className="w-4 h-4 text-brass-600 shrink-0 mt-0.5" strokeWidth={2} />
          <span>
            RentABeachCondo.com connects you directly with condo owners and never collects booking or service fees from travelers.
          </span>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row-reverse gap-2">
          <Button
            variant="primary"
            onClick={handleContinue}
            icon={<ExternalLink className="w-4 h-4" strokeWidth={2} />}
          >
            Continue to site
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Stay on listing
          </Button>
        </div>
      </div>
    </Modal>
  );
};
