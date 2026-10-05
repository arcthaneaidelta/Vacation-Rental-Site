import React from 'react';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Tabs } from '../components/ui/Tabs';
import { Sparkles, Check, Heart, Mail } from 'lucide-react';

export const StyleguidePage: React.FC = () => {
  return (
    <div className="container-x py-24 space-y-12 bg-white">
      <div>
        <span className="eyebrow block">Design System Verification</span>
        <h1 className="h1 font-serif text-tide-900">RentABeachCondo UI Styleguide</h1>
        <p className="text-sm text-ink-600 mt-2">
          Living component inventory validating PRD section 5 &amp; 8 design tokens, colors, typography, and states.
        </p>
      </div>

      {/* 1. Color Palette Tokens */}
      <section className="space-y-4">
        <h2 className="h3 font-serif text-tide-900 border-b border-line-200 pb-2">Color Palette Tokens</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3 text-xs font-mono">
          <div className="p-4 rounded bg-tide-900 text-white">--tide-900 (#14304A)</div>
          <div className="p-4 rounded bg-tide-800 text-white">--tide-800 (#1D4366)</div>
          <div className="p-4 rounded bg-seaglass-500 text-white">--seaglass-500 (#6F9C97)</div>
          <div className="p-4 rounded bg-seaglass-100 text-tide-900 border border-seaglass-500/40">--seaglass-100 (#E3EEEC)</div>
          <div className="p-4 rounded bg-brass-500 text-white">--brass-500 (#B08A4F)</div>
          <div className="p-4 rounded bg-sand-50 text-tide-900 border border-line-300">--sand-50 (#FAF7F2)</div>
        </div>
      </section>

      {/* 2. Typography Scale */}
      <section className="space-y-4">
        <h2 className="h3 font-serif text-tide-900 border-b border-line-200 pb-2">Typography Scale</h2>
        <div className="space-y-3">
          <div className="h1">Newsreader 64px / H1 Hero Headline</div>
          <div className="h2">Newsreader 44px / H2 Section Title</div>
          <div className="h3">Newsreader 28px / H3 Card &amp; Section Title</div>
          <div className="h4">Hanken Grotesk 20px / H4 Component Subheading</div>
          <p className="lead">Hanken Grotesk 19px Lead body paragraph with comfortable line height.</p>
          <p className="text-base text-ink-900">Standard body 17px on desktop, 16px on mobile, ensuring WCAG AA contrast.</p>
          <span className="eyebrow">Eyebrow label / 12px uppercase tracking</span>
        </div>
      </section>

      {/* 3. Button States & Sizes */}
      <section className="space-y-4">
        <h2 className="h3 font-serif text-tide-900 border-b border-line-200 pb-2">Buttons</h2>
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="primary" size="md" withArrow>Primary Button</Button>
          <Button variant="secondary" size="md">Secondary Button</Button>
          <Button variant="ghost" size="md">Ghost Button</Button>
          <Button variant="danger" size="md">Danger Button</Button>
          <Button variant="primary" size="sm">Small</Button>
          <Button variant="primary" size="lg">Large</Button>
          <Button variant="primary" size="md" loading>Loading State</Button>
          <Button variant="primary" size="md" disabled>Disabled</Button>
        </div>
      </section>

      {/* 4. Badges */}
      <section className="space-y-4">
        <h2 className="h3 font-serif text-tide-900 border-b border-line-200 pb-2">Badges</h2>
        <div className="flex flex-wrap items-center gap-3">
          <Badge variant="oceanfront" />
          <Badge variant="featured" />
          <Badge variant="founding" />
          <Badge variant="live" />
          <Badge variant="pending" />
          <Badge variant="changes" />
          <Badge variant="rejected" />
          <Badge variant="draft" />
          <Badge variant="archived" />
        </div>
      </section>

      {/* 5. Inputs & Controls */}
      <section className="space-y-4 max-w-md">
        <h2 className="h3 font-serif text-tide-900 border-b border-line-200 pb-2">Form Controls</h2>
        <div>
          <label className="label">Sample Input</label>
          <input type="text" placeholder="Type here..." className="input" />
        </div>
        <div className="flex items-center gap-3">
          <input type="checkbox" defaultChecked className="checkbox" />
          <span className="text-sm">Accessible custom checkbox</span>
        </div>
      </section>
    </div>
  );
};
