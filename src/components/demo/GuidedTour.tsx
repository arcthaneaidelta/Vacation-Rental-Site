import React from 'react';
import { useStore } from '../../store/useStore';
import { useNavigate } from 'react-router-dom';
import { 
  Sparkles, 
  X, 
  ArrowRight, 
  ArrowLeft, 
  Compass, 
  FileCheck, 
  ShieldCheck, 
  Smartphone 
} from 'lucide-react';
import { Button } from '../ui/Button';

interface TourStep {
  title: string;
  badge: string;
  icon: React.ReactNode;
  content: string;
  path: string;
  tip: string;
}

const steps: TourStep[] = [
  {
    title: '1. Traveler Search Experience',
    badge: 'Traveler Side',
    icon: <Compass className="w-5 h-5 text-brass-600" />,
    content:
      'Notice the quiet coastal hero, live dependent search filters (try selecting an Area and watch Buildings narrow), and the reusable listing template with direct owner inquiries and zero booking fees.',
    path: '/',
    tip: 'Try searching or opening any condo to see the sticky Contact Card.',
  },
  {
    title: '2. Owner Onboarding & Offer',
    badge: 'Owner Side',
    icon: <FileCheck className="w-5 h-5 text-brass-600" />,
    content:
      'Explains the 6-month introductory offer with a live founding-spots counter (decrements with each application). The 5-step form features drag-and-drop photos with progress rings, reordering, and a live preview card.',
    path: '/list-your-condo/apply',
    tip: 'Click “Autofill form” in the toolbar below to test the submission in 2 seconds.',
  },
  {
    title: '3. Admin Review & Approval',
    badge: 'Admin Workflow',
    icon: <ShieldCheck className="w-5 h-5 text-brass-600" />,
    content:
      'The client can approve, edit, and remove listings without hiring a developer. Open any pending application, check off review items, and click “Approve & Publish” to see it immediately appear in public Browse.',
    path: '/admin/review',
    tip: 'The core requirement from your job post: complete administrative control before publication.',
  },
  {
    title: '4. Dedicated Mobile Layout',
    badge: 'Mobile Polish',
    icon: <Smartphone className="w-5 h-5 text-brass-600" />,
    content:
      'Every screen is intentionally designed for mobile with thumb-zone actions, bottom sheets, swipeable galleries, and fixed contact bars—never just a shrunken desktop page.',
    path: '/browse',
    tip: 'Use the Device Toggle in the bottom toolbar to preview mobile and tablet widths.',
  },
];

export const GuidedTour: React.FC = () => {
  const navigate = useNavigate();
  const tourOpen = useStore((s) => s.demo.tourOpen);
  const currentStep = useStore((s) => s.demo.tourStep);
  const setDemo = useStore((s) => s.setDemo);

  if (!tourOpen) return null;

  const step = steps[currentStep] || steps[0];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      const next = currentStep + 1;
      setDemo({ tourStep: next });
      navigate(steps[next].path);
    } else {
      setDemo({ tourOpen: false, tourDismissed: true });
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      const prev = currentStep - 1;
      setDemo({ tourStep: prev });
      navigate(steps[prev].path);
    }
  };

  const handleClose = () => {
    setDemo({ tourOpen: false, tourDismissed: true });
  };

  return (
    <div className="fixed z-modal inset-x-4 bottom-20 sm:bottom-24 sm:right-6 sm:left-auto max-w-md w-full pop-in">
      <div className="card bg-white border-2 border-brass-500 shadow-3 p-5 sm:p-6 relative">
        <button
          onClick={handleClose}
          aria-label="Close guided tour"
          className="absolute top-4 right-4 p-1 rounded-full text-ink-500 hover:text-ink-900 hover:bg-sand-100"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Step indicator */}
        <div className="flex items-center gap-2 mb-2.5">
          <span className="badge bg-sand-100 text-brass-600 border border-brass-500/40 text-[11px] font-semibold">
            {step.badge}
          </span>
          <span className="text-xs text-ink-500 font-medium">
            Step {currentStep + 1} of {steps.length}
          </span>
        </div>

        {/* Title */}
        <div className="flex items-center gap-2 mb-2">
          {step.icon}
          <h3 className="h4 font-serif text-tide-900">{step.title}</h3>
        </div>

        {/* Content */}
        <p className="text-xs sm:text-sm text-ink-600 leading-relaxed mb-3">
          {step.content}
        </p>

        {/* Tip box */}
        <div className="p-2.5 bg-sand-50 rounded border border-line-200 text-xs text-ink-600 mb-4">
          <strong className="text-tide-900">Try this:</strong> {step.tip}
        </div>

        {/* Buttons */}
        <div className="flex items-center justify-between pt-2 border-t border-line-200">
          <button
            onClick={handleClose}
            className="text-xs text-ink-500 hover:text-ink-900 font-medium"
          >
            End Tour
          </button>

          <div className="flex items-center gap-2">
            {currentStep > 0 && (
              <Button variant="ghost" size="sm" onClick={handlePrev}>
                <ArrowLeft className="w-3.5 h-3.5 mr-1" /> Back
              </Button>
            )}
            <Button variant="primary" size="sm" onClick={handleNext}>
              <span>{currentStep === steps.length - 1 ? 'Finish' : 'Next'}</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
