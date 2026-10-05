import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import { Button } from '../../components/ui/Button';
import { 
  MapPin, 
  Sparkles, 
  Mail, 
  Tag, 
  CheckCircle2, 
  ShieldCheck, 
  Plus 
} from 'lucide-react';

export const AdminSettings: React.FC = () => {
  const markets = useStore((s) => s.markets);
  const toggleComingSoon = useStore((s) => s.toggleComingSoon);
  const amenityList = useStore((s) => s.amenityList);
  const emailSubjects = useStore((s) => s.emailSubjects);
  const setEmailSubject = useStore((s) => s.setEmailSubject);
  const toast = useStore((s) => s.toast);

  const [newAmenity, setNewAmenity] = useState('');

  const handleSaveEmailSubject = (k: keyof typeof emailSubjects, v: string) => {
    setEmailSubject(k, v);
    toast({ kind: 'success', title: 'Email subject template updated' });
  };

  return (
    <div className="space-y-8 max-w-4xl">
      {/* Header */}
      <div>
        <span className="eyebrow block mb-1">System Configuration</span>
        <h1 className="h2 font-serif text-tide-900">Directory Settings</h1>
        <p className="text-xs text-ink-500 mt-1">
          Manage expansion coastal markets, active amenity filters, and automated notification email subjects.
        </p>
      </div>

      {/* 1. Coastal Expansion Markets Panel */}
      <div className="card p-6 bg-white border border-line-200 shadow-1 space-y-4">
        <div className="flex items-center gap-2 border-b border-line-200 pb-3">
          <MapPin className="w-5 h-5 text-brass-600" />
          <div>
            <h3 className="font-serif text-lg font-medium text-tide-900">
              Coastal Expansion Markets
            </h3>
            <p className="text-xs text-ink-500">
              Architecture supports future markets without rewriting or rebuilding code.
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {markets.map((m) => (
            <div
              key={m.id}
              className="p-4 rounded-lg bg-sand-50 border border-line-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-serif text-base font-semibold text-tide-900">
                    {m.name}
                  </span>
                  <span
                    className={`badge text-[10px] font-bold ${
                      m.status === 'live'
                        ? 'bg-ok-100 text-ok-600 border border-ok-600/30'
                        : 'bg-sand-200 text-ink-500'
                    }`}
                  >
                    {m.status === 'live' ? 'Live Launch Market' : 'Planned Expansion'}
                  </span>
                </div>
                <p className="text-xs text-ink-500 mt-0.5">{m.region} · {m.headline}</p>
              </div>

              {m.status !== 'live' && (
                <label className="flex items-center gap-2 text-xs text-ink-600 cursor-pointer self-start sm:self-center">
                  <input
                    type="checkbox"
                    checked={m.showComingSoon}
                    onChange={() => toggleComingSoon(m.id)}
                    className="checkbox !w-4 !h-4"
                  />
                  <span>Show “Coming Soon” on site</span>
                </label>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 2. Automated Notification Email Subjects */}
      <div className="card p-6 bg-white border border-line-200 shadow-1 space-y-4">
        <div className="flex items-center gap-2 border-b border-line-200 pb-3">
          <Mail className="w-5 h-5 text-brass-600" />
          <div>
            <h3 className="font-serif text-lg font-medium text-tide-900">
              Email Notification Templates
            </h3>
            <p className="text-xs text-ink-500">
              Configure subject templates for traveler messages and owner approval notices.
            </p>
          </div>
        </div>

        <div className="space-y-4 text-xs">
          <div>
            <label className="label text-xs">Traveler Inquiry Subject</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={emailSubjects.inquiry}
                onChange={(e) => setEmailSubject('inquiry', e.target.value)}
                className="input text-xs"
              />
              <Button
                variant="secondary"
                size="sm"
                onClick={() => handleSaveEmailSubject('inquiry', emailSubjects.inquiry)}
              >
                Save
              </Button>
            </div>
            <span className="hint text-[11px]">Use <code>{'{listing}'}</code> for unit headline</span>
          </div>

          <div>
            <label className="label text-xs">Owner Listing Approval Notice Subject</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={emailSubjects.approval}
                onChange={(e) => setEmailSubject('approval', e.target.value)}
                className="input text-xs"
              />
              <Button
                variant="secondary"
                size="sm"
                onClick={() => handleSaveEmailSubject('approval', emailSubjects.approval)}
              >
                Save
              </Button>
            </div>
          </div>

          <div>
            <label className="label text-xs">Request Changes Subject</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={emailSubjects.changes}
                onChange={(e) => setEmailSubject('changes', e.target.value)}
                className="input text-xs"
              />
              <Button
                variant="secondary"
                size="sm"
                onClick={() => handleSaveEmailSubject('changes', emailSubjects.changes)}
              >
                Save
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Amenities Catalog Preview */}
      <div className="card p-6 bg-white border border-line-200 shadow-1 space-y-4">
        <div className="flex items-center gap-2 border-b border-line-200 pb-3">
          <Tag className="w-5 h-5 text-brass-600" />
          <div>
            <h3 className="font-serif text-lg font-medium text-tide-900">
              Active Directory Amenities
            </h3>
            <p className="text-xs text-ink-500">
              Standardized amenity tags available in owner application and search filters.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {amenityList.map((a) => (
            <span
              key={a.id}
              className="chip text-xs bg-sand-50"
            >
              {a.label}
              {a.filter && (
                <span className="text-[10px] text-brass-600 font-bold ml-1">★ Filter</span>
              )}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
