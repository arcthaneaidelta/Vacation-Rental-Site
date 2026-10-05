import { createStore, type StoreApi } from 'zustand/vanilla';
import { useStore as useZustand } from 'zustand';
import type { Activity, ActivityType, Amenity, Application, EmailLog, Inquiry, Listing, ListingCore, ListingStatus, Market, MarketId } from '../data/types';
import { amenities as seedAmenities, FOUNDING_SPOTS_TOTAL, markets as seedMarkets, seedActivity, seedApplications, seedInquiries, seedListings } from '../data/seed';
import { emailTemplates } from '../data/copy';
import { slugify, uid } from '../lib/format';

export type Device = 'desktop' | 'tablet' | 'mobile';
export interface ToastAction { label: string; to?: string; run?: () => void }
export interface Toast { id: string; kind: 'success' | 'error' | 'info'; title: string; body?: string; action?: ToastAction; duration?: number }
export interface ChecklistItem { id: string; label: string; done: boolean }

export interface State {
  listings: Listing[];
  applications: Application[];
  inquiries: Inquiry[];
  activity: Activity[];
  emails: EmailLog[];
  markets: Market[];
  amenityList: Amenity[];
  emailSubjects: { inquiry: string; approval: string; changes: string };
  checklist: ChecklistItem[];
  saved: string[];
  market: MarketId;
  isAdmin: boolean;
  toasts: Toast[];
  demo: { slow: boolean; failNext: boolean; device: Device; tourOpen: boolean; tourStep: number; tourDismissed: boolean; toolbarOpen: boolean; autofill: number };
  trash: { listing: Listing; index: number } | null;

  reset: () => void;
  toast: (t: Omit<Toast, 'id'>) => string;
  dismissToast: (id: string) => void;
  toggleSaved: (id: string) => void;
  setMarket: (m: MarketId) => void;
  toggleComingSoon: (m: MarketId) => void;
  setDemo: (patch: Partial<State['demo']>) => void;
  setAdmin: (v: boolean) => void;
  toggleChecklist: (id: string) => void;
  log: (type: ActivityType, text: string) => void;
  addInquiry: (i: Omit<Inquiry, 'id' | 'createdAt' | 'status'>) => Inquiry;
  markInquiryOpened: (id: string) => void;
  submitApplication: (data: ListingCore, newBuilding?: { name: string; street: string }) => Application;
  approveApplication: (id: string) => Listing;
  unpublishApproved: (appId: string) => void;
  requestChanges: (id: string, message: string) => void;
  rejectApplication: (id: string, reason: string) => void;
  updateListing: (id: string, patch: Partial<Listing>) => void;
  setListingStatus: (id: string, status: ListingStatus) => void;
  duplicateListing: (id: string) => Listing;
  removeListing: (id: string) => void;
  undoRemove: () => void;
  addListing: (data: ListingCore) => Listing;
  setAmenityList: (list: Amenity[]) => void;
  setEmailSubject: (k: keyof State['emailSubjects'], v: string) => void;
}

const initialChecklist = (): ChecklistItem[] => [
  { id: 'domain', label: 'Domain connected (RentABeachCondo.com)', done: false },
  { id: 'email', label: 'Email notifications tested', done: true },
  { id: 'forms', label: 'Forms tested end to end', done: true },
  { id: 'mobile', label: 'Mobile and tablet checked', done: false },
  { id: 'terms', label: 'Final terms uploaded', done: false },
  { id: 'approval', label: 'Owner approval of launch', done: false },
];

const data = () => ({
  listings: seedListings(),
  applications: seedApplications(),
  inquiries: seedInquiries(),
  activity: seedActivity(),
  emails: [] as EmailLog[],
  markets: seedMarkets.map((m) => ({ ...m })),
  amenityList: seedAmenities.map((a) => ({ ...a })),
  emailSubjects: { inquiry: emailTemplates.inquiry.subject, approval: emailTemplates.approval.subject, changes: emailTemplates.changes.subject },
  checklist: initialChecklist(),
  saved: [] as string[],
  market: 'grand-strand' as MarketId,
  trash: null,
});

let refCounter = 48;
const uniqueSlug = (title: string, listings: Listing[]) => {
  const base = slugify(title) || 'condo';
  let s = base, n = 2;
  while (listings.some((l) => l.slug === s)) s = `${base}-${n++}`;
  return s;
};

