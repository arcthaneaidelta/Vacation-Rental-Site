import React, { useState } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from '../ui/Toast';
import { DemoToolbar } from '../demo/DemoToolbar';
import { DeviceContainer } from './DeviceContainer';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { HelpCircle, LogOut } from 'lucide-react';

export const ApplyLayout: React.FC = () => {
  const navigate = useNavigate();
  const [exitModalOpen, setExitModalOpen] = useState(false);
  const [helpModalOpen, setHelpModalOpen] = useState(false);

  const handleConfirmExit = () => {
    setExitModalOpen(false);
    navigate('/list-your-condo');
  };

  return (
    <DeviceContainer>
      <div className="min-h-screen flex flex-col bg-sand-50 text-ink-900">
        {/* Slim Application Header */}
        <header className="bg-white border-b border-line-200 py-3.5 px-4 sm:px-8 shrink-0 sticky top-0 z-header">
          <div className="max-w-content mx-auto flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <div className="w-7 h-7 rounded border border-brass-500/50 bg-tide-900 text-sand-50 flex items-center justify-center font-serif text-xs font-semibold">
                RB
              </div>
              <span className="font-serif text-lg font-normal text-tide-900 hidden sm:inline">
                RentABeach<span className="italic text-brass-500">Condo</span>
              </span>
            </Link>

            {/* Title */}
            <span className="text-xs font-semibold text-brass-600 uppercase tracking-wider">
              Owner Listing Application
            </span>

            {/* Right actions */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setHelpModalOpen(true)}
                className="text-xs font-medium text-ink-600 hover:text-tide-900 flex items-center gap-1"
              >
                <HelpCircle className="w-3.5 h-3.5 text-brass-600" />
                <span className="hidden sm:inline">Need help?</span>
              </button>

              <button
                type="button"
                onClick={() => setExitModalOpen(true)}
                className="btn btn-ghost btn-sm text-xs !text-ink-600 hover:!text-tide-900 flex items-center gap-1"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Save & Exit</span>
              </button>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 flex flex-col">
          <Outlet />
        </main>

        <ToastContainer />
        <DemoToolbar />

        {/* Save and exit confirmation modal */}
        <Modal
          isOpen={exitModalOpen}
          onClose={() => setExitModalOpen(false)}
          title="Save and exit application?"
          size="sm"
        >
          <div className="space-y-3 text-xs sm:text-sm text-ink-600">
            <p>
              Your entered information is saved in your browser session. You can return anytime to complete and submit your listing.
            </p>
            <div className="pt-3 flex justify-end gap-2">
              <Button variant="ghost" size="sm" onClick={() => setExitModalOpen(false)}>
                Keep editing
              </Button>
              <Button variant="primary" size="sm" onClick={handleConfirmExit}>
                Exit to offer page
              </Button>
            </div>
          </div>
        </Modal>

        {/* Need Help Modal */}
        <Modal
          isOpen={helpModalOpen}
          onClose={() => setHelpModalOpen(false)}
          title="Application Assistance"
          size="sm"
        >
          <div className="space-y-3 text-xs sm:text-sm text-ink-600">
            <p>
              Questions while listing your condo? We’re here to help founding owners with photography, descriptions, and building verification.
            </p>
            <div className="p-3 bg-sand-100 rounded text-xs text-ink-900 space-y-1">
              <p><strong>Email support:</strong> owners@rentabeachcondo.com</p>
              <p><strong>Response time:</strong> Within a few hours</p>
              <p><strong>Founding offer:</strong> 6 months complimentary for initial 25 owners</p>
            </div>
            <div className="pt-2 flex justify-end">
              <Button variant="primary" size="sm" onClick={() => setHelpModalOpen(false)}>
                Back to application
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    </DeviceContainer>
  );
};
