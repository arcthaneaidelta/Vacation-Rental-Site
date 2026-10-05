import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { buildings, areas } from '../data/seed';
import { bedLabel, money, plural } from '../lib/format';
import { ListingGallery } from '../components/listing/ListingGallery';
import { AmenityGrid } from '../components/listing/AmenityGrid';
import { ContactCard } from '../components/listing/ContactCard';
import { InquiryDrawer } from '../components/listing/InquiryDrawer';
import { ExternalLinkNotice } from '../components/ui/ExternalLinkNotice';
import { Badge } from '../components/ui/Badge';
import { 
  ChevronRight, 
  BedDouble, 
  Bath, 
  Users, 
  Layers, 
  Waves, 
  MapPin, 
  Building2, 
  ShieldCheck, 
  Sparkles, 
  Clock, 
  Check, 
  Info 
} from 'lucide-react';

interface ListingPageProps {
  previewListing?: any;
}

export const ListingPage: React.FC<ListingPageProps> = ({ previewListing }) => {
  const { slug } = useParams<{ slug: string }>();
  const listings = useStore((s) => s.listings);

  // If previewListing is passed (e.g. from Admin review detail), use it; else find by slug
  const listing = previewListing || listings.find((l) => l.slug === slug) || listings[0];

  const building = buildings.find((b) => b.id === listing.buildingId) || buildings[0];
  const area = areas.find((a) => a.id === (listing.areaId || building.areaId)) || areas[0];

  const [inquiryOpen, setInquiryOpen] = useState(false);
  const [externalNoticeOpen, setExternalNoticeOpen] = useState(false);
  const [readMore, setReadMore] = useState(false);

  const isOceanfront = listing.view === 'Oceanfront' || listing.amenities?.includes('oceanfront');

  return (
    <div className="flex-1 flex flex-col bg-sand-50 pb-20 lg:pb-16">
      {/* Breadcrumbs */}
      <div className="bg-white border-b border-line-200 pt-24 pb-3">
        <div className="container-x flex items-center gap-1.5 text-xs text-ink-500 overflow-x-auto no-scrollbar">
          <Link to="/" className="hover:text-tide-900 shrink-0">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-line-300 shrink-0" />
          <Link to="/browse" className="hover:text-tide-900 shrink-0">Browse</Link>
          <ChevronRight className="w-3.5 h-3.5 text-line-300 shrink-0" />
          <Link to={`/areas/${area.id}`} className="hover:text-tide-900 shrink-0">{area.name}</Link>
          <ChevronRight className="w-3.5 h-3.5 text-line-300 shrink-0" />
          <Link to={`/areas/${area.id}/${building.id}`} className="hover:text-tide-900 shrink-0">{building.name}</Link>
          <ChevronRight className="w-3.5 h-3.5 text-line-300 shrink-0" />
          <span className="text-tide-900 font-semibold truncate shrink-0">{listing.title}</span>
        </div>
      </div>

      <div className="container-x py-6 sm:py-8 space-y-6">
        {/* Title & Subtitle line */}
        <div>
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            {isOceanfront && <Badge variant="oceanfront" />}
            {listing.featured && <Badge variant="featured" />}
            <span className="badge bg-sand-100 text-brass-600 border border-brass-500/40 font-semibold text-xs">
              Direct Owner Listing
            </span>
          </div>

          <h1 className="h1 font-serif text-tide-900">{listing.title}</h1>

          <div className="flex items-center gap-2 text-xs sm:text-sm text-ink-600 mt-2 flex-wrap">
            <Link
              to={`/areas/${area.id}/${building.id}`}
              className="font-semibold text-brass-600 hover:underline"
            >
              {building.name}
            </Link>
            <span>·</span>
            <Link to={`/areas/${area.id}`} className="hover:underline">
              {area.name}
            </Link>
            <span>·</span>
            <span>Floor {listing.floor}</span>
            <span>·</span>
            <span>{listing.view}</span>
          </div>
        </div>

        {/* Mosaic / Carousel Photo Gallery */}
        <ListingGallery photos={listing.photos} title={listing.title} />

        {/* Two-Column Body: 7/12 content, 5/12 sticky contact card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 pt-4 items-start">
          {/* Left Column (Content) */}
          <div className="lg:col-span-7 space-y-10">
            {/* At A Glance 4 Icon Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3.5 bg-white rounded-lg border border-line-200 text-center">
                <BedDouble className="w-5 h-5 text-brass-600 mx-auto mb-1.5" strokeWidth={1.75} />
                <span className="text-xs text-ink-500 block">Bedrooms</span>
                <span className="font-serif text-base font-semibold text-tide-900">
                  {bedLabel(listing.bedrooms)}
                </span>
              </div>

              <div className="p-3.5 bg-white rounded-lg border border-line-200 text-center">
                <Bath className="w-5 h-5 text-brass-600 mx-auto mb-1.5" strokeWidth={1.75} />
                <span className="text-xs text-ink-500 block">Bathrooms</span>
                <span className="font-serif text-base font-semibold text-tide-900">
                  {plural(listing.bathrooms, 'bath')}
                </span>
              </div>

              <div className="p-3.5 bg-white rounded-lg border border-line-200 text-center">
                <Users className="w-5 h-5 text-brass-600 mx-auto mb-1.5" strokeWidth={1.75} />
                <span className="text-xs text-ink-500 block">Capacity</span>
                <span className="font-serif text-base font-semibold text-tide-900">
                  Sleeps {listing.sleeps}
                </span>
              </div>

              <div className="p-3.5 bg-white rounded-lg border border-line-200 text-center">
                <Waves className="w-5 h-5 text-brass-600 mx-auto mb-1.5" strokeWidth={1.75} />
                <span className="text-xs text-ink-500 block">Exposure</span>
                <span className="font-serif text-base font-semibold text-tide-900 truncate block">
                  {listing.view}
                </span>
              </div>
            </div>

            {/* About This Condo */}
            <div className="card p-6 sm:p-8 bg-white space-y-4">
              <h2 className="font-serif text-xl sm:text-2xl font-medium text-tide-900">
                About this condo
              </h2>
              <div className="prose-read text-ink-600 text-sm sm:text-base leading-relaxed space-y-3">
                {listing.description.slice(0, readMore ? undefined : 2).map((p: string, i: number) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
              {listing.description.length > 2 && (
                <button
                  onClick={() => setReadMore(!readMore)}
                  className="text-xs font-semibold text-brass-600 hover:text-brass-700 underline underline-offset-2"
                >
                  {readMore ? 'Show less' : 'Read more about this unit'}
                </button>
              )}
            </div>

            {/* Amenities Grid */}
            <div className="card p-6 sm:p-8 bg-white space-y-5">
              <div className="flex items-center justify-between">
                <h2 className="font-serif text-xl sm:text-2xl font-medium text-tide-900">
                  Amenities
                </h2>
                <span className="text-xs text-ink-500">
                  {listing.amenities?.length || 0} features
                </span>
              </div>
              <AmenityGrid
                amenityIds={listing.amenities || []}
                otherAmenity={listing.otherAmenity}
              />
            </div>

            {/* Sleeping Arrangements */}
            {listing.sleeping && listing.sleeping.length > 0 && (
              <div className="card p-6 sm:p-8 bg-white space-y-4">
                <h2 className="font-serif text-xl sm:text-2xl font-medium text-tide-900">
                  Sleeping arrangements
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {listing.sleeping.map((item: any, i: number) => (
                    <div
                      key={i}
                      className="p-4 rounded-lg bg-sand-50 border border-line-200 space-y-1"
                    >
                      <BedDouble className="w-4 h-4 text-brass-600" />
                      <h4 className="font-serif text-sm font-semibold text-tide-900">
                        {item.room}
                      </h4>
                      <p className="text-xs text-ink-500">{item.beds}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Building and Community Card */}
            <div className="card p-6 sm:p-8 bg-white space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="font-serif text-xl sm:text-2xl font-medium text-tide-900">
                  Building & community
                </h2>
                <Link
                  to={`/areas/${area.id}/${building.id}`}
                  className="text-xs font-semibold text-brass-600 hover:underline flex items-center gap-1"
                >
                  <span>Building guide</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center p-4 bg-sand-50 rounded-lg border border-line-200">
                <div className="w-16 h-16 rounded overflow-hidden shrink-0 bg-sand-100">
                  <img
                    src={building.image.src}
                    alt={building.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-serif text-base font-semibold text-tide-900">
                    {building.name}
                  </h3>
                  <p className="text-xs text-ink-500 mt-0.5">
                    {building.street} · {building.floors} floors · {building.beachDistance}
                  </p>
                  <p className="text-xs text-ink-600 mt-1 line-clamp-1">{building.notes}</p>
                </div>
              </div>
            </div>

            {/* Location (Stylized SVG Coastline Illustration) */}
            <div className="card p-6 sm:p-8 bg-white space-y-4">
              <h2 className="font-serif text-xl sm:text-2xl font-medium text-tide-900">
                Location & neighborhood
              </h2>
              <p className="text-xs sm:text-sm text-ink-600">
                Located in {area.name}, South Carolina on {building.street}.
              </p>

              {/* Stylized Coastline Map Sketch */}
              <div className="relative rounded-lg overflow-hidden bg-sand-100 border border-line-200 p-6 flex flex-col items-center justify-center min-h-[180px] text-center">
                <div className="w-full max-w-sm space-y-2">
                  <div className="w-8 h-8 rounded-full bg-tide-900 text-white flex items-center justify-center mx-auto shadow-2">
                    <MapPin className="w-4 h-4 text-brass-500" />
                  </div>
                  <p className="font-serif text-base font-semibold text-tide-900">
                    {building.name}
                  </p>
                  <p className="text-xs text-ink-500">
                    {building.beachDistance} to the Atlantic Ocean sand
                  </p>
                  <div className="flex items-center justify-center gap-3 pt-2 text-[11px] text-ink-600">
                    <span>Atlantic Ocean (East)</span>
                    <span>·</span>
                    <span>Boardwalk & Dining (Nearby)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Meet the Owner */}
            <div className="card p-6 sm:p-8 bg-white space-y-4">
              <h2 className="font-serif text-xl sm:text-2xl font-medium text-tide-900">
                Meet the condo owner
              </h2>
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-full bg-sand-200 text-tide-900 font-serif font-bold text-xl flex items-center justify-center shrink-0">
                  {listing.owner.first.charAt(0)}
                </div>
                <div className="space-y-1">
                  <h3 className="font-serif text-lg font-semibold text-tide-900">
                    {listing.owner.first} {listing.owner.last}
                  </h3>
                  <p className="text-xs text-ink-500">
                    Direct owner since 2026 · {area.name}, South Carolina
                  </p>
                  <p className="text-xs text-ink-600 flex items-center gap-1.5 pt-1">
                    <Clock className="w-3.5 h-3.5 text-brass-600" />
                    <span>{listing.owner.responseNote}</span>
                  </p>
                </div>
              </div>
            </div>

            {/* House Notes & Policies */}
            <div className="card p-6 sm:p-8 bg-white space-y-4">
              <h2 className="font-serif text-xl sm:text-2xl font-medium text-tide-900">
                House notes & policies
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-ink-900">
                <div className="p-3 bg-sand-50 rounded border border-line-200">
                  <span className="font-semibold text-tide-900 block mb-0.5">Check-in / Check-out</span>
                  <span>{listing.houseNotes.checkIn}</span>
                </div>
                <div className="p-3 bg-sand-50 rounded border border-line-200">
                  <span className="font-semibold text-tide-900 block mb-0.5">Minimum Stay</span>
                  <span>{listing.houseNotes.minStay}</span>
                </div>
                <div className="p-3 bg-sand-50 rounded border border-line-200">
                  <span className="font-semibold text-tide-900 block mb-0.5">Pet Policy</span>
                  <span>{listing.houseNotes.pets}</span>
                </div>
                <div className="p-3 bg-sand-50 rounded border border-line-200">
                  <span className="font-semibold text-tide-900 block mb-0.5">Smoking</span>
                  <span>{listing.houseNotes.smoking}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Sticky Contact Card (360px on desktop) */}
          <div className="lg:col-span-5">
            <ContactCard
              listing={listing}
              onOpenInquiry={() => setInquiryOpen(true)}
              onOpenExternalNotice={() => setExternalNoticeOpen(true)}
            />
          </div>
        </div>
      </div>

      {/* Inquiry Drawer */}
      <InquiryDrawer
        isOpen={inquiryOpen}
        onClose={() => setInquiryOpen(false)}
        listing={listing}
      />

      {/* External Booking Link Modal */}
      <ExternalLinkNotice
        isOpen={externalNoticeOpen}
        onClose={() => setExternalNoticeOpen(false)}
        url={listing.externalUrl}
        ownerName={listing.owner.first}
      />
    </div>
  );
};
