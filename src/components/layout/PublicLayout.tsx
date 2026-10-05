import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { ToastContainer } from '../ui/Toast';
import { DemoToolbar } from '../demo/DemoToolbar';
import { GuidedTour } from '../demo/GuidedTour';
import { DeviceContainer } from './DeviceContainer';

export const PublicLayout: React.FC = () => {
  const location = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [location.pathname]);

  return (
    <DeviceContainer>
      <div className="min-h-screen flex flex-col bg-sand-50 text-ink-900 selection:bg-seaglass-100 selection:text-tide-900">
        <Header />
        <main className="flex-1 flex flex-col page-in">
          <Outlet />
        </main>
        <Footer />
        <ToastContainer />
        <DemoToolbar />
        <GuidedTour />
      </div>
    </DeviceContainer>
  );
};
