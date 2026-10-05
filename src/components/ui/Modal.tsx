import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showClose?: boolean;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  size = 'md',
  showClose = true,
}) => {
  const panelRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      previousActiveElement.current = document.activeElement as HTMLElement;
      document.body.classList.add('scroll-locked');

      // Auto-focus panel or first input
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

  const sizeCls = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
  }[size];

  return (
    <div className="fixed inset-0 z-modal flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Scrim */}
      <div 
        className="scrim"
        data-state="open"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog */}
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? 'modal-title' : undefined}
        aria-describedby={description ? 'modal-description' : undefined}
        className={`relative w-full ${sizeCls} bg-white rounded-lg border border-line-200 shadow-3 p-6 sm:p-8 modal-panel z-10 my-auto`}
      >
        {showClose && (
          <button
            onClick={onClose}
            aria-label="Close dialog"
            className="absolute top-5 right-5 p-1.5 rounded-full text-ink-500 hover:text-ink-900 hover:bg-sand-100 transition-colors"
          >
            <X className="w-5 h-5" strokeWidth={1.5} />
          </button>
        )}

        {title && (
          <div className="mb-4 pr-8">
            <h3 id="modal-title" className="h3 font-serif text-tide-900">
              {title}
            </h3>
            {description && (
              <p id="modal-description" className="text-sm text-ink-600 mt-1">
                {description}
              </p>
            )}
          </div>
        )}

        <div>{children}</div>
      </div>
    </div>
  );
};
