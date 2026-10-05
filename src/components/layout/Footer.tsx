import React from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../../store/useStore';
import { markets, areas } from '../../data/seed';
import type { MarketId } from '../../data/types';
import { ArrowRight, MapPin, Sparkles, ShieldCheck } from 'lucide-react';
import { Button } from '../ui/Button';

export const Footer: React.FC = () => {
  const currentMarket = useStore((s) => s.market);
  const setMarket = useStore((s) => s.setMarket);
  const allMarkets = useStore((s) => s.markets);

  return (
    <footer className="bg-sand-100 text-ink-900 border-t border-line-200 mt-auto">
      {/* Closing CTA Band */}
      <div className="bg-tide-900 text-white py-14 sm:py-16">
        <div className="container-x flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="max-w-xl space-y-2">
            <span className="eyebrow !text-brass-500 flex items-center justify-center md:justify-start gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> Founding Owner Opportunity
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal text-white">
              Own a beach condo on the Grand Strand?
            </h2>
            <p className="text-sm sm:text-base text-white/80 leading-relaxed">
              We’re welcoming 25 founding owners. List free for six months, deal directly with travelers, and keep every booking.
            </p>
          </div>

          <div className="shrink-0 flex flex-col sm:flex-row gap-3">
            <Link to="/list-your-condo">
              <Button
                variant="light"
                size="lg"
                withArrow
                className="!text-tide-900 shadow-2"
              >
                List your condo free
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Main 4-column directory footer */}
      <div className="container-x py-14 sm:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Col */}
          <div className="col-span-2 md:col-span-4 lg:col-span-2 space-y-4">
            <Link to="/" className="inline-block">
              <span className="font-serif text-2xl font-normal text-tide-900">
                RentABeach<span className="italic text-brass-500">Condo</span>
              </span>
            </Link>
            <p className="text-xs sm:text-sm text-ink-600 max-w-sm leading-relaxed">
              A boutique coastal vacation directory connecting travelers directly with verified beach-condo owners. No booking commissions, direct communication.
            </p>
            <div className="pt-2 text-xs text-ink-500 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-brass-600 shrink-0" />
              <span>Direct owner directory · Grand Strand, South Carolina</span>
            </div>
          </div>

          {/* Col 1: Explore */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-tide-900 uppercase tracking-wider">
              Explore
            </h4>
            <ul className="space-y-2 text-xs text-ink-600">
              <li>
                <Link to="/browse" className="hover:text-tide-900 transition-colors">
                  All Grand Strand Condos
                </Link>
              </li>
              {areas
                .filter((a) => a.market === 'grand-strand')
                .map((a) => (
                  <li key={a.id}>
                    <Link to={`/areas/${a.id}`} className="hover:text-tide-900 transition-colors">
                      {a.name}
                    </Link>
                  </li>
                ))}
              <li>
                <Link to="/areas" className="hover:text-tide-900 transition-colors">
                  Buildings Directory
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 2: For Owners */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-tide-900 uppercase tracking-wider">
              For Condo Owners
            </h4>
            <ul className="space-y-2 text-xs text-ink-600">
              <li>
                <Link to="/list-your-condo" className="text-brass-600 font-semibold hover:text-brass-700">
                  Founding Intro Offer
                </Link>
              </li>
              <li>
                <Link to="/list-your-condo/apply" className="hover:text-tide-900 transition-colors">
                  Apply to List (5 Steps)
                </Link>
              </li>
              <li>
                <Link to="/terms/owners" className="hover:text-tide-900 transition-colors">
                  Owner Terms & Standards
                </Link>
              </li>
              <li>
                <Link to="/terms/photos" className="hover:text-tide-900 transition-colors">
                  Photo Authorization
                </Link>
              </li>
              <li>
                <Link to="/admin/login" className="hover:text-tide-900 transition-colors">
                  Owner Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Company & Support */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-tide-900 uppercase tracking-wider">
              Company & Legal
            </h4>
            <ul className="space-y-2 text-xs text-ink-600">
              <li>
                <Link to="/#how-it-works" className="hover:text-tide-900 transition-colors">
                  How Direct Booking Works
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-tide-900 transition-colors">
                  FAQ & Policies
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-tide-900 transition-colors">
                  Contact Support
                </Link>
              </li>
              <li>
                <Link to="/terms/site" className="hover:text-tide-900 transition-colors">
                  Terms & Privacy Notice
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Expansion Market Switcher Band */}
        <div className="mt-12 pt-8 border-t border-line-200 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-2 text-ink-600">
            <MapPin className="w-3.5 h-3.5 text-brass-600 shrink-0" />
            <span className="font-semibold text-tide-900">Coastal Market:</span>
            <div className="flex items-center gap-1.5 flex-wrap">
              {allMarkets.map((m) => {
                const isSelected = m.id === currentMarket;
                return (
                  <button
                    key={m.id}
                    onClick={() => setMarket(m.id as MarketId)}
                    className={`px-2.5 py-1 rounded text-xs transition-colors ${
                      isSelected
                        ? 'bg-tide-900 text-white font-semibold shadow-1'
                        : 'bg-white text-ink-600 border border-line-200 hover:border-line-300'
                    }`}
                  >
                    {m.name} {m.status === 'planned' ? '(Coming Soon)' : '· Live'}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="text-ink-500 italic text-[11px] text-center md:text-right">
            Sample content for demonstration. Final text provided by RentABeachCondo.com.
          </div>
        </div>

        {/* Copyright bar */}
        <div className="mt-6 text-[11px] text-ink-500 text-center flex flex-col sm:flex-row items-center justify-between gap-2 border-t border-line-200/50 pt-4">
          <span>© 2026 RentABeachCondo.com. All rights reserved.</span>
          <span>Designed & developed for Grand Strand launch and coastal expansion.</span>
        </div>
      </div>
    </footer>
  );
};