function build(): StoreApi<State> {
  return createStore<State>()((set, get) => ({
    ...data(),
    isAdmin: false,
    toasts: [],
    demo: { slow: false, failNext: false, device: 'desktop', tourOpen: false, tourStep: 0, tourDismissed: false, toolbarOpen: false, autofill: 0 },

    reset: () => {
      refCounter = 48;
      set({ ...data(), isAdmin: false, toasts: [], demo: { ...get().demo, slow: false, failNext: false, tourOpen: false, tourStep: 0 } });
      get().toast({ kind: 'info', title: 'Demo reset', body: 'All sample data has been restored.' });
    },
    toast: (t) => {
      const id = uid('t');
      set((s) => ({ toasts: [...s.toasts.slice(-2), { ...t, id }] }));
      return id;
    },
    dismissToast: (id) => set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })),
    toggleSaved: (id) => set((s) => ({ saved: s.saved.includes(id) ? s.saved.filter((x) => x !== id) : [...s.saved, id] })),
    setMarket: (market) => set({ market }),
    toggleComingSoon: (m) => set((s) => ({ markets: s.markets.map((x) => (x.id === m ? { ...x, showComingSoon: !x.showComingSoon } : x)) })),
    setDemo: (patch) => set((s) => ({ demo: { ...s.demo, ...patch } })),
    setAdmin: (isAdmin) => set({ isAdmin }),
    toggleChecklist: (id) => set((s) => ({ checklist: s.checklist.map((c) => (c.id === id ? { ...c, done: !c.done } : c)) })),
    log: (type, text) => set((s) => ({ activity: [{ id: uid('act'), type, text, at: Date.now() }, ...s.activity].slice(0, 30) })),

    addInquiry: (i) => {
      const inquiry: Inquiry = { ...i, id: uid('inq'), createdAt: Date.now(), status: 'Delivered', fresh: true };
      const listing = get().listings.find((l) => l.id === i.listingId);
      const subject = get().emailSubjects.inquiry.replace('{listing}', listing?.title ?? 'your condo');
      set((s) => ({
        inquiries: [inquiry, ...s.inquiries],
        emails: [{ id: uid('em'), to: listing?.owner.email ?? '', subject, body: i.message, at: Date.now(), kind: 'inquiry' }, ...s.emails],
      }));
      get().log('inquiry', `Inquiry delivered to ${listing?.owner.first ?? 'owner'} (${listing?.title ?? ''})`);
      return inquiry;
    },
    markInquiryOpened: (id) => set((s) => ({ inquiries: s.inquiries.map((q) => (q.id === id ? { ...q, fresh: false } : q)) })),

    submitApplication: (data, newBuilding) => {
      const app: Application = { id: uid('app'), ref: `RBC-2026-${String(refCounter++).padStart(4, '0')}`, status: 'pending', submittedAt: Date.now(), data, newBuilding };
      set((s) => ({ applications: [app, ...s.applications] }));
      get().log('submitted', `New application: ${data.title}`);
      return app;
    },
    approveApplication: (id) => {
      const app = get().applications.find((a) => a.id === id)!;
      const now = Date.now();
      const listing: Listing = { ...app.data, id: uid('lst'), slug: uniqueSlug(app.data.title, get().listings), status: 'live', featured: false, createdAt: now, updatedAt: now };
      set((s) => ({
        listings: [listing, ...s.listings],
        applications: s.applications.map((a) => (a.id === id ? { ...a, status: 'approved', listingId: listing.id } : a)),
        emails: [{ id: uid('em'), to: app.data.owner.email, subject: s.emailSubjects.approval.replace('{listing}', app.data.title), body: emailTemplates.approval.intro, at: now, kind: 'approved' }, ...s.emails],
      }));
      get().log('approved', `Approved and published: ${app.data.title}`);
      return listing;
    },
    unpublishApproved: (appId) => {
      const app = get().applications.find((a) => a.id === appId);
      if (!app) return;
      set((s) => ({
        listings: s.listings.filter((l) => l.id !== app.listingId),
        applications: s.applications.map((a) => (a.id === appId ? { ...a, status: 'pending', listingId: undefined } : a)),
      }));
      get().log('restored', `Unpublished and returned to queue: ${app.data.title}`);
    },
    requestChanges: (id, message) => {
      const app = get().applications.find((a) => a.id === id)!;
      set((s) => ({
        applications: s.applications.map((a) => (a.id === id ? { ...a, status: 'changes', decisionNote: message } : a)),
        emails: [{ id: uid('em'), to: app.data.owner.email, subject: s.emailSubjects.changes.replace('{listing}', app.data.title), body: message, at: Date.now(), kind: 'changes' }, ...s.emails],
      }));
      get().log('changes', `Requested changes: ${app.data.title}`);
    },
    rejectApplication: (id, reason) => {
      const app = get().applications.find((a) => a.id === id)!;
      set((s) => ({ applications: s.applications.map((a) => (a.id === id ? { ...a, status: 'rejected', decisionNote: reason } : a)) }));
      get().log('rejected', `Declined application: ${app.data.title}`);
    },
    updateListing: (id, patch) => {
      set((s) => ({ listings: s.listings.map((l) => (l.id === id ? { ...l, ...patch, updatedAt: Date.now() } : l)) }));
      const l = get().listings.find((x) => x.id === id);
      get().log('edited', `Edited ${l?.title}`);
    },
    setListingStatus: (id, status) => {
      set((s) => ({ listings: s.listings.map((l) => (l.id === id ? { ...l, status, updatedAt: Date.now() } : l)) }));
      const l = get().listings.find((x) => x.id === id);
      get().log(status === 'archived' ? 'archived' : 'edited', `${status === 'live' ? 'Published' : status === 'archived' ? 'Archived' : 'Moved to draft'}: ${l?.title}`);
    },
    duplicateListing: (id) => {
      const src = get().listings.find((l) => l.id === id)!;
      const title = `${src.title} (copy)`;
      const copy: Listing = { ...src, id: uid('lst'), title, slug: uniqueSlug(title, get().listings), status: 'draft', featured: false, createdAt: Date.now(), updatedAt: Date.now() };
      set((s) => {
        const idx = s.listings.findIndex((l) => l.id === id);
        const next = [...s.listings];
        next.splice(idx + 1, 0, copy);
        return { listings: next };
      });
      get().log('edited', `Duplicated ${src.title} as a draft`);
      return copy;
    },
    removeListing: (id) => {
      const s = get();
      const index = s.listings.findIndex((l) => l.id === id);
      if (index < 0) return;
      const listing = s.listings[index];
      set({ listings: s.listings.filter((l) => l.id !== id), trash: { listing, index }, saved: s.saved.filter((x) => x !== id) });
      get().log('removed', `Removed ${listing.title}`);
    },
    undoRemove: () => {
      const t = get().trash;
      if (!t) return;
      set((s) => {
        const next = [...s.listings];
        next.splice(Math.min(t.index, next.length), 0, t.listing);
        return { listings: next, trash: null };
      });
      get().log('restored', `Restored ${t.listing.title}`);
    },
    addListing: (data) => {
      const now = Date.now();
      const listing: Listing = { ...data, id: uid('lst'), slug: uniqueSlug(data.title, get().listings), status: 'live', featured: false, createdAt: now, updatedAt: now };
      set((s) => ({ listings: [listing, ...s.listings] }));
      get().log('published', `Published by admin: ${data.title}`);
      return listing;
    },
    setAmenityList: (amenityList) => set({ amenityList }),
    setEmailSubject: (k, v) => set((s) => ({ emailSubjects: { ...s.emailSubjects, [k]: v } })),
  }));
}

