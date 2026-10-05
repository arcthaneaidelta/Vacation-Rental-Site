import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { PublicLayout } from '../components/layout/PublicLayout';
import { ApplyLayout } from '../components/layout/ApplyLayout';
import { AdminLayout } from '../components/layout/AdminLayout';

// Pages
import { Home } from '../pages/Home';
import { Browse } from '../pages/Browse';
import { AreasIndex } from '../pages/AreasIndex';
import { AreaPage } from '../pages/AreaPage';
import { BuildingPage } from '../pages/BuildingPage';
import { ListingPage } from '../pages/ListingPage';
import { ListYourCondo } from '../pages/ListYourCondo';
import { Apply } from '../pages/Apply';
import { FaqPage } from '../pages/FaqPage';
import { ContactPage } from '../pages/ContactPage';
import { LegalPage } from '../pages/LegalPage';
import { ExternalDemoPage } from '../pages/ExternalDemoPage';
import { StyleguidePage } from '../pages/StyleguidePage';

// Admin Pages
import { AdminLogin } from '../pages/admin/AdminLogin';
import { AdminOverview } from '../pages/admin/AdminOverview';
import { AdminReviewQueue } from '../pages/admin/AdminReviewQueue';
import { AdminReviewDetail } from '../pages/admin/AdminReviewDetail';
import { AdminListings } from '../pages/admin/AdminListings';
import { AdminAddListing } from '../pages/admin/AdminAddListing';
import { AdminInquiries } from '../pages/admin/AdminInquiries';
import { AdminSettings } from '../pages/admin/AdminSettings';
import { RouteErrorBoundary } from '../components/ui/RouteErrorBoundary';

export const router = createBrowserRouter([
  // Public Traveler & Owner Showcase Routes
  {
    path: '/',
    element: <PublicLayout />,
    errorElement: <RouteErrorBoundary />,
    children: [
      { index: true, element: <Home /> },
      { path: 'browse', element: <Browse /> },
      { path: 'areas', element: <AreasIndex /> },
      { path: 'areas/:area', element: <AreaPage /> },
      { path: 'areas/:area/:building', element: <BuildingPage /> },
      { path: 'condo/:slug', element: <ListingPage /> },
      { path: 'list-your-condo', element: <ListYourCondo /> },
      { path: 'faq', element: <FaqPage /> },
      { path: 'contact', element: <ContactPage /> },
      { path: 'terms/:slug', element: <LegalPage /> },
      { path: 'styleguide', element: <StyleguidePage /> },
    ],
  },

  // Owner Application Focused Layout
  {
    path: '/list-your-condo',
    element: <ApplyLayout />,
    errorElement: <RouteErrorBoundary />,
    children: [
      { path: 'apply', element: <Apply /> },
    ],
  },

  // External Link Destination Demo Tab
  {
    path: '/external-demo',
    element: <ExternalDemoPage />,
  },

  // Admin Login
  {
    path: '/admin/login',
    element: <AdminLogin />,
  },

  // Admin Dashboard & Workflows Layout
  {
    path: '/admin',
    element: <AdminLayout />,
    errorElement: <RouteErrorBoundary />,
    children: [
      { index: true, element: <AdminOverview /> },
      { path: 'review', element: <AdminReviewQueue /> },
      { path: 'review/:id', element: <AdminReviewDetail /> },
      { path: 'listings', element: <AdminListings /> },
      { path: 'listings/new', element: <AdminAddListing /> },
      { path: 'inquiries', element: <AdminInquiries /> },
      { path: 'settings', element: <AdminSettings /> },
    ],
  },

  // Catch-all redirect to Home
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
]);
