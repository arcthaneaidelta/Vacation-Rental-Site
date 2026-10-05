import React from 'react';
import { ExternalLink, ShieldCheck, ArrowLeft } from 'lucide-react';
import { Button } from '../components/ui/Button';

export const ExternalDemoPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-sand-50 flex items-center justify-center p-6">
      <div className="card p-8 sm:p-12 max-w-lg bg-white border border-line-200 shadow-2 text-center space-y-4">
        <div className="w-14 h-14 rounded-full bg-sand-100 text-brass-600 flex items-center justify-center mx-auto">
          <ExternalLink className="w-7 h-7" />
        </div>

        <span className="badge bg-sand-100 text-brass-600 font-semibold text-xs uppercase tracking-wider">
          External Booking Site Simulation
        </span>

        <h1 className="h3 font-serif text-tide-900">
          Owner’s Approved External Site
        </h1>

        <p className="text-xs sm:text-sm text-ink-600 leading-relaxed">
          In production, this destination is the condo owner’s own direct booking website or platform link (such as their verified VRBO, Airbnb, or direct hospitality engine).
        </p>

        <div className="p-4 bg-sand-50 rounded border border-line-200 text-xs text-ink-600 text-left flex items-start gap-2.5">
          <ShieldCheck className="w-4 h-4 text-brass-600 shrink-0 mt-0.5" />
          <span>
            RentABeachCondo verified this external booking link during administrative review before publication.
          </span>
        </div>

        <div className="pt-4">
          <Button
            variant="primary"
            size="sm"
            onClick={() => window.close()}
          >
            Close this tab
          </Button>
        </div>
      </div>
    </div>
  );
};