/**
 * The device-preview frame is a same-origin iframe; it reuses the parent's
 * store instance so the phone/tablet view reflects live demo state.
 */
declare global { interface Window { __RBC_STORE__?: StoreApi<State> } }
function resolveStore(): StoreApi<State> {
  if (typeof window !== 'undefined') {
    try {
      if (window.parent !== window && window.parent.__RBC_STORE__) return window.parent.__RBC_STORE__;
    } catch { /* cross-origin: fall through */ }
  }
  const s = build();
  if (typeof window !== 'undefined') {
    window.__RBC_STORE__ = s;
  }
  return s;
}

export const store = resolveStore();
export function useStore<T>(selector: (s: State) => T): T {
  return useZustand(store, selector);
}
export const getState = () => store.getState();

/* ---------- Derived selectors (all counts derive from the store) ---------- */
let lastListingsRef: Listing[] | null = null;
let lastLiveList: Listing[] = [];

export const selectLive = (s: State): Listing[] => {
  if (s.listings === lastListingsRef) return lastLiveList;
  lastListingsRef = s.listings;
  lastLiveList = s.listings.filter((l) => l.status === 'live');
  return lastLiveList;
};

export const foundingSpotsLeft = (s: State) => {
  const live = selectLive(s).length;
  const queued = s.applications.filter((a) => a.status === 'pending' || a.status === 'changes').length;
  return Math.max(0, FOUNDING_SPOTS_TOTAL - live - queued);
};

export const pendingCount = (s: State) => s.applications.filter((a) => a.status === 'pending').length;
