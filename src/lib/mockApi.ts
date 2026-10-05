import { getState } from '../store/useStore';
import type { ListingCore, Inquiry, Listing } from '../data/types';
import { sleep } from './format';

/**
 * Mock backend. Every call goes through here: a 300–900ms delay (2.5s when
 * "Simulate slow network" is on) and a one-shot failure when "Simulate network
 * error" is on. Nothing leaves the browser; this is a frontend-only demo.
 */
export class MockNetworkError extends Error {}

async function call<T>(fn: () => T, base?: number): Promise<T> {
  const { demo, setDemo } = getState();
  const ms = demo.slow ? 2500 : base ?? 300 + Math.random() * 600;
  await sleep(ms);
  if (getState().demo.failNext) {
    setDemo({ failNext: false });
    throw new MockNetworkError('Network request failed');
  }
  return fn();
}

export const mockApi = {
  submitInquiry: (i: Omit<Inquiry, 'id' | 'createdAt' | 'status'>) => call(() => getState().addInquiry(i), 900),
  submitApplication: (d: ListingCore, nb?: { name: string; street: string }) => call(() => getState().submitApplication(d, nb), 1400),
  approveApplication: (id: string) => call(() => getState().approveApplication(id), 800),
  requestChanges: (id: string, msg: string) => call(() => getState().requestChanges(id, msg), 700),
  rejectApplication: (id: string, reason: string) => call(() => getState().rejectApplication(id, reason), 700),
  updateListing: (id: string, patch: Partial<Listing>) => call(() => getState().updateListing(id, patch), 700),
  removeListing: (id: string) => call(() => getState().removeListing(id), 500),
  addListing: (d: ListingCore) => call(() => getState().addListing(d), 1000),
  sendContact: () => call(() => true, 900),
  login: () => call(() => getState().setAdmin(true), 700),
  /** simulated first-load latency for skeleton states */
  load: (min = 400, max = 700) => sleep(getState().demo.slow ? 2500 : min + Math.random() * (max - min)),
};
