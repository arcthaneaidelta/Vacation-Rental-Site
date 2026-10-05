import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useStore } from '../../store/useStore';
import { mockApi } from '../../lib/mockApi';
import { Button } from '../../components/ui/Button';
import { Lock, ShieldCheck, ArrowRight, Sparkles } from 'lucide-react';

export const AdminLogin: React.FC = () => {
  const navigate = useNavigate();
  const setAdmin = useStore((s) => s.setAdmin);

  const [email, setEmail] = useState('admin@rentabeachcondo.com');
  const [password, setPassword] = useState('beachcondo2026');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) {
      setError('Please enter a valid administrator email.');
      return;
    }

    setLoading(true);
    setError(null);

    await mockApi.login();
    setAdmin(true);
    setLoading(false);
    navigate('/admin');
  };

  return (
    <div className="min-h-screen bg-sand-50 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center space-y-3">
        {/* Monogram Icon */}
        <div className="w-12 h-12 rounded-lg border border-brass-500/50 bg-tide-900 text-sand-50 flex items-center justify-center font-serif text-xl font-semibold mx-auto shadow-2">
          RB
        </div>

        <h1 className="font-serif text-3xl font-medium text-tide-900">
          RentABeach<span className="italic text-brass-500">Condo</span>
        </h1>
        <p className="text-xs text-ink-500">
          Directory Management & Owner Review Console
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="card bg-white py-8 px-6 sm:px-10 border border-line-200 shadow-2 space-y-5">
          <div className="p-3 bg-sand-50 rounded border border-line-200 flex items-start gap-2.5 text-xs text-ink-600">
            <Sparkles className="w-4 h-4 text-brass-600 shrink-0 mt-0.5" />
            <div>
              <strong className="text-tide-900">Demo Prototype:</strong> Pre-filled for your review. Any credentials will sign in.
            </div>
          </div>

          {error && (
            <div className="p-3 bg-err-100 text-err-600 rounded text-xs">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="label text-xs">Administrator Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input !py-2 text-sm"
              />
            </div>

            <div>
              <label className="label text-xs">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input !py-2 text-sm"
              />
            </div>

            <div className="pt-2">
              <Button
                type="submit"
                variant="primary"
                size="lg"
                loading={loading}
                className="w-full justify-center"
              >
                <span>Enter Admin Console</span>
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>
            </div>
          </form>

          <div className="pt-4 border-t border-line-200 text-center">
            <Link to="/" className="text-xs text-ink-500 hover:text-tide-900 hover:underline">
              ← Return to public directory
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
