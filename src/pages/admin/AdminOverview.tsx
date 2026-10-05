import React from 'react';
import { Link } from 'react-router-dom';
import { useStore, pendingCount, foundingSpotsLeft, selectLive } from '../../store/useStore';
import { relTime, fmtDateTime } from '../../lib/format';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { 
  FileCheck2, 
  Building, 
  Sparkles, 
  Mail, 
  Clock, 
  CheckCircle2, 
  ArrowRight, 
  TrendingUp, 
  Activity as ActivityIcon, 
  ShieldCheck 
} from 'lucide-react';

export const AdminOverview: React.FC = () => {
  const pending = useStore(pendingCount);
  const spotsLeft = useStore(foundingSpotsLeft);
  const liveListings = useStore(selectLive);
  const inquiries = useStore((s) => s.inquiries);
  const activity = useStore((s) => s.activity);
  const checklist = useStore((s) => s.checklist);
  const toggleChecklist = useStore((s) => s.toggleChecklist);
  const applications = useStore((s) => s.applications);

  const pendingApps = applications.filter((a) => a.status === 'pending');
  const recentInquiries = inquiries.slice(0, 5);

  const doneCount = checklist.filter((c) => c.done).length;
  const launchProgress = Math.round((doneCount / checklist.length) * 100);

  return (
    <div className="space-y-8">
      {/* Page Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="eyebrow block mb-1">Launch Administration</span>
          <h1 className="h2 font-serif text-tide-900">Dashboard Overview</h1>
        </div>
        <div className="flex items-center gap-2">
          <Link to="/admin/listings/new">
            <Button variant="primary" size="sm">
              + Add Listing
            </Button>
          </Link>
          <Link to="/admin/review">
            <Button variant="secondary" size="sm">
              Review Queue ({pending})
            </Button>
          </Link>
        </div>
      </div>

      {/* 1. Needs Action Card (if pending applications exist) */}
      {pending > 0 && (
        <div className="card p-5 sm:p-6 bg-warn-100/60 border border-warn-600/40 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-full bg-warn-600 text-white flex items-center justify-center shrink-0">
              <FileCheck2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-semibold text-tide-900">
                {pending} owner {pending === 1 ? 'application' : 'applications'} awaiting review
              </h3>
              <p className="text-xs text-ink-600 mt-0.5">
                Oldest submitted {relTime(pendingApps[0]?.submittedAt || Date.now())}. Review and publish to fulfill the 2 business day turnaround.
              </p>
            </div>
          </div>
          <Link to="/admin/review" className="shrink-0">
            <Button variant="primary" size="sm" withArrow>
              Review queue now
            </Button>
          </Link>
        </div>
      )}

      {/* 2. Four KPI Cards with SVG Sparklines */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1 */}
        <div className="card p-5 bg-white border border-line-200">
          <div className="flex items-center justify-between text-xs text-ink-500 mb-2">
            <span className="font-semibold uppercase tracking-wider">Live Listings</span>
            <Building className="w-4 h-4 text-brass-600" />
          </div>
          <div className="flex items-baseline justify-between">
            <span className="font-serif text-3xl font-semibold text-tide-900">
              {liveListings.length}
            </span>
            <span className="text-[11px] text-ok-600 font-semibold flex items-center gap-0.5">
              <TrendingUp className="w-3 h-3" /> Target 25
            </span>
          </div>
          {/* Mini Sparkline SVG */}
          <svg className="w-full h-6 mt-3 text-seaglass-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 100 24">
            <path d="M0 20 L20 16 L40 18 L60 10 L80 12 L100 4" />
          </svg>
        </div>

        {/* KPI 2 */}
        <div className="card p-5 bg-white border border-line-200">
          <div className="flex items-center justify-between text-xs text-ink-500 mb-2">
            <span className="font-semibold uppercase tracking-wider">Founding Spots Left</span>
            <Sparkles className="w-4 h-4 text-brass-600" />
          </div>
          <div className="flex items-baseline justify-between">
            <span className="font-serif text-3xl font-semibold text-tide-900">
              {spotsLeft}
            </span>
            <span className="text-[11px] text-ink-500">of 25 launch</span>
          </div>
          <svg className="w-full h-6 mt-3 text-brass-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 100 24">
            <path d="M0 4 L20 8 L40 6 L60 14 L80 16 L100 20" />
          </svg>
        </div>

        {/* KPI 3 */}
        <div className="card p-5 bg-white border border-line-200">
          <div className="flex items-center justify-between text-xs text-ink-500 mb-2">
            <span className="font-semibold uppercase tracking-wider">Inquiries Delivered</span>
            <Mail className="w-4 h-4 text-brass-600" />
          </div>
          <div className="flex items-baseline justify-between">
            <span className="font-serif text-3xl font-semibold text-tide-900">
              {inquiries.length}
            </span>
            <span className="text-[11px] text-ok-600 font-semibold">100% delivered</span>
          </div>
          <svg className="w-full h-6 mt-3 text-seaglass-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 100 24">
            <path d="M0 18 L20 15 L40 19 L60 8 L80 10 L100 2" />
          </svg>
        </div>

        {/* KPI 4 */}
        <div className="card p-5 bg-white border border-line-200">
          <div className="flex items-center justify-between text-xs text-ink-500 mb-2">
            <span className="font-semibold uppercase tracking-wider">Avg. Review Time</span>
            <Clock className="w-4 h-4 text-brass-600" />
          </div>
          <div className="flex items-baseline justify-between">
            <span className="font-serif text-3xl font-semibold text-tide-900">
              1.2d
            </span>
            <span className="text-[11px] text-ok-600 font-semibold">Under 2.0d goal</span>
          </div>
          <svg className="w-full h-6 mt-3 text-brass-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 100 24">
            <path d="M0 12 L20 10 L40 14 L60 8 L80 6 L100 4" />
          </svg>
        </div>
      </div>

      {/* 3. Launch Readiness Checklist */}
      <div className="card p-6 bg-white border border-line-200 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-line-200">
          <div>
            <h3 className="font-serif text-lg font-semibold text-tide-900 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-brass-600" />
              <span>Launch Readiness Checklist</span>
            </h3>
            <p className="text-xs text-ink-500 mt-0.5">
              Track essential steps before public domain pointing and marketing.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-tide-900">{launchProgress}% Complete</span>
            <div className="w-24 h-2 bg-line-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-brass-500 rounded-full transition-all duration-300"
                style={{ width: `${launchProgress}%` }}
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {checklist.map((item) => (
            <label
              key={item.id}
              className={`p-3 rounded border text-xs flex items-center gap-3 cursor-pointer transition-colors ${
                item.done
                  ? 'bg-ok-100/50 border-ok-600/30 text-tide-900 font-medium'
                  : 'bg-sand-50 border-line-200 text-ink-600 hover:bg-sand-100'
              }`}
            >
              <input
                type="checkbox"
                checked={item.done}
                onChange={() => toggleChecklist(item.id)}
                className="checkbox !w-4 !h-4"
              />
              <span className={item.done ? 'line-through text-ink-500' : ''}>
                {item.label}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* 4. Two Columns: Recent Inquiries (left) & Activity Feed (right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Recent Inquiries */}
        <div className="lg:col-span-7 card p-6 bg-white border border-line-200 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-line-200">
            <h3 className="font-serif text-lg font-semibold text-tide-900 flex items-center gap-2">
              <Mail className="w-4 h-4 text-brass-600" />
              <span>Recent Traveler Inquiries</span>
            </h3>
            <Link to="/admin/inquiries" className="text-xs font-semibold text-brass-600 hover:underline">
              View all ({inquiries.length}) →
            </Link>
          </div>

          <div className="divide-y divide-line-200 text-xs">
            {recentInquiries.map((inq) => (
              <div key={inq.id} className="py-3 flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-tide-900">{inq.name}</span>
                    <span className="text-[11px] text-ink-500">({inq.guests} guests)</span>
                    <Badge variant={inq.status === 'Delivered' ? 'live' : 'draft'} label={inq.status} size="sm" />
                  </div>
                  <p className="text-ink-600 line-clamp-1 mt-0.5 italic">
                    “{inq.message}”
                  </p>
                  <p className="text-[11px] text-ink-500 mt-1">
                    Dates: {inq.checkIn} – {inq.checkOut}
                  </p>
                </div>
                <span className="text-[11px] text-ink-500 shrink-0">
                  {relTime(inq.createdAt)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Activity Feed */}
        <div className="lg:col-span-5 card p-6 bg-white border border-line-200 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-line-200">
            <h3 className="font-serif text-lg font-semibold text-tide-900 flex items-center gap-2">
              <ActivityIcon className="w-4 h-4 text-brass-600" />
              <span>Activity Feed</span>
            </h3>
            <span className="text-xs text-ink-500">Live events</span>
          </div>

          <div className="space-y-3.5 text-xs max-h-80 overflow-y-auto pr-1">
            {activity.map((act) => (
              <div key={act.id} className="flex items-start gap-2.5 pb-2 border-b border-line-200/50 last:border-none">
                <span className="w-2 h-2 rounded-full bg-brass-500 mt-1.5 shrink-0" />
                <div className="min-w-0 flex-1">
                  <p className="text-ink-900 leading-snug">{act.text}</p>
                  <span className="text-[10px] text-ink-500">{relTime(act.at)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
