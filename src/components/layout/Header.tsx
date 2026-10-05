import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { areas, buildings } from '../../data/seed';
import { useStore, pendingCount } from '../../store/useStore';
import { 
  Menu, 
  X, 
  Heart, 
  ChevronDown, 
  ArrowRight, 
  Building2, 
  Sparkles, 
  ShieldCheck, 
  Lock 
} from 'lucide-react';
import { Button } from '../ui/Button';

interface HeaderProps {
  transparentOnTop?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ transparentOnTop = true }) => {
  const location = useLocation();
  const isHome = location.pathname === '/';

  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [areasMegaOpen, setAreasMegaOpen] = useState(false);

  const savedCount = useStore((s) => s.saved.length);
  const pendingReviewCount = useStore(pendingCount);
  const isAdmin = useStore((s) => s.isAdmin);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setAreasMegaOpen(false);
  }, [location.pathname]);

  const isTransparent = isHome && transparentOnTop && !scrolled;

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-header transition-all duration-280 ${
          isTransparent
            ? 'bg-transparent text-white pt-3 pb-2'
            : 'bg-sand-50/95 backdrop-blur-md text-tide-900 border-b border-line-200 shadow-1 py-3'
        }`}
      >
        <div className="container-x flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2.5 group focus-visible:outline-none"
            aria-label="RentABeachCondo.com home"
          >
            {/* Monogram Icon */}
            <div
              className={`w-8 h-8 rounded border flex items-center justify-center font-serif text-sm font-semibold transition-colors ${
                isTransparent
                  ? 'border-white/30 bg-tide-950/40 text-white'
                  : 'border-brass-500/50 bg-tide-900 text-sand-50'
              }`}
            >
              RB
            </div>

            {/* Wordmark */}
            <span
              className={`font-serif text-xl sm:text-2xl font-normal tracking-tight transition-colors ${
                isTransparent ? 'text-white' : 'text-tide-900'
              }`}
            >
              RentABeach<span className="italic font-serif text-brass-500">Condo</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-7">
            <Link
              to="/browse"
              className={`nav-link text-sm font-medium ${isTransparent ? 'text-white/90 hover:text-white' : 'text-ink-900'}`}
            >
              Browse Condos
            </Link>

            {/* Areas with Mega-Menu */}
            <div
              className="relative"
              onMouseEnter={() => setAreasMegaOpen(true)}
              onMouseLeave={() => setAreasMegaOpen(false)}
            >
              <Link
                to="/areas"
                className={`nav-link text-sm font-medium flex items-center gap-1 ${
                  isTransparent ? 'text-white/90 hover:text-white' : 'text-ink-900'
                }`}
                aria-expanded={areasMegaOpen}
              >
                <span>Areas & Buildings</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${areasMegaOpen ? 'rotate-180' : ''}`}
                />
              </Link>

              {/* Mega-menu dropdown */}
              {areasMegaOpen && (
                <div className="absolute left-1/2 -translate-x-1/2 top-full pt-2 w-[720px] pop-in">
                  <div className="bg-white rounded-lg border border-line-200 shadow-3 p-6 grid grid-cols-3 gap-6 text-ink-900">
                    {areas
                      .filter((a) => a.market === 'grand-strand')
                      .map((area) => {
                        const areaBuildings = buildings.filter((b) => b.areaId === area.id);
                        return (
                          <div key={area.id} className="space-y-3">
                            <Link
                              to={`/areas/${area.id}`}
                              className="block group"
                            >
                              <div className="aspect-[16/10] rounded overflow-hidden bg-sand-100 mb-2">
                                <img
                                  src={area.image.src}
                                  alt={area.name}
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                              </div>
                              <h4 className="font-serif text-base font-semibold text-tide-900 group-hover:text-brass-600 transition-colors">
                                {area.name}
                              </h4>
                              <p className="text-xs text-ink-500 line-clamp-1">
                                {area.descriptor}
                              </p>
                            </Link>

                            <div className="space-y-1 pt-1 border-t border-line-200">
                              <span className="text-[10px] font-bold uppercase tracking-wider text-ink-500 block mb-1">
                                Buildings
                              </span>
                              {areaBuildings.slice(0, 3).map((b) => (
                                <Link
                                  key={b.id}
                                  to={`/areas/${area.id}/${b.id}`}
                                  className="text-xs text-ink-600 hover:text-tide-900 hover:underline block truncate"
                                >
                                  {b.name}
                                </Link>
                              ))}
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>
              )}
            </div>

            <Link
              to="/#how-it-works"
              className={`nav-link text-sm font-medium ${isTransparent ? 'text-white/90 hover:text-white' : 'text-ink-900'}`}
            >
              How It Works
            </Link>

            <Link
              to="/faq"
              className={`nav-link text-sm font-medium ${isTransparent ? 'text-white/90 hover:text-white' : 'text-ink-900'}`}
            >
              FAQ
            </Link>
          </nav>

          {/* Right Header Controls */}
          <div className="hidden sm:flex items-center gap-4">
            {/* Saved Badges */}
            <Link
              to="/browse?saved=true"
              className={`relative p-2 rounded-full transition-colors ${
                isTransparent ? 'text-white hover:bg-white/10' : 'text-tide-900 hover:bg-sand-100'
              }`}
              title="Saved condos"
              aria-label={`Saved condos (${savedCount})`}
            >
              <Heart className={`w-5 h-5 ${savedCount > 0 ? 'fill-brass-500 text-brass-500' : ''}`} />
              {savedCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-brass-500 text-white text-[10px] flex items-center justify-center font-bold">
                  {savedCount}
                </span>
              )}
            </Link>

            {/* List Your Condo CTA */}
            <Link to="/list-your-condo">
              <Button
                variant={isTransparent ? 'light' : 'secondary'}
                size="sm"
                className={isTransparent ? '!text-tide-900 shadow-1' : ''}
              >
                <span>List Your Condo</span>
              </Button>
            </Link>

            {/* Admin / Owner Link */}
            <Link
              to={isAdmin ? '/admin' : '/admin/login'}
              className={`text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                isTransparent ? 'text-white/80 hover:text-white' : 'text-ink-600 hover:text-tide-900'
              }`}
            >
              <Lock className="w-3.5 h-3.5 text-brass-600" />
              <span>{isAdmin ? 'Admin' : 'Owner portal'}</span>
              {pendingReviewCount > 0 && (
                <span className="w-4 h-4 rounded-full bg-warn-600 text-white text-[10px] flex items-center justify-center font-bold">
                  {pendingReviewCount}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex sm:hidden items-center gap-2">
            <Link
              to="/browse?saved=true"
              className={`p-2 rounded-full ${isTransparent ? 'text-white' : 'text-tide-900'}`}
              aria-label="Saved condos"
            >
              <Heart className={`w-5 h-5 ${savedCount > 0 ? 'fill-brass-500 text-brass-500' : ''}`} />
            </Link>

            <button
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open menu"
              className={`p-2 rounded-full ${isTransparent ? 'text-white' : 'text-tide-900'}`}
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Slide-Over Sheet */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-modal overflow-hidden">
          <div
            className="scrim"
            data-state="open"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-sm bg-sand-50 shadow-3 flex flex-col justify-between p-6 overflow-y-auto">
              <div>
                {/* Header */}
                <div className="flex items-center justify-between pb-6 border-b border-line-200">
                  <span className="font-serif text-xl font-normal text-tide-900">
                    RentABeach<span className="italic text-brass-500">Condo</span>
                  </span>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    aria-label="Close menu"
                    className="p-2 rounded-full text-ink-500 hover:bg-sand-200"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Mobile Links */}
                <div className="py-6 space-y-4">
                  <Link
                    to="/browse"
                    className="block font-serif text-2xl text-tide-900 hover:text-brass-600 transition-colors"
                  >
                    Browse All Condos
                  </Link>

                  <div className="py-2 border-y border-line-200/60 space-y-2">
                    <span className="text-xs font-semibold text-brass-600 uppercase tracking-wider block">
                      Explore by Area
                    </span>
                    {areas
                      .filter((a) => a.market === 'grand-strand')
                      .map((area) => (
                        <Link
                          key={area.id}
                          to={`/areas/${area.id}`}
                          className="block text-base text-ink-900 hover:text-tide-900 py-1"
                        >
                          {area.name}
                        </Link>
                      ))}
                  </div>

                  <Link
                    to="/#how-it-works"
                    className="block font-serif text-xl text-tide-900 hover:text-brass-600 transition-colors"
                  >
                    How Direct Renting Works
                  </Link>

                  <Link
                    to="/faq"
                    className="block font-serif text-xl text-tide-900 hover:text-brass-600 transition-colors"
                  >
                    Frequently Asked Questions
                  </Link>

                  <Link
                    to="/contact"
                    className="block font-serif text-xl text-tide-900 hover:text-brass-600 transition-colors"
                  >
                    Contact Us
                  </Link>

                  <Link
                    to={isAdmin ? '/admin' : '/admin/login'}
                    className="block text-sm font-semibold text-tide-900 pt-2"
                  >
                    {isAdmin ? 'Admin Dashboard' : 'Owner Portal Sign-In'}
                  </Link>
                </div>
              </div>

              {/* Bottom Sticky Action */}
              <div className="pt-6 border-t border-line-200 safe-bottom">
                <Link to="/list-your-condo" className="block w-full">
                  <Button variant="primary" size="lg" className="w-full justify-center">
                    <span>List Your Condo Free</span>
                  </Button>
                </Link>
                <p className="text-[11px] text-ink-500 text-center mt-2.5">
                  25 founding owner spots with 6 months complimentary
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
