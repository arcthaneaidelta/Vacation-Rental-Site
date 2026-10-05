import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { legal } from '../data/copy';
import { AlertCircle, ChevronRight, Printer } from 'lucide-react';
import { Button } from '../components/ui/Button';

export const LegalPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const docSlug = (slug === 'photos' || slug === 'owners' || slug === 'site' ? slug : 'owners') as keyof typeof legal;
  const doc = legal[docSlug];

  return (
    <div className="flex-1 flex flex-col bg-sand-50">
      {/* Breadcrumbs */}
      <div className="bg-white border-b border-line-200 pt-24 pb-3">
        <div className="container-x flex items-center gap-1.5 text-xs text-ink-500">
          <Link to="/" className="hover:text-tide-900">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-line-300" />
          <span>Policies & Terms</span>
          <ChevronRight className="w-3.5 h-3.5 text-line-300" />
          <span className="text-tide-900 font-semibold">{doc.title}</span>
        </div>
      </div>

      {/* Draft Disclaimer Banner */}
      <div className="bg-sand-100 border-b border-line-200 py-3">
        <div className="container-x flex items-center justify-between gap-4 text-xs text-ink-600">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-brass-600 shrink-0" />
            <span><strong>Draft Document:</strong> Final wording provided by RentABeachCondo.com prior to launch.</span>
          </div>
          <button
            onClick={() => window.print()}
            className="hidden sm:inline-flex items-center gap-1 font-semibold text-tide-900 hover:underline"
          >
            <Printer className="w-3.5 h-3.5" /> Print
          </button>
        </div>
      </div>

      <div className="container-x py-10 sm:py-14 flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 max-w-5xl mx-auto">
          {/* Left: Sticky Table of Contents */}
          <aside className="lg:col-span-4 hidden lg:block sticky top-28 self-start space-y-4">
            <div className="card p-5 bg-white border border-line-200 space-y-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-brass-600 block">
                Table of Contents
              </span>
              <ul className="space-y-1.5 text-xs text-ink-600">
                {doc.sections.map((sec) => (
                  <li key={sec.id}>
                    <a
                      href={`#${sec.id}`}
                      className="hover:text-tide-900 hover:underline block py-0.5"
                    >
                      {sec.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick switcher between legal docs */}
            <div className="card p-4 bg-sand-100/60 border border-line-200 text-xs space-y-2">
              <span className="font-semibold text-tide-900 block">Related documents</span>
              <div className="space-y-1">
                <Link to="/terms/owners" className="block text-ink-600 hover:text-tide-900 hover:underline">
                  Owner Terms & Standards
                </Link>
                <Link to="/terms/photos" className="block text-ink-600 hover:text-tide-900 hover:underline">
                  Photo Authorization Policy
                </Link>
                <Link to="/terms/site" className="block text-ink-600 hover:text-tide-900 hover:underline">
                  Site Terms & Privacy
                </Link>
              </div>
            </div>
          </aside>

          {/* Right: Legal Document Content */}
          <article className="lg:col-span-8 card p-6 sm:p-10 bg-white border border-line-200 shadow-1 space-y-8">
            <header className="border-b border-line-200 pb-6 space-y-2">
              <span className="eyebrow block">Directory Legal Notice</span>
              <h1 className="h1 font-serif text-tide-900">{doc.title}</h1>
              <p className="text-xs text-ink-500">Last updated: {doc.updated}</p>
            </header>

            <div className="space-y-8 text-xs sm:text-sm text-ink-600 leading-relaxed">
              {doc.sections.map((sec) => (
                <section key={sec.id} id={sec.id} className="space-y-2.5 pt-2">
                  <h2 className="font-serif text-lg sm:text-xl font-medium text-tide-900">
                    {sec.title}
                  </h2>
                  {sec.body.map((p, idx) => (
                    <p key={idx}>{p}</p>
                  ))}
                </section>
              ))}
            </div>

            <footer className="pt-6 border-t border-line-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-ink-500">
              <span>RentABeachCondo.com · Grand Strand, SC</span>
              <Link to="/contact" className="text-brass-600 hover:underline font-semibold">
                Questions? Contact our team →
              </Link>
            </footer>
          </article>
        </div>
      </div>
    </div>
  );
};
