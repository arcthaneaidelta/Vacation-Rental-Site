import React, { useState } from 'react';
import { useStore, pendingCount, foundingSpotsLeft } from '../../store/useStore';
import { useNavigate, useLocation } from 'react-router-dom';
import type { Device } from '../../store/useStore';
import { 
  Sliders, 
  RotateCcw, 
  Sparkles, 
  Smartphone, 
  Tablet, 
  Monitor, 
  Compass, 
  FileEdit, 
  ShieldCheck, 
  WifiOff, 
  Clock, 
  Info, 
  ChevronUp, 
  ChevronDown, 
  Wand2 
} from 'lucide-react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';

export const DemoToolbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const demo = useStore((s) => s.demo);
  const setDemo = useStore((s) => s.setDemo);
  const reset = useStore((s) => s.reset);
  const pending = useStore(pendingCount);
  const spotsLeft = useStore(foundingSpotsLeft);

  const [expanded, setExpanded] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [resetConfirmOpen, setResetConfirmOpen] = useState(false);

  const isAdminArea = location.pathname.startsWith('/admin');
  const isApplyArea = location.pathname.startsWith('/list-your-condo');

  const handleDeviceChange = (device: Device) => {
    setDemo({ device });
    // If setting device preview, notify container or apply container width classes
  };

  const handleAutofill = () => {
    // Bump autofill counter so the Apply form knows to fill in realistic sample data
    setDemo({ autofill: demo.autofill + 1 });
    if (!location.pathname.includes('/apply')) {
      navigate('/list-your-condo/apply');
    }
  };

  const handleStartTour = () => {
    setDemo({ tourOpen: true, tourStep: 0 });
    navigate('/');
  };

  return (
    <>
      {/* Floating Toolbar Container */}
      <aside
        aria-label="Demo controls"
        data-demo-toolbar
        className="fixed bottom-4 left-4 z-toolbar flex flex-col items-start gap-2"
      >
        {/* Expanded Panel */}
        {expanded && (
          <div className="bg-white/95 backdrop-blur-md border border-line-300 shadow-3 rounded-xl p-4 w-[340px] sm:w-[380px] pop-in text-xs space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-line-200">
              <div className="flex items-center gap-1.5 font-semibold text-tide-900">
                <Sparkles className="w-4 h-4 text-brass-600" />
                <span>Demo Control Panel</span>
              </div>
              <button
                onClick={() => setExpanded(false)}
                className="text-ink-500 hover:text-ink-900 p-1"
                aria-label="Collapse panel"
              >
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>

            {/* Audience Switcher */}
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-ink-500 block mb-1.5">
                Switch Audience
              </span>
              <div className="grid grid-cols-3 gap-1.5">
                <button
                  onClick={() => navigate('/')}
                  className={`p-2 rounded border text-center transition-colors flex flex-col items-center gap-1 ${
                    !isAdminArea && !isApplyArea
                      ? 'border-tide-900 bg-sand-100 font-semibold text-tide-900'
                      : 'border-line-200 bg-white hover:bg-sand-50 text-ink-600'
                  }`}
                >
                  <Compass className="w-3.5 h-3.5 text-brass-600" />
                  <span>Traveler</span>
                </button>

                <button
                  onClick={() => navigate('/list-your-condo/apply')}
                  className={`p-2 rounded border text-center transition-colors flex flex-col items-center gap-1 ${
                    isApplyArea
                      ? 'border-tide-900 bg-sand-100 font-semibold text-tide-900'
                      : 'border-line-200 bg-white hover:bg-sand-50 text-ink-600'
                  }`}
                >
                  <FileEdit className="w-3.5 h-3.5 text-brass-600" />
                  <span>Owner</span>
                </button>

                <button
                  onClick={() => navigate('/admin/review')}
                  className={`p-2 rounded border text-center transition-colors flex flex-col items-center gap-1 relative ${
                    isAdminArea
                      ? 'border-tide-900 bg-sand-100 font-semibold text-tide-900'
                      : 'border-line-200 bg-white hover:bg-sand-50 text-ink-600'
                  }`}
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-brass-600" />
                  <span>Admin</span>
                  {pending > 0 && (
                    <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-warn-600" />
                  )}
                </button>
              </div>
            </div>

            {/* Device Width Preview Toggles */}
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-ink-500 block mb-1.5">
                Responsive Preview
              </span>
              <div className="flex items-center gap-1.5 bg-sand-50 p-1 rounded border border-line-200">
                {[
                  { id: 'desktop' as Device, label: 'Desktop', icon: Monitor },
                  { id: 'tablet' as Device, label: 'Tablet (768px)', icon: Tablet },
                  { id: 'mobile' as Device, label: 'Mobile (375px)', icon: Smartphone },
                ].map((d) => {
                  const Icon = d.icon;
                  const active = demo.device === d.id;
                  return (
                    <button
                      key={d.id}
                      onClick={() => handleDeviceChange(d.id)}
                      className={`flex-1 py-1.5 px-2 rounded text-[11px] font-medium flex items-center justify-center gap-1.5 transition-colors ${
                        active
                          ? 'bg-white text-tide-900 font-bold shadow-1'
                          : 'text-ink-500 hover:text-ink-900'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      <span>{d.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Simulation Flags */}
            <div className="pt-2 border-t border-line-200 space-y-2">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-ink-500 block">
                Simulated Test Modes
              </span>
              <div className="space-y-1.5">
                <label className="flex items-center justify-between p-2 rounded bg-sand-50 border border-line-200 cursor-pointer">
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-ink-500" />
                    <span>Slow Network (2.5s skeletons)</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={demo.slow}
                    onChange={(e) => setDemo({ slow: e.target.checked })}
                    className="checkbox !w-4 !h-4"
                  />
                </label>

                <label className="flex items-center justify-between p-2 rounded bg-sand-50 border border-line-200 cursor-pointer">
                  <div className="flex items-center gap-2">
                    <WifiOff className="w-3.5 h-3.5 text-err-600" />
                    <span>Simulate network error on next submit</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={demo.failNext}
                    onChange={(e) => setDemo({ failNext: e.target.checked })}
                    className="checkbox !w-4 !h-4"
                  />
                </label>
              </div>
            </div>

            {/* Quick Actions Row */}
            <div className="pt-2 border-t border-line-200 grid grid-cols-2 gap-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={handleAutofill}
                icon={<Wand2 className="w-3.5 h-3.5 text-brass-600" />}
                className="justify-center"
              >
                Autofill Form
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={handleStartTour}
                icon={<Sparkles className="w-3.5 h-3.5 text-brass-600" />}
                className="justify-center"
              >
                4-Step Tour
              </Button>
            </div>

            {/* Footer Row */}
            <div className="pt-2 border-t border-line-200 flex items-center justify-between text-ink-500">
              <button
                onClick={() => setAboutOpen(true)}
                className="text-ink-600 hover:text-tide-900 underline flex items-center gap-1"
              >
                <Info className="w-3 h-3" /> About Demo
              </button>

              <button
                onClick={() => setResetConfirmOpen(true)}
                className="text-err-600 hover:underline flex items-center gap-1 font-medium"
              >
                <RotateCcw className="w-3 h-3" /> Reset Data
              </button>
            </div>
          </div>
        )}

        {/* Collapsed Pill Button */}
        <div className="flex items-center gap-2 bg-tide-900 text-white rounded-full p-1 pl-3.5 pr-2 shadow-3 border border-white/20 select-none">
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-2 text-xs font-semibold hover:text-brass-500 transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-brass-500" />
            <span>Demo Guide</span>
            {pending > 0 && (
              <span className="w-4 h-4 rounded-full bg-warn-600 text-white text-[10px] flex items-center justify-center font-bold">
                {pending}
              </span>
            )}
            {expanded ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
          </button>

          <span className="w-px h-3.5 bg-white/20" />

          {/* Quick Tour Button */}
          <button
            onClick={handleStartTour}
            className="px-2 py-0.5 rounded-full bg-white/10 hover:bg-white/20 text-[11px] font-medium text-white transition-colors"
          >
            Tour
          </button>

          {/* Quick Autofill */}
          <button
            onClick={handleAutofill}
            className="px-2 py-0.5 rounded-full bg-brass-600 hover:bg-brass-500 text-[11px] font-medium text-white transition-colors flex items-center gap-1"
            title="Autofill the 5-step owner application"
          >
            <Wand2 className="w-3 h-3" />
            <span className="hidden sm:inline">Autofill</span>
          </button>
        </div>
      </aside>

      {/* About Demo Modal */}
      <Modal
        isOpen={aboutOpen}
        onClose={() => setAboutOpen(false)}
        title="RentABeachCondo.com — Launch Prototype"
        size="md"
      >
        <div className="space-y-4 text-xs sm:text-sm text-ink-600 leading-relaxed">
          <p>
            This high-fidelity prototype proves the complete launch scope for RentABeachCondo.com:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-ink-900">
            <li><strong>Polished coastal traveler site:</strong> Hero search, area/building filtering, and direct inquiry messaging with email delivery simulation.</li>
            <li><strong>5-step owner onboarding:</strong> Clear explanation of the 6-month free founding offer, requirements, and interactive photo uploader.</li>
            <li><strong>Complete admin approval workflow:</strong> Review pending owner listings, approve to publish live, request changes, or edit listings with zero coding required.</li>
            <li><strong>Strict project boundaries:</strong> No direct payments, no booking calendars, no paid plugins, and built to scale to new coastal markets.</li>
          </ul>
          <div className="p-3 bg-sand-100 rounded text-xs text-ink-600">
            <strong>Fixed-Price Launch Scope:</strong> All interactions live in frontend memory. A real production build will be integrated onto the client's preferred platform within the agreed $1,000 budget.
          </div>
          <div className="pt-2 flex justify-end">
            <Button variant="primary" size="sm" onClick={() => setAboutOpen(false)}>
              Got it
            </Button>
          </div>
        </div>
      </Modal>

      {/* Reset Confirmation Modal */}
      <Modal
        isOpen={resetConfirmOpen}
        onClose={() => setResetConfirmOpen(false)}
        title="Reset demo data?"
        size="sm"
      >
        <div className="space-y-3 text-xs sm:text-sm text-ink-600">
          <p>
            This will reset all listings, pending owner applications, and inquiry logs back to their initial sample state.
          </p>
          <div className="pt-2 flex justify-end gap-2">
            <Button variant="ghost" size="sm" onClick={() => setResetConfirmOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="danger"
              size="sm"
              onClick={() => {
                reset();
                setResetConfirmOpen(false);
              }}
            >
              Reset Data
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};
