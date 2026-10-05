import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useStore, selectLive, foundingSpotsLeft } from '../store/useStore';
import { areas, buildings } from '../data/seed';
import { localImages } from '../data/images';
import { SearchBar } from '../components/listing/SearchBar';
import { ListingCard } from '../components/listing/ListingCard';
import { Img } from '../components/ui/Img';
import { Button } from '../components/ui/Button';
import { 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  MapPin, 
  MessageSquare, 
  Calendar, 
  HeartHandshake, 
  CheckCircle2, 
  ChevronDown 
} from 'lucide-react';

export const Home: React.FC = () => {
  const liveListings = useStore(selectLive);
  const spotsLeft = useStore(foundingSpotsLeft);
  const featuredListings = liveListings.filter((l) => l.featured).slice(0, 6);

  // Entry loader sequence states
  const [loaderVisible, setLoaderVisible] = useState(false);
  const [loaderExiting, setLoaderExiting] = useState(false);

  useEffect(() => {
    // Only run loader once per session
    const hasLoaded = sessionStorage.getItem('rbc_entry_seen');
    if (!hasLoaded) {
      setLoaderVisible(true);
      const exitTimer = setTimeout(() => {
        setLoaderExiting(true);
        setTimeout(() => {
          setLoaderVisible(false);
          sessionStorage.setItem('rbc_entry_seen', 'true');
        }, 600);
      }, 1000);

      return () => clearTimeout(exitTimer);
    }
  }, []);

  const skipLoader = () => {
    setLoaderExiting(true);
    setTimeout(() => {
      setLoaderVisible(false);
      sessionStorage.setItem('rbc_entry_seen', 'true');
    }, 200);
  };

  return (
    <div className="flex-1 flex flex-col">
      {/* 1.2s Entry Loader (Target 1.2s, skippable on click) */}
      {loaderVisible && (
        <div
          onClick={skipLoader}
          className={`fixed inset-0 z-100 bg-sand-50 flex flex-col items-center justify-center cursor-pointer select-none transition-transform duration-600 ${
            loaderExiting ? 'loader-exit' : ''
          }`}
        >
          <div className="text-center space-y-4 px-6">
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-tide-900 loader-word font-normal">
              RentABeach<span className="italic text-brass-500">Condo</span>
            </h1>
            <div className="w-24 h-[1px] bg-brass-500 mx-auto animate-pulse" />
            <p className="text-xs sm:text-sm text-ink-600 font-sans tracking-wide opacity-90">
              Beach condos, direct from the owners.
            </p>
          </div>
          <span className="absolute bottom-6 text-[11px] text-ink-500">
            Click anywhere to skip
          </span>
        </div>
      )}

      {/* Landing Hero */}
      <section className="relative min-h-[640px] lg:min-h-[720px] flex flex-col justify-between pt-28 pb-16 overflow-hidden">
        {/* Full-bleed ocean horizon background */}
        <div className="absolute inset-0 z-0 overflow-hidden bg-tide-900">
          <img
            src={localImages.hero.src}
            alt={localImages.hero.alt}
            className="w-full h-full object-cover kenburns opacity-90"
            fetchPriority="high"
          />
          {/* Tidal overlay gradient for AA contrast */}
          <div className="absolute inset-0 hero-scrim" />
        </div>

        {/* Hero Content */}
        <div className="container-x relative z-10 flex-1 flex flex-col justify-center max-w-read py-8 lg:py-14 text-white">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-brass-500" />
              <span>Grand Strand, South Carolina</span>
            </div>

            <h1 className="h1 text-white leading-tight font-serif drop-shadow-sm">
              Beach condos, straight from the people who love them.
            </h1>

            <p className="text-base sm:text-lg text-white/90 leading-relaxed font-sans max-w-xl">
              Browse owner-listed condos in North Myrtle Beach, Myrtle Beach, and Surfside Beach. Contact owners directly, no middlemen.
            </p>

            <div className="pt-2 flex items-center gap-4 flex-wrap">
              <Link
                to="/list-your-condo"
                className="text-xs sm:text-sm font-semibold text-sand-50 hover:text-white arrow-link"
              >
                <span>Own a condo? List it free for six months</span>
                <span className="arrow">→</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Floating Search Bar (overlaps bottom edge of hero) */}
        <div className="container-x relative z-20 mt-6">
          <SearchBar variant="hero" />
        </div>
      </section>

      {/* Trust Strip */}
      <section className="bg-white border-y border-line-200 py-6">
        <div className="container-x flex flex-wrap items-center justify-around gap-6 text-center text-xs sm:text-sm text-ink-600">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-brass-600 shrink-0" strokeWidth={2} />
            <span><strong className="text-tide-900">{spotsLeft} founding spots</strong> remaining</span>
          </div>
          <span className="hidden sm:inline text-line-300">·</span>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-brass-600 shrink-0" strokeWidth={2} />
            <span><strong className="text-tide-900">3 coastal communities</strong> & 8 premier buildings</span>
          </div>
          <span className="hidden sm:inline text-line-300">·</span>
          <div className="flex items-center gap-2">
            <HeartHandshake className="w-4 h-4 text-brass-600 shrink-0" strokeWidth={2} />
            <span><strong className="text-tide-900">Direct contact</strong> with zero traveler booking fees</span>
          </div>
        </div>
      </section>

      {/* Explore by Area Section */}
      <section className="section bg-sand-50">
        <div className="container-x">
          <div className="flex flex-col sm:flex-row items-baseline justify-between mb-8 sm:mb-12 gap-2">
            <div>
              <span className="eyebrow block mb-1">Destinations</span>
              <h2 className="h2 font-serif text-tide-900">Explore by coastal area</h2>
            </div>
            <Link to="/areas" className="text-sm font-semibold text-tide-900 arrow-link">
              View all buildings <span className="arrow">→</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {areas
              .filter((a) => a.market === 'grand-strand')
              .map((area) => {
                const count = liveListings.filter((l) => l.areaId === area.id).length;
                return (
                  <Link
                    key={area.id}
                    to={`/areas/${area.id}`}
                    className="card card-hover group aspect-[4/5] relative rounded-lg overflow-hidden flex flex-col justify-end p-6 text-white"
                  >
                    <div className="absolute inset-0 bg-tide-950">
                      <img
                        src={area.image.src}
                        alt={area.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                      />
                      <div className="absolute inset-0 photo-scrim" />
                    </div>

                    <div className="relative z-10 space-y-1.5">
                      <div className="flex items-center justify-between text-xs text-white/80">
                        <span className="bg-white/20 backdrop-blur-sm px-2.5 py-0.5 rounded-full font-medium">
                          {count} {count === 1 ? 'condo' : 'condos'}
                        </span>
                      </div>
                      <h3 className="font-serif text-2xl font-medium text-white group-hover:text-sand-50 transition-colors">
                        {area.name}
                      </h3>
                      <p className="text-xs text-white/80 line-clamp-2 leading-relaxed">
                        {area.descriptor}
                      </p>
                    </div>
                  </Link>
                );
              })}
          </div>
        </div>
      </section>

      {/* Featured Condos Section */}
      <section className="section bg-white border-t border-line-200">
        <div className="container-x">
          <div className="flex flex-col sm:flex-row items-baseline justify-between mb-8 sm:mb-12 gap-2">
            <div>
              <span className="eyebrow block mb-1">Featured Units</span>
              <h2 className="h2 font-serif text-tide-900">Direct from Grand Strand owners</h2>
            </div>
            <Link to="/browse" className="text-sm font-semibold text-tide-900 arrow-link">
              Browse all {liveListings.length} condos <span className="arrow">→</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {featuredListings.map((listing, idx) => (
              <ListingCard
                key={listing.id}
                listing={listing}
                priority={idx === 0}
              />
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link to="/browse">
              <Button variant="secondary" size="lg">
                View all Grand Strand listings ({liveListings.length})
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How it Works (Travelers) */}
      <section id="how-it-works" className="section bg-sand-50 border-t border-line-200">
        <div className="container-x max-w-4xl text-center mb-12 sm:mb-16">
          <span className="eyebrow block mb-2">Straightforward Process</span>
          <h2 className="h2 font-serif text-tide-900 mb-3">How direct renting works</h2>
          <p className="text-ink-600 text-base max-w-xl mx-auto">
            We are a directory connecting you straight to verified owners. You get better rates, and owners keep 100% of their rental income.
          </p>
        </div>

        <div className="container-x grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Step 1 */}
          <div className="card p-6 sm:p-8 bg-white text-center space-y-3 relative">
            <div className="w-12 h-12 rounded-full bg-sand-100 text-brass-600 flex items-center justify-center font-serif text-xl font-bold mx-auto mb-2">
              1
            </div>
            <h3 className="font-serif text-xl font-medium text-tide-900">Find your building</h3>
            <p className="text-xs sm:text-sm text-ink-600 leading-relaxed">
              Filter by coastal area, specific building, bedrooms, and the amenities that matter most to your family.
            </p>
          </div>

          {/* Step 2 */}
          <div className="card p-6 sm:p-8 bg-white text-center space-y-3 relative">
            <div className="w-12 h-12 rounded-full bg-sand-100 text-brass-600 flex items-center justify-center font-serif text-xl font-bold mx-auto mb-2">
              2
            </div>
            <h3 className="font-serif text-xl font-medium text-tide-900">Ask the owner</h3>
            <p className="text-xs sm:text-sm text-ink-600 leading-relaxed">
              Send a direct message with your dates and questions. Inquiries are delivered straight to the owner’s inbox.
            </p>
          </div>

          {/* Step 3 */}
          <div className="card p-6 sm:p-8 bg-white text-center space-y-3 relative">
            <div className="w-12 h-12 rounded-full bg-sand-100 text-brass-600 flex items-center justify-center font-serif text-xl font-bold mx-auto mb-2">
              3
            </div>
            <h3 className="font-serif text-xl font-medium text-tide-900">Book your way</h3>
            <p className="text-xs sm:text-sm text-ink-600 leading-relaxed">
              Confirm rates and reservation details directly with the owner, or follow their approved booking link.
            </p>
          </div>
        </div>
      </section>

      {/* Owner Band (Split Layout) */}
      <section className="section bg-sand-100 border-t border-line-200">
        <div className="container-x">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
            {/* Left Content */}
            <div className="space-y-4">
              <span className="eyebrow block">Founding Owner Offer</span>
              <h2 className="h2 font-serif text-tide-900">
                Your condo deserves its own page.
              </h2>
              <p className="text-base text-ink-600 leading-relaxed">
                Reach travelers directly and keep every booking. We’re offering 25 condo owners complimentary six-month listings to launch RentABeachCondo.com on the Grand Strand.
              </p>

              <div className="space-y-2.5 pt-2">
                {[
                  'Direct traveler inquiries forwarded to your email',
                  'Organized by your specific condo building and coastal community',
                  'Support for your own direct booking link or website',
                  'Simple annual pricing shared before trial ends—no surprise fees',
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-ink-900">
                    <CheckCircle2 className="w-4 h-4 text-brass-600 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4 flex items-center gap-4 flex-wrap">
                <Link to="/list-your-condo">
                  <Button variant="primary" size="lg" withArrow>
                    <span>View Introductory Offer</span>
                  </Button>
                </Link>
                <Link to="/list-your-condo/apply" className="text-xs font-semibold text-tide-900 hover:underline">
                  Start 5-step application →
                </Link>
              </div>
            </div>

            {/* Right Card / Visual */}
            <div className="relative">
              <div className="card overflow-hidden shadow-2 bg-white aspect-[4/3]">
                <img
                  src={localImages.nmb.src}
                  alt="Beach condo interior preview"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -left-4 sm:bottom-6 sm:-left-6 bg-white p-4 rounded-lg shadow-3 border border-line-200 max-w-xs">
                <p className="font-serif text-lg font-semibold text-tide-900">
                  {spotsLeft} of 25 spots left
                </p>
                <p className="text-xs text-ink-500 mt-0.5">
                  Complimentary 6-month trial for Grand Strand owners.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
