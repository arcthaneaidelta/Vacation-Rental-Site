let n = 0;
export const uid = (p = 'id') => `${p}-${Date.now().toString(36)}-${(n++).toString(36)}`;

export const slugify = (s: string) =>
  s.toLowerCase().normalize('NFKD').replace(/[^\w\s-]/g, '').trim().replace(/[\s_-]+/g, '-').slice(0, 60);

export const plural = (n: number, one: string, many = `${one}s`) => `${n} ${n === 1 ? one : many}`;

export const bedLabel = (n: number) => (n === 0 ? 'Studio' : `${n} BR`);
export const bedLong = (n: number) => (n === 0 ? 'Studio' : plural(n, 'bedroom'));

export const money = (n?: number) => (n == null ? '' : `$${n.toLocaleString('en-US')}`);

export function relTime(ts: number, now = Date.now()) {
  const s = Math.max(0, Math.round((now - ts) / 1000));
  if (s < 45) return 'just now';
  const m = Math.round(s / 60);
  if (m < 60) return `${m} min ago`;
  const h = Math.round(m / 60);
  if (h < 24) return `${h} hr ago`;
  const d = Math.round(h / 24);
  if (d === 1) return 'yesterday';
  if (d < 30) return `${d} days ago`;
  return new Date(ts).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

export const fmtDateTime = (ts: number) =>
  new Date(ts).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' });

export const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export const cx = (...c: (string | false | null | undefined)[]) => c.filter(Boolean).join(' ');
