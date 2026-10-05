import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { faq } from '../data/copy';
import { Tabs } from '../components/ui/Tabs';
import { Accordion } from '../components/ui/Accordion';
import { Search, HelpCircle, MessageSquare } from 'lucide-react';
import { Button } from '../components/ui/Button';

export const FaqPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('travelers');
  const [query, setQuery] = useState('');

  const questions = activeTab === 'travelers' ? faq.travelers : faq.owners;

  const filtered = useMemo(() => {
    if (!query.trim()) return questions;
    const q = query.toLowerCase();
    return questions.filter(
      (item) => item.q.toLowerCase().includes(q) || item.a.toLowerCase().includes(q)
    );
  }, [questions, query]);

  const accordionItems = filtered.map((item) => ({
    id: item.id,
    title: item.q,
    content: <p>{item.a}</p>,
  }));

  return (
    <div className="flex-1 flex flex-col bg-sand-50">
      {/* Header */}
      <section className="bg-white border-b border-line-200 pt-28 pb-10">
        <div className="container-x max-w-3xl text-center space-y-3">
          <span className="eyebrow block">Help & Guidelines</span>
          <h1 className="h1-page font-serif text-tide-900">
            Frequently Asked Questions
          </h1>
          <p className="text-sm sm:text-base text-ink-600">
            Learn how direct booking works, how listings are reviewed, and what is included in the founding owner offer.
          </p>

          {/* Search-as-you-type input */}
          <div className="pt-4 max-w-md mx-auto relative">
            <Search className="w-4 h-4 text-ink-500 absolute left-3.5 top-3.5" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search questions or topics..."
              className="input !pl-10 !py-2.5 text-sm"
            />
          </div>
        </div>
      </section>

      {/* Tabs & Accordion Content */}
      <div className="container-x max-w-3xl py-10 flex-1">
        <div className="flex justify-center mb-8">
          <Tabs
            items={[
              { id: 'travelers', label: 'For Travelers', count: faq.travelers.length },
              { id: 'owners', label: 'For Condo Owners', count: faq.owners.length },
            ]}
            activeId={activeTab}
            onChange={setActiveTab}
          />
        </div>

        {accordionItems.length === 0 ? (
          <div className="text-center py-12 text-ink-500">
            <p className="text-sm">No questions matched your search “{query}”.</p>
            <button
              onClick={() => setQuery('')}
              className="text-xs font-semibold text-brass-600 underline mt-2"
            >
              Clear search
            </button>
          </div>
        ) : (
          <Accordion items={accordionItems} allowMultiple={false} />
        )}

        {/* Still have questions card */}
        <div className="mt-14 card p-6 sm:p-8 bg-white border border-line-200 text-center space-y-3">
          <div className="w-10 h-10 rounded-full bg-sand-100 text-brass-600 flex items-center justify-center mx-auto">
            <MessageSquare className="w-5 h-5" />
          </div>
          <h3 className="font-serif text-xl font-medium text-tide-900">
            Still have a question?
          </h3>
          <p className="text-xs sm:text-sm text-ink-600 max-w-sm mx-auto">
            Whether you’re planning a family trip to the Grand Strand or considering listing your condo, we’re happy to help.
          </p>
          <div className="pt-2">
            <Link to="/contact">
              <Button variant="secondary" size="sm">
                Contact our support team
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
