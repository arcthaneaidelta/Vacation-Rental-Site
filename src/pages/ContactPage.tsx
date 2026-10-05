import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { mockApi, MockNetworkError } from '../lib/mockApi';
import { Button } from '../components/ui/Button';
import { 
  Mail, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  ShieldCheck 
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const toast = useStore((s) => s.toast);

  const [topic, setTopic] = useState<'traveler' | 'owner' | 'report'>('traveler');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorBanner, setErrorBanner] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;

    setLoading(true);
    setErrorBanner(null);

    try {
      await mockApi.sendContact();
      setSubmitted(true);
      toast({
        kind: 'success',
        title: 'Message sent',
        body: 'Thank you for reaching out. We will get back to you shortly.',
      });
    } catch (err) {
      setErrorBanner('We couldn’t deliver your message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-sand-50">
      {/* Header */}
      <section className="bg-white border-b border-line-200 pt-28 pb-10">
        <div className="container-x">
          <span className="eyebrow block mb-1">Get in Touch</span>
          <h1 className="h1-page font-serif text-tide-900">Contact RentABeachCondo</h1>
          <p className="text-sm sm:text-base text-ink-600 mt-2 max-w-xl">
            Have a question about a Grand Strand listing, owner onboarding, or our directory policies? We reply promptly.
          </p>
        </div>
      </section>

      {/* Main 2-column layout */}
      <div className="container-x py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          {/* Left Column: Direct Info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="card p-6 bg-white border border-line-200 space-y-4">
              <h3 className="font-serif text-xl font-medium text-tide-900">
                Directory Administration
              </h3>
              <p className="text-xs sm:text-sm text-ink-600 leading-relaxed">
                RentABeachCondo is an independent coastal vacation-rental directory founded on the Grand Strand of South Carolina.
              </p>

              <div className="pt-2 space-y-3 text-xs text-ink-900">
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-brass-600 shrink-0" />
                  <span>support@rentabeachcondo.com</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-brass-600 shrink-0" />
                  <span>North Myrtle Beach & Myrtle Beach, SC</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-brass-600 shrink-0" />
                  <span>Typical response time: within 4 hours</span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-sand-100 rounded-lg border border-line-200 text-xs text-ink-600 flex items-start gap-2.5">
              <ShieldCheck className="w-4 h-4 text-brass-600 shrink-0 mt-0.5" />
              <span>
                Booking questions for a specific condo should be sent via the <strong>Contact Owner</strong> button on that listing’s page.
              </span>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <div className="card p-6 sm:p-10 bg-white border border-line-200 shadow-1">
              {submitted ? (
                <div className="text-center py-10 space-y-4">
                  <div className="w-14 h-14 bg-ok-100 text-ok-600 rounded-full mx-auto flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8" strokeWidth={2.2} />
                  </div>
                  <h3 className="font-serif text-2xl font-medium text-tide-900">
                    Message received
                  </h3>
                  <p className="text-xs sm:text-sm text-ink-600 max-w-sm mx-auto">
                    Thank you, {name}. We’ve received your message and will reply to <strong className="text-tide-900">{email}</strong> soon.
                  </p>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => {
                      setSubmitted(false);
                      setMessage('');
                    }}
                  >
                    Send another message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <h2 className="font-serif text-2xl font-medium text-tide-900">
                    Send a message
                  </h2>

                  {errorBanner && (
                    <div className="p-3 bg-err-100 text-err-600 rounded border border-err-600/30 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{errorBanner}</span>
                    </div>
                  )}

                  {/* Topic Radio Cards */}
                  <div>
                    <label className="label text-xs">Topic *</label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      {[
                        { id: 'traveler' as const, label: 'Traveler Question' },
                        { id: 'owner' as const, label: 'Owner Application' },
                        { id: 'report' as const, label: 'Report a Listing' },
                      ].map((t) => (
                        <button
                          key={t.id}
                          type="button"
                          onClick={() => setTopic(t.id)}
                          className={`choice-card !p-2.5 text-xs justify-center text-center font-medium ${
                            topic === t.id ? 'is-on' : ''
                          }`}
                        >
                          {t.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="label text-xs">Your Name *</label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="First and last name"
                        className="input !py-2 text-sm"
                      />
                    </div>
                    <div>
                      <label className="label text-xs">Your Email *</label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="name@example.com"
                        className="input !py-2 text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="label text-xs">Message *</label>
                    <textarea
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      rows={5}
                      placeholder="How can we help you?"
                      className="input text-sm"
                    />
                  </div>

                  <div className="pt-2">
                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      loading={loading}
                      className="w-full sm:w-auto"
                    >
                      Send Message
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
