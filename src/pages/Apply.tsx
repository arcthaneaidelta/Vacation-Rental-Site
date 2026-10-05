import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { areas, buildings, amenities } from '../data/seed';
import { useStore, pendingCount } from '../store/useStore';
import { mockApi, MockNetworkError } from '../lib/mockApi';
import type { AmenityId, ListingCore, ViewType } from '../data/types';
import { pools } from '../data/images';
import { PhotoUploader } from '../components/owner/PhotoUploader';
import { LivePreviewCard } from '../components/owner/LivePreviewCard';
import { Button } from '../components/ui/Button';
import { 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  ArrowLeft, 
  Sparkles, 
  ExternalLink, 
  HelpCircle, 
  Clock, 
  Wand2 
} from 'lucide-react';

export const Apply: React.FC = () => {
  const navigate = useNavigate();
  const toast = useStore((s) => s.toast);
  const autofillTrigger = useStore((s) => s.demo.autofill);

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [errorBanner, setErrorBanner] = useState<string | null>(null);
  const [successRef, setSuccessRef] = useState<string | null>(null);

  // Form State
  const [areaId, setAreaId] = useState('north-myrtle-beach');
  const [buildingId, setBuildingId] = useState('sea-oats-tower');
  const [isNewBuilding, setIsNewBuilding] = useState(false);
  const [newBuildingName, setNewBuildingName] = useState('');
  const [newBuildingStreet, setNewBuildingStreet] = useState('');
  const [floor, setFloor] = useState(8);
  const [bedrooms, setBedrooms] = useState(2);
  const [bathrooms, setBathrooms] = useState(2);
  const [sleeps, setSleeps] = useState(6);
  const [title, setTitle] = useState('Sunny 2BR with Ocean View');

  // Details
  const [description, setDescription] = useState(
    'A light-filled ocean-view condo on the eighth floor with a private balcony. Recently refreshed with comfortable furnishings, clean linens, and a well-equipped kitchen. Perfect for a family beach vacation.'
  );
  const [checkIn, setCheckIn] = useState('Check-in 4:00 PM, check-out 10:00 AM');
  const [pets, setPets] = useState('No pets');
  const [smoking, setSmoking] = useState('Non-smoking unit and balcony');
  const [minStay, setMinStay] = useState('3 nights minimum');
  const [rateLow, setRateLow] = useState<number | undefined>(145);
  const [rateHigh, setRateHigh] = useState<number | undefined>(235);
  const [view, setView] = useState<ViewType>('Ocean view');

  // Amenities
  const [selectedAmenities, setSelectedAmenities] = useState<AmenityId[]>([
    'oceanfront', 'pool', 'balcony', 'elevator', 'wifi', 'ac', 'full-kitchen', 'washer-dryer'
  ]);
  const [otherAmenity, setOtherAmenity] = useState('');

  // Photos
  const [photos, setPhotos] = useState<any[]>([
    pools.living[0],
    pools.bedroom[0],
    pools.kitchen[0],
    pools.bath[0],
    pools.beach[0],
    pools.pool[0],
    pools.living[3],
    pools.bedroom[2],
  ]);
  const [photosAuthorized, setPhotosAuthorized] = useState(true);

  // Contact & Links
  const [ownerFirst, setOwnerFirst] = useState('Carol');
  const [ownerLast, setOwnerLast] = useState('Jenkins');
  const [ownerEmail, setOwnerEmail] = useState('carol.jenkins@example.com');
  const [ownerPhone, setOwnerPhone] = useState('(843) 555-0144');
  const [preferredContact, setPreferredContact] = useState<'Email' | 'Phone' | 'Text'>('Email');
  const [externalUrl, setExternalUrl] = useState('https://www.example.com/carol-condo');
  const [acceptTerms, setAcceptTerms] = useState(true);

  // Validation errors
  const [stepErrors, setStepErrors] = useState<Record<string, string>>({});

  // Autofill handler (responds to toolbar wand)
  useEffect(() => {
    if (autofillTrigger > 0) {
      setTitle('Oceanfront Penthouse with Panoramic Balcony');
      setBedrooms(3);
      setBathrooms(3);
      setSleeps(8);
      setDescription(
        'Top floor oceanfront corner condo with spectacular views of the Atlantic. Features a gourmet kitchen with stainless appliances, large wraparound balcony, high-speed Wi-Fi, and plush king mattresses.'
      );
      setRateLow(185);
      setRateHigh(295);
      setView('Oceanfront');
      setSelectedAmenities([
        'oceanfront', 'pool', 'indoor-pool', 'hot-tub', 'balcony', 'elevator', 'free-parking', 'washer-dryer', 'wifi', 'ac', 'full-kitchen'
      ]);
      setPhotos([
        pools.living[1],
        pools.bedroom[1],
        pools.kitchen[1],
        pools.bath[1],
        pools.beach[1],
        pools.pool[1],
        pools.living[4],
        pools.bedroom[3],
      ]);
      setPhotosAuthorized(true);
      setOwnerFirst('David');
      setOwnerLast('Miller');
      setOwnerEmail('david.miller@example.com');
      setOwnerPhone('(843) 555-0188');
      setAcceptTerms(true);
      toast({
        kind: 'success',
        title: 'Form autofilled',
        body: 'Sample property, amenities, and owner details filled in.',
      });
    }
  }, [autofillTrigger]);

  const toggleAmenity = (id: AmenityId) => {
    setSelectedAmenities((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const validateStep = (s: number): boolean => {
    const errs: Record<string, string> = {};

    if (s === 1) {
      if (!title.trim()) errs.title = 'Listing title is required';
      if (isNewBuilding && !newBuildingName.trim()) errs.newBuilding = 'Building name required';
    } else if (s === 2) {
      if (!description.trim() || description.length < 50) {
        errs.description = 'Please provide a description of at least 50 characters';
      }
    } else if (s === 3) {
      if (selectedAmenities.length < 3) {
        errs.amenities = 'Please select at least 3 amenities';
      }
    } else if (s === 4) {
      if (photos.length < 6) {
        errs.photos = `Please upload at least 6 photos (currently ${photos.length})`;
      }
      if (!photosAuthorized) {
        errs.auth = 'Photo authorization is required to publish';
      }
    } else if (s === 5) {
      if (!ownerFirst.trim() || !ownerLast.trim()) errs.name = 'Full name required';
      if (!ownerEmail.trim() || !ownerEmail.includes('@')) errs.email = 'Valid email required';
      if (!acceptTerms) errs.terms = 'You must accept the Owner Terms to submit';
    }

    setStepErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep((prev) => Math.min(prev + 1, 6));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrev = () => {
    setStep((prev) => Math.max(prev - 1, 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Submit Application
  const handleSubmit = async () => {
    setLoading(true);
    setErrorBanner(null);

    const listingCoreData: ListingCore = {
      title,
      buildingId: isNewBuilding ? 'custom-building' : buildingId,
      areaId,
      floor,
      bedrooms,
      bathrooms,
      sleeps,
      view,
      amenities: selectedAmenities,
      otherAmenity,
      photos,
      rateLow,
      rateHigh,
      description: [description],
      houseNotes: { checkIn, pets, smoking, minStay },
      sleeping: [
        { room: 'Primary bedroom', beds: '1 king' },
        { room: 'Guest bedroom', beds: '2 queens' },
      ],
      owner: {
        first: ownerFirst,
        last: ownerLast,
        email: ownerEmail,
        phone: ownerPhone,
        preferred: preferredContact,
        responseNote: 'Usually replies within a few hours',
      },
      externalUrl: externalUrl || undefined,
    };

    try {
      const app = await mockApi.submitApplication(
        listingCoreData,
        isNewBuilding ? { name: newBuildingName, street: newBuildingStreet } : undefined
      );

      setSuccessRef(app.ref);
      setStep(7); // Success screen
      toast({
        kind: 'success',
        title: 'Application submitted',
        body: `Reference ${app.ref} added to Admin review queue.`,
        action: { label: 'View in Admin Review', to: `/admin/review/${app.id}` },
      });
    } catch (err) {
      if (err instanceof MockNetworkError) {
        setErrorBanner('We couldn’t submit your application. Your details are intact. Please try again.');
      } else {
        setErrorBanner('An unexpected error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const currentBuilding = buildings.find((b) => b.id === buildingId);

  return (
    <div className="flex-1 py-8 sm:py-12 bg-sand-50">
      <div className="container-x">
        {step === 7 ? (
          /* Success Screen */
          <div className="max-w-2xl mx-auto card p-8 sm:p-12 bg-white text-center space-y-6 shadow-2">
            <div className="w-16 h-16 rounded-full bg-ok-100 text-ok-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" strokeWidth={2.2} />
            </div>

            <div className="space-y-2">
              <span className="badge bg-ok-100 text-ok-600 font-bold text-xs uppercase tracking-wider">
                Submission Received
              </span>
              <h1 className="h2 font-serif text-tide-900">
                Application received for {title}
              </h1>
              <p className="text-xs sm:text-sm text-ink-600">
                Reference: <strong className="text-tide-900 font-mono text-sm">{successRef}</strong>
              </p>
            </div>

            {/* What Happens Next Timeline */}
            <div className="p-6 bg-sand-50 rounded-lg border border-line-200 text-left space-y-4">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-brass-600">
                What happens next
              </h3>

              <div className="space-y-3.5 text-xs text-ink-900">
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-tide-900 text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                    1
                  </div>
                  <div>
                    <strong>Review within 2 business days:</strong> We check your photography and property details against our directory standards.
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-tide-900 text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                    2
                  </div>
                  <div>
                    <strong>Direct email confirmation:</strong> If anything needs a quick update, we’ll email you at <strong>{ownerEmail}</strong>.
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-tide-900 text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                    3
                  </div>
                  <div>
                    <strong>Go live on public search:</strong> Once approved, your condo appears in search, your building page, and area guides.
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-tide-900 text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                    4
                  </div>
                  <div>
                    <strong>Six months complimentary starts:</strong> Your founding period begins on the day your listing is published.
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link to="/admin/review">
                <Button variant="primary" size="md">
                  View in Admin Queue (Demo workflow)
                </Button>
              </Link>
              <Link to="/">
                <Button variant="secondary" size="md">
                  Back to traveler home
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          /* Multi-Step Application Form with Live Preview on Desktop */
          <div className="flex items-start justify-center gap-10">
            {/* Form Column (max 640px) */}
            <div className="w-full max-w-2xl bg-white card p-6 sm:p-10 shadow-2">
              {/* Stepper Progress Header */}
              <div className="mb-8">
                <div className="flex items-center justify-between text-xs text-ink-500 mb-2">
                  <span className="font-semibold text-brass-600 uppercase tracking-wider">
                    Step {step} of 6: {
                      ['Property Basics', 'Details & View', 'Amenities', 'Photos', 'Contact & Booking Links', 'Review Application'][step - 1]
                    }
                  </span>
                  <span className="text-[11px] text-ink-500">Saved just now</span>
                </div>
                <div className="w-full h-1.5 bg-line-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-brass-500 rounded-full transition-all duration-300"
                    style={{ width: `${(step / 6) * 100}%` }}
                  />
                </div>
              </div>

              {errorBanner && (
                <div className="mb-6 p-3 bg-err-100 text-err-600 rounded border border-err-600/30 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorBanner}</span>
                </div>
              )}

              {/* Step 1: Property Basics */}
              {step === 1 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="font-serif text-2xl font-medium text-tide-900">
                      Where is your condo located?
                    </h2>
                    <p className="text-xs text-ink-500 mt-1">
                      Grand Strand launch coverage includes North Myrtle Beach, Myrtle Beach, and Surfside Beach.
                    </p>
                  </div>

                  <div>
                    <label className="label">Coastal Area *</label>
                    <select
                      value={areaId}
                      onChange={(e) => setAreaId(e.target.value)}
                      className="input"
                    >
                      {areas.filter((a) => a.market === 'grand-strand').map((a) => (
                        <option key={a.id} value={a.id}>
                          {a.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="label">Condo Building *</label>
                    {!isNewBuilding ? (
                      <div className="space-y-2">
                        <select
                          value={buildingId}
                          onChange={(e) => setBuildingId(e.target.value)}
                          className="input"
                        >
                          {buildings
                            .filter((b) => b.areaId === areaId)
                            .map((b) => (
                              <option key={b.id} value={b.id}>
                                {b.name} ({b.street})
                              </option>
                            ))}
                        </select>
                        <button
                          type="button"
                          onClick={() => setIsNewBuilding(true)}
                          className="text-xs font-semibold text-brass-600 hover:underline block"
                        >
                          + My building isn't listed here
                        </button>
                      </div>
                    ) : (
                      <div className="p-4 bg-sand-50 rounded-lg border border-line-200 space-y-3">
                        <div>
                          <label className="label text-xs">New Building Name *</label>
                          <input
                            type="text"
                            value={newBuildingName}
                            onChange={(e) => setNewBuildingName(e.target.value)}
                            placeholder="e.g. Crescent Dunes"
                            className="input !py-2 text-sm"
                          />
                          {stepErrors.newBuilding && (
                            <p className="error-text text-xs">{stepErrors.newBuilding}</p>
                          )}
                        </div>
                        <div>
                          <label className="label text-xs">Street Address</label>
                          <input
                            type="text"
                            value={newBuildingStreet}
                            onChange={(e) => setNewBuildingStreet(e.target.value)}
                            placeholder="e.g. S Ocean Blvd"
                            className="input !py-2 text-sm"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => setIsNewBuilding(false)}
                          className="text-xs text-ink-500 hover:text-tide-900 underline"
                        >
                          Cancel, choose from existing buildings
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div>
                      <label className="label text-xs">Unit Floor</label>
                      <input
                        type="number"
                        min="1"
                        max="40"
                        value={floor}
                        onChange={(e) => setFloor(Number(e.target.value))}
                        className="input !py-2 text-sm"
                      />
                    </div>
                    <div>
                      <label className="label text-xs">Bedrooms</label>
                      <input
                        type="number"
                        min="0"
                        max="6"
                        value={bedrooms}
                        onChange={(e) => setBedrooms(Number(e.target.value))}
                        className="input !py-2 text-sm"
                      />
                    </div>
                    <div>
                      <label className="label text-xs">Bathrooms</label>
                      <input
                        type="number"
                        min="1"
                        max="6"
                        value={bathrooms}
                        onChange={(e) => setBathrooms(Number(e.target.value))}
                        className="input !py-2 text-sm"
                      />
                    </div>
                    <div>
                      <label className="label text-xs">Sleeps</label>
                      <input
                        type="number"
                        min="1"
                        max="16"
                        value={sleeps}
                        onChange={(e) => setSleeps(Number(e.target.value))}
                        className="input !py-2 text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="label">Listing Headline / Title *</label>
                    <input
                      type="text"
                      maxLength={60}
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="e.g. Sunrise 2BR with Full Ocean View"
                      className="input"
                    />
                    <div className="flex justify-between items-center text-xs text-ink-500 mt-1">
                      <span>Make it descriptive and inviting</span>
                      <span>{title.length}/60 chars</span>
                    </div>
                    {stepErrors.title && (
                      <p className="error-text text-xs">{stepErrors.title}</p>
                    )}
                  </div>
                </div>
              )}

              {/* Step 2: Details & View */}
              {step === 2 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="font-serif text-2xl font-medium text-tide-900">
                      Tell travelers about your condo
                    </h2>
                    <p className="text-xs text-ink-500 mt-1">
                      Highlight renovations, view highlights, and what makes your unit special.
                    </p>
                  </div>

                  <div>
                    <label className="label">Description *</label>
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      maxLength={1200}
                      className="input !min-h-[140px]"
                      placeholder="Describe the condo, balcony views, bedroom layout, and furnishings..."
                    />
                    <div className="flex justify-between items-center text-xs text-ink-500 mt-1">
                      <span>Writing tip: mention morning sun, kitchen gear, and beach access.</span>
                      <span>{description.length}/1200 chars</span>
                    </div>
                    {stepErrors.description && (
                      <p className="error-text text-xs">{stepErrors.description}</p>
                    )}
                  </div>

                  {/* View Type Radio Cards */}
                  <div>
                    <label className="label">View Type</label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                      {(['Oceanfront', 'Ocean view', 'Pool view', 'Garden view'] as ViewType[]).map((v) => (
                        <button
                          key={v}
                          type="button"
                          onClick={() => setView(v)}
                          className={`choice-card !p-3 text-xs justify-center text-center font-medium ${
                            view === v ? 'is-on' : ''
                          }`}
                        >
                          {v}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Nightly Rate Range */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="label text-xs">Nightly Rate Low ($ USD)</label>
                      <input
                        type="number"
                        value={rateLow ?? ''}
                        onChange={(e) => setRateLow(Number(e.target.value) || undefined)}
                        placeholder="145"
                        className="input !py-2 text-sm"
                      />
                      <span className="hint text-[11px]">Low season starting rate</span>
                    </div>
                    <div>
                      <label className="label text-xs">Nightly Rate High ($ USD)</label>
                      <input
                        type="number"
                        value={rateHigh ?? ''}
                        onChange={(e) => setRateHigh(Number(e.target.value) || undefined)}
                        placeholder="265"
                        className="input !py-2 text-sm"
                      />
                      <span className="hint text-[11px]">Peak summer rate</span>
                    </div>
                  </div>

                  {/* House Notes */}
                  <div className="space-y-3 pt-2 border-t border-line-200">
                    <span className="text-xs font-semibold uppercase tracking-wider text-ink-500 block">
                      House Notes for Travelers
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div>
                        <label className="label text-xs">Check-in / Check-out</label>
                        <input
                          type="text"
                          value={checkIn}
                          onChange={(e) => setCheckIn(e.target.value)}
                          className="input !py-1.5 text-xs"
                        />
                      </div>
                      <div>
                        <label className="label text-xs">Minimum Stay</label>
                        <input
                          type="text"
                          value={minStay}
                          onChange={(e) => setMinStay(e.target.value)}
                          className="input !py-1.5 text-xs"
                        />
                      </div>
                      <div>
                        <label className="label text-xs">Pet Policy</label>
                        <input
                          type="text"
                          value={pets}
                          onChange={(e) => setPets(e.target.value)}
                          className="input !py-1.5 text-xs"
                        />
                      </div>
                      <div>
                        <label className="label text-xs">Smoking</label>
                        <input
                          type="text"
                          value={smoking}
                          onChange={(e) => setSmoking(e.target.value)}
                          className="input !py-1.5 text-xs"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Amenities */}
              {step === 3 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="font-serif text-2xl font-medium text-tide-900">
                      Select condo amenities
                    </h2>
                    <p className="text-xs text-ink-500 mt-1">
                      Choose all amenities available to guests in your unit or building.
                    </p>
                  </div>

                  {stepErrors.amenities && (
                    <p className="error-text text-xs">{stepErrors.amenities}</p>
                  )}

                  <div className="space-y-4">
                    {/* Beach & Pool */}
                    <div>
                      <span className="text-xs font-semibold text-brass-600 uppercase tracking-wider block mb-2">
                        Beach & Pool
                      </span>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {amenities.filter((a) => a.group === 'beach').map((a) => {
                          const active = selectedAmenities.includes(a.id);
                          return (
                            <button
                              key={a.id}
                              type="button"
                              onClick={() => toggleAmenity(a.id)}
                              className={`choice-card !p-2.5 text-xs ${active ? 'is-on' : ''}`}
                            >
                              <span className="truncate">{a.label}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Comfort & Living */}
                    <div>
                      <span className="text-xs font-semibold text-brass-600 uppercase tracking-wider block mb-2">
                        Comfort & Living
                      </span>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {amenities.filter((a) => a.group === 'comfort').map((a) => {
                          const active = selectedAmenities.includes(a.id);
                          return (
                            <button
                              key={a.id}
                              type="button"
                              onClick={() => toggleAmenity(a.id)}
                              className={`choice-card !p-2.5 text-xs ${active ? 'is-on' : ''}`}
                            >
                              <span className="truncate">{a.label}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Practical */}
                    <div>
                      <span className="text-xs font-semibold text-brass-600 uppercase tracking-wider block mb-2">
                        Practical
                      </span>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {amenities.filter((a) => a.group === 'practical').map((a) => {
                          const active = selectedAmenities.includes(a.id);
                          return (
                            <button
                              key={a.id}
                              type="button"
                              onClick={() => toggleAmenity(a.id)}
                              className={`choice-card !p-2.5 text-xs ${active ? 'is-on' : ''}`}
                            >
                              <span className="truncate">{a.label}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Other Custom Amenity */}
                    <div className="pt-2">
                      <label className="label text-xs">Other special amenity or note</label>
                      <input
                        type="text"
                        value={otherAmenity}
                        onChange={(e) => setOtherAmenity(e.target.value)}
                        placeholder="e.g. Keurig pod machine, beach wagon, board games"
                        className="input !py-2 text-xs"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Photos */}
              {step === 4 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="font-serif text-2xl font-medium text-tide-900">
                      Upload your condo photographs
                    </h2>
                    <p className="text-xs text-ink-500 mt-1">
                      Photos are the #1 factor for travelers. Show your balcony view, living area, and bedrooms clearly.
                    </p>
                  </div>

                  <PhotoUploader
                    photos={photos}
                    onChange={setPhotos}
                    authorized={photosAuthorized}
                    onAuthorizedChange={setPhotosAuthorized}
                    error={stepErrors.photos || stepErrors.auth}
                  />
                </div>
              )}

              {/* Step 5: Contact & Links */}
              {step === 5 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="font-serif text-2xl font-medium text-tide-900">
                      Contact information & booking links
                    </h2>
                    <p className="text-xs text-ink-500 mt-1">
                      Travelers will use these details to contact you directly about reservations.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="label text-xs">First Name *</label>
                      <input
                        type="text"
                        value={ownerFirst}
                        onChange={(e) => setOwnerFirst(e.target.value)}
                        className="input !py-2 text-sm"
                      />
                    </div>
                    <div>
                      <label className="label text-xs">Last Name *</label>
                      <input
                        type="text"
                        value={ownerLast}
                        onChange={(e) => setOwnerLast(e.target.value)}
                        className="input !py-2 text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="label text-xs">Your Email (for inquiries) *</label>
                    <input
                      type="email"
                      value={ownerEmail}
                      onChange={(e) => setOwnerEmail(e.target.value)}
                      className="input !py-2 text-sm"
                    />
                    <span className="hint text-[11px]">Traveler inquiries will be forwarded directly here</span>
                  </div>

                  <div>
                    <label className="label text-xs">Phone Number (optional)</label>
                    <input
                      type="tel"
                      value={ownerPhone}
                      onChange={(e) => setOwnerPhone(e.target.value)}
                      className="input !py-2 text-sm"
                    />
                  </div>

                  {/* External Booking Link */}
                  <div className="pt-2 border-t border-line-200">
                    <label className="label text-xs">Approved External Booking Link (optional)</label>
                    <div className="flex gap-2">
                      <input
                        type="url"
                        value={externalUrl}
                        onChange={(e) => setExternalUrl(e.target.value)}
                        placeholder="https://airbnb.com/h/your-condo or your site"
                        className="input !py-2 text-sm flex-1"
                      />
                      {externalUrl && (
                        <a
                          href={externalUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="btn btn-secondary btn-sm shrink-0"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span>Test</span>
                        </a>
                      )}
                    </div>
                    <span className="hint text-[11px]">
                      If provided, travelers will see a “Book on owner’s site” button alongside the direct inquiry form.
                    </span>
                  </div>

                  {/* Terms Checkbox */}
                  <div className="pt-3 border-t border-line-200">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={acceptTerms}
                        onChange={(e) => setAcceptTerms(e.target.checked)}
                        className="checkbox mt-1"
                      />
                      <span className="text-xs text-ink-900 leading-normal">
                        I confirm that I am the deeded owner or authorized rental representative for this unit, and I accept the{' '}
                        <Link to="/terms/owners" target="_blank" className="text-brass-600 underline">
                          Owner Terms & Standards
                        </Link>.
                      </span>
                    </label>
                    {stepErrors.terms && (
                      <p className="error-text text-xs mt-1.5">{stepErrors.terms}</p>
                    )}
                  </div>
                </div>
              )}

              {/* Step 6: Review Summary */}
              {step === 6 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="font-serif text-2xl font-medium text-tide-900">
                      Review your application
                    </h2>
                    <p className="text-xs text-ink-500 mt-1">
                      Check your details below before submitting for administrative review.
                    </p>
                  </div>

                  <div className="space-y-4 text-xs divide-y divide-line-200">
                    <div className="pb-3 flex justify-between items-start">
                      <div>
                        <span className="text-ink-500 uppercase font-semibold text-[10px] block">Title & Location</span>
                        <p className="font-semibold text-tide-900 text-sm mt-0.5">{title}</p>
                        <p className="text-ink-600">{currentBuilding?.name || newBuildingName} · Floor {floor} · {areaId}</p>
                      </div>
                      <button onClick={() => setStep(1)} className="text-brass-600 underline font-semibold">Edit</button>
                    </div>

                    <div className="py-3 flex justify-between items-start">
                      <div>
                        <span className="text-ink-500 uppercase font-semibold text-[10px] block">Capacity & Rates</span>
                        <p className="text-ink-900 font-semibold">{bedrooms} BR · {bathrooms} BA · Sleeps {sleeps} · {view}</p>
                        <p className="text-ink-600">${rateLow} – ${rateHigh} / night</p>
                      </div>
                      <button onClick={() => setStep(2)} className="text-brass-600 underline font-semibold">Edit</button>
                    </div>

                    <div className="py-3 flex justify-between items-start">
                      <div>
                        <span className="text-ink-500 uppercase font-semibold text-[10px] block">Photos</span>
                        <p className="text-ink-900 font-semibold">{photos.length} photos attached</p>
                        <p className="text-ok-600">✓ Photo authorization confirmed</p>
                      </div>
                      <button onClick={() => setStep(4)} className="text-brass-600 underline font-semibold">Edit</button>
                    </div>

                    <div className="pt-3 flex justify-between items-start">
                      <div>
                        <span className="text-ink-500 uppercase font-semibold text-[10px] block">Contact</span>
                        <p className="text-ink-900 font-semibold">{ownerFirst} {ownerLast}</p>
                        <p className="text-ink-600">{ownerEmail} · {ownerPhone}</p>
                      </div>
                      <button onClick={() => setStep(5)} className="text-brass-600 underline font-semibold">Edit</button>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Actions Footer */}
              <div className="mt-10 pt-6 border-t border-line-200 flex items-center justify-between">
                {step > 1 ? (
                  <Button variant="ghost" size="md" onClick={handlePrev}>
                    <ArrowLeft className="w-4 h-4 mr-1.5" /> Back
                  </Button>
                ) : (
                  <div />
                )}

                {step < 6 ? (
                  <Button variant="primary" size="md" onClick={handleNext}>
                    <span>Continue</span>
                    <ArrowRight className="w-4 h-4 ml-1.5" />
                  </Button>
                ) : (
                  <Button
                    variant="primary"
                    size="lg"
                    loading={loading}
                    onClick={handleSubmit}
                  >
                    Submit listing for approval
                  </Button>
                )}
              </div>
            </div>

            {/* Live Preview Card on Wide Screen (1280px+) */}
            <LivePreviewCard
              data={{
                title,
                buildingId,
                areaId,
                floor,
                bedrooms,
                bathrooms,
                sleeps,
                view,
                rateLow,
                photos,
                amenities: selectedAmenities,
              }}
              newBuildingName={isNewBuilding ? newBuildingName : undefined}
            />
          </div>
        )}
      </div>
    </div>
  );
};
