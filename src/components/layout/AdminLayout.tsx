import React, { useState, useEffect } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useStore, pendingCount } from '../../store/useStore';
import { ToastContainer } from '../ui/Toast';
import { DemoToolbar } from '../demo/DemoToolbar';
import { DeviceContainer } from './DeviceContainer';
import { Modal } from '../ui/Modal';
import { 
  LayoutDashboard, 
  FileCheck2, 
  Building, 
  Mail, 
  Settings, 
  ExternalLink, 
  Search, 
  Bell, 
  LogOut, 
  Menu, 
  X, 
  CheckCircle2, 
  ChevronRight, 
  Sparkles 
} from 'lucide-react';

export const AdminLayout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const pending = useStore(pendingCount);
  const checklist = useStore((s) => s.checklist);
  const setAdmin = useStore((s) => s.setAdmin);
  const listings = useStore((s) => s.listings);
  const applications = useStore((s) => s.applications);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  // Calculate Launch Readiness completion percentage
  const doneCount = checklist.filter((c) => c.done).length;
  const launchProgress = Math.round((doneCount / checklist.length) * 100);

  // Global Cmd+K / Ctrl+K listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setCommandPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const navLinks = [
    { to: '/admin', label: 'Overview', icon: LayoutDashboard, exact: true },
    { to: '/admin/review', label: 'Review Queue', icon: FileCheck2, badge: pending },
    { to: '/admin/listings', label: 'All Listings', icon: Building, badge: listings.length },
    { to: '/admin/inquiries', label: 'Inquiry Log', icon: Mail },
    { to: '/admin/settings', label: 'Settings', icon: Settings },
  ];

  const handleSignOut = () => {
    setAdmin(false);
    navigate('/');
  };

  // Filtered results for Command Palette
  const matchingListings = searchQuery.trim()
    ? listings.filter((l) => l.title.toLowerCase().includes(searchQuery.toLowerCase()))
    : listings.slice(0, 4);

  const matchingApps = searchQuery.trim()
    ? applications.filter((a) => a.data.title.toLowerCase().includes(searchQuery.toLowerCase()))
    : applications.slice(0, 3);

  return (
    <DeviceContainer>
      <div className="min-h-screen bg-sand-50 text-ink-900 flex flex-col md:flex-row">
        {/* Left Sidebar (Desktop 240px, Tablet 64px rail) */}
        <aside className="hidden md:flex flex-col w-16 lg:w-60 bg-white border-r border-line-200 shrink-0 select-none">
          {/* Brand header */}
          <div className="p-4 lg:p-5 border-b border-line-200 flex items-center gap-3">
            <div className="w-8 h-8 rounded border border-brass-500/50 bg-tide-900 text-sand-50 flex items-center justify-center font-serif text-xs font-semibold shrink-0">
              RB
            </div>
            <div className="hidden lg:block min-w-0">
              <span className="font-serif text-base font-semibold text-tide-900 block truncate">
                RentABeach<span className="italic text-brass-500">Condo</span>
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-ink-500 block">
                Admin Console
              </span>
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="p-2 lg:p-3 space-y-1 flex-1">
            {navLinks.map((item) => {
              const Icon = item.icon;
              const isActive = item.exact
                ? location.pathname === item.to
                : location.pathname.startsWith(item.to);

              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`flex items-center justify-between p-2.5 rounded text-xs font-semibold transition-colors ${
                    isActive
                      ? 'bg-tide-900 text-white shadow-1'
                      : 'text-ink-600 hover:text-tide-900 hover:bg-sand-100'
                  }`}
                  title={item.label}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4 shrink-0" strokeWidth={1.8} />
                    <span className="hidden lg:inline">{item.label}</span>
                  </div>
                  {item.badge !== undefined && item.badge > 0 && (
                    <span
                      className={`hidden lg:inline-flex text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        isActive
                          ? 'bg-white/20 text-white'
                          : item.to === '/admin/review'
                          ? 'bg-warn-600 text-white'
                          : 'bg-sand-100 text-ink-600'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Launch Readiness Progress Card */}
          <div className="hidden lg:block p-4 m-3 rounded-lg bg-sand-50 border border-line-200 text-xs space-y-2">
            <div className="flex items-center justify-between text-ink-600 font-semibold">
              <span className="flex items-center gap-1.5 text-tide-900">
                <CheckCircle2 className="w-3.5 h-3.5 text-brass-600" /> Launch Readiness
              </span>
              <span>{launchProgress}%</span>
            </div>
            <div className="w-full h-1.5 bg-line-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-brass-500 rounded-full transition-all duration-300"
                style={{ width: `${launchProgress}%` }}
              />
            </div>
            <p className="text-[11px] text-ink-500">
              {doneCount} of {checklist.length} checklist items verified
            </p>
          </div>

          {/* User Sign out bar */}
          <div className="p-3 border-t border-line-200 flex items-center justify-between">
            <div className="hidden lg:flex items-center gap-2 text-xs min-w-0">
              <div className="w-7 h-7 rounded-full bg-sand-200 text-tide-900 font-serif font-bold text-xs flex items-center justify-center shrink-0">
                A
              </div>
              <div className="truncate">
                <p className="font-semibold text-tide-900 truncate">Site Admin</p>
                <p className="text-[10px] text-ink-500 truncate">Grand Strand Launch</p>
              </div>
            </div>
            <button
              onClick={handleSignOut}
              className="p-1.5 text-ink-500 hover:text-err-600 rounded hover:bg-sand-100 transition-colors ml-auto"
              title="Sign out to traveler site"
              aria-label="Sign out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </aside>

        {/* Mobile Header Bar */}
        <div className="md:hidden bg-white border-b border-line-200 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-1 text-ink-600 hover:text-tide-900"
              aria-label="Open admin navigation"
            >
              <Menu className="w-5 h-5" />
            </button>
            <span className="font-serif font-semibold text-tide-900">
              Admin Console
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to="/"
              className="text-xs font-semibold text-brass-600 flex items-center gap-1"
            >
              <span>Public Site</span>
              <ExternalLink className="w-3 h-3" />
            </Link>
          </div>
        </div>

        {/* Main Admin Section */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Top Bar */}
          <header className="bg-white border-b border-line-200 px-4 sm:px-8 py-3 flex items-center justify-between shrink-0">
            {/* Search command palette trigger */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setCommandPaletteOpen(true)}
                className="flex items-center gap-2 bg-sand-50 hover:bg-sand-100 border border-line-200 rounded px-3 py-1.5 text-xs text-ink-500 transition-colors w-48 sm:w-64 text-left"
              >
                <Search className="w-3.5 h-3.5 text-ink-500" />
                <span className="truncate">Jump to listing or owner...</span>
                <kbd className="hidden sm:inline-block ml-auto bg-white border border-line-200 rounded px-1.5 text-[10px] font-mono text-ink-500 shadow-1">
                  ⌘K
                </kbd>
              </button>
            </div>

            {/* Right actions */}
            <div className="flex items-center gap-3">
              {/* Notifications */}
              <div className="relative">
                <button
                  onClick={() => setNotificationsOpen(!notificationsOpen)}
                  className="p-2 rounded-full text-ink-600 hover:text-tide-900 hover:bg-sand-100 relative transition-colors"
                  aria-label="Notifications"
                >
                  <Bell className="w-4 h-4" />
                  {pending > 0 && (
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-warn-600" />
                  )}
                </button>

                {/* Notifications Dropdown */}
                {notificationsOpen && (
                  <div className="absolute right-0 top-full mt-2 w-72 bg-white rounded-lg border border-line-200 shadow-3 p-3 z-50 pop-in text-xs">
                    <div className="flex items-center justify-between pb-2 mb-2 border-b border-line-200 font-semibold text-tide-900">
                      <span>Notifications</span>
                      <span className="text-[11px] text-brass-600">{pending} pending</span>
                    </div>
                    <div className="space-y-2">
                      {applications.slice(0, 3).map((app) => (
                        <Link
                          key={app.id}
                          to={`/admin/review/${app.id}`}
                          onClick={() => setNotificationsOpen(false)}
                          className="block p-2 rounded hover:bg-sand-50 transition-colors"
                        >
                          <p className="font-semibold text-tide-900 truncate">
                            {app.data.title}
                          </p>
                          <p className="text-ink-500 text-[11px]">
                            {app.data.owner.first} applied for founding spot
                          </p>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* View Live Public Site Link */}
              <Link
                to="/"
                className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-tide-900 bg-sand-100 hover:bg-sand-200 px-3 py-1.5 rounded transition-colors"
              >
                <span>View Public Site</span>
                <ExternalLink className="w-3.5 h-3.5 text-brass-600" />
              </Link>
            </div>
          </header>

          {/* Admin Page Content */}
          <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto page-in">
            <Outlet />
          </main>
        </div>

        <ToastContainer />
        <DemoToolbar />

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-modal overflow-hidden">
            <div
              className="scrim"
              data-state="open"
              onClick={() => setMobileMenuOpen(false)}
            />
            <div className="fixed inset-y-0 left-0 max-w-full flex pr-10">
              <div className="w-screen max-w-xs bg-white shadow-3 flex flex-col justify-between p-6">
                <div>
                  <div className="flex items-center justify-between pb-4 border-b border-line-200">
                    <span className="font-serif font-semibold text-tide-900">
                      Admin Console
                    </span>
                    <button
                      onClick={() => setMobileMenuOpen(false)}
                      className="p-1 text-ink-500"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  <nav className="py-4 space-y-1.5">
                    {navLinks.map((item) => (
                      <Link
                        key={item.to}
                        to={item.to}
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center justify-between p-2.5 rounded text-sm font-medium text-ink-900 hover:bg-sand-100"
                      >
                        <span>{item.label}</span>
                        {item.badge !== undefined && item.badge > 0 && (
                          <span className="bg-warn-600 text-white text-xs px-2 py-0.5 rounded-full font-bold">
                            {item.badge}
                          </span>
                        )}
                      </Link>
                    ))}
                  </nav>
                </div>
                <div className="pt-4 border-t border-line-200">
                  <Link
                    to="/"
                    className="block text-center text-xs font-semibold text-brass-600 py-2"
                  >
                    Exit to Public Traveler Site
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Global Command Palette (⌘K) Modal */}
        <Modal
          isOpen={commandPaletteOpen}
          onClose={() => setCommandPaletteOpen(false)}
          title="Jump to Listing or Application"
          size="md"
        >
          <div className="space-y-4">
            <div className="relative">
              <Search className="w-4 h-4 text-ink-500 absolute left-3 top-3" />
              <input
                type="text"
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Type condo title, building, or owner name..."
                className="input !pl-9 !py-2 text-sm"
              />
            </div>

            <div className="max-h-60 overflow-y-auto divide-y divide-line-200 text-xs">
              {matchingApps.length > 0 && (
                <div className="py-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-brass-600 px-2 block mb-1">
                    Pending Applications
                  </span>
                  {matchingApps.map((a) => (
                    <button
                      key={a.id}
                      onClick={() => {
                        navigate(`/admin/review/${a.id}`);
                        setCommandPaletteOpen(false);
                      }}
                      className="w-full text-left p-2 rounded hover:bg-sand-100 flex items-center justify-between"
                    >
                      <div>
                        <p className="font-semibold text-tide-900">{a.data.title}</p>
                        <p className="text-ink-500 text-[11px]">{a.data.owner.first} · {a.ref}</p>
                      </div>
                      <ChevronRight className="w-3.5 h-3.5 text-ink-500" />
                    </button>
                  ))}
                </div>
              )}

              {matchingListings.length > 0 && (
                <div className="py-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-ink-500 px-2 block mb-1">
                    Live Listings
                  </span>
                  {matchingListings.map((l) => (
                    <button
                      key={l.id}
                      onClick={() => {
                        navigate(`/condo/${l.slug}`);
                        setCommandPaletteOpen(false);
                      }}
                      className="w-full text-left p-2 rounded hover:bg-sand-100 flex items-center justify-between"
                    >
                      <div>
                        <p className="font-semibold text-tide-900">{l.title}</p>
                        <p className="text-ink-500 text-[11px]">Floor {l.floor} · {l.owner.first}</p>
                      </div>
                      <ChevronRight className="w-3.5 h-3.5 text-ink-500" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </Modal>
      </div>
    </DeviceContainer>
  );
};
