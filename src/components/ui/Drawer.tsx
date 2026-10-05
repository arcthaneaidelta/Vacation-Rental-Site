import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
  width?: 'sm' | 'md' | 'lg' | 'xl';
  position?: 'right' | 'bottom';
}

export const Drawer: React.FC<DrawerProps> = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  width = 'md',
  position = 'right',
}) => {
  const panelRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      previousActiveElement.current = document.activeElement as HTMLElement;
      document.body.classList.add('scroll-locked');

      setTimeout(() => {
        const focusable = panelRef.current?.querySelector<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        focusable?.focus();
      }, 50);

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose();
        }
      };

      window.addEventListener('keydown', handleKeyDown);
      return () => {
        window.removeEventListener('keydown', handleKeyDown);
        document.body.classList.remove('scroll-locked');
        previousActiveElement.current?.focus();
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const widthCls = {
    sm: 'max-w-md',
    md: 'max-w-lg md:max-w-xl',
    lg: 'max-w-2xl',
    xl: 'max-w-3xl',
  }[width];

  return (
    <div className="fixed inset-0 z-drawer overflow-hidden">
      {/* Scrim */}
      <div
        className="scrim"
        data-state="open"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel container */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-6 sm:pl-10">
        <div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby={title ? 'drawer-title' : undefined}
          className={`w-screen ${widthCls} bg-white shadow-3 border-l border-line-200 flex flex-col drawer-panel rounded-l-xl md:rounded-l-2xl overflow-hidden`}
        >
          {/* Header */}
          <div className="px-6 py-5 border-b border-line-200 bg-sand-50/70 flex items-center justify-between shrink-0">
            <div>
              {title && (
                <h3 id="drawer-title" className="h4 font-serif text-tide-900">
                  {title}
                </h3>
              )}
              {description && (
                <p className="text-xs text-ink-500 mt-0.5">{description}</p>
              )}
            </div>
            <button
              onClick={onClose}
              aria-label="Close panel"
              className="p-1.5 rounded-full text-ink-500 hover:text-ink-900 hover:bg-sand-200 transition-colors"
            >
              <X className="w-5 h-5" strokeWidth={1.5} />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-6 sm:p-8 overscroll-contain">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};
