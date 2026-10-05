import React from 'react';
import { useStore } from '../../store/useStore';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { Link } from 'react-router-dom';

export const ToastContainer: React.FC = () => {
  const toasts = useStore((s) => s.toasts);
  const dismiss = useStore((s) => s.dismissToast);

  if (toasts.length === 0) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed z-toast inset-x-0 bottom-6 sm:bottom-8 flex flex-col items-center gap-2 pointer-events-none px-4"
    >
      {toasts.map((t) => {
        let Icon = Info;
        let borderCls = 'border-info-600/30';
        let iconColor = 'text-info-600';

        if (t.kind === 'success') {
          Icon = CheckCircle2;
          borderCls = 'border-ok-600/40';
          iconColor = 'text-ok-600';
        } else if (t.kind === 'error') {
          Icon = AlertCircle;
          borderCls = 'border-err-600/40';
          iconColor = 'text-err-600';
        }

        return (
          <div
            key={t.id}
            className={`pointer-events-auto toast w-full max-w-md bg-white border ${borderCls} shadow-3 rounded-lg p-4 flex items-start gap-3 text-ink-900 transition-all`}
          >
            <Icon className={`w-5 h-5 shrink-0 mt-0.5 ${iconColor}`} strokeWidth={2} />
            <div className="flex-1 text-sm min-w-0">
              <p className="font-semibold text-tide-900">{t.title}</p>
              {t.body && <p className="text-ink-600 text-xs mt-0.5">{t.body}</p>}
              {t.action && (
                <div className="mt-2">
                  {t.action.to ? (
                    <Link
                      to={t.action.to}
                      onClick={() => dismiss(t.id)}
                      className="inline-block text-xs font-semibold text-tide-900 underline underline-offset-2 decoration-brass-500 hover:text-tide-800"
                    >
                      {t.action.label} →
                    </Link>
                  ) : (
                    <button
                      onClick={() => {
                        t.action?.run?.();
                        dismiss(t.id);
                      }}
                      className="text-xs font-semibold text-tide-900 underline underline-offset-2 decoration-brass-500 hover:text-tide-800"
                    >
                      {t.action.label}
                    </button>
                  )}
                </div>
              )}
            </div>
            <button
              onClick={() => dismiss(t.id)}
              aria-label="Dismiss notice"
              className="text-ink-500 hover:text-ink-900 p-1 -mr-1 -mt-1 rounded-full hover:bg-sand-100"
            >
              <X className="w-4 h-4" strokeWidth={1.5} />
            </button>
          </div>
        );
      })}
    </div>
  );
};
