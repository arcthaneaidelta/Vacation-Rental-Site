import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../../store/useStore';
import { buildings, areas } from '../../data/seed';
import { relTime } from '../../lib/format';
import { Badge } from '../../components/ui/Badge';
import { Tabs } from '../../components/ui/Tabs';
import { EmptyState } from '../../components/ui/EmptyState';
import { 
  FileCheck2, 
  Search, 
  ChevronRight, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Filter 
} from 'lucide-react';

export const AdminReviewQueue: React.FC = () => {
  const navigate = useNavigate();
  const applications = useStore((s) => s.applications);

  const [statusTab, setStatusTab] = useState<string>('pending');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredApps = applications.filter((app) => {
    if (app.status !== statusTab) return false;
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      app.data.title.toLowerCase().includes(q) ||
      app.data.owner.first.toLowerCase().includes(q) ||
      app.data.owner.last.toLowerCase().includes(q) ||
      app.ref.toLowerCase().includes(q)
    );
  });

  const pendingCountNum = applications.filter((a) => a.status === 'pending').length;
  const changesCountNum = applications.filter((a) => a.status === 'changes').length;
  const approvedCountNum = applications.filter((a) => a.status === 'approved').length;
  const rejectedCountNum = applications.filter((a) => a.status === 'rejected').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="eyebrow block mb-1">Administrative Workflow</span>
          <h1 className="h2 font-serif text-tide-900">Owner Applications Queue</h1>
          <p className="text-xs text-ink-500 mt-1">
            Review owner-submitted listings, check photo quality, and approve to publish live on the directory.
          </p>
        </div>
      </div>

      {/* Tabs & Search Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-line-200">
        <Tabs
          items={[
            { id: 'pending', label: 'Pending Review', count: pendingCountNum },
            { id: 'changes', label: 'Changes Requested', count: changesCountNum },
            { id: 'approved', label: 'Approved & Live', count: approvedCountNum },
            { id: 'rejected', label: 'Declined', count: rejectedCountNum },
          ]}
          activeId={statusTab}
          onChange={setStatusTab}
        />

        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 text-ink-500 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search applications..."
            className="input !pl-9 !py-1.5 text-xs w-full"
          />
        </div>
      </div>

      {/* Applications Table */}
      {filteredApps.length === 0 ? (
        <EmptyState
          icon={<CheckCircle2 className="w-8 h-8 text-brass-600" />}
          title={statusTab === 'pending' ? 'Queue cleared. Nothing waiting.' : 'No applications found'}
          message={
            statusTab === 'pending'
              ? 'All submitted condo listings have been reviewed and decided.'
              : `There are currently no applications with status “${statusTab}”.`
          }
        />
      ) : (
        <div className="card bg-white border border-line-200 overflow-hidden shadow-1">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-ink-900">
              <thead className="bg-sand-50/80 border-b border-line-200 text-ink-500 uppercase font-semibold text-[10px] tracking-wider">
                <tr>
                  <th className="py-3.5 px-4 sm:px-6">Property / Title</th>
                  <th className="py-3.5 px-4">Owner Contact</th>
                  <th className="py-3.5 px-4">Building & Area</th>
                  <th className="py-3.5 px-4 text-center">Photos</th>
                  <th className="py-3.5 px-4">Submitted</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line-200">
                {filteredApps.map((app) => {
                  const bld = buildings.find((b) => b.id === app.data.buildingId);
                  const area = areas.find((a) => a.id === app.data.areaId);
                  const photoCount = app.data.photos?.length || 0;

                  return (
                    <tr
                      key={app.id}
                      onClick={() => navigate(`/admin/review/${app.id}`)}
                      className="hover:bg-sand-50 cursor-pointer transition-colors group"
                    >
                      <td className="py-3.5 px-4 sm:px-6">
                        <div className="font-semibold text-tide-900 group-hover:text-brass-600 transition-colors">
                          {app.data.title}
                        </div>
                        <span className="text-[10px] font-mono text-ink-500">
                          {app.ref} · Floor {app.data.floor} · {app.data.bedrooms}BR
                        </span>
                      </td>

                      <td className="py-3.5 px-4">
                        <div className="font-medium text-tide-900">
                          {app.data.owner.first} {app.data.owner.last}
                        </div>
                        <span className="text-[11px] text-ink-500">
                          {app.data.owner.email}
                        </span>
                      </td>

                      <td className="py-3.5 px-4">
                        <div className="text-ink-900 font-medium">
                          {app.newBuilding?.name || bld?.name || 'Grand Strand'}
                        </div>
                        <span className="text-[11px] text-ink-500">{area?.name}</span>
                      </td>

                      <td className="py-3.5 px-4 text-center">
                        <span
                          className={`font-semibold px-2 py-0.5 rounded-full text-[11px] ${
                            photoCount >= 6 ? 'bg-sand-100 text-ink-900' : 'bg-err-100 text-err-600'
                          }`}
                        >
                          {photoCount} photos
                        </span>
                      </td>

                      <td className="py-3.5 px-4 text-ink-500">
                        {relTime(app.submittedAt)}
                      </td>

                      <td className="py-3.5 px-4">
                        <Badge variant={app.status} />
                      </td>

                      <td className="py-3.5 px-4 text-right">
                        <span className="text-xs font-semibold text-tide-900 group-hover:text-brass-600 inline-flex items-center gap-1">
                          Review <ChevronRight className="w-3.5 h-3.5" />
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
