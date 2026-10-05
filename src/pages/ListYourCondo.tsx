import React from 'react';
import { Link } from 'react-router-dom';
import { useStore, foundingSpotsLeft } from '../store/useStore';
import { Button } from '../components/ui/Button';
import { 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  Clock, 
  Layers, 
  Mail, 
  Search, 
  Camera, 
  HelpCircle 
} from 'lucide-react';

export const ListYourCondo: React.FC = () => {
  const spotsLeft = useStore(foundingSpotsLeft);

  return (
    <div className="flex-1 flex flex-col bg-sand-50">
      {/* Hero Section */}
      <section className="bg-sand-100 border-b border-line-200 pt-32 pb-16 lg:pb-24">
        <div className="container-x max-w-4xl text-center space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-line-300 text-brass-600 text-xs font-semibold uppercase tracking-wider shadow-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Founding Owner Offer</span>
          </div>

          <h1 className="h1 font-serif text-tide-900 leading-tight">
            List your condo free for six months.
          </h1>

          <p className="lead max-w-2xl mx-auto">
            We’re welcoming 25 founding owners to RentABeachCondo.com. Travelers contact you directly, and you keep 100% of every booking.
          </p>

          {/* Spots Remaining Indicator */}
          <div className="pt-2">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-brass-500/40 shadow-1 text-xs font-semibold text-tide-900">
              <span className="w-2 h-2 rounded-full bg-brass-500 animate-pulse" />
              <span>{spotsLeft} of 25 founding spots remaining</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link to="/list-your-condo/apply">
              <Button variant="primary" size="lg" withArrow>
                Start your listing application
              </Button>
            </Link>
            <Link to="/condo/sunrise-2br-sea-oats-tower">
              <Button variant="secondary" size="lg">
                See an example listing
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="section bg-white border-b border-line-200">
        <div className="container-x">
          <div className="max-w-2xl mb-12">
            <span className="eyebrow block mb-1">Owner Benefits</span>
            <h2 className="h2 font-serif text-tide-900">What’s included for founding owners</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="card p-6 bg-sand-50/70 border border-line-200 space-y-3">
              <div className="w-10 h-10 rounded-full bg-white text-brass-600 flex items-center justify-center shadow-1">
                <Layers className="w-5 h-5" strokeWidth={1.75} />
              </div>
              <h3 className="font-serif text-lg font-medium text-tide-900">Dedicated Listing Page</h3>
              <p className="text-xs text-ink-600 leading-relaxed">
                A custom, polished page showcasing your condo’s photos, amenities, floor plan, and building location.
              </p>
            </div>

            <div className="card p-6 bg-sand-50/70 border border-line-200 space-y-3">
              <div className="w-10 h-10 rounded-full bg-white text-brass-600 flex items-center justify-center shadow-1">
                <Mail className="w-5 h-5" strokeWidth={1.75} />
              </div>
              <h3 className="font-serif text-lg font-medium text-tide-900">Direct Inquiries</h3>
              <p className="text-xs text-ink-600 leading-relaxed">
                Traveler messages go straight to your email. You reply, set payment terms, and handle bookings yourself.
              </p>
            </div>

            <div className="card p-6 bg-sand-50/70 border border-line-200 space-y-3">
              <div className="w-10 h-10 rounded-full bg-white text-brass-600 flex items-center justify-center shadow-1">
                <Search className="w-5 h-5" strokeWidth={1.75} />
              </div>
              <h3 className="font-serif text-lg font-medium text-tide-900">Building Directory</h3>
              <p className="text-xs text-ink-600 leading-relaxed">
                Your unit is searchable by coastal area, specific building name, bedroom count, and key amenities.
              </p>
            </div>

            <div className="card p-6 bg-sand-50/70 border border-line-200 space-y-3">
              <div className="w-10 h-10 rounded-full bg-white text-brass-600 flex items-center justify-center shadow-1">
                <Camera className="w-5 h-5" strokeWidth={1.75} />
              </div>
              <h3 className="font-serif text-lg font-medium text-tide-900">Full-Size Photography</h3>
              <p className="text-xs text-ink-600 leading-relaxed">
                Up to 25 high-resolution photos displayed in a clean mosaic and full-screen lightbox gallery.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How the 6 Months Works Timeline */}
      <section className="section bg-sand-50 border-b border-line-200">
        <div className="container-x">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="eyebrow block mb-1">Simple Timeline</span>
            <h2 className="h2 font-serif text-tide-900">How the six months works</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
            <div className="card p-6 bg-white border border-line-200 space-y-2 relative">
              <span className="text-xs font-bold text-brass-600 uppercase tracking-wider">Step 1</span>
              <h3 className="font-serif text-lg font-medium text-tide-900">Apply online</h3>
              <p className="text-xs text-ink-600 leading-relaxed">
                Complete our 5-step form with your property details, house notes, and upload 6+ photos. Takes about 10 minutes.
              </p>
            </div>

            <div className="card p-6 bg-white border border-line-200 space-y-2 relative">
              <span className="text-xs font-bold text-brass-600 uppercase tracking-wider">Step 2</span>
              <h3 className="font-serif text-lg font-medium text-tide-900">Reviewed in 2 days</h3>
              <p className="text-xs text-ink-600 leading-relaxed">
                We review every listing by hand to ensure photo quality and building accuracy before publication.
              </p>
            </div>

            <div className="card p-6 bg-white border border-line-200 space-y-2 relative">
              <span className="text-xs font-bold text-brass-600 uppercase tracking-wider">Step 3</span>
              <h3 className="font-serif text-lg font-medium text-tide-900">Live for 6 months</h3>
              <p className="text-xs text-ink-600 leading-relaxed">
                Your listing is live on public search. Direct traveler inquiries are delivered straight to your inbox.
              </p>
            </div>

            <div className="card p-6 bg-white border border-line-200 space-y-2 relative">
              <span className="text-xs font-bold text-brass-600 uppercase tracking-wider">Step 4</span>
              <h3 className="font-serif text-lg font-medium text-tide-900">Decide to continue</h3>
              <p className="text-xs text-ink-600 leading-relaxed">
                We’ll share simple annual pricing before your trial ends. No automatic charges; you decide whether to stay.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Card Section */}
      <section className="section bg-white border-b border-line-200">
        <div className="container-x max-w-xl text-center">
          <div className="card p-8 sm:p-10 bg-sand-50 border-2 border-brass-500 shadow-2 space-y-4">
            <span className="eyebrow !text-brass-600">Introductory Offer</span>
            <div className="py-2">
              <span className="font-serif text-5xl font-medium text-tide-900">$0</span>
              <span className="text-sm text-ink-500 block mt-1">for your first six months</span>
            </div>
            <p className="text-xs sm:text-sm text-ink-600 leading-relaxed">
              No charge, no card required to apply. After your trial, simple annual directory pricing will be shared with you before your trial ends.
            </p>
            <div className="pt-2">
              <Link to="/list-your-condo/apply">
                <Button variant="primary" size="lg" className="w-full justify-center">
                  Claim your founding spot
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Requirements Checklist */}
      <section className="section bg-sand-50">
        <div className="container-x max-w-3xl">
          <div className="text-center mb-10">
            <span className="eyebrow block mb-1">Listing Standards</span>
            <h2 className="h2 font-serif text-tide-900">What we ask from owners</h2>
          </div>

          <div className="card p-6 sm:p-8 bg-white border border-line-200 space-y-4">
            {[
              {
                title: 'Owner of record',
                desc: 'You are the deeded owner of the condo, or have written authorization from the owner to market it.',
              },
              {
                title: 'At least 6 high-resolution photos',
                desc: 'Clear, well-lit photos of the living room, bedrooms, kitchen, bathroom, and balcony/view that you own or have rights to use.',
              },
              {
                title: 'Accurate property details',
                desc: 'Honest sleeping arrangements, bathroom counts, and realistic house notes for guests.',
              },
              {
                title: 'Good faith inquiry response',
                desc: 'A commitment to respond to traveler inquiries within a reasonable timeframe (most reply within 24 hours).',
              },
            ].map((req, i) => (
              <div key={i} className="flex items-start gap-3.5 pb-3 border-b border-line-200 last:border-none last:pb-0">
                <CheckCircle2 className="w-5 h-5 text-brass-600 shrink-0 mt-0.5" strokeWidth={2} />
                <div>
                  <h4 className="font-serif text-base font-semibold text-tide-900">{req.title}</h4>
                  <p className="text-xs text-ink-600 mt-0.5 leading-relaxed">{req.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex items-center justify-center gap-6 text-xs text-ink-600">
            <Link to="/terms/owners" className="underline decoration-brass-500 hover:text-tide-900">
              Read Owner Terms & Standards
            </Link>
            <span>·</span>
            <Link to="/terms/photos" className="underline decoration-brass-500 hover:text-tide-900">
              Photo Authorization Policy
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
